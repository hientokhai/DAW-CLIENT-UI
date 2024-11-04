import React from "react";
import DescriptionProduct from "../DescriptionProduct/DescriptionProduct";
import ProductNew from "../ProductNew/ProductNew";
import { Tabs } from "antd";
import './detailproduct.css'
import Specification from "../Specification/Specification";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: `Mô tả sản phẩm`,
    children: <DescriptionProduct />,
  },
  {
    key: "2",
    label: `Thông số kỹ thuật`,
    children: <Specification />,
  },
  {
    key: "3",
    label: `Sản phẩm mới về`,
    children: <ProductNew />,
  },
];
const App = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default App;
