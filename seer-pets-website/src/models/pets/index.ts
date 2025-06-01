import type { ISearchField } from "../../components/PetsSearchForm";
import { getPetsOrderByIdCache } from "./utils";

/** 获取精灵 */
export function fetchPets(
  params: ISearchField & { page: number; pageSize: number },
) {
  const { idOrder, page, pageSize, keywords = "", attributes = "" } = params;
  const result = getPetsOrderByIdCache(idOrder).filter((pet) => {
    return (
      pet.name.includes(keywords) &&
      (!attributes || pet.attribute === attributes)
    );
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
