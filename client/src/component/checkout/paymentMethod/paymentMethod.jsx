import styles from "../../../styles/component/paymentMethod.module.css";

export function PaymentMethod({ selected, onChange }) {
  const options = [
    { value: "UPI", label: "UPI" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "COD", label: "Cash on Delivery (COD)" },
  ];

  return (
    <div className={styles.paymentContainer}>
      <h3 className={styles.paymentHeading}>Select Payment Method</h3>

      <div className={styles.paymentOptions}>
        {options.map((opt) => (
          <label className={styles.paymentOption} key={opt.value}>
            <input
              type="radio"
              name="paymentType"
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
