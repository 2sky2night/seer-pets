import { memo, useRef } from "react";
import type { FC } from "react";
import { fetchPetsAttributes } from "../../models/pets-attributes";
import { Select } from "antd";
import { PetsAttrItem } from "./petsAttrItem";

interface IProps {
  /** 表单更新 */
  onChange?: (value: string) => void;
}

const allAttributes = fetchPetsAttributes();

const PetsAttributesInner: FC<IProps> = (props) => {
  const attrList = useRef(allAttributes);

  return (
    <Select
      showSearch
      defaultValue=""
      onChange={props.onChange}
      style={{ width: 150 }}
      options={[
        {
          label: <span>单属性</span>,
          options: attrList.current.sigleAttrList.map((item) => {
            return {
              label: <PetsAttrItem {...item} />,
              value: item.name,
            };
          }),
        },
        {
          label: <span>双属性</span>,
          options: attrList.current.doubleAttrList.map((item) => {
            return {
              label: <PetsAttrItem {...item} />,
              value: item.name,
            };
          }),
        },
      ]}
    ></Select>
  );
};

export const PetsAttributes = memo(PetsAttributesInner);
