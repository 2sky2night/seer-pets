import PetsSearchForm, { type ISearchField } from "../PetsSearchForm";
import { useEffect, useState, type FC } from "react";
import styles from "./index.module.less";
import { fetchPets } from "../../models";
import Pet from "../Pet";
import { IPets } from "../../types";
import { Card, Empty, Pagination } from "antd";

const PetsSearch: FC = () => {
  const [total, setTotal] = useState(0);
  const [searchForm, setSearchForm] = useState<Parameters<typeof fetchPets>[0]>(
    {
      idOrder: "asc",
      page: 1,
      pageSize: 30,
      keywords: "",
    },
  );
  const [pets, setPets] = useState<IPets>([]);

  const handleSearchSubmit = (form: ISearchField) => {
    setSearchForm({
      ...searchForm,
      page: 1, // 页码置为1
      idOrder: form.idOrder,
      keywords: form.keywords,
    });
  };
  const handlePageChange = (page: number, updatePageSize: number) => {
    if (updatePageSize !== searchForm.pageSize) {
      // 页长度更新
      setSearchForm({
        ...searchForm,
        page: 1,
        pageSize: updatePageSize,
      });
    } else {
      // 页码更新
      setSearchForm({
        ...searchForm,
        page,
      });
    }
  };
  const handleFetch = () => {
    const result = fetchPets({
      ...searchForm,
    });
    setPets(result.list);
    setTotal(result.total);
  };
  const handleSearchReset = () => {
    setSearchForm({
      idOrder: "asc",
      page: 1,
      pageSize: 30,
      keywords: "",
    });
  };

  useEffect(() => {
    handleFetch();
  }, [searchForm]);

  return (
    <div className={styles.petsSearchContainer}>
      <PetsSearchForm
        onFinish={handleSearchSubmit}
        onReset={handleSearchReset}
      />
      <Card>
        {pets.length ? (
          <div className={styles.petsList}>
            {pets.map((pet) => (
              <div key={pet.detailUrl} className={styles.petCard}>
                <Pet {...pet} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.petsResultEmpty}>
            <Empty description="暂无数据"></Empty>
          </div>
        )}
        <div className={styles.petsPagenation}>
          <Pagination
            size="small"
            current={searchForm.page}
            pageSize={searchForm.pageSize}
            onChange={handlePageChange}
            pageSizeOptions={[10, 30, 50, 100]}
            total={total}
            showTotal={(count) => `共 ${count} 项`}
          />
        </div>
      </Card>
    </div>
  );
};

export default PetsSearch;
