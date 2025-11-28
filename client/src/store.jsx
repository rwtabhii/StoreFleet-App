import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/authReducer/authReducer";
import { productReducer } from "./redux/productReducer/productReducer";
import { cartReducer } from "./redux/cartReducer/cartReducer";
import { orderReducer } from "./redux/orderReducer/orderReducer";
import { adminReducer } from "./redux/adminReducer/adminReducer";

export const store = configureStore({
  reducer : {
    auth: authReducer,   // ✅ all slices go inside "reducer"
    products : productReducer,
    cart : cartReducer,
    order : orderReducer,
    admin: adminReducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ disables the warning
    }),
});
