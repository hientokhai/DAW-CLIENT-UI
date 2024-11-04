import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Des.css";
import ProductApi from "../../api/productApi";

export default function DescriptionProduct() {
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
        <strong className="p-textsize"> Mô tả chi tiết </strong>
        <div style={{ textAlign: 'left', padding: "0 170px" }}>
          <strong>Chất liệu Double Face - Interlock CVC kết hợp giữa cotton và polyester, mang lại sự mềm mại, thoáng mát và giữ form tốt. Vải được dệt công nghệ Interlock giúp hạn chế nhăn và chống xù lông, bền bỉ theo thời gian.
            <br />
            Form dáng Regular không quá ôm sát, tôn lên vẻ nam tính mà vẫn giữ được sự thoải mái. Thiết kế này phù hợp với nhiều vóc dáng, đảm bảo sự cân đối và lịch lãm cho người mặc.
            <br />
            Phần vai áo được nhấn nhá với chi tiết in cao "ICONDENIM ORGNLS" dọc theo đường nối, tạo điểm nhấn đầy tinh tế. Cổ áo được dệt sọc ngang to bản, mang lại sự khác biệt và phong cách nổi bật nhưng không quá phô trương.</strong>
        </div>
      </p>
      {/* <div className="imgdes">
        <img style={{ width: "100%" }} src={product.imgUrl} alt={product.name} />
      </div> */}
    </div>
  );
}
