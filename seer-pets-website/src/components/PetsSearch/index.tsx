import { useEffect, useRef, useState, type FC } from "react";
import styles from "./index.module.css";

import { pets as AllPets } from "../../assets/pets.json";
import { debounce } from "lodash";
import Pet from "../Pet";

const pageSize = 80;
const hh = 50;

const PetsSearch: FC = () => {
  const [pets, setPets] = useState(AllPets.splice(0, pageSize));
  const [page, setPages] = useState(1);
  const hasMore = useRef(true);

  function loadMore() {
    if (!hasMore.current) return;
    const nowPage = page + 1;
    const start = (nowPage - 1) * pageSize;
    const end = nowPage * pageSize;
    const result = AllPets.splice(start, end);
    hasMore.current = end < AllPets.length;
    setPets((data) => [...data, ...result]);
    setPages(nowPage);
  }
  useEffect(() => {
    const loadMoreDb = debounce(() => {
      if (
        document.documentElement.scrollTop + window.innerHeight + hh >=
        document.body.scrollHeight
      ) {
        loadMore();
      }
    }, 50);
    globalThis.addEventListener("scroll", loadMoreDb);
    return () => {
      globalThis.removeEventListener("scroll", loadMoreDb);
    };
  }, []);
  return (
    <>
      <div className={styles.petsContainer}>
        {pets.map((pet) => (
          <Pet {...pet} key={pet.id} />
        ))}
      </div>
    </>
  );
};

export default PetsSearch;
