import { useNavigate, useParams } from "react-router-dom";
import ProductApi from "../../api/productApi";
import { useEffect, useState } from "react";
import "./product.css";
import { IoIosHeart } from "react-icons/io";
import DetailProduct from "../DetailProduct/DetailProduct";
import Review from "../Review/Review";

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]); // danh sách các sản phẩm trong giỏ hàng
  const navigate = useNavigate();
  const buttons = document.querySelectorAll(".product-variation");

  const [selectedSize, setSelectedSize] = useState("S"); // default value is "S"

  // color
  const [selectedColor, setSelectedColor] = useState('');

  const colors = ['#D9C8C7', '#000000', '#A1CDF1'];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      button.classList.add("active");
    });
  });

  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await ProductApi.get(id);
      setProduct(response);
    } catch (error) {
      console.log("fail", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  function addToCart() {
    const item = {
      ...product,
      size: selectedSize,
      quantity,
    };

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );

    if (existingItem) {
      // Nếu đã có sản phẩm trong giỏ hàng, tăng số lượng lên 1
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === existingItem.id && cartItem.size === existingItem.size
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
      setCart([...cart, item]);
    }

    setSelectedSize("S"); // reset the selected size to the default
    navigate("/cart");

    // Lưu thông tin giỏ hàng vào localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIndex = savedCart.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );
    if (cartIndex >= 0) {
      savedCart[cartIndex].quantity += quantity;
    } else {
      savedCart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(savedCart));
  }

  function handleSizeSelection(size, newQuantity) {
    setSelectedSize(size);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && item.size === size) {
        // update the item's quantity if it's already in the cart
        return { ...item, quantity: newQuantity };
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  }

  const [mainImage, setMainImage] = useState('https://product.hstatic.net/1000360022/product/vo-nam-co-thap-ankle-socks-shoulder-the-strength__3__a50ca0c87b6a4e42a3dba5c36c803f1a_master.jpg');

  const thumbnails = [
    'https://product.hstatic.net/1000360022/product/vo-nam-co-thap-ankle-socks-shoulder-the-strength__3__a50ca0c87b6a4e42a3dba5c36c803f1a_master.jpg',
    'https://product.hstatic.net/1000360022/product/ao-polo-nam-hoa-tiet-in-phoi-vai-subtle-shoulder-form-regular__3__2a625c0c248c419ab5a7bec22b8dae35_master.jpg',
    'https://product.hstatic.net/1000360022/product/ao-polo-nam-hoa-tiet-in-phoi-vai-subtle-shoulder-form-regular__5__c7ae5dfeeffa45c29b273880b30ab1e2_master.jpg',
    'https://product.hstatic.net/1000360022/product/ao-polo-nam-hoa-tiet-in-phoi-vai-subtle-shoulder-form-regular__4__2a763297699f45b6bc0d11880c89896f_master.jpg',
  ];

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-page">
        <div className="product-gallery">
          <div className="thumbnail-container">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(thumbnail)}
              />
            ))}
          </div>
          <div className="main-image-container">
            <img src={mainImage} alt="Main Product" className="main-image" />
          </div>
        </div>

        <div className="product-details">
          <h3 className="name-product">{product.name}</h3>

          <div className="product-rating-detail">
            <span>4.8 ★</span>
            <span>| 485 (Đánh giá)</span>
            <span>| 599 (Đã thích)</span>
          </div>

          <p className="price-product">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
          <p className="product-status">
            Trạng thái :{" "}
            <span className="text-green-600 product-quantity">Hiện còn 187 sản phẩm tại cửa hàng</span>
          </p>

          <div className="size-container">
            <p>Kích thước:</p>
            <div class="flex items-center bR6mEk">
              <button
                class={`product-variation ${selectedSize === "S" ? "active" : ""
                  }`}
                data-value="S"
                onClick={() => handleSizeSelection("S")}
              >
                S
              </button>
              <button
                class={`product-variation ${selectedSize === "M" ? "active" : ""
                  }`}
                data-value="M"
                onClick={() => handleSizeSelection("M")}
              >
                M
              </button>
              <button
                class={`product-variation ${selectedSize === "L" ? "active" : ""
                  }`}
                data-value="L"
                onClick={() => handleSizeSelection("L")}
              >
                L
              </button>
              <button
                class={`product-variation ${selectedSize === "XL" ? "active" : ""
                  }`}
                data-value="XL"
                onClick={() => handleSizeSelection("XL")}
              >
                XL
              </button>
            </div>
          </div>

          {/* Màu sắc */}
          <p className="color-name">Màu sắc:</p>
          <div className="color-container">
            {colors.map((color) => (
              <div
                key={color}
                className={`color-item ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              ></div>
            ))}
          </div>


          <div className="quantity-and-buttons">
            <div className="quantity-container">
              <button
                className="quantity-button"
                onClick={handleDecrement}
              >
                -
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                className="quantity-input"
                min="1"
              />

              <button
                className="quantity-button"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>

            <div className="product-buttons">
              <button onClick={addToCart} className="add-to-cart">
                Thêm vào giỏ
              </button>
              <button onClick={toggleLike} className="add-to-wishlist">
                <i className="heart-icon">
                  <IoIosHeart className={isLiked ? "liked" : ""} />
                </i>
              </button>
            </div>
          </div>

          <button className="buy-product">
            Mua ngay
          </button>


        </div>
      </div>
      <DetailProduct />
      <Review />
    </div>
  );
};

export default Products;
