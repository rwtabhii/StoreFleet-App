import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrderByAdmin, orderSelector } from "../../redux/orderReducer/orderReducer.jsx";
import { AllOrder } from "../../component/order/allOrder/allOrder.jsx";
import styles from "../../styles/pages/userOrderPage.module.css"; // import as styles

export function UserOrderPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector(orderSelector);

    useEffect(() => {
        dispatch(fetchUserOrderByAdmin(id));
    }, [dispatch, id]);

    if (isLoading) return  <div className={styles.spinnerContainer}>
            <GridLoader color="#36d7b7" loading={isLoading} size={20} />
          </div>;
  if (error) {
    toast.error(error);
    return  <div className={styles.errorMessage}>
              ❌ Failed to fetch User Orders.
            </div>;
  }


    return (
        <div className={styles.userOrdersPage}>
            <div className={styles.header}>
                <h2>User Orders</h2>
                <Link to="/all-users" className={styles.backLink}>← Back to Users</Link>
            </div>

            {!isLoading && !error && orders.length === 0 && (
                <p>No orders found for this user.</p>
            )}

            <div className={styles.ordersList}>
                {orders.map(order => (
                    <AllOrder key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
}
