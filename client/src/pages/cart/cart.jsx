import { useEffect } from "react";
import { GridLoader } from "react-spinners";

import { CartTotal } from "../../component/cart/cartTotal/cartTotal";
import { CartCard } from "../../component/cart/cartCard/cartCard";
import "./cart.css";

import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/authReducer/authReducer";
import { fetchCartItems, selectCart } from "../../redux/cartReducer/cartReducer";

export function CartPage() {
  const dispatch = useDispatch();

  // Redux state
  const { userDetail } = useSelector(authSelector);
  const {items,isLoading,error} = useSelector(selectCart);
  // console.log(items)
 
  // Fetch cart items when userDetail.uid is available
  useEffect(() => {
    // console.log(userDetail)
    if (userDetail?.user._id) {
      console.log("fetch invoke");
      dispatch(fetchCartItems());
    }
  },[dispatch,userDetail?.uid]);

  // Show loader while fetching
  if (isLoading) {
    return (
      <div className="spinner-container">
        <GridLoader color="#36d7b7" loading={isLoading} size={20} />
      </div>
    );
  }

  // Show error if fetch failed
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div className="cart-Container">
      {/* 🛒 Cart Summary */}
      <CartTotal />

      {/* 🛍️ Cart Items */}
      <div className="cartList">
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
