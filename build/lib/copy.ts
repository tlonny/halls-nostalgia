import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"

import { type ITask } from "@build/lib/make"

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
        await mkdir(dirname(this.dstPath), { recursive: true })
        await Bun.write(this.dstPath, Bun.file(this.srcPath))
    }
}
