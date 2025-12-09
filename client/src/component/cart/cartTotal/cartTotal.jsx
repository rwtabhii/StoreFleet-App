import styles from "../../../styles/component/cartTotal.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCart } from "../../../redux/cartReducer/cartReducer.jsx";

export function CartTotal() {
  const { items } = useSelector(selectCart);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const handleCheckoutItems = () => {
    try {
      if (totalPrice > 0) {
        navigate("/checkout");
        toast.success("Order Completed");
      } else {
        toast.error("Your Cart is Empty");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={styles.cartTotal}>
      <p>Total: ₹{totalPrice}</p>
      <button className={styles.purchase} onClick={handleCheckoutItems}>
        Proceed to Checkout
      </button>
    </div>
  );
}
