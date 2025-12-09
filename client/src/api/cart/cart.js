import api from "../api.js";

// Get all cart items for the logged-in user
export async function getCartItemApi() {
  try {
    const response = await api.get("/storefleet/cart/");
    console.log("Cart items:", response.data.allItems);
    return response.data.allItems;
  } catch (err) {
    console.error("Error fetching cart items:", err);
    throw err;
  }
}

// Add an item to the cart
export async function addCartItemApi(data) {
  try {
    await api.post("/storefleet/cart/add", data);
    console.log("Cart item added successfully");
  } catch (err) {
    console.error("Error adding cart item:", err);
    throw err;
  }
}

// Update a cart item (increment/decrement)
export async function updateCartItemApi(itemId, type) {
  try {
    const response = await api.put(`/storefleet/cart/${itemId}`, { type });
    console.log("Cart updated:", response.data.cartItem);
    return response.data.cartItem;
  } catch (err) {
    console.error("Error updating cart item:", err);
    throw err;
  }
}

// Remove a cart item
export async function removeCartItemApi(itemId) {
  try {
    const res = await api.delete(`/storefleet/cart/${itemId}`);
    console.log("Cart item removed:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error removing cart item:", err);
    throw err;
  }
}

// Clear the user's cart
export async function clearCartApi() {
  try {
    const res = await api.delete("/storefleet/cart/user/emptycart");
    console.log("Cart cleared:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error clearing cart:", err);
    throw err;
  }
}
