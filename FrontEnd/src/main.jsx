import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import store from "./store/index.js";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Verify from './pages/Verify.jsx';
import MyOrders from './pages/MyOrders.jsx';
import Protected_Route from "./components/Protected_Route.jsx";

import AdminLayout from './adminCompo/AdminLayout.jsx';
import AddItem from './adminCompo/AddItem';
import AllItems from './adminCompo/AllItems';
import Orders from './adminCompo/Orders';
import UpdateItem from './adminCompo/UpdateItem';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Toys from "./pages/Toys.jsx";
import Contact from "./pages/Contact.jsx";

const url = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App url={url} />}>
        <Route index element={<Home url={url} />} />
        <Route path="toys" element={<Toys url={url} />} />
        <Route path="cart" element={<Cart url={url} />} />
        <Route path="order" element={<PlaceOrder url={url} />} />
        <Route path="verify" element={<Verify url={url} />} />
        <Route path="contact" element={<Contact url={url} />} />
        <Route path="myorders" element={<MyOrders url={url} />} />
      </Route>

        <Route path="admin" element={<Protected_Route />}>
          <Route element={<AdminLayout url={url}/>}>
            <Route index element={<Navigate to="add-item" />} />
            <Route path="add-item" element={<AddItem url={url} />} />
            <Route path="all-items" element={<AllItems url={url} />} />
            <Route path="orders" element={<Orders url={url} />} />
            <Route path="updateitem" element={<UpdateItem url={url} />} />
          </Route>
        </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
