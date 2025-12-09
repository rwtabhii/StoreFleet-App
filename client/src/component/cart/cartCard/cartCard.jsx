import { useDispatch } from "react-redux";
import {
  removeCartItemAsync,
  updateCartItemAsync,
  updateQuantityOptimistic,
  removeCartItemOptimistic
} from "../../../redux/cartReducer/cartReducer.jsx";
import styles from "../../../styles/component/cartCard.module.css";

export function CartCard({ item }) {
  const dispatch = useDispatch();

  // Remove item from cart
  const removeFromCart = () => {
    dispatch(removeCartItemOptimistic(item._id));
    dispatch(removeCartItemAsync(item._id));
  };

  // Increment / Decrement quantity
  const updateQuantity = (type) => {
    dispatch(updateQuantityOptimistic({ id: item._id, type }));

    if (type === "increment") {
      dispatch(updateCartItemAsync({ id: item._id, type }));
    } else if (type === "decrement") {
      if (item.quantity === 1) {
        dispatch(removeCartItemAsync(item._id));
      } else {
        dispatch(updateCartItemAsync({ id: item._id, type }));
      }
    }
  };

  return (
    <div className={styles.cartCard}>
      <div className={styles.imageContainer}>
        <img
          src={item.product.image}
          alt={item.product.title}
        />
      </div>

      <div className={styles.itemDetails}>
        <p className={styles.itemName}>{item.product.title}</p>

        <div className={styles.itemquantitywithprice}>
          <p className={styles.itemPrice}>₹ {item.product.price}</p>

          <div className={styles.itemquantity}>
            <span
              className={styles.decrement}
              onClick={() => updateQuantity("decrement")}
            >
              <i className="fa-solid fa-circle-minus"></i>
            </span>

            {item.quantity}

            <span
              className={styles.increment}
              onClick={() => updateQuantity("increment")}
            >
              <i className="fa-solid fa-circle-plus"></i>
            </span>
          </div>
        </div>

        <button className={styles.removeBtn} onClick={removeFromCart}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
}
