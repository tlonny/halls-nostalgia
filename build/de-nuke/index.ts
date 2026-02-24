import {
    BlenderColliderExport,
    BlenderModelExport,
    BlenderPortalExport,
    BlenderSpawnExport,
} from "@build/lib/blender"
import { type ITask } from "@build/lib/make"
import { MagickImageResize } from "@build/lib/magick"

import {
    NUKE_COLLIDER_GLB_PATH,
    NUKE_FOREST_ARCH_PORTAL_GLB_PATH,
    NUKE_MODEL_GLB_PATH,
    NUKE_PIPE_ROOF_PORTAL_GLB_PATH,
    NUKE_SCENE_BLEND_PATH,
    NUKE_SPAWN_JSON_PATH,
} from "@build/de-nuke/constant"
import { NUKE_MATERIAL_DEFINITIONS } from "@build/de-nuke/material"
import { NukeManifestBuild } from "@build/de-nuke/manifest"

export const nukeTasksBuild = (): readonly ITask[] => {
    const tasks: ITask[] = []

    for (const definition of NUKE_MATERIAL_DEFINITIONS) {
        tasks.push(new MagickImageResize(definition.textureSrc, definition.textureDst))
    }

    tasks.push(new BlenderColliderExport(NUKE_SCENE_BLEND_PATH, NUKE_COLLIDER_GLB_PATH))
    tasks.push(new BlenderModelExport(NUKE_SCENE_BLEND_PATH, NUKE_MODEL_GLB_PATH))
    tasks.push(
        new BlenderPortalExport(
            NUKE_SCENE_BLEND_PATH,
            "portal.forest_arch",
            NUKE_FOREST_ARCH_PORTAL_GLB_PATH,
        ),
    )
    tasks.push(
        new BlenderPortalExport(
            NUKE_SCENE_BLEND_PATH,
            "portal.pipe_roof",
            NUKE_PIPE_ROOF_PORTAL_GLB_PATH,
        ),
    )
    tasks.push(new BlenderSpawnExport(NUKE_SCENE_BLEND_PATH, NUKE_SPAWN_JSON_PATH))
    tasks.push(new NukeManifestBuild())

    return tasks
}
