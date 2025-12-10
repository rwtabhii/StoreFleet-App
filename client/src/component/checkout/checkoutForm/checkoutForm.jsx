import { useState } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addOrderApi } from "../../../api/order/orderApi";
import { clearCart } from "../../../redux/cartReducer/cartReducer.jsx";

import { clearCartApi } from "../../../api/cart/cart.js";
import styles from "../../../styles/component/checkoutForm.module.css";

export function CheckoutForm({ items, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe not loaded yet!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/order-success` },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        const orderData = {
          shippingInfo: {
            address: formData.address,
            state: formData.city,
            country: "IN",
            pincode: Number(formData.postalCode),
            phoneNumber: Number(formData.phone),
          },
          orderedItems: items.map((item) => ({
            product: item.product._id,
            name: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image || "",
          })),
          totalPrice: total,
          shippingPrice: shipping,
          paymentInfo: {
            id: paymentIntent.id,
            status: paymentIntent.status,
            type: paymentIntent.payment_method_types[0] || "card",
          },
        };

        await addOrderApi(orderData);
        dispatch(clearCart());
        await clearCartApi();

        toast.success("Payment successful! Order placed.");
        navigate("/order-success");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong during checkout.");
      toast.error("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.checkoutForm} onSubmit={handleSubmit}>
      <h3 className={styles.sectionTitle}>Shipping Information</h3>

      <div className={styles.formRow}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className={styles.checkoutformfill}
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className={styles.checkoutformfill}
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="address"
        placeholder="Street Address"
        className={styles.checkoutformfill}
        value={formData.address}
        onChange={handleChange}
        required
      />

      <div className={styles.formRow}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          className={styles.checkoutformfill}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          className={styles.checkoutformfill}
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.stripePaymentBox}>
        <PaymentElement />
      </div>

      <button className={styles.checkoutbtn} type="submit" disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>

      {message && <p className={styles.paymentMessage}>{message}</p>}
    </form>
  );
}
