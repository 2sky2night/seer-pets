import { attributes as allAttr } from "../../../assets/attributes.json";
import { PetsAttrEnum } from "../../../constants";

type IAttrList = typeof allAttr;

/** 获取精灵属性图鉴 */
function getPetsAttributes() {
  const sigleAttrList: IAttrList = [];
  const doubleAttrList: IAttrList = [];
  const tempListMap = {
    [PetsAttrEnum.singleAttribute]: sigleAttrList,
    [PetsAttrEnum.doubleAttributes]: doubleAttrList,
  };
  for (let index = 0; index < allAttr.length; index++) {
    const element = allAttr[index];
    const list: IAttrList = Reflect.get(tempListMap, element.attributeType);
    if (list) {
      list.push(element);
      continue;
    }
    console.error("fetchPetsAttributes:某个属性被过滤掉了", { element });
  }
  return {
    sigleAttrList,
    doubleAttrList,
    rawList: allAttr,
  };
}

/** 获取精灵属性图鉴（内存缓存） */
export function getPetsAttributesByCache() {
  let cache: ReturnType<typeof getPetsAttributes> | null = null;
  if (!cache) {
    cache = getPetsAttributes();
  }
  return cache;
}
