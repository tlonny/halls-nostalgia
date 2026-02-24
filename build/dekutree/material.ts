const SRC_DIR = "asset/dekutree"
const DST_DIR = "dist/dekutree"

export type TextureDefinition = {
    textureSrc: string
    textureDst: string
}

export type MaterialDefinition = {
    textureDst: string
    materialName: string
}

export const DEKUTREE_TEXTURE_DEFINITIONS: readonly TextureDefinition[] = [
    {
        textureSrc: `${SRC_DIR}/treestop.png`,
        textureDst: `${DST_DIR}/treestop.png`,
    },
    {
        textureSrc: `${SRC_DIR}/leaves.png`,
        textureDst: `${DST_DIR}/leaves.png`,
    },
    {
        textureSrc: `${SRC_DIR}/ground.png`,
        textureDst: `${DST_DIR}/ground.png`,
    },
    {
        textureSrc: `${SRC_DIR}/deku tree skin.png`,
        textureDst: `${DST_DIR}/deku tree skin.png`,
    },
    {
        textureSrc: `${SRC_DIR}/Wall.png`,
        textureDst: `${DST_DIR}/Wall.png`,
    },
    {
        textureSrc: `${SRC_DIR}/treesbottom.png`,
        textureDst: `${DST_DIR}/treesbottom.png`,
    },
    {
        textureSrc: `${SRC_DIR}/mustache and eyebrows.png`,
        textureDst: `${DST_DIR}/mustache and eyebrows.png`,
    },
]

export const DEKUTREE_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = [
    {
        textureDst: `${DST_DIR}/treestop.png`,
        materialName: "Material.011_22A2901B_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/leaves.png`,
        materialName: "Material.011_308C80FE_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/ground.png`,
        materialName: "Material.011_5381C1FC_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/deku tree skin.png`,
        materialName: "Material.011_59EAE89F_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/deku tree skin.png`,
        materialName: "Material.011_59FC0537_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/Wall.png`,
        materialName: "Material.011_5E5D2C5B_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/treesbottom.png`,
        materialName: "Material.011_5FDEFAE8_c.bmp",
    },
    {
        textureDst: `${DST_DIR}/mustache and eyebrows.png`,
        materialName: "Material.011_mustache_and_eyebrows",
    },
]
