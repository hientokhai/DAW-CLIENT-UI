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
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorsOfSize, setColorsOfSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(""); // Ảnh chính
  const [isLiked, setIsLiked] = useState(false);
  const [selectedVariantQuantity, setSelectedVariantQuantity] = useState(0); // Lưu số lượng của biến thể hiện tại
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await ProductApi.get(id);
      const productData = response.data;

      setProduct(productData.product);
      setSizes(productData.sizes);
      setColors(productData.colors);
      setColorsOfSize(productData.colors);
      setMainImage(productData.product.images[0]);

      if (productData.sizes.length > 0) {
        setSelectedSize(productData.sizes[0].id);
      }

      if (productData.colors.length > 0) {
        setSelectedColor(productData.colors[0].id);
      }

    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
  };

  useEffect(() => {
    fetchProduct(); // Gọi API khi component mount
  }, [id]);

  useEffect(() => {
    // Cập nhật số lượng cho biến thể được chọn (size và color)
    if (product && selectedSize && selectedColor) {
      const selectedVariant = product.productVariants.find(
        (variant) =>
          variant.size_id === selectedSize && variant.color_id === selectedColor
      );
      setSelectedVariantQuantity(selectedVariant ? selectedVariant.quantity : 0);
    }
  }, [product, selectedSize, selectedColor]); // Chạy lại khi sản phẩm, size hoặc color thay đổi

  const getAvailableColorsForSize = (sizeId) => {
    // Lọc các màu sắc có sẵn cho size đã chọn
    const availableColors = product.productVariants
      .filter((variant) => variant.size_id === sizeId)  // Lọc biến thể theo size
      .map((variant) => variant.color_id);              // Lấy color_id của các biến thể đó;
    return availableColors;  // Trả về danh sách color_id có sẵn
  };

  useEffect(() => {
    if (selectedSize) {
      const availableColors = getAvailableColorsForSize(selectedSize);
      console.log('Available Colors for Size:', availableColors);
      if (availableColors.length > 0) {
        const copyColors = colors;
        setColorsOfSize(
          copyColors.filter((color) => availableColors.includes(color.id))
        );
      } else {
        setColorsOfSize([]);
      }

      // Kiểm tra lại xem màu đã chọn có hợp lệ không
      if (!availableColors.includes(selectedColor)) {
        setSelectedColor(availableColors[0]);
      }
    }
  }, [selectedSize]);

  const handleSizeSelection = (sizeId) => {
    console.log('Selected Size ID:', sizeId);
    setSelectedSize(sizeId);
  };


  const handleColorClick = (colorId) => {
    console.log('Selected Color ID:', colorId);
    setSelectedColor(colorId);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleIncrement = () => {
    if (quantity < selectedVariantQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Vui lòng chọn kích thước và màu sắc!");
      return;
    }

    const item = {
      ...product,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    const existingItem = cart.find(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );

    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === existingItem.id &&
          cartItem.size === existingItem.size &&
          cartItem.color === existingItem.color
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, item]);
    }

    // Lưu thông tin vào localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartIndex = savedCart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === item.size &&
        cartItem.color === item.color
    );
    if (cartIndex >= 0) {
      savedCart[cartIndex].quantity += quantity;
    } else {
      savedCart.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(savedCart));
    navigate("/cart");
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-page">
        <div className="product-gallery">
          <div className="thumbnail-container">
            {product.images.map((thumbnail, index) => (
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
            <span>{product.average_rating} ★</span>
            <span>| {product.total_reviews} (Đánh giá)</span>
            <span>| {product.total_likes} (Đã thích)</span>
          </div>

          <p className="price-product">
            {product.sel_price ? new Intl.NumberFormat("vi-VN").format(product.sel_price) + "₫" : "Đang cập nhật..."}
          </p>

          <p className="product-status">
            Trạng thái:{" "}
            <span className="text-green-600 product-quantity">
              Hiện còn {selectedVariantQuantity} sản phẩm tại cửa hàng
            </span>
          </p>

          <div className="size-container">
            <p>Kích thước:</p>
            <div className="flex items-center bR6mEk">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  className={`product-variation ${selectedSize === size.id ? "active" : ""}`}
                  data-value={size.size_name}
                  onClick={() => handleSizeSelection(size.id)}
                >
                  {size.size_name}
                </button>
              ))}
            </div>
          </div>

          <p className="color-name">Màu sắc:</p>
          <div className="color-container">
            {colorsOfSize.map((color) => (
              <div
                key={color.id}
                className={`color-item ${selectedColor === color.id ? "selected" : ""}`}
                style={{ backgroundColor: color.color_code }}
                onClick={() => handleColorClick(color.id)}
              ></div>
            ))}
          </div>

          <div className="quantity-and-buttons">
            <div className="quantity-container">
              <button className="quantity-button" onClick={handleDecrement}>
                -
              </button>

              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="quantity-input"
                min="1"
              />

              <button className="quantity-button" onClick={handleIncrement}>
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

          <button className="buy-product">Mua ngay</button>
        </div>
      </div>
      <DetailProduct />
      <Review />
    </div>
  );
};

export default Products;
