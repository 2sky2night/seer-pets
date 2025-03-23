import { pets as AllPets } from "../assets/pets.json";
import { type ISearchField } from "../components/PetsSearchForm";
import type { IOrder, IPets } from "../types";

/** 获取精灵根据 id 排序 */
export function getPetsOrderById(type: IOrder) {
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

/** 获取精灵 */
export function fetchPets(
  params: ISearchField & { page: number; pageSize: number },
) {
  const { idOrder, page, pageSize, keywords = "" } = params;
  const result = getPetsOrderByIdCache(idOrder).filter((pet) => {
    return pet.name.includes(keywords);
  });
  const start = (page - 1) * pageSize;
  const end = page * pageSize;
  const hasMore = end > result.length;
  return {
    list: result.slice(start, end),
    hasMore,
    total: result.length,
  };
}
