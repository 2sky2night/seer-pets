import { memo } from "react";
import type { FC } from "react";
import { Button, Card, Form, Input, Select, Space } from "antd";
import styles from "./index.module.less";
import type { IOrder } from "../../types";
import { PetsAttributes } from "../PetsAttributes";

export type ISearchField = {
  /** id 排序 */
  idOrder: IOrder;
  /** 搜索关键词 */
  keywords: string;
  /** 精灵属性 */
  attributes: string;
};

interface IProps {
  /** 提交搜索 */
  onFinish: (form: ISearchField) => void;
  /** 重置搜索 */
  onReset: () => void;
}

/** 精灵搜索组件 */
const PetsSearchFormInner: FC<IProps> = (props) => {
  const onFinish = (formData: ISearchField) => {
    console.log("PetsSearchForm>onFinish:表单提交数据", { formData });
    props.onFinish?.(formData);
  };
  const onReset = () => {
    props.onReset?.();
  };
  return (
    <div className={styles.petsSearchForm}>
      <Card>
        <Form
          layout="inline"
          initialValues={{ idOrder: "asc", keywords: "" }}
          onFinish={onFinish}
          onReset={onReset}
        >
          <Form.Item label="id排序" name="idOrder">
            <Select>
              <Select.Option value="asc">升序</Select.Option>
              <Select.Option value="des">降序</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="属性" name="attributes">
            <PetsAttributes />
          </Form.Item>
          <Form.Item tooltip="仅限关键字搜索" label="精灵名称" name="keywords">
            <Input></Input>
          </Form.Item>
          <div className={styles.submitAction}>
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button type="default" htmlType="reset">
                重置
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default memo(PetsSearchFormInner);
