import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"

import { GLOBAL_BUILD_MUTEX } from "@build/lib/mutex"
import { type ITask } from "makeboy"

export class FileCopy implements ITask {
    constructor(
        private readonly srcPath: string,
        private readonly dstPath: string,
    ) {}

    target(): string {
        return this.dstPath
    }

    dependencies(): readonly string[] {
        return [this.srcPath]
    }

    async build(): Promise<void> {
        await GLOBAL_BUILD_MUTEX.lock()
        try {
            console.log(`[task] file copy: ${this.srcPath} -> ${this.dstPath}`)
            await mkdir(dirname(this.dstPath), { recursive: true })
            await Bun.write(this.dstPath, Bun.file(this.srcPath))
        } finally {
            GLOBAL_BUILD_MUTEX.unlock()
        }
    }
}
