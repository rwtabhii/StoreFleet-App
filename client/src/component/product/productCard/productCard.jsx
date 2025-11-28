import { useNavigate } from "react-router-dom";
import { addCartItemApi } from "../../../api/cart/cart.js";
import { toast } from "react-toastify";
import "./productCard.css"
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/authReducer/authReducer.jsx";
import { addCartItemAsync } from "../../../redux/cartReducer/cartReducer.jsx";


export function ProductCard({ product }) {
  const { login, userDetail } = useSelector(authSelector)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const addToCart = (product) => {
    if (product.stock === 0) {
      return toast.error("Product is out of stock");
    }
    console.log(product)
    const item = {
      productId : product._id
    }
    // console.log(item);
    try {
      dispatch(addCartItemAsync(item));
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Error adding product");
    }
  }

  return (
    <div className="productCard">
      <div className="imageContainer">
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
      </div>

      <div className="productDetails">
        <p className="productName">{product.title}</p>
        <div className="price-quantity">
          <p className="productPrice">₹ {product.price}</p>
          <p className="product-quantity"> {product.stock === 0
            ? "Currently unavailable"
            : product.stock > 5
              ? "In stock"
              : `Only few left: ${product.stock}`}</p>
        </div>
        <button className={`addBtn ${product.stock === 0 ? "out" : ""}`}
          onClick={() => login ? addToCart(product) : navigate("/login")}>
          {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}