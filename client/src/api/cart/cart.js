import axios from "axios";
export async function getCartItemApi() {
    try {
        const response = await axios.get("/api/storefleet/cart/", {
            withCredentials: true
        });
        // console.log(response.data.allItems);
        return response.data.allItems
    } catch (err) {
        console.log("Error fetching cart items:", err);
    }
}


export async function addCartItemApi(data) {
    try {
        // console.log(data)
        await axios.post("/api/storefleet/cart/add", data, {
            withCredentials: true
        });
        console.log("cart items add successfully")
    } catch (error) {
        console.log("Error setting cart item:", error);
    }
}


export async function updateCartItemApi(itemId, type) {
    try {
        console.log("api upfate invoke")
        const response = await axios.put(
            `/api/storefleet/cart/${itemId}`, // productId goes here
            { type },                           // send the action type (increment/decrement)
            { withCredentials: true }           // if you're using cookies for auth
        );

     //  console.log("Cart updated:", response.data.cartItem);
        return response.data.cartItem;
    } catch (err) {
        console.error("Error updating cart item:", err);
        throw err;
    }
}
export async function removeCartItemApi(itemId) {
  try {
    const removeItem = await axios.delete(`/api/storefleet/cart/${itemId}`,{
        withCredentials: true
    });
    return removeItem
  } catch (err) {
    console.log(err)
  }
}

export async function clearCartApi(userId) {
    // try {
    //     const q = query(collection(db, "cart"), where("userId", "==", userId));
    //     const snapshot = await getDocs(q);

    //     const promises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    //     await Promise.all(promises);

    //     return true;
    // } catch (error) {
    //     console.error("Error clearing cart:", error);
    //     throw error;
    // }
}