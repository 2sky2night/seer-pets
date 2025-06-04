import type { FC, PropsWithChildren } from "react";
import styles from "./index.module.less";
import { timestamp } from "../assets/pets.json";
import dayjs from "dayjs";

const updateTime = timestamp
  ? dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")
  : "未知";

const Layouts: FC<PropsWithChildren> = (props) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img className={styles.logo} src="/public/seer-logo.jpg"></img>
        <div className={styles.tips}>数据更新时间：{updateTime}</div>
      </header>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layouts;
