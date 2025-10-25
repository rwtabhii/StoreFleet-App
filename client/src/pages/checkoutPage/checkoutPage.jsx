import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./checkoutPage.css";
import { CheckoutForm } from "../../component/checkout/checkoutForm/checkoutForm";
import { CheckoutItem } from "../../component/checkout/checkoutItem/checkoutItem";
import { selectCart } from "../../redux/cartReducer/cartReducer";
import { createPaymentIntentApi } from "../../api/payment/paymentApi.js"


const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);
console.log("stripe public",stripePromise)


export function Checkout() {
  const { items } = useSelector(selectCart);
  const [clientSecret, setClientSecret] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;


  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        if (total > 0) {
          const clientSecret = await createPaymentIntentApi(total);
          setClientSecret(clientSecret);
        }
      } catch (err) {
        console.log("Error fetching payment intent:", err);
      } finally {
        // setLoading(false);
      }
    };

    fetchPaymentIntent();
  }, [total]);


  // console.log("cart items in the checkout", items);

  // return (
  //   <div className="checkout-container">
  //     <div className="checkout-grid">

  //       {/* Left side - Form */}
  //       <div className="checkout-left">
  //         <h2 className="checkout-heading">Checkout :</h2>
  //         <CheckoutForm items={items} />
  //       </div>

  //       {/* Right side - Order Summary */}
  //       <div className="checkout-right">
  //         <CheckoutItem items={items} />
  //       </div>

  //     </div>
  //   </div>
  // );
  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="checkout-container">
          <div className="checkout-grid">

            {/* Left side - Form */}
            <div className="checkout-left">
              <h2 className="checkout-heading">Checkout :</h2>
              <CheckoutForm items={items} clientSecret={clientSecret} />
            </div>

            {/* Right side - Order Summary */}
            <div className="checkout-right">
              <CheckoutItem items={items} />
            </div>

          </div>
        </div>

      </Elements>
    </>
  )
}


