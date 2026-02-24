import { stat } from "node:fs/promises"

type MaybePromise<T> = T | Promise<T>

export interface ITask {
    target(): string
    dependencies(): readonly string[]
    buildAlways?(): boolean
    build(): MaybePromise<void>
}

export class MakeManifest {
    private readonly tasks = new Map<string, ITask>()

    register<TTask extends ITask>(task: TTask): this {
        const target = task.target()
        if (this.tasks.has(target)) {
            throw new Error(`Duplicate task for target: ${target}`)
        }

        this.tasks.set(target, task)
        return this
    }

    compile(): MakeState {
        return new MakeState(new Map(this.tasks))
    }
}

export class MakeState {
    private readonly resolved = new Set<string>()
    private readonly inProgress = new Set<string>()
    private readonly stack: string[] = []
    private readonly mtimeCache = new Map<string, number | null>()

    constructor(private readonly tasks: ReadonlyMap<string, ITask>) {}

    async build(target: string): Promise<void> {
        if (this.inProgress.has(target)) {
            throw new Error(`Dependency cycle detected: ${this.describeCycle(target)}`)
        }

        if (this.resolved.has(target)) {
            return
        }

        const task = this.tasks.get(target)
        if (!task) {
            await this.ensureExists(target, `Missing dependency: ${target}`)
            this.resolved.add(target)
            return
        }

        this.inProgress.add(target)
        this.stack.push(target)

        try {
            const deps = task.dependencies()
            const uniqueDeps = this.dedupe(deps)

            for (const dep of uniqueDeps) {
                await this.build(dep)
            }

            const depMtimes = await Promise.all(
                uniqueDeps.map(async (dep) => {
                    const mtime = await this.getMtime(dep)
                    if (mtime === null) {
                        throw new Error(`Missing dependency: ${dep}`)
                    }
                    return mtime
                }),
            )

            const targetMtime = await this.getMtime(target)
            const alwaysBuild = task.buildAlways?.() === true
            const isStale =
                alwaysBuild ||
                targetMtime === null ||
                depMtimes.some((depMtime) => depMtime > targetMtime)

            if (isStale) {
                await task.build()
                this.mtimeCache.delete(target)
                await this.ensureExists(
                    target,
                    `Build for target "${target}" did not produce output file`,
                )
            }

            this.resolved.add(target)
        } finally {
            this.stack.pop()
            this.inProgress.delete(target)
        }
    }

    async buildAll(): Promise<void> {
        for (const target of this.tasks.keys()) {
            await this.build(target)
        }
    }

    private describeCycle(target: string): string {
        const start = this.stack.indexOf(target)
        if (start < 0) {
            return [...this.stack, target].join(" -> ")
        }
        return [...this.stack.slice(start), target].join(" -> ")
    }

    private dedupe(values: readonly string[]): string[] {
        return [...new Set(values)]
    }

    private async ensureExists(path: string, message: string): Promise<void> {
        const mtime = await this.getMtime(path)
        if (mtime === null) {
            throw new Error(message)
        }
    }

    private async readMtime(path: string): Promise<number | null> {
        try {
            const stats = await stat(path)
            return stats.mtimeMs
        } catch (error) {
            if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
                return null
            }
            throw error
        }
    }

    private async getMtime(path: string): Promise<number | null> {
        if (this.mtimeCache.has(path)) {
            return this.mtimeCache.get(path) ?? null
        }

        const mtime = await this.readMtime(path)
        this.mtimeCache.set(path, mtime)
        return mtime
    }
}
