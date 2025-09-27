import { getDocs, doc, addDoc, collection, serverTimestamp,where, query, orderBy } from "firebase/firestore";

import { db } from "../../firebaseinit";

export async function getOrderApi(userId) {
  try {
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(q);

    const allOrder = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds); // sort in JS

    return allOrder;
  } catch (error) {
    console.log(error);
    return [];
  }
}


export async function addOrderApi(data, userId) {
  try {
    // calculate total amount
    const totalAmount = data.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      userId,
      items: data.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), order);

    return { id: docRef.id, ...order };
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}