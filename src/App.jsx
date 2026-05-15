import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Career from "./pages/Career";
import NewsMedia from "./pages/NewsMedia";
import Cart from "./pages/Cart";

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
      {
        path: "cart",
        element: <Cart />
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL
});

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}