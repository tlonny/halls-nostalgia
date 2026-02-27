import {
    BLOCKFORT_BGM_OGG_DST_PATH,
    BLOCKFORT_COLLIDER_GLB_PATH,
    BLOCKFORT_MANIFEST_PATH,
    BLOCKFORT_MODEL_GLB_PATH,
    BLOCKFORT_PIPE_WALL_PORTAL_GLB_PATH,
    BLOCKFORT_SPAWN_JSON_PATH,
} from "@build/blockfort/constant"
import { BLOCKFORT_MATERIAL_DEFINITIONS } from "@build/blockfort/material"
import { ManifestBuild, type ManifestBuildMaterial } from "@build/lib/manifest"
import { type ITask } from "makeboy"

const BLOCKFORT_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] =
    BLOCKFORT_MATERIAL_DEFINITIONS.map((definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
    }))

export class BlockfortManifestBuild implements ITask {
    private readonly manifestBuildTask = new ManifestBuild(BLOCKFORT_MANIFEST_PATH, {
        meta: {
            name: "blockfort",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: BLOCKFORT_MODEL_GLB_PATH,
            collider: BLOCKFORT_COLLIDER_GLB_PATH,
            track: BLOCKFORT_BGM_OGG_DST_PATH,
            spawn_path: BLOCKFORT_SPAWN_JSON_PATH,
            material: BLOCKFORT_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            pipe_wall: {
                collider: BLOCKFORT_PIPE_WALL_PORTAL_GLB_PATH,
                link: "de_nuke.json#pipe_rock",
            },
        },
    })

    target(): string {
        return this.manifestBuildTask.target()
    }

    dependencies(): readonly string[] {
        return this.manifestBuildTask.dependencies()
    }

    force(): boolean {
        return this.manifestBuildTask.force()
    }

    build(): Promise<void> {
        return this.manifestBuildTask.build()
    }
}
