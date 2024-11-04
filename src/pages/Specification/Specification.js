import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./specification.css";
import ProductApi from "../../api/productApi";

export default function Specification() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductApi.get(id);
        setProduct(response);
        console.log(response);
      } catch (error) {
        console.log("fail", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tab-content">
      <p className="p-textsize">
        <strong className="p-textsize"> Kích thước chi tiết </strong>
        <div>
          <strong className="strongsize">
            {" "}
            Size 1/S : Dài : 70 cm / Vòng Thân : 98 cm / Vai : 43
          </strong>
        </div>
        <div>
          <strong className="strongsize">
            {" "}
            Size 2/M : Dài : 72 cm / Vòng Thân : 104 cm / Vai : 44{" "}
          </strong>
        </div>
        <div>
          <strong className="strongsize">
            {" "}
            Size 3/L : Dài : 74 cm / Vòng Thân: 108 cm / Vai : 45{" "}
          </strong>
        </div>
        <div>
          <strong className="strongsize">
            {" "}
            Size 4/XL : Dài : 76 cm / Vòng Thân : 112 cm / Vai : 46{" "}
          </strong>
        </div>
      </p>
    </div>
  );
}
