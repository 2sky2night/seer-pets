import type {FC} from "react";
import type{ IPet } from "../../types";
import styles from './index.module.css'
import LazyImg from "../LazyImg";

const Pet:FC<IPet> = (props)=>{
  const {detailUrl,img,name} = props||{};
  return  <a href={detailUrl} target="__blank"  className={styles.petContainer}>
      <LazyImg className={styles.petPhoto} src={img} alt={`精灵:${name}的图片`} />
      <div className={styles.petName} title={name}>{name}</div>
    </a>
}

export default Pet;