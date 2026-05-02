import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // <-- IMPORT THIS
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Career from "./pages/Career";
import NewsMedia from "./pages/NewsMedia";
import Cart from "./pages/Cart"; // <-- IMPORT YOUR CART PAGE (We will create this in Step 4)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "career",
        element: <Career />,
      },
      {
        path: "news-media",
        element: <NewsMedia />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <Login />,
      },
      { path: "cart", element: <Cart /> }, // <-- ADD CART ROUTE
    ],
  },
]);

export default function App() {
  return (
    // Make sure CartProvider is wrapped around RouterProvider like this!
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}