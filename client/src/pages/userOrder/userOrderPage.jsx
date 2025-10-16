import React, { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  fetchUserOrderByAdmin } from "../../redux/orderReducer/orderReducer";
import { orderSelector } from "../../redux/orderReducer/orderReducer";
import { AllOrder } from "../../component/order/allOrder/allOrder";
import "./userOrderPage.css";

export function UserOrderPage() {
    const { id } = useParams(); // userId from URL
    // console.log(id,"userid page")
    const dispatch = useDispatch();
    const { orders, isLoading, error } = useSelector(orderSelector);

    useEffect(() => {
        console.log("useEffect work")
        dispatch(fetchUserOrderByAdmin(id));
    }, []);

    return (
        <div className="user-orders-page">
            <div className="header">
                <h2>User Orders</h2>
                <Link to="/all-users" className="back-link">← Back to Users</Link>
            </div>

            {isLoading && <p>Loading orders...</p>}
            {error && <p className="error">{error}</p>}

            {!isLoading && !error && orders.length === 0 && (
                <p>No orders found for this user.</p>
            )}``

            <div className="orders-list">
                {orders.map(order => (
                    <AllOrder key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
}
