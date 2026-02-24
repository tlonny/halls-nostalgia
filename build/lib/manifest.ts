import { dirname, relative, sep } from "node:path"

import { type ITask } from "@build/lib/make"
import { number, parse, tuple } from "valibot"

const LEVEL_MANIFEST_VERSION = "coco" as const
const MANIFEST_SPAWN_SCHEMA = tuple([number(), number(), number()])

type ManifestColor = readonly [number, number, number, number]
type ManifestVec3 = readonly [number, number, number]

type ManifestMaterial = {
    frames: readonly string[]
    animation_speed?: number
    color?: ManifestColor
    unlit?: boolean
}

type ManifestPortal = {
    collider: string
    link: string
}

type ManifestLevel = {
    model: string
    collider?: string
    lightmap?: string
    track?: string
    spawn?: ManifestVec3
    material: Record<string, ManifestMaterial>
}

type ManifestMeta = {
    name: string
    author?: string
    track?: string
}

type Manifest = {
    _version: typeof LEVEL_MANIFEST_VERSION
    meta: ManifestMeta
    level: ManifestLevel
    portal: Record<string, ManifestPortal>
}

export type ManifestBuildMaterial = ManifestMaterial & {
    name: string
}

export type ManifestBuildPortal = ManifestPortal

export type ManifestBuildInput = {
    meta: ManifestMeta
    level: {
        model: string
        collider?: string
        lightmap?: string
        track?: string
        spawn_path?: string
        material: readonly ManifestBuildMaterial[]
    }
    portal: Record<string, ManifestBuildPortal>
}

export class ManifestBuild implements ITask {
    constructor(
        private readonly outputPath: string,
        private readonly input: ManifestBuildInput,
    ) {}

    target(): string {
        return this.outputPath
    }

    dependencies(): readonly string[] {
        return []
    }

    buildAlways(): boolean {
        return true
    }

    async build(): Promise<void> {
        const outputDirectory = dirname(this.outputPath)
        const manifestRelativePath = (path: string): string => {
            return relative(outputDirectory, path).split(sep).join("/")
        }

        const material: Record<string, ManifestMaterial> = {}
        for (const item of this.input.level.material) {
            const { name, ...value } = item
            material[name] = {
                ...value,
                frames: item.frames.map((frame) => manifestRelativePath(frame)),
            }
        }

        let spawn: ManifestVec3 | undefined
        if (this.input.level.spawn_path) {
            spawn = parse(
                MANIFEST_SPAWN_SCHEMA,
                await Bun.file(this.input.level.spawn_path).json(),
            )
        }

        const portal: Record<string, ManifestPortal> = {}
        for (const [name, entry] of Object.entries(this.input.portal)) {
            portal[name] = {
                collider: manifestRelativePath(entry.collider),
                link: entry.link,
            }
        }

        const level: ManifestLevel = {
            model: manifestRelativePath(this.input.level.model),
            material,
        }
        if (this.input.level.collider) {
            level.collider = manifestRelativePath(this.input.level.collider)
        }
        if (this.input.level.lightmap) {
            level.lightmap = manifestRelativePath(this.input.level.lightmap)
        }
        if (this.input.level.track) {
            level.track = manifestRelativePath(this.input.level.track)
        }
        if (spawn) {
            level.spawn = spawn
        }

        const manifest: Manifest = {
            _version: LEVEL_MANIFEST_VERSION,
            meta: this.input.meta,
            level,
            portal,
        }

        await Bun.write(this.outputPath, JSON.stringify(manifest, null, 2) + "\n")
    }
}
