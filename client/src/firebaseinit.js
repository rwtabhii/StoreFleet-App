// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export  const db = getFirestore(app)



// // too add the products in the firestore 
// import { collection, doc, writeBatch, getDocs } from "firebase/firestore";
// import { data } from "./component/product/product"; // your product array with id
// const products = data;
// export async function addProductsWithId(products) {
//   try {
//     const colRef = collection(db, "products");

//     const batch = writeBatch(db);

//     products.forEach((product) => {
//       // Use product.id as the document ID
//       const docRef = doc(colRef, product.id.toString());
//       batch.set(docRef, product);
//     });

//     await batch.commit();
//     console.log("All products added successfully with IDs!");
//   } catch (err) {
//     console.error("Error adding products:", err);
//   }
// }
// addProductsWithId(products);
