// src/api/payment/paymentApi.js
import axios from "axios";


export const createPaymentIntentApi = async (amount) => {
  try {
    const res = await axios.post(
      "/api/storefleet/payment/create-payment-intent",
      { amount },
      { withCredentials: true }
    );

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
