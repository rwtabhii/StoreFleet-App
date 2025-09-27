import { db } from "../../firebaseinit";
import { getDocs, addDoc, doc, collection } from "firebase/firestore";

export async function getProductApi() {
    try {
        const querySnapshot = await getDocs(collection(db,"products"));
        const products = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return products
    } catch (error) {
        console.log(error) 
    }
}
// for adding the product
// export function addDoc() {

// }

// export async function getFilteredProducts(filter = {}) {
//   try {
//     let q = collection(db, "products");

//     // Apply category filter
//     if (filter.categories?.length === 1) {
//       q = query(q, where("category", "==", filter.categories[0]));
//     } else if (filter.categories?.length > 1) {
//       q = query(q, where("category", "in", filter.categories)); 
//       // OR if you stored category as array in Firestore:
//       // q = query(q, where("category", "array-contains-any", filter.categories));
//     }

//     // Apply price filter
//     if (filter.maxPrice) {
//       q = query(q, where("price", "<=", filter.maxPrice));
//     }

//     // Run query
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//   } catch (err) {
//     console.error("Error filtering products:", err);
//     return [];
//   }
// } 