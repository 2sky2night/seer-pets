import { pets as AllPets } from "../../../assets/pets.json";
import type { IOrder, IPets } from "../../../types";

/** 获取精灵根据 id 排序 */
function getPetsOrderById(type: IOrder) {
  return [...AllPets].sort((aPets, bPets) => {
    const aId = Number(aPets.id);
    const bId = Number(bPets.id);
    if (type === "asc") {
      return aId - bId;
    } else {
      return bId - aId;
    }
  });
}

/** 获取精灵根据 id 排序 */
export const getPetsOrderByIdCache = (() => {
  const orderResult: Record<IOrder, IPets | null> = {
    asc: null,
    des: null,
  };
  return (type: IOrder) => {
    if (orderResult[type] === null) {
      orderResult[type] = getPetsOrderById(type);
    }
    return orderResult[type];
  };
})();
