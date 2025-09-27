# 🛒 BuyBusy App

**BuyBusy** is a modern e-commerce web application built with **React + Vite**. It allows users to browse products, sign up, log in, manage their shopping cart, and place orders. The app uses **Firebase** for authentication and database, and **React Redux Toolkit** for global state management.

---

## ⚡ Features

- 🔐 **Authentication** – Sign up, login, and logout using **Firebase Auth** for secure user management.  
- 🛍️ **Product Listing** – Display available products with filtering and search functionality.  
- 🛒 **Shopping Cart** – Add, remove, and update items in the cart.  
- 📝 **Orders** – Place orders, view order history, and track purchases.  
- 👤 **User Reducer** – Manage authentication state across the app using **React Redux**.  
- 📦 **Cart Reducer** – Manage the cart globally without prop drilling.  
- 🎨 **Responsive UI** – Built with **React + CSS**, works on desktop and mobile.  
- 🔔 **Notifications** – Display toast notifications for user actions using **React Toastify**.  

---

## 🛠 Installation

1. **Clone the repository**
```bash
git clone https://github.com/rwtabhii/BusyBuy-App-2.git
cd buybusy
Install dependencies

bash
Copy code
npm install
Setup Firebase

Create a Firebase project at Firebase Console

Enable Authentication (Email/Password)

Enable Firestore Database in test mode

Copy your Firebase config into firebaseinit.js in the src folder

Example firebaseinit.js:

javascript
Copy code
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
Run the Project

bash
Copy code
npm run dev
The app will be available at http://localhost:5173/ (default Vite port).

📁 Project Structure
php
Copy code
buybusy/
├─ public/
│   └─ assets/               # Images, logos, icons
├─ src/
│   ├─ api/                  # API functions (Firebase calls)
│   │   ├─ cart/             # Cart related APIs
│   │   ├─ order/            # Order related APIs
│   │   └─ products/         # Product APIs
│   ├─ component/            # Reusable UI components
│   │   ├─ navbar/
│   │   ├─ product/
│   │   ├─ cart/
│   │   └─ order/
│   ├─ redux/              # React Context for global state
│   │   ├─ authReducer
│   │   ├─ productReducer
│   │   ├─ cartReducer
│   │   └─ orderReducer
│   ├─ pages/                # Main pages
│   │   ├─ home/
│   │   ├─ login/
│   │   ├─ register/
│   │   ├─ cart/
│   │   └─ order/
│   ├─ App.jsx               # Root layout (Navbar + Outlet + ToastContainer)
│   ├─ main.jsx              # Entry point
│   └─ index.css             # Global styles
├─ package.json
└─ vite.config.js
⚡ Technologies Used
Frontend: React, Vite, CSS

State Management: React Redux and Redux Toolkit , useReducer

Backend/Database: Firebase Auth + Firestore

Notifications: React Toastify

📞 Contact
Email: devabhishekrawat@gmail.com

GitHub: https://github.com/rwtabhii