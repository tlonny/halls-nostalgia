const SRC_DIR = "asset/hangar"
const DST_DIR = "dist/hangar"

const MATERIAL_FILENAMES = [
    "BIGDOOR2.PNG",
    "BIGDOOR4.PNG",
    "BRNBIGC.PNG",
    "BRNBIGL.PNG",
    "BRNBIGR.PNG",
    "BROWN1.PNG",
    "BROWN144.PNG",
    "BROWN96.PNG",
    "BROWNGRN.PNG",
    "CEIL3_5.PNG",
    "CEIL5_1.PNG",
    "CEIL5_2.PNG",
    "COMPSPAN.PNG",
    "COMPTALL.PNG",
    "COMPTILE.PNG",
    "COMPUTE2.PNG",
    "COMPUTE3.PNG",
    "DOOR3.PNG",
    "DOORSTOP.PNG",
    "DOORTRAK.PNG",
    "EXITDOOR.PNG",
    "EXITSIGN.PNG",
    "FLAT14.PNG",
    "FLAT18.PNG",
    "FLAT20.PNG",
    "FLAT23.PNG",
    "FLAT5_5.PNG",
    "FLOOR1_1.PNG",
    "FLOOR4_8.PNG",
    "FLOOR5_1.PNG",
    "FLOOR5_2.PNG",
    "FLOOR6_2.PNG",
    "FLOOR7_1.PNG",
    "FLOOR7_2.PNG",
    "F_SKY1.PNG",
    "LITE3.PNG",
    "NUKAGE3.PNG",
    "NUKE24.PNG",
    "PLANET1.PNG",
    "SLADWALL.PNG",
    "STARG3.PNG",
    "STARGR1.PNG",
    "STARTAN1.PNG",
    "STARTAN3.PNG",
    "STEP1.PNG",
    "STEP2.PNG",
    "STEP6.PNG",
    "SUPPORT2.PNG",
    "SW1COMP.PNG",
    "SW1STRTN.PNG",
    "TEKWALL1.PNG",
    "TEKWALL4.PNG",
    "TLITE6_1.PNG",
    "TLITE6_4.PNG",
    "TLITE6_5.PNG",
    "TLITE6_6.PNG",
] as const

export type MaterialDefinition = {
    textureSrc: string
    textureDst: string
    materialName: string
}

export const HANGAR_MATERIAL_DEFINITIONS: readonly MaterialDefinition[] = MATERIAL_FILENAMES.map(
    (filename) => ({
        textureSrc: `${SRC_DIR}/${filename}`,
        textureDst: `${DST_DIR}/${filename}`,
        materialName: filename.slice(0, -4),
    }),
)
