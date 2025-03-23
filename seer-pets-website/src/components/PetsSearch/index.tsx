import PetsSearchForm, { type ISearchField } from "../PetsSearchForm";
import { useEffect, useState, type FC } from "react";
import styles from "./index.module.less";
import { fetchPets } from "../../models";
import Pet from "../Pet";
import { IPets } from "../../types";
import { Card, Pagination } from "antd";

const PetsSearch: FC = () => {
  const [total, setTotal] = useState(0);
  const [searchForm, setSearchForm] = useState<Parameters<typeof fetchPets>[0]>(
    {
      idOrder: "asc",
      page: 1,
      pageSize: 30,
    },
  );
  const [pets, setPets] = useState<IPets>([]);

  const handleSearchSubmit = (form: ISearchField) => {
    setSearchForm({
      ...searchForm,
      page: 1, // 页码置为1
      idOrder: form.idOrder,
    });
  };
  const handlePageChange = (page: number) => {
    // TODO 分页器有问题，onChange无法区分到底是因为页码更新还是页长度更新，先把切换页长度下掉
    setSearchForm({
      ...searchForm,
      page,
    });
  };
  const handlePageSizeChange = (_: number, pageSize: number) => {
    setSearchForm((data) => Object.assign(data, { pageSize, page: 1 }));
  };
  const handleFetch = () => {
    const result = fetchPets({
      ...searchForm,
    });
    setPets(result.list);
    setTotal(result.total);
  };

  useEffect(() => {
    handleFetch();
  }, [searchForm]);

  return (
    <div className={styles.petsSearchContainer}>
      <PetsSearchForm onFinish={handleSearchSubmit}></PetsSearchForm>
      <Card>
        <div className={styles.petsList}>
          {pets.map((pet) => (
            <Pet key={pet.detailUrl} {...pet} />
          ))}
        </div>
        <div className={styles.petsPagenation}>
          <Pagination
            size="small"
            current={searchForm.page}
            pageSize={searchForm.pageSize}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 30, 50, 100]}
            showSizeChanger={false}
            total={total}
          />
        </div>
      </Card>
    </div>
  );
};

export default PetsSearch;
