import { useDispatch,useSelector } from "react-redux";
import "./checkoutPage.css";
import { CheckoutForm } from "../../component/checkout/checkoutForm/checkoutForm";
import { CheckoutItem } from "../../component/checkout/checkoutItem/checkoutItem";
import { selectCart } from "../../redux/cartReducer/cartReducer";



export function Checkout() {
    const {items} = useSelector(selectCart);
    // console.log("cart items in the checkout", items);

  return (
    <div className="checkout-container">
      <div className="checkout-grid">

        {/* Left side - Form */}
        <div className="checkout-left">
          <h2 className="checkout-heading">Checkout :</h2>
          <CheckoutForm items={items} />
        </div>

        {/* Right side - Order Summary */}
        <div className="checkout-right">
          <CheckoutItem items={items}/>
        </div>

      </div>
    </div>
  );
}
