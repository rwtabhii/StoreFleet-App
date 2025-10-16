import React, { useState } from "react";
import "./allOrder.css";
import { useDispatch } from "react-redux";
import { updateOrderByAdmin,updateOrderLocally } from "../../../redux/orderReducer/orderReducer";

export function AllOrder({ order }) {
    const dispatch = useDispatch();

    const handleStatusChange = (e) => {

        const newStatus = e.target.value;
        dispatch(updateOrderLocally({ id: order._id, update: { orderStatus: newStatus } }));
        dispatch(updateOrderByAdmin({ id: order._id, update: { orderStatus: newStatus } }))
    };

    const handlePaymentChange = (e) => {
        const newPayment = e.target.value;
        dispatch(updateOrderLocally({ id: order._id, update: { paymentInfo: { status: newPayment } } }));
        dispatch(updateOrderByAdmin({ id: order._id, update: { paymentInfo: { status: newPayment } } }))
    };

    return (
        <div className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>User:</strong> {order.user?.name || "N/A"}</p>
            <p><strong>Email:</strong>{order.user?.email || "No Email"}</p>


            <p>
                <strong>Status:</strong>
                <select value={order.orderStatus} onChange={handleStatusChange}>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </p>

            <p>
                <strong>Payment:</strong>
                <select value={order.paymentInfo.status} onChange={handlePaymentChange}>
                    <option value="false">Pending</option>
                    <option value="true">Success</option>
                </select>
            </p>
            <p><strong>Total:</strong> ₹{order.totalPrice}</p>

            <div className="shipping-info">
                <h4>Shipping Info</h4>
                <p>{order.shippingInfo.address}, {order.shippingInfo.state}, {order.shippingInfo.country} - {order.shippingInfo.pincode}</p>
                <p>Phone: {order.shippingInfo.phoneNumber}</p>
            </div>

            <div className="order-items">
                <h4>Ordered Items</h4>
                <ul>
                    {order.orderedItems.map((item, idx) => (
                        <li key={idx}>
                            {item.name} × {item.quantity} — ₹{item.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
