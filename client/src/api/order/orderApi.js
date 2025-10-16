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
    const res = await axios.post("/api/storefleet/order/new", data, {
      withCredential: true
    })
    return res;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}

export const showAllOrders = async () => {
  try {
    const res = await axios.get("/api/storefleet/order/orders/placed", {
      withCredentials: true
    });
    console.log(res)
    return res.data.AllOrders;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const updateOrderApi = async (id, update) => {
  try {
    const res = await axios.put(`/api/storefleet/order/update/${id}`, update
      , {
        withCredential: true
      })

    return res.data
  } catch (err) {
    throw err;
  }
}

export const getUserOrderByAdmin = async (id) => {
  try {
    const res = await axios.get(`/api/storefleet/order/user/allorder/${id}`, {
      withCredentials: true
    })
    console.log("apicall",res);
    return res.data;
  } catch (err) {
  throw err;
  }
}