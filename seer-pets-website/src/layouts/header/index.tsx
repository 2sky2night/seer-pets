import { useState, type FC } from "react";
import styles from "./index.module.less";
import { timestamp } from "../../assets/pets.json";
import dayjs from "dayjs";
import { Modal } from "antd";
import seerLogoUrl from "../../assets/seer-logo.jpg";

/** 上一次更新时间 */
const updateTime = timestamp
  ? dayjs(timestamp).format("YYYY-MM-DD HH:mm")
  : "未知";

const Header: FC = () => {
  const [visible, setVisible] = useState(false);
  const handleCloseModal = () => setVisible(false);
  const handleShowModal = () => setVisible(true);

  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={seerLogoUrl}></img>
        <div className={styles.tips}>
          <span className={styles.about} onClick={handleShowModal}>
            关于
          </span>
          <div>数据更新时间：{updateTime}</div>
        </div>
      </header>
      <Modal
        title="关于"
        open={visible}
        footer={null}
        width="50vh"
        onCancel={handleCloseModal}
      >
        <p>一个赛尔号精灵图鉴网页，支持：</p>
        <ul style={{ marginLeft: "20px" }}>
          <li>精灵id排序</li>
          <li>关键词搜索</li>
          <li>属性筛选</li>
        </ul>
        <p style={{ margin: "20px 0" }}>
          如有侵权等其他问题，请联系邮箱 1301680879@qq.com 删除😊
        </p>
        <a href="https://github.com/2sky2night/seer-pets" target="_blank">
          Github上查看
        </a>
      </Modal>
    </>
  );
};

export default Header;
