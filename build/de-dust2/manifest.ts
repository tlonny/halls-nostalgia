import {
    DUST2_COLLIDER_GLB_PATH,
    DUST2_MANIFEST_PATH,
    DUST2_MODEL_GLB_PATH,
    DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
    DUST2_SPAWN_JSON_PATH,
} from "@build/de-dust2/constant"
import { DUST2_MATERIAL_DEFINITIONS } from "@build/de-dust2/material"
import { ManifestBuild, type ManifestBuildMaterial } from "@build/lib/manifest"
import { type ITask } from "@build/lib/make"

const DUST2_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] = DUST2_MATERIAL_DEFINITIONS.map(
    (definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
    }),
)

export class Dust2ManifestBuild implements ITask {
    private readonly manifestBuildTask = new ManifestBuild(DUST2_MANIFEST_PATH, {
        meta: {
            name: "de_dust2",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: DUST2_MODEL_GLB_PATH,
            collider: DUST2_COLLIDER_GLB_PATH,
            spawn_path: DUST2_SPAWN_JSON_PATH,
            material: DUST2_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            pipe_floor: {
                collider: DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
                link: "de_nuke.json#pipe_roof",
            },
        },
    })

    target(): string {
        return this.manifestBuildTask.target()
    }

    dependencies(): readonly string[] {
        return this.manifestBuildTask.dependencies()
    }

    buildAlways(): boolean {
        return this.manifestBuildTask.buildAlways()
    }

    build(): Promise<void> {
        return this.manifestBuildTask.build()
    }
}
