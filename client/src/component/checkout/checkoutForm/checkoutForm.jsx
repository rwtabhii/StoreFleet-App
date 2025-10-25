'use client'
// import { useState } from "react";
// import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
// import { useNavigate } from "react-router-dom";
// import { PaymentMethod } from "../paymentMethod/paymentMethod";
// import { toast } from "react-toastify";
// import "./checkoutForm.css";
// import { useDispatch } from "react-redux";
// import { addOrderApi } from "../../../api/order/orderApi";
// import { clearCart } from "../../../redux/cartReducer/cartReducer";
// import { clearCartApi } from "../../../api/cart/cart";

// export function CheckoutForm({ items }) {
//   const elements = useElements();
//   const stripe = useStripe();
//    const dispatch = useDispatch();

//   const [message,setMessage] = useState("")
//   const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
//   const shipping = subtotal > 500 ? 0 : 100;
//   const total = subtotal + shipping;

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     paymentType: "UPI", // default payment method
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePaymentChange = (type) => {
//     setFormData(prev => ({ ...prev, paymentType: type }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!stripe || !elements) {
//         toast.error("Stripe not loaded yet!");
//         return;
//       }

//       // confirm payment validation
//       const {error} = await stripe.confirmPayment({
//         // Elements instance that's used to  create the express checkout element
//         elements,
//         // clientsecret for the created payment Intent
//         // clientSecret,
//         confirmParams:{
//           return_url : `${window.location.origin}/complete`,
//         }
//       });

//      if(error){
//       // this point is reach if there is any error in the confirm payment show this error to your customer
//       setMessage(error.message) 
//      }
//       else{
//         // your customer will go the return url
//         setMessage("something went wrong")
//       }


//       const placeUserOrder = {
//         shippingInfo: {
//           address: formData.address,
//           state: formData.city,            // or create a separate state field in formData
//           country: "IN",                   // default as per schema
//           pincode: Number(formData.postalCode),
//           phoneNumber: Number(formData.phone),
//         },

//         orderedItems: items.map(item => ({
//           product: item.product._id,
//           name: item.product.title,
//           price: item.product.price,
//           quantity: item.quantity,
//           image: item.product.image || "",          // add product image from cart/product list   
//         })),
//         totalPrice: total,
//         shippingPrice: shipping,
//         paymentInfo: {
//           type: formData.paymentType
//         },
//       }



//       addOrderApi(placeUserOrder)
//       dispatch(clearCart());
//       await clearCartApi();
//       navigate("/order");
//       toast.success("Order placed Successfully")
//     }
//     catch (err) {
//       console.log(err)
//       toast.error("Problem on placing Order");
//     }

//   };

//   return (
//     <form className="checkout-form" onSubmit={handleSubmit}>
//       <h3 className="section-title">Shipping Information</h3>

//       <div className="form-row">
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <input
//         type="text"
//         name="address"
//         placeholder="Street Address"
//         value={formData.address}
//         onChange={handleChange}
//         required
//       />

//       <div className="form-row">
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={formData.city}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="postalCode"
//           placeholder="Postal Code"
//           value={formData.postalCode}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       {/* Payment Method */}
//       {/* <PaymentMethod
//         selected={formData.paymentType}
//         onChange={handlePaymentChange}
//       /> */}

//       {/* Stripe Payment Element */}
//       <div className="stripe-payment-box">
//         <PaymentElement />
//       </div>
//       <button type="submit" className="checkout-btn">Place Order</button>
//       {message && <span>{message}</span>}
//     </form>
//   );
// }


import { useState } from "react";
import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addOrderApi } from "../../../api/order/orderApi";
import { clearCart } from "../../../redux/cartReducer/cartReducer";
import { clearCartApi } from "../../../api/cart/cart";
import "./checkoutForm.css";

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
      // Confirm payment using the clientSecret
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: `${window.location.origin}/order-success` },
        // use this when you have to redirect to some other route
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Place order after payment success
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
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h3 className="section-title">Shipping Information</h3>
      <div className="form-row">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="address"
        placeholder="Street Address"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <div className="form-row">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={formData.postalCode}
          onChange={handleChange}
          required
        />
      </div>

      {/* Stripe Payment Element */}
      <div className="stripe-payment-box">
        <PaymentElement />
      </div>

      <button type="submit" className="checkout-btn" disabled={loading}>
        {loading ? "Processing..." : `Pay ₹${total}`}
      </button>
      {message && <p className="payment-message">{message}</p>}
    </form>
  );
}
