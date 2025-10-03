import axios from "axios";

export async function getOrderApi() {
  try {
    const res = await axios.get("/api/storefleet/order/my/orders", {
      withCredentials: true
    });
    // console.log("your order is ", res.data.orders);
    return res.data.orders;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addOrderApi(data) {
  try {
    const res = await axios.post("/api/storefleet/order/new",data, {
      withCredential: true
    })
    return res;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}