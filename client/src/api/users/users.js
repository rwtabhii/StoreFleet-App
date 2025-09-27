import { getDoc, doc, updateDoc, addDoc, collection,setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../firebaseinit";



export async function registerUser(data) {
    try {
      // console.log(data)
        const { name, email, password } = data;
        // used for email and password validation and create account in the firebase authentication
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(userCredentials);
        const user = userCredentials.user;

        // store the data in the firestore
        await setDoc(doc(db, "users", user.uid), {
            name, email
        });

        console.log("User register successfully")
    }
    catch (err) {
           console.error("Failed to register user:", err.code, err.message);
    }
}

export async function loginUser(data) {
  try {
    const {email,password} = data
    // Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const authUser = userCredential.user;

    // Fetch profile from Firestore
    const userDoc = await getDoc(doc(db, "users", authUser.uid));

    // Merge Auth + Firestore data
    if (userDoc.exists()) {
      return {
        uid: authUser.uid,
        email: authUser.email,
        emailVerified: authUser.emailVerified
      };
    } else {
      // ❌ Stop login if Firestore profile missing
      throw new Error("User profile not found in Firestore.");
    }
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}

export function logoutUser(){
  
}