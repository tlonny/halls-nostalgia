import {
    BLOCKFORT_BGM_OGG_DST_PATH,
    BLOCKFORT_BGM_OGG_SRC_PATH,
    BLOCKFORT_COLLIDER_GLB_PATH,
    BLOCKFORT_MODEL_GLB_PATH,
    BLOCKFORT_PIPE_WALL_PORTAL_GLB_PATH,
    BLOCKFORT_SCENE_BLEND_PATH,
    BLOCKFORT_SPAWN_JSON_PATH,
} from "@build/blockfort/constant"
import { BlockfortManifestBuild } from "@build/blockfort/manifest"
import { BLOCKFORT_MATERIAL_DEFINITIONS } from "@build/blockfort/material"
import {
    BlenderColliderExport,
    BlenderModelExport,
    BlenderPortalExport,
    BlenderSpawnExport,
} from "@build/lib/blender"
import { FileCopy } from "@build/lib/copy"
import { type ITask } from "@build/lib/make"
import { MagickImageResize } from "@build/lib/magick"

export const blockfortTasksBuild = (): readonly ITask[] => {
    const tasks: ITask[] = []

    for (const definition of BLOCKFORT_MATERIAL_DEFINITIONS) {
        tasks.push(new MagickImageResize(definition.textureSrc, definition.textureDst))
    }

    tasks.push(new BlenderColliderExport(BLOCKFORT_SCENE_BLEND_PATH, BLOCKFORT_COLLIDER_GLB_PATH))
    tasks.push(new BlenderModelExport(BLOCKFORT_SCENE_BLEND_PATH, BLOCKFORT_MODEL_GLB_PATH))
    tasks.push(
        new BlenderPortalExport(
            BLOCKFORT_SCENE_BLEND_PATH,
            "portal.pipe_wall",
            BLOCKFORT_PIPE_WALL_PORTAL_GLB_PATH,
        ),
    )
    tasks.push(new BlenderSpawnExport(BLOCKFORT_SCENE_BLEND_PATH, BLOCKFORT_SPAWN_JSON_PATH))
    tasks.push(new FileCopy(BLOCKFORT_BGM_OGG_SRC_PATH, BLOCKFORT_BGM_OGG_DST_PATH))
    tasks.push(new BlockfortManifestBuild())

    return tasks
}
