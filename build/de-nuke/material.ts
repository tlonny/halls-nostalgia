const SRC_DIR = "asset/de_nuke"
const DST_DIR = "dist/de_nuke"
const MATERIAL_FIRST_INDEX = 0
const MATERIAL_LAST_INDEX = 123

export type MaterialDefinition = {
    textureSrc: string
    textureDst: string
    materialName: string
}

export const NUKE_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = Array.from(
    { length: MATERIAL_LAST_INDEX - MATERIAL_FIRST_INDEX + 1 },
    (_, offset) => {
        const index = MATERIAL_FIRST_INDEX + offset
        const filename = `Nuke_material_${index}.png`
        return {
            textureSrc: `${SRC_DIR}/${filename}`,
            textureDst: `${DST_DIR}/${filename}`,
            materialName: `material_${index}`,
        }
    },
)
