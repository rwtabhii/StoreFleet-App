import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { GridLoader } from "react-spinners";
import { AllOrder } from "../../component/order/allOrder/allOrder.jsx";
import styles from "../../styles/pages/allOrderPage.module.css";
import { fetchAllOrderByAdmin, orderSelector } from "../../redux/orderReducer/orderReducer.jsx";

export function AllOrderPage() {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(orderSelector);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(fetchAllOrderByAdmin());
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, [dispatch]);

 if (isLoading) return  <div className={styles.spinnerContainer}>
            <GridLoader color="#36d7b7" loading={isLoading} size={20} />
          </div>;
  if (error) {
    toast.error(error);
    return  <div className={styles.errorMessage}>
              ❌ Failed to fetch Orders.
            </div>;
  }


  return (
    <div className={styles.allOrdersContainer}>
      <h2 className={styles.ordersTitle}>All Orders</h2>
        <div className={styles.ordersList}>
          {orders.map((order) => (
            <AllOrder key={order._id} order={order} />
          ))}
        </div>
    </div>
  );
}
