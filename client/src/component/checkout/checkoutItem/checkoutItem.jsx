import styles from "../../../styles/component/checkoutItem.module.css";

export function CheckoutItem({ items }) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity, 
    0
  );
  const shipping = subtotal > 500 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <div className={styles.checkoutItem}>
      <h3 className={styles.sectionTitle}>Items in Your Order</h3>

      <div className={styles.checkoutItemList}>
        {items.map((item) => (
          <div key={item._id} className={styles.checkoutItemCard}>
            <img
              src={item.product.image}
              alt={item.product.title}
              className={styles.checkoutItemImg}
            />

            <div className={styles.checkoutItemDetails}>
              <h4 className={styles.checkoutItemName}>{item.product.title}</h4>
              <p className={styles.checkoutItemQty}>Qty: {item.quantity}</p>
            </div>

            <div className={styles.checkoutItemPrice}>
              ₹{item.product.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.checkoutItemTotals}>
        <div className={styles.checkoutTotalLine}>
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>

        <div className={styles.checkoutTotalLine}>
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>

        <div className={`${styles.checkoutTotalLine} ${styles.checkoutTotalMain}`}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </div>
  );
}
