import "./paymentMethod.css";

export function PaymentMethod({ selected, onChange }) {
  const options = [
    { value: "UPI", label: "UPI" },
    { value: "Debit Card", label: "Debit Card" },
    { value: "Credit Card", label: "Credit Card" },
    { value: "COD", label: "Cash on Delivery (COD)" },
  ];

  return (
    <div className="payment-container">
      <h3 className="payment-heading">Select Payment Method</h3>
      <div className="payment-options">
        {options.map(opt => (
          <label className="payment-option" key={opt.value}>
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
