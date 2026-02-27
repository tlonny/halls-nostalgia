import { blockfortTasksBuild } from "@build/blockfort"
import { dekutreeTasksBuild } from "@build/dekutree"
import { dust2TasksBuild } from "@build/de-dust2"
import { hangarTasksBuild } from "@build/hangar"
import { nukeTasksBuild } from "@build/de-nuke"
import { Manifest } from "makeboy"

if (import.meta.main) {
    const manifest = new Manifest()

    for (const task of nukeTasksBuild()) {
        manifest.register(task)
    }

    for (const task of dust2TasksBuild()) {
        manifest.register(task)
    }

    for (const task of blockfortTasksBuild()) {
        manifest.register(task)
    }

    for (const task of dekutreeTasksBuild()) {
        manifest.register(task)
    }

    for (const task of hangarTasksBuild()) {
        manifest.register(task)
    }

    await manifest.compile().buildAll()
}
