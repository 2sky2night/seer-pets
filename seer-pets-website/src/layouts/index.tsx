import type { FC, PropsWithChildren } from "react";
import styles from "./index.module.less";
import Header from "./header";

const Layouts: FC<PropsWithChildren> = (props) => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layouts;
