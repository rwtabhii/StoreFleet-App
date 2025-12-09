import styles from "../../styles/component/orderTable.module.css";

export function OrderTable({ order }) {
    return (
        <div className={styles.orderTable}>
            <div className={styles.orderDate}>
                Order on : {new Date(order.createdAt).toLocaleDateString()}
            </div>

            <table className={styles.orderTableTable}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderedItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>₹ {item.price}</td>
                            <td>{item.quantity}</td>
                            <td>₹ {item.price * item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="totalPrice">
                        <td colSpan="3"><strong>Total:</strong></td>
                        <td><strong>{order.totalPrice}</strong></td>
                    </tr>
                    <tr className="OrderStatus">
                        <td colSpan="3"><strong>Order Status:</strong></td>
                        <td><strong>{order.orderStatus}</strong></td>
                    </tr>
                    <tr className="PaymentMethod">
                        <td colSpan="3"><strong>Payment Method:</strong></td>
                        <td><strong>{order.paymentInfo.type}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
