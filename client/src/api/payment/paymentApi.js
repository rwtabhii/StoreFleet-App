// src/api/payment/paymentApi.js
import api from "../api.js";

export const createPaymentIntentApi = async (items) => {
  try {
    console.log("Items for payment:", items);

    // Use central api instance
    const res = await api.post("/api/storefleet/payment/create-payment-intent", { items });

    console.log("Payment Intent response:", res.data);

    if (res.data && res.data.success) {
      return res.data.clientSecret;
    } else {
      throw new Error(res.data?.message || "Failed to create PaymentIntent");
    }
  } catch (err) {
    console.error("createPaymentIntentApi Error:", err);
    throw err;
  }
};

export const checkPaymentConfirmation = async ({ orderId, paymentIntentId }) => {
  try {
    const res = await api.post("/api/storefleet/payment/order/confirm-payment", {
      orderId,
      paymentIntentId
    });

    return res.data;
  } catch (error) {
    console.error("Payment confirmation failed:", error);
    throw error;
  }
};
