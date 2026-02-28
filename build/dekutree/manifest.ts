import {
    DEKUTREE_BGM_OGG_DST_PATH,
    DEKUTREE_COLLIDER_GLB_PATH,
    DEKUTREE_FOREST_PORTAL_GLB_PATH,
    DEKUTREE_MANIFEST_PATH,
    DEKUTREE_MODEL_GLB_PATH,
    DEKUTREE_SPAWN_JSON_PATH,
} from "@build/dekutree/constant"
import { DEKUTREE_MATERIAL_DEFINITIONS } from "@build/dekutree/material"
import { ManifestBuild, type ManifestBuildMaterial } from "@build/lib/manifest"
import { type ITask } from "makeboy"

const DEKUTREE_MANIFEST_BUILD_MATERIAL: readonly ManifestBuildMaterial[] =
    DEKUTREE_MATERIAL_DEFINITIONS.map((definition) => ({
        name: definition.materialName,
        frames: [definition.textureDst],
    }))

export class DekutreeManifestBuild implements ITask {
    private readonly manifestBuildTask = new ManifestBuild(DEKUTREE_MANIFEST_PATH, {
        meta: {
            name: "dekutree",
            author: "tlonny <timlonsdale@gmail.com>",
        },
        level: {
            model: DEKUTREE_MODEL_GLB_PATH,
            collider: DEKUTREE_COLLIDER_GLB_PATH,
            track: DEKUTREE_BGM_OGG_DST_PATH,
            spawnPath: DEKUTREE_SPAWN_JSON_PATH,
            material: DEKUTREE_MANIFEST_BUILD_MATERIAL,
        },
        portal: {
            forest: {
                collider: DEKUTREE_FOREST_PORTAL_GLB_PATH,
                link: "de_nuke.json#forest_arch",
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
