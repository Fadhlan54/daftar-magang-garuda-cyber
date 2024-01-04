import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterPage from "./pages/register";
import ErrorPage from "./pages/404";
import Product from "./pages/product";
import ProfilePage from "./pages/profile";
import TopUpPage from "./pages/topUp";
import DetailProductPage from "./pages/DetailProduct";
import CheckoutPage from "./pages/CheckoutPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import DarkModeContextProvider from "./context/Darkmode";
import UserContextProvider from "./context/userContext";
import { TotalPriceProvider } from "./context/TotalPriceContext";
import TransactionHistoryPage from "./pages/TransactionHistory";
import VoucherPage from "./pages/Voucher";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/top-up",
    element: <TopUpPage />,
  },
  {
    path: "/products/:id",
    element: <DetailProductPage />,
  },
  {
    path: "/checkout/:id",
    element: <CheckoutPage />,
  },
  {
    path: "/transactions/history",
    element: <TransactionHistoryPage />,
  },
  {
    path: "/vouchers",
    element: <VoucherPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <UserContextProvider>
          <TotalPriceProvider>
            <RouterProvider router={router} />
          </TotalPriceProvider>
        </UserContextProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
