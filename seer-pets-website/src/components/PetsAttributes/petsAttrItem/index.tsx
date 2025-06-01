import type { FC } from "react";
import styles from "./index.module.less";

interface IProps {
  imgSrc: string;
  name: string;
}

export const PetsAttrItem: FC<IProps> = (props) => {
  return (
    <div className={styles.attrSelectionItem}>
      <img className={styles.attrIcon} src={props.imgSrc}></img>
      <span>{props.name}</span>
    </div>
  );
};
