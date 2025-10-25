import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import "./orderSuccess.css"

export const OrderSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentIntent = query.get("payment_intent");

  return (
    <div className="success-container">
      <div className="success-card">
        <CheckCircle className="success-icon" />
        <h1 className="success-title">Payment Successful 🎉</h1>
        <p className="success-message">
          Thank you! Your payment has been processed successfully.
        </p>
        {paymentIntent && (
          <p className="payment-id">
            <strong>Payment ID:</strong> {paymentIntent}
          </p>
        )}
        <Link to="/" className="home-button">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};


