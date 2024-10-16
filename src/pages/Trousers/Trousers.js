import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProductApi from "../../api/productApi";
const Troursers = () => {
  const [productList, setProductList] = useState([]);
  const [sortBy, setSortBy] = useState(""); // Khởi tạo state để lưu trữ sắp xếp sản phẩm theo giá

  const fetchProductList = async () => {
    try {
      const response = await ProductApi.getAll();
      setProductList(response);
      console.log(response);
    } catch (error) {
      console.log("fail", error);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  // Hàm xử lý sự kiện cho button "Tăng dần"
  const handleSortAsc = () => {
    setSortBy("asc"); // Đặt state sắp xếp là "asc"
    setProductList((prevList) =>
      [...prevList].sort((a, b) => a.price - b.price)
    ); // Sắp xếp danh sách sản phẩm theo giá tăng dần
  };

  // Hàm xử lý sự kiện cho button "Giảm dần"
  const handleSortDesc = () => {
    setSortBy("desc"); // Đặt state sắp xếp là "desc"
    setProductList((prevList) =>
      [...prevList].sort((a, b) => b.price - a.price)
    ); // Sắp xếp danh sách sản phẩm theo giá giảm dần
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          display: "flex",
          justifyContent: "end",
          marginTop: "45px",
          marginRight: "344px",
        }}
      >
        {/* Thêm 2 button để sắp xếp sản phẩm */}
        <div style={{ display: "flex", gap: "2rem" }}>
          <button className="buttonprice" onClick={handleSortAsc}>
            Giá: Tăng dần
          </button>

          <button className="buttonprice" onClick={handleSortDesc}>
            Giá: Giảm dần
          </button>
        </div>
      </div>
      <div
        style={{
          float: "left",
          width: "292px",
          padding: "20px",
          marginTop: "60px",
          marginLeft: "70px",
        }}
      >
        <span className="span-text">
          <h2 className="h4-text">Danh mục sản phẩm</h2>
        </span>
        <div className="assit-content">
          <NavLink className="navlink-sidebar" to="/shirt">
            Áo
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="/trouser">
            Quần
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="/shoes">
            Giày
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="/lakstudio">
            LakStudio
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="/bag">
            Túi
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="/glasses">
            Kính
          </NavLink>
          <br />
          <NavLink className="navlink-sidebar" to="accessory"></NavLink>
        </div>
        <span className="span-text">
          <h2 className="h4-text">Thương hiệu</h2>
          <h4 className="navlink-sidebar">LakShop</h4>

          <h4 className="navlink-sidebar">Guci</h4>

          <h4 className="navlink-sidebar">Fendi</h4>

          <h4 className="navlink-sidebar">Prada</h4>

          <h4 className="navlink-sidebar">Louis vuitton</h4>
        </span>
        <br />
        <br />
        <span className="span-text mt-16">
          <h2 className="h4-text">About LakShop</h2>
          <h4 className="navlink-sidebar">LakShop có từ đâu </h4>

          <h4 className="navlink-sidebar">Địa chỉ</h4>

          <h4 className="navlink-sidebar">Liên hệ</h4>

          <h4 className="navlink-sidebar">Blog</h4>
        </span>
      </div>
      <div
        style={{
          marginLeft: "200px",
          backgroundColor: "#fff",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{ marginLeft: "-202px", width: "1145px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 imgbox"
        >
          {productList.slice(13, 25).map((product) => (
            <div key={product.id} className="col-span-1 w-h py-16 ml-28">
              <NavLink to={`/products/${product.id}`}>
                <div className="h-full  rounded-lg overflow-hidden boximg">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center transition duration-800 ease-out imgproduct"
                    src={product.imgUrl}
                    alt={product.name}
                  />
                  <div className="mt-5 box-2">
                    <h1 className="title-font text-lg  text-gray-900 mb-3 textdes">
                      {product.name}
                    </h1>
                    <p className="leading-relaxed mb-3 textprice text-red-600">
                      {product.price.toLocaleString("vi-VN")} ₫
                    </p>
                  </div>
                </div>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Troursers;
