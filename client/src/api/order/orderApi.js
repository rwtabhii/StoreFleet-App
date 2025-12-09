import api from "../api.js";

// Get all orders of the logged-in user
export async function getOrderApi() {
  try {
    const res = await api.get("/api/storefleet/order/my/orders");
    // console.log("your order is ", res.data.orders);
    return res.data.orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

// Add a new order
export async function addOrderApi(data) {
  try {
    const res = await api.post("/api/storefleet/order/new", data);
    return res.data;
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}

// Get all orders (admin)
export const showAllOrders = async () => {
  try {
    const res = await api.get("/api/storefleet/order/orders/placed");
    console.log("All orders:", res.data);
    return res.data.AllOrders;
  } catch (err) {
    console.error("Error fetching all orders:", err);
    throw err;
  }
}

// Update order by ID
export const updateOrderApi = async (id, update) => {
  try {
    const res = await api.put(`/api/storefleet/order/update/${id}`, update);
    return res.data;
  } catch (err) {
    console.error("Error updating order:", err);
    throw err;
  }
}

// Get orders of a specific user (admin)
export const getUserOrderByAdmin = async (id) => {
  try {
    const res = await api.get(`/api/storefleet/order/user/allorder/${id}`);
    console.log("API call result:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching user orders by admin:", err);
    throw err;
  }
};
