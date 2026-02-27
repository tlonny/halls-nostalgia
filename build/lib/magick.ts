import { mkdir } from "node:fs/promises"
import { dirname } from "node:path"

import { GLOBAL_BUILD_MUTEX } from "@build/lib/mutex"
import { type ITask } from "makeboy"

const SQUARE_SIZES = [64, 128, 256, 512] as const

export const magickResize = async (srcPath: string, dstPath: string): Promise<void> => {
    if (!(await Bun.file(srcPath).exists())) {
        throw new Error(`Missing source image: ${srcPath}`)
    }

    const probe = Bun.spawnSync(["magick", "identify", "-format", "%w %h", srcPath])
    if (probe.exitCode !== 0) {
        throw new Error(`magick identify failed for ${srcPath}`)
    }

    const [widthText, heightText] = new TextDecoder()
        .decode(probe.stdout)
        .trim()
        .split(/\s+/)
    const width = Number(widthText)
    const height = Number(heightText)
    if (!Number.isFinite(width) || !Number.isFinite(height)) {
        throw new Error(`Unable to parse image dimensions for ${srcPath}`)
    }

    const required = Math.max(width, height)
    const size = SQUARE_SIZES.find((candidate) => candidate >= required)
    if (!size) {
        throw new Error(
            `Image is too large for non-downscaled targets: ${width}x${height}`,
        )
    }

    const run = Bun.spawnSync(["magick", srcPath, "-resize", `${size}x${size}!`, dstPath], {
        stdin: "inherit",
        stdout: "inherit",
        stderr: "inherit",
    })
    if (run.exitCode !== 0) {
        throw new Error(`magick resize failed for ${srcPath}`)
    }
}

export class MagickImageResize implements ITask {
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
            console.log(`[task] texture resize: ${this.srcPath} -> ${this.dstPath}`)
            await mkdir(dirname(this.dstPath), { recursive: true })
            await magickResize(this.srcPath, this.dstPath)
        } finally {
            GLOBAL_BUILD_MUTEX.unlock()
        }
    }
}
