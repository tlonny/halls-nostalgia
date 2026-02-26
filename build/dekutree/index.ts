import {
    BlenderColliderExport,
    BlenderModelExport,
    BlenderPortalExport,
    BlenderSpawnExport,
} from "@build/lib/blender"
import { type ITask } from "@build/lib/make"
import { MagickImageResize } from "@build/lib/magick"

import {
    DEKUTREE_COLLIDER_GLB_PATH,
    DEKUTREE_FOREST_PORTAL_GLB_PATH,
    DEKUTREE_MODEL_GLB_PATH,
    DEKUTREE_SCENE_BLEND_PATH,
    DEKUTREE_SPAWN_JSON_PATH,
} from "@build/dekutree/constant"
import { DEKUTREE_MATERIAL_DEFINITIONS } from "@build/dekutree/material"
import { DekutreeManifestBuild } from "@build/dekutree/manifest"

export const dekutreeTasksBuild = (): readonly ITask[] => {
    const tasks: ITask[] = []

    for (const definition of DEKUTREE_MATERIAL_DEFINITIONS) {
        tasks.push(new MagickImageResize(definition.textureSrc, definition.textureDst))
    }

    tasks.push(new BlenderColliderExport(DEKUTREE_SCENE_BLEND_PATH, DEKUTREE_COLLIDER_GLB_PATH))
    tasks.push(new BlenderModelExport(DEKUTREE_SCENE_BLEND_PATH, DEKUTREE_MODEL_GLB_PATH))
    tasks.push(
        new BlenderPortalExport(
            DEKUTREE_SCENE_BLEND_PATH,
            "portal.forest",
            DEKUTREE_FOREST_PORTAL_GLB_PATH,
        ),
    )
    tasks.push(new BlenderSpawnExport(DEKUTREE_SCENE_BLEND_PATH, DEKUTREE_SPAWN_JSON_PATH))
    tasks.push(new DekutreeManifestBuild())

    return tasks
}
