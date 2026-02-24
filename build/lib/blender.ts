import { resolve } from "node:path"

import { type ITask } from "@build/lib/make"
import { ROOT_DIRECTORY } from "@build/lib/root"

const COLLIDER_EXPORT_SCRIPT_PATH = resolve(ROOT_DIRECTORY, "asset/blender/collider_export.py")
const MODEL_EXPORT_SCRIPT_PATH = resolve(ROOT_DIRECTORY, "asset/blender/model_export.py")
const PORTAL_EXPORT_SCRIPT_PATH = resolve(ROOT_DIRECTORY, "asset/blender/portal_export.py")
const SPAWN_EXPORT_SCRIPT_PATH = resolve(ROOT_DIRECTORY, "asset/blender/spawn_export.py")
const BLENDER_PATH = process.env.BLENDER_PATH as string

const blenderExec = async (
    scriptPath: string,
    blendPath: string,
    scriptArgs: readonly string[],
): Promise<void> => {
    const cmdArgs = ["-b", "--python", resolve(scriptPath)]
    if (blendPath.trim().length > 0) {
        cmdArgs.splice(1, 0, resolve(blendPath))
    }
    if (scriptArgs.length > 0) {
        cmdArgs.push("--", ...scriptArgs)
    }

    const proc = Bun.spawn([BLENDER_PATH, ...cmdArgs], {
        stdin: "inherit",
        stdout: "inherit",
        stderr: "inherit",
    })

    const exitCode = await proc.exited
    if (exitCode !== 0) {
        throw new Error(`blender exited with status ${exitCode}`)
    }
}

export class BlenderColliderExport implements ITask {
    constructor(
        private readonly blendPath: string,
        private readonly outputPath: string,
    ) {}

    target(): string {
        return this.outputPath
    }

    dependencies(): readonly string[] {
        return [this.blendPath, COLLIDER_EXPORT_SCRIPT_PATH]
    }

    async build(): Promise<void> {
        await blenderExec(COLLIDER_EXPORT_SCRIPT_PATH, this.blendPath, [this.outputPath])
    }
}

export class BlenderModelExport implements ITask {
    constructor(
        private readonly blendPath: string,
        private readonly outputPath: string,
    ) {}

    target(): string {
        return this.outputPath
    }

    dependencies(): readonly string[] {
        return [this.blendPath, MODEL_EXPORT_SCRIPT_PATH]
    }

    async build(): Promise<void> {
        await blenderExec(MODEL_EXPORT_SCRIPT_PATH, this.blendPath, [this.outputPath])
    }
}

export class BlenderPortalExport implements ITask {
    constructor(
        private readonly blendPath: string,
        private readonly objectName: string,
        private readonly outputPath: string,
    ) {}

    target(): string {
        return this.outputPath
    }

    dependencies(): readonly string[] {
        return [this.blendPath, PORTAL_EXPORT_SCRIPT_PATH]
    }

    async build(): Promise<void> {
        await blenderExec(PORTAL_EXPORT_SCRIPT_PATH, this.blendPath, [this.objectName, this.outputPath])
    }
}

export class BlenderSpawnExport implements ITask {
    constructor(
        private readonly blendPath: string,
        private readonly outputPath: string,
    ) {}

    target(): string {
        return this.outputPath
    }

    dependencies(): readonly string[] {
        return [this.blendPath, SPAWN_EXPORT_SCRIPT_PATH]
    }

    async build(): Promise<void> {
        await blenderExec(SPAWN_EXPORT_SCRIPT_PATH, this.blendPath, [this.outputPath])
    }
}
