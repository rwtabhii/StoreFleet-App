import { useEffect } from "react";
import { GridLoader } from "react-spinners";

import { CartTotal } from "../../component/cart/cartTotal/cartTotal.jsx";
import { CartCard } from "../../component/cart/cartCard/cartCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/authReducer/authReducer.jsx";
import { fetchCartItems, selectCart } from "../../redux/cartReducer/cartReducer.jsx";

import styles from "../../styles/pages/cart.module.css";

export function CartPage() {
  const dispatch = useDispatch();

  const { userDetail } = useSelector(authSelector);
  const { items, isLoading, error } = useSelector(selectCart);

  useEffect(() => {
    if (userDetail?.user._id) {
      dispatch(fetchCartItems());
    }
  }, [dispatch, userDetail?.user._id]);

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <GridLoader color="#36d7b7" loading={isLoading} size={20} />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className={styles.cartContainer}>
      <CartTotal />

      <div className={styles.cartList}>
        {items.length > 0 ? (
          items.map((cartItem) => (
            <CartCard key={cartItem._id} item={cartItem} />
          ))
        ) : (
          <h2>Your Cart is Empty 🛒</h2>
        )}
      </div>
    </div>
  );
}
