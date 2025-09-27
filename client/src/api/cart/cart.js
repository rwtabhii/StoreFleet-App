import { collection, getDocs,addDoc,doc, query, updateDoc,deleteDoc, where,increment } from "firebase/firestore";
import {db} from "../../firebaseinit.js" // adjust path

export async function getCartItemApi(userId) {
    try {
        const q = query(
            collection(db, "cart"),
            where("userId", "==", userId)
        );

        const snapshot = await getDocs(q);

        const userCartItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        // console.log("user cart items",userCartItems)

        return userCartItems;
    } catch (err) {
        console.log("Error fetching cart items:", err);
    }
}


export async function addCartItemApi(data) {
    try {
        const cartCollectionRef = collection(db, "cart");

        // add a new doc for each cart item
        await addDoc(cartCollectionRef, data);

        console.log("Cart item added successfully!");
    } catch (error) {
        console.log("Error setting cart item:", error);
    }
}

export async function updateCartItemApi(itemId, type) {
  const itemRef = doc(db, "cart", itemId);
  const value = type === "increment" ? 1 : -1;
  await updateDoc(itemRef, { quantity: increment(value) });
}

export async function removeCartItemApi(item) {
    try {
        const cartDocRef = doc(db, "cart", item.id); // id is the Firestore doc ID
        await deleteDoc(cartDocRef);
        console.log("Cart item removed successfully!");
    } catch (error) {
        console.log("Error deleting cart item:", error);
        throw error;
    }
}

export async function clearCartApi(userId) {
  try {
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const promises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(promises);

    return true;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
}