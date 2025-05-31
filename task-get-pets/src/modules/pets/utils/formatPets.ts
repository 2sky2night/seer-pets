import { toChineseWords } from "../../../utils";
import type { IPet, IPetsRaw } from "../../../types";

/** 整理精灵数据 */
export function formatPets(petData: IPetsRaw): IPet[] {
  return petData.map(
    ([
      name,
      detailUrl,
      img,
      detailId,
      keywords,
      id,
      attribute,
      proprietarySkill,
      source,
      raceValue,
    ]) => {
      return {
        name: toChineseWords(name),
        detailUrl,
        img,
        detailId,
        keywords,
        id,
        attribute,
        proprietarySkill,
        source,
        raceValue,
      };
    },
  );
}
