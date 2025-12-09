import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import styles from "../../../styles/component/orderSuccess.module.css";

export function OrderSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const paymentIntent = query.get("payment_intent");

  return (
    <div className={styles.successContainer}>
      <div className={styles.successCard}>
        <CheckCircle className={styles.successIcon} />
        <h1 className={styles.successTitle}>Payment Successful 🎉</h1>
        <p className={styles.successMessage}>
          Thank you! Your payment has been processed successfully.
        </p>

        {paymentIntent && (
          <p className={styles.paymentId}>
            <strong>Payment ID:</strong> {paymentIntent}
          </p>
        )}

        <Link to="/" className={styles.homeButton}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
