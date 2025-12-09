// src/api/payment/paymentApi.js
import axios from "axios";


export const createPaymentIntentApi = async (items) => {
  try {
    console.log(items)
    const res = await axios.post(
      "/api/storefleet/payment/create-payment-intent",
      { items: items },
      { withCredentials: true }
    );
    console.log(res)

    if (res.data && res.data.success) {
      return res.data.clientSecret;
    } else {
      throw new Error(res.data?.message || "Failed to create PaymentIntent");
    }
  } catch (err) {
    console.log("createPaymentIntentApi Error:", err);
    throw err;
  }
};
