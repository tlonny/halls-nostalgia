import {
    HANGAR_ARCH_PORTAL_GLB_PATH,
    HANGAR_BGM_OGG_DST_PATH,
    HANGAR_COLLIDER_GLB_PATH,
    HANGAR_MANIFEST_PATH,
    HANGAR_MODEL_GLB_PATH,
    HANGAR_SPAWN_JSON_PATH,
} from "@build/hangar/constant"
import { HANGAR_MATERIAL_DEFINITIONS } from "@build/hangar/material"
import {
    ManifestBuild,
    TextureAddressing,
    type ManifestBuildMaterial,
} from "@build/lib/manifest"
import { type ITask } from "makeboy"

const HANGAR_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] =
    HANGAR_MATERIAL_DEFINITIONS.map((definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
        textureAddressing: TextureAddressing.Nearest,
    }))

export const hangarManifestTaskBuild = (): ITask => {
    const manifestBuildTask = new ManifestBuild(HANGAR_MANIFEST_PATH, {
        meta: {
            name: "hangar",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: HANGAR_MODEL_GLB_PATH,
            collider: HANGAR_COLLIDER_GLB_PATH,
            track: HANGAR_BGM_OGG_DST_PATH,
            spawnPath: HANGAR_SPAWN_JSON_PATH,
            material: HANGAR_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            arch: {
                collider: HANGAR_ARCH_PORTAL_GLB_PATH,
                link: "de_dust2.json#arch",
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
