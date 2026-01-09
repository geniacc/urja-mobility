import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ScrollRestoration, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app-container">
      <div className="site-bg">
        <div className="bg-layer bg-layer-1" />
        <div className="bg-layer bg-layer-2" />
        <div className="bg-stars" />
      </div>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
