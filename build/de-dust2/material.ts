const SRC_DIR = "asset/de_dust2"
const DST_DIR = "dist/de_dust2"
const MATERIAL_FIRST_INDEX = 0
const MATERIAL_LAST_INDEX = 33
const DE_NUKE_MATERIAL_0_SRC_PATH = "asset/de_nuke/Nuke_material_0.png"

export type MaterialDefinition = {
    textureSrc: string
    textureDst: string
    materialName: string
}

export const DUST2_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = [
    ...Array.from(
        { length: MATERIAL_LAST_INDEX - MATERIAL_FIRST_INDEX + 1 },
        (_, offset) => {
            const index = MATERIAL_FIRST_INDEX + offset
            const filename = `Dust2_material_${index}.png`
            return {
                textureSrc: `${SRC_DIR}/${filename}`,
                textureDst: `${DST_DIR}/${filename}`,
                materialName: `material_${index}`,
            }
        },
    ),
    {
        textureSrc: DE_NUKE_MATERIAL_0_SRC_PATH,
        textureDst: `${DST_DIR}/de_nuke_material_0.png`,
        materialName: "de_nuke_material_0",
    },
]
