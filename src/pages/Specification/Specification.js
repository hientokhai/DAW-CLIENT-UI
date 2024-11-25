import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./specification.css";
import ProductApi from "../../api/productApi";
import { Helmet } from 'react-helmet';
export default function Specification() {
  const { id } = useParams();
  const [sizes, setSizes] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await ProductApi.get(id);
      const data = response.data;
      setSizes(data.sizes);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!sizes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content">
      <p className="p-textsize">
        <strong className="p-textsize"> Kích thước chi tiết </strong>
        {sizes.map((size) => {
          return (<div>
            <strong className="strongsize">
              {" "}
              Size {size.size_name} : {size.description}
            </strong>
          </div>)
        })}
      </p>
    </div>
  );
}
