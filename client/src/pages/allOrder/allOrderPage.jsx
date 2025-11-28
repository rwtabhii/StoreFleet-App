import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AllOrder } from "../../component/order/allOrder/allOrder";
import "./allOrderPage.css";
import { fetchAllOrderByAdmin, orderSelector } from "../../redux/orderReducer/orderReducer";

export function AllOrderPage() {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector(orderSelector);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(fetchAllOrderByAdmin());
        // toast.success("All orders loaded successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="all-orders-container">
      <h2 className="orders-title">All Orders</h2>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="no-orders-text">No orders found</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <AllOrder
              key={order._id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
}
