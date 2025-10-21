import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App.jsx';
import { LoginForm } from './pages/login/loginForm.jsx';
import { RegisterPage } from './pages/register/registerPage.jsx';
import { Home } from './pages/home/home.jsx';
import { CartPage } from './pages/cart/cart.jsx';
import { OrderPage } from './pages/order/orderPage.jsx';
import { ErrorPage } from './pages/errorPage/errorPage.jsx';
import { ProtectRoute } from './component/protectRoute/protectedRoute.jsx';
import { store } from './store.jsx';
import { Checkout } from './pages/checkoutPage/checkoutPage.jsx';
import { ForgetPassword } from './pages/forgetPasswordPage/forgetPasswordPage.jsx';
import { ResetPassword } from './pages/resetPasswordPage/resetPasswordPage.jsx';
import { UserDashboard } from './pages/userDashboard/userDashboard.jsx';
import { AllUserPage } from './pages/allUser/allUserPage.jsx';
import { AllOrderPage } from './pages/allOrder/allOrderPage.jsx';
import { UserOrderPage } from './pages/userOrder/userOrderPage.jsx';

// ✅ Define all app routes
const router = createBrowserRouter([
  {
    path: '/',                              // Root route
    element: <App />,                       // Main layout (Navbar + Outlet)
    errorElement: <ErrorPage />,            // Error fallback page 
    children: [
      { index: true, element: <Home />, errorElement: <ErrorPage /> },
      { path: "login", element: <LoginForm />, errorElement: <ErrorPage /> },
      { path: "register", element: <RegisterPage />, errorElement: <ErrorPage /> },
      { path: "dashboard", element: <UserDashboard />, errorElement: <ErrorPage /> },
      { path: "all-users", element: <ProtectRoute><AllUserPage /></ProtectRoute>, errorElement: <ErrorPage /> },
      {path: "user/:id/orders", element: <ProtectRoute><UserOrderPage /></ProtectRoute>,
        errorElement: <ErrorPage />  },
      { path: "all-orders", element: <ProtectRoute><AllOrderPage /></ProtectRoute>, errorElement: <ErrorPage /> },
      { path: "forget-password", element: <ForgetPassword />, errorElement: <ErrorPage /> },
      { path: "reset-password/:token", element: <ResetPassword />, errorElement: <ErrorPage /> },
      // ✅ Protected routes - only accessible to authenticated users
      { path: "cart", element: <ProtectRoute><CartPage /></ProtectRoute>, errorElement: <ErrorPage /> },
      { path: "order", element: <ProtectRoute><OrderPage /></ProtectRoute>, errorElement: <ErrorPage /> },
      { path: "checkout", element: <ProtectRoute><Checkout /></ProtectRoute>, errorElement: <ErrorPage /> }
    ]
  }
]);

// ✅ Render app with Router & AuthProvider (global auth state)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
  
);
