import { useDispatch } from "react-redux";
import {
  removeCartItemAsync,
  updateCartItemAsync
} from "../../../redux/cartReducer/cartReducer";
import "./cartCard.css";

export function CartCard({ item }) {
  const dispatch = useDispatch();

  // Remove item from cart
  const removeFromCart = () => {
    dispatch(removeCartItemAsync(item));
  };

  // Increment / Decrement quantity
const updateQuantity = (type) => {
  if (type === "increment") {
    dispatch(updateCartItemAsync({ id: item.id, type }));
  } else if (type === "decrement") {
    if (item.quantity === 1) {
      // 1️⃣ Remove from state immediately
      // dispatch(removeCartItem(item));  // optional: if you have a reducer for instant removal

      // 2️⃣ Remove from DB
      dispatch(removeCartItemAsync(item));
    } else {
      dispatch(updateCartItemAsync({ id: item.id, type }));
    }
  }
};
  return (
    <div className="cartCard">
      <div className="imageContainer">
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "200px", objectFit: "contain" }}
        />
      </div>

      <div className="itemtDetails">
        <p className="itemName">{item.title}</p>
        <div className="itemquantitywithprice">
          <p className="itemPrice">₹ {item.price}</p>
          <div className="itemquantity">
            <span className="decrement" onClick={() => updateQuantity("decrement")}>
              <i className="fa-solid fa-circle-minus"></i>
            </span>
            {item.quantity}
            <span className="increment" onClick={() => updateQuantity("increment")}>
              <i className="fa-solid fa-circle-plus"></i>
            </span>
          </div>
        </div>
        <button className="removeBtn" onClick={removeFromCart}>
          Remove From Cart
        </button>
      </div>
    </div>
  );
}
