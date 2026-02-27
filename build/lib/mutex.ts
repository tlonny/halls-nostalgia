export class Mutex {
    private locked = false
    private readonly waiters: Array<() => void> = []

    async lock(): Promise<void> {
        if (!this.locked) {
            this.locked = true
            return
        }

        await new Promise<void>((resolve) => {
            this.waiters.push(resolve)
        })
    }

    unlock(): void {
        const next = this.waiters.shift()
        if (next) {
            next()
            return
        }

        this.locked = false
    }
}

export const GLOBAL_BUILD_MUTEX = new Mutex()
