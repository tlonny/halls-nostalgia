import {
    BlenderColliderExport,
    BlenderModelExport,
    BlenderPortalExport,
    BlenderSpawnExport,
} from "@build/lib/blender"
import { MagickImageResize } from "@build/lib/magick"
import { type ITask } from "makeboy"

import {
    DUST2_COLLIDER_GLB_PATH,
    DUST2_MODEL_GLB_PATH,
    DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
    DUST2_SCENE_BLEND_PATH,
    DUST2_SPAWN_JSON_PATH,
} from "@build/de-dust2/constant"
import { DUST2_MATERIAL_DEFINITIONS } from "@build/de-dust2/material"
import { dust2ManifestTaskBuild } from "@build/de-dust2/manifest"

export const dust2TasksBuild = (): readonly ITask[] => {
    const tasks: ITask[] = []

    for (const definition of DUST2_MATERIAL_DEFINITIONS) {
        tasks.push(new MagickImageResize(definition.textureSrc, definition.textureDst))
    }

    tasks.push(new BlenderColliderExport(DUST2_SCENE_BLEND_PATH, DUST2_COLLIDER_GLB_PATH))
    tasks.push(new BlenderModelExport(DUST2_SCENE_BLEND_PATH, DUST2_MODEL_GLB_PATH))
    tasks.push(
        new BlenderPortalExport(
            DUST2_SCENE_BLEND_PATH,
            "portal.pipe_floor",
            DUST2_PIPE_FLOOR_PORTAL_GLB_PATH,
        ),
    )
    tasks.push(new BlenderSpawnExport(DUST2_SCENE_BLEND_PATH, DUST2_SPAWN_JSON_PATH))
    tasks.push(dust2ManifestTaskBuild())

    return tasks
}
