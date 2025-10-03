import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PaymentMethod } from "../paymentMethod/paymentMethod";
import { toast } from "react-toastify";
import "./checkoutForm.css";
import { useDispatch } from "react-redux";
import { addOrderApi } from "../../../api/order/orderApi";
import { clearCart } from "../../../redux/cartReducer/cartReducer";
import { clearCartApi } from "../../../api/cart/cart";

export function CheckoutForm({ items }) {
   const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentType: "UPI", // default payment method
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (type) => {
    setFormData(prev => ({ ...prev, paymentType: type }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const placeUserOrder = {
        shippingInfo: {
          address: formData.address,
          state: formData.city,            // or create a separate state field in formData
          country: "IN",                   // default as per schema
          pincode: Number(formData.postalCode),
          phoneNumber: Number(formData.phone),
        },

        orderedItems: items.map(item => ({
          product : item.product._id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image || "",          // add product image from cart/product list   
       })),
        totalPrice : total,
        shippingPrice : shipping,
        paymentInfo: {
          type: formData.paymentType
        },
      }

      addOrderApi(placeUserOrder)
      dispatch(clearCart());
      await clearCartApi();
      navigate("/order");
      toast.success("Order placed Successfully")
    }
    catch (err) {
      console.log(err)
      toast.error("Problem on placing Order");
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

      {/* Payment Method */}
      <PaymentMethod
        selected={formData.paymentType}
        onChange={handlePaymentChange}
      />

      <button type="submit" className="checkout-btn">Place Order</button>
    </form>
  );
}
