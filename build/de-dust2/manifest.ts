import {
    DUST2_ARCH_PORTAL_GLB_PATH,
    DUST2_COLLIDER_GLB_PATH,
    DUST2_MANIFEST_PATH,
    DUST2_MODEL_GLB_PATH,
    DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
    DUST2_SPAWN_JSON_PATH,
} from "@build/de-dust2/constant"
import { DUST2_MATERIAL_DEFINITIONS } from "@build/de-dust2/material"
import { ManifestBuild, type ManifestBuildMaterial } from "@build/lib/manifest"
import { type ITask } from "makeboy"

const DUST2_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] = DUST2_MATERIAL_DEFINITIONS.map(
    (definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
    }),
)

export const dust2ManifestTaskBuild = (): ITask => {
    const manifestBuildTask = new ManifestBuild(DUST2_MANIFEST_PATH, {
        meta: {
            name: "de_dust2",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: DUST2_MODEL_GLB_PATH,
            collider: DUST2_COLLIDER_GLB_PATH,
            spawnPath: DUST2_SPAWN_JSON_PATH,
            material: DUST2_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            arch: {
                collider: DUST2_ARCH_PORTAL_GLB_PATH,
                link: "hangar.json#arch",
            },
            pipe_floor: {
                collider: DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
                link: "de_nuke.json#pipe_roof",
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
