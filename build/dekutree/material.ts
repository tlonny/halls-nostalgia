const SRC_DIR = "asset/dekutree"
const DST_DIR = "dist/dekutree"

export type MaterialDefinition = {
    textureSrc: string
    textureDst: string
    materialName: string
}

const MATERIAL_TEXTURES = [
    ["Material.011_22A2901B_c.bmp", "treestop.png"],
    ["Material.011_308C80FE_c.bmp", "leaves.png"],
    ["Material.011_5381C1FC_c.bmp", "ground.png"],
    ["Material.011_59EAE89F_c.bmp", "deku tree skin.png"],
    ["Material.011_5E5D2C5B_c.bmp", "Wall.png"],
    ["Material.011_5FDEFAE8_c.bmp", "treesbottom.png"],
    ["Material.011_mustache_and_eyebrows", "mustache and eyebrows.png"],
    ["Material__340", "moon/4AF31E27_c.png"],
    ["Material__341", "moon/4D41A950_c.png"],
    ["Material__342", "moon/706120E1_c.png"],
    ["Material__345", "moon/AF6C35E_c.png"],
] as const

export const DEKUTREE_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = MATERIAL_TEXTURES.map(
    ([materialName, texturePath]) => ({
        textureSrc: `${SRC_DIR}/${texturePath}`,
        textureDst: `${DST_DIR}/${texturePath}`,
        materialName,
    }),
)
