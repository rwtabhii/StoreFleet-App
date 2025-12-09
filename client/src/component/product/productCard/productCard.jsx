import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/authReducer/authReducer.jsx";
import { addCartItemAsync } from "../../../redux/cartReducer/cartReducer.jsx";
import styles from "../../../styles/component/productCard.module.css";

export function ProductCard({ product }) {
  const { login } = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = (product) => {
    if (product.stock === 0) {
      return toast.error("Product is out of stock");
    }

    const item = { productId: product._id };

    try {
      dispatch(addCartItemAsync(item));
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Error adding product");
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={styles.productDetails}>
        <p className={styles.productName}>{product.title}</p>

        <div className={styles.priceQuantity}>
          <p className={styles.productPrice}>₹ {product.price}</p>
          <p className={styles.productQuantity}>
            {product.stock === 0
              ? "Currently unavailable"
              : product.stock > 5
              ? "In stock"
              : `Only few left: ${product.stock}`}
          </p>
        </div>

        <button
          className={`${styles.addBtn} ${
            product.stock === 0 ? styles.addBtnOut : ""
          }`}
          onClick={() => (login ? addToCart(product) : navigate("/login"))}
        >
          {product.stock === 0 ? "Out of Stock" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}
