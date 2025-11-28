import React from "react";
import "./checkoutItem.css";

export const CheckoutItem = ({items}) => {
  
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <div className="checkout-item">
      <h3 className="section-title">Items in Your Order</h3>

      <div className="checkout-item-list">
        {items.map((item) => (
          <div key={item._id} className="checkout-item-card">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="checkout-item-img"
            />
            <div className="checkout-item-details">
              <h4 className="checkout-item-name">{item.product.title}</h4>
              <p className="checkout-item-qty">Qty: {item.quantity}</p>
            </div>
            <div className="checkout-item-price">
              ₹{item.product.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-item-totals">
        <div className="checkout-total-line">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="checkout-total-line">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        <div className="checkout-total-line checkout-total-main">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
};


