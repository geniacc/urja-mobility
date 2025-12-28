import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollRestoration, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
