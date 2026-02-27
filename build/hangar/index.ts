import {
    BlenderPortalExport,
    BlenderColliderExport,
    BlenderModelExport,
    BlenderSpawnExport,
} from "@build/lib/blender"
import { MagickImageResize } from "@build/lib/magick"
import { type ITask } from "makeboy"

import {
    HANGAR_ARCH_PORTAL_GLB_PATH,
    HANGAR_BGM_OGG_DST_PATH,
    HANGAR_BGM_OGG_SRC_PATH,
    HANGAR_COLLIDER_GLB_PATH,
    HANGAR_MODEL_GLB_PATH,
    HANGAR_SCENE_BLEND_PATH,
    HANGAR_SPAWN_JSON_PATH,
} from "@build/hangar/constant"
import { hangarManifestTaskBuild } from "@build/hangar/manifest"
import { HANGAR_MATERIAL_DEFINITIONS } from "@build/hangar/material"
import { FileCopy } from "@build/lib/copy"

export const hangarTasksBuild = (): readonly ITask[] => {
    const tasks: ITask[] = []

    for (const definition of HANGAR_MATERIAL_DEFINITIONS) {
        tasks.push(new MagickImageResize(definition.textureSrc, definition.textureDst))
    }

    tasks.push(new BlenderColliderExport(HANGAR_SCENE_BLEND_PATH, HANGAR_COLLIDER_GLB_PATH))
    tasks.push(new BlenderModelExport(HANGAR_SCENE_BLEND_PATH, HANGAR_MODEL_GLB_PATH))
    tasks.push(new BlenderPortalExport(HANGAR_SCENE_BLEND_PATH, "portal.arch", HANGAR_ARCH_PORTAL_GLB_PATH))
    tasks.push(new BlenderSpawnExport(HANGAR_SCENE_BLEND_PATH, HANGAR_SPAWN_JSON_PATH))
    tasks.push(new FileCopy(HANGAR_BGM_OGG_SRC_PATH, HANGAR_BGM_OGG_DST_PATH))
    tasks.push(hangarManifestTaskBuild())

    return tasks
}
