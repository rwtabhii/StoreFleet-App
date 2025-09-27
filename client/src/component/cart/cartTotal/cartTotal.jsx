import "./cartTotal.css"

import { addOrderApi } from "../../../api/order/orderApi";
import { toast } from "react-toastify";
import { clearCartApi } from "../../../api/cart/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/authReducer/authReducer";
import { selectAllCartItems } from "../../../redux/cartReducer/cartReducer";
import { clearCart } from "../../../redux/cartReducer/cartReducer";

export function CartTotal() {
  const dispatch = useDispatch()
  const  cart  = useSelector(selectAllCartItems)
  const { userDetail } = useSelector(authSelector)
  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const addOrder = async (data) => {
    try {
      await addOrderApi(data, userDetail.uid);
      await clearCartApi(userDetail.uid);
      dispatch(clearCart())
      toast.success("Order Competed");
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="cartTotal">
      <p>Total: ₹{totalPrice}</p>
      <button className="purchase" onClick={() => addOrder(cart)}>Purchase</button>
    </div>
  );
}