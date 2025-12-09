import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/pages/checkoutPage.module.css";

import { CheckoutForm } from "../../component/checkout/checkoutForm/checkoutForm.jsx";
import { CheckoutItem } from "../../component/checkout/checkoutItem/checkoutItem.jsx";
import { selectCart } from "../../redux/cartReducer/cartReducer.jsx";
import { createPaymentIntentApi } from "../../api/payment/paymentApi.js";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripeKey);

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
          const clientSecret = await createPaymentIntentApi(items);
          setClientSecret(clientSecret);
        }
      } catch (err) {
        console.log("Error fetching payment intent:", err);
      }
    };
    fetchPaymentIntent();
  }, [total, items]);

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutGrid}>

          {/* Left side - Form */}
          <div className={styles.checkoutLeft}>
            <h2 className={styles.checkoutHeading}>Checkout :</h2>
            <CheckoutForm items={items} clientSecret={clientSecret} />
          </div>

          {/* Right side - Order Summary */}
          <div className={styles.checkoutRight}>
            <CheckoutItem items={items} />
          </div>

        </div>
      </div>
    </Elements>
  );
}
