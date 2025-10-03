import "./cartTotal.css"
import { useNavigate } from "react-router-dom";
import { addOrderApi } from "../../../api/order/orderApi";
import { toast } from "react-toastify";
import { clearCartApi } from "../../../api/cart/cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/authReducer/authReducer";
import { selectCart } from "../../../redux/cartReducer/cartReducer";
import { clearCart } from "../../../redux/cartReducer/cartReducer";

export function CartTotal() {
  const dispatch = useDispatch()
  const { items } = useSelector(selectCart)
  const navigate = useNavigate();
  // Calculate total price
  // console.log(items)
 const totalPrice = items.reduce(
  (acc, item) => acc + item.product.price * item.quantity,
  0
);

  const handleCheckoutItems = async (data) => {
    try {
      if(totalPrice>0){
      // await addOrderApi(data);
      navigate("/checkout")
      toast.success("Order Competed");
      }
      else{
        toast.error("Your Cart is Empty")
      }
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="cartTotal">
      <p>Total: ₹{totalPrice}</p>
      <button className="purchase" onClick={() => handleCheckoutItems(items)}>Proceed to Checkout</button>
    </div>
  );
}