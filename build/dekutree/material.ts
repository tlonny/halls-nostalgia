const SRC_DIR = "asset/dekutree"
const DST_DIR = "dist/dekutree"

export type MaterialDefinition = {
    textureSrc: string
    textureDst: string
    materialName: string
}

export const DEKUTREE_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = [
    {
        textureSrc: `${SRC_DIR}/treestop.png`,
        textureDst: `${DST_DIR}/treestop.png`,
        materialName: "Material.011_22A2901B_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/leaves.png`,
        textureDst: `${DST_DIR}/leaves.png`,
        materialName: "Material.011_308C80FE_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/ground.png`,
        textureDst: `${DST_DIR}/ground.png`,
        materialName: "Material.011_5381C1FC_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/deku tree skin.png`,
        textureDst: `${DST_DIR}/deku tree skin.png`,
        materialName: "Material.011_59EAE89F_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/Wall.png`,
        textureDst: `${DST_DIR}/Wall.png`,
        materialName: "Material.011_5E5D2C5B_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/treesbottom.png`,
        textureDst: `${DST_DIR}/treesbottom.png`,
        materialName: "Material.011_5FDEFAE8_c.bmp",
    },
    {
        textureSrc: `${SRC_DIR}/mustache and eyebrows.png`,
        textureDst: `${DST_DIR}/mustache and eyebrows.png`,
        materialName: "Material.011_mustache_and_eyebrows",
    },
]
