import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Des.css";
import ProductApi from "../../api/productApi";

export default function DescriptionProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await ProductApi.get(id);
      const productData = response.data;
      setProduct(productData.product);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content">
      <p className="p-textsize">
        <strong className="p-textsize"> Mô tả chi tiết </strong>
        <div style={{ textAlign: 'left', padding: "0 170px" }}>
          {product.description}
        </div>
      </p>
    </div>
  );
}
