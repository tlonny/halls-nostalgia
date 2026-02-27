import { relative } from "node:path"
import { blockfortTasksBuild } from "@build/blockfort"
import { BLOCKFORT_MANIFEST_PATH } from "@build/blockfort/constant"
import { dekutreeTasksBuild } from "@build/dekutree"
import { DEKUTREE_MANIFEST_PATH } from "@build/dekutree/constant"
import { dust2TasksBuild } from "@build/de-dust2"
import { DUST2_MANIFEST_PATH } from "@build/de-dust2/constant"
import { hangarTasksBuild } from "@build/hangar"
import { HANGAR_MANIFEST_PATH } from "@build/hangar/constant"
import { nukeTasksBuild } from "@build/de-nuke"
import { NUKE_MANIFEST_PATH } from "@build/de-nuke/constant"
import { HTMLDocument, NodeElement, NodeText } from "htmlforge"
import { Manifest } from "makeboy"

const LEVEL_MANIFEST_PATHS = [
    NUKE_MANIFEST_PATH,
    DUST2_MANIFEST_PATH,
    BLOCKFORT_MANIFEST_PATH,
    DEKUTREE_MANIFEST_PATH,
    HANGAR_MANIFEST_PATH,
]
const DIST_PATH = "dist"
const INDEX_HTML_OUTPUT_PATH = "dist/index.html"

const levelsIndexHtmlBuild = (): string => {
    const html = new HTMLDocument().attributeAdd("lang", "en")

    html.head
        .childAdd(new NodeElement("meta").attributeAdd("charset", "utf-8"))
        .childAdd(new NodeElement("title").childAdd(new NodeText("halls-nostalgia levels")))

    const list = new NodeElement("ul")
    for (const manifestPath of LEVEL_MANIFEST_PATHS) {
        const manifestUrl = relative(DIST_PATH, manifestPath).replaceAll("\\", "/")
        list.childAdd(
            new NodeElement("li")
                .childAdd(
                    new NodeElement("a")
                        .attributeAdd("href", manifestUrl)
                        .childAdd(new NodeText(manifestUrl))
                )
        )
    }

    html.body.childAdd(list)

    return html.toString()
}

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
    await Bun.write(INDEX_HTML_OUTPUT_PATH, levelsIndexHtmlBuild())
}
