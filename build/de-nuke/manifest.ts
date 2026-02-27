import {
    NUKE_COLLIDER_GLB_PATH,
    NUKE_FOREST_ARCH_PORTAL_GLB_PATH,
    NUKE_MANIFEST_PATH,
    NUKE_MODEL_GLB_PATH,
    NUKE_PIPE_ROCK_PORTAL_GLB_PATH,
    NUKE_PIPE_ROOF_PORTAL_GLB_PATH,
    NUKE_SPAWN_JSON_PATH,
} from "@build/de-nuke/constant"
import { NUKE_MATERIAL_DEFINITIONS } from "@build/de-nuke/material"
import { ManifestBuild, type ManifestBuildMaterial } from "@build/lib/manifest"
import { type ITask } from "makeboy"

const NUKE_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] = NUKE_MATERIAL_DEFINITIONS.map(
    (definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
    }),
)

export const nukeManifestTaskBuild = (): ITask => {
    const manifestBuildTask = new ManifestBuild(NUKE_MANIFEST_PATH, {
        meta: {
            name: "de_nuke",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: NUKE_MODEL_GLB_PATH,
            collider: NUKE_COLLIDER_GLB_PATH,
            spawnPath: NUKE_SPAWN_JSON_PATH,
            material: NUKE_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            forest_arch: {
                collider: NUKE_FOREST_ARCH_PORTAL_GLB_PATH,
                link: "dekutree.json#forest",
            },
            pipe_roof: {
                collider: NUKE_PIPE_ROOF_PORTAL_GLB_PATH,
                link: "de_dust2.json#pipe_floor",
            },
            pipe_rock: {
                collider: NUKE_PIPE_ROCK_PORTAL_GLB_PATH,
                link: "blockfort.json#pipe_wall",
            },
        },
    })

    return {
        target(): string {
            return manifestBuildTask.target()
        },
        dependencies(): readonly string[] {
            return manifestBuildTask.dependencies()
        },
        force(): boolean {
            return manifestBuildTask.force()
        },
        build(): Promise<void> {
            return manifestBuildTask.build()
        },
    }
}
