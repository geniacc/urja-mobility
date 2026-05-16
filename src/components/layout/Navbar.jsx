import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, Boxes, Info, Newspaper, Briefcase, Phone, ShoppingCart, LogIn } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

  const { cartItems } = useCart();
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Show navbar only when there's site movement (scroll/mouse/touch)
  useEffect(() => {
    let hideTimer;
    const onActivity = () => {
      setVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        // keep visible while mobile menu open
        setVisible((v) => (isOpen ? true : false));
      }, 2500);
    };
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("touchstart", onActivity, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchstart", onActivity);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const links = [
    { path: "/", label: "Home", icon: <Home size={16} /> },
    { path: "/products", label: "Products", icon: <Boxes size={16} /> },
    { path: "/about", label: "About Us", icon: <Info size={16} /> },
    { path: "/news-media", label: "News & Media", icon: <Newspaper size={16} /> },
    { path: "/career", label: "Career", icon: <Briefcase size={16} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={16} /> },
    { path: "/login", label: "Login", icon: <LogIn size={16} /> },
    { path: "/cart", label: "Cart", isCart: true, icon: <ShoppingCart size={16} /> },
  ];

  const bottomLinks = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/products", label: "Products", icon: <Boxes size={20} /> },
    { path: "/cart", label: "Cart", icon: <ShoppingCart size={20} /> },
    { path: "/news-media", label: "News", icon: <Newspaper size={20} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={20} /> },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <style>
        {`
          /* --- NARROWER FLUSH TOP NAVBAR --- */
          .navbar {
            width: 95% !important; /* Decreased width */
            max-width: 1500px !important;
            margin: 0 auto !important; /* Centered */
            margin-top: 0 !important; /* Keeps it flush with top */
            top: 0 !important;
            background: rgba(10, 15, 30, 0.75) !important;
            backdrop-filter: blur(24px) saturate(180%);
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            border-left: 1px solid rgba(255, 255, 255, 0.12);
            border-right: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 0 0 24px 24px; /* Rounded bottom corners */
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
            padding: 0.2rem 0;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1000;
          }

          .navbar:hover {
            background: rgba(10, 15, 30, 0.85) !important;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 222, 128, 0.15);
          }

          .nav-inner {
            max-width: 100% !important;
            width: 96% !important;
            margin: 0 auto;
            display: flex;
            align-items: center;
          }

          /* --- SLEEKER & COMPACT TEXT WITH ICONS --- */
          .nav-link {
            font-size: 0.95rem !important;
            letter-spacing: 0.3px;
            color: #ffffff !important;
            font-weight: 500 !important;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(255,255,255,0.2) !important;
            padding: 0.4rem 0.2rem;
            position: relative;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .nav-link:hover {
            color: #4ade80 !important;
            text-shadow: 0 0 14px rgba(74, 222, 128, 0.6), 0 2px 6px rgba(0,0,0,0.9) !important;
          }

          .nav-link.active {
            color: #4ade80 !important;
            font-weight: 700 !important;
            text-shadow: 0 0 18px rgba(74, 222, 128, 0.8), 0 2px 4px rgba(0,0,0,0.9) !important;
          }

          .nav-underline {
            position: absolute;
            bottom: -4px;
            left: 0;
            right: 0;
            height: 2px;
            background: #4ade80;
            border-radius: 4px;
            box-shadow: 0 0 8px #4ade80, 0 0 15px rgba(74, 222, 128, 0.5);
          }

          /* Mobile Menu Customization */
          .mobile-menu-link {
            font-size: 1.05rem !important;
            color: #ffffff !important;
            font-weight: 500 !important;
            text-shadow: 0 2px 5px rgba(0,0,0,0.9) !important;
            transition: all 0.3s ease;
          }
          .mobile-menu-link:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            padding-left: 1.2rem !important;
            color: #4ade80 !important;
          }
          .mobile-menu-link.active {
            color: #4ade80 !important;
            background: rgba(34, 197, 94, 0.15) !important;
            text-shadow: 0 0 12px rgba(74, 222, 128, 0.6), 0 2px 4px rgba(0,0,0,0.8) !important;
            border-left: 3px solid #4ade80;
          }

          /* Bottom Navigation Customization */
          .bottom-nav {
            background: rgba(10, 15, 30, 0.85) !important;
            backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }
          .bottom-nav-item {
            color: rgba(255, 255, 255, 0.8) !important;
            font-weight: 600;
            font-size: 0.85rem !important;
            text-shadow: 0 1px 4px rgba(0,0,0,0.9) !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .bottom-nav-item:hover {
            color: #ffffff !important;
            transform: translateY(-2px);
          }
          .bottom-nav-item.active {
            color: #4ade80 !important;
            font-weight: 800 !important;
            text-shadow: 0 0 15px rgba(74, 222, 128, 0.8), 0 2px 4px rgba(0,0,0,0.9) !important;
            transform: translateY(-4px);
          }
          
          .mobile-floating-wrapper {
            display: none;
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
          }
          @media (max-width: 768px) {
            .mobile-floating-wrapper { display: block; }
          }
          .mobile-dropdown {
            position: absolute;
            top: 55px;
            right: 0;
            width: 260px;
            background: rgba(5, 10, 20, 0.95);
            backdrop-filter: blur(25px);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 15px 40px rgba(0,0,0,0.9), 0 0 15px rgba(74, 222, 128, 0.1);
            display: flex;
            flex-direction: column;
            padding: 0.75rem;
          }
        `}
      </style>

      {/* Desktop Navbar */}
      <nav className={`navbar curved ${visible || isOpen ? 'visible' : 'hidden'} ${isOpen ? 'navbar-open' : ''}`}>
        <div className="container nav-inner" style={{ position: "relative" }}>

          <motion.div
            className="nav-progress"
            style={{
              scaleX: scrollYProgress,
              background: "linear-gradient(90deg, #22c55e, #4ade80)",
              height: "2px",
              boxShadow: "0 0 8px #4ade80",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              transformOrigin: "0%"
            }}
          />

          {/* Reverted Logo Block to original format and size (with brand-glow) */}
          <NavLink to="/" className="brand" style={{ marginRight: "1.5rem" }}>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="brand-glow" />
              <img
                src={import.meta.env.BASE_URL + "assets/logo.png"}
                alt="Logo"
                style={{
                  width: 130,   /* Kept slightly larger as originally requested */
                  height: 130,
                  objectFit: "contain",
                  filter: "brightness(1.65) drop-shadow(0 0 16px rgba(34, 197, 94, 0.65))",
                  transition: "filter 0.3s ease"
                }}
              />
            </motion.div>
          </NavLink>

          <motion.div
            className="nav-links desktop-only"
            initial="hidden"
            animate="visible"
            key={visible ? 'links-visible' : 'links-hidden'}
            transition={{ staggerChildren: 0.04, delayChildren: 0.05 }}
            style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}
          >
            {links.map((link) => (
              <motion.div
                key={link.path}
                variants={linkVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  {({ isActive }) => (
                    <>
                      <span className="nav-link-text" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", position: "relative" }}>
                        <span style={{ color: isActive ? "#4ade80" : "rgba(255,255,255,0.7)" }}>
                          {link.icon}
                        </span>
                        {link.label}

                        {link.isCart && cartItemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            style={{
                              position: "absolute",
                              top: "-12px",
                              right: "-16px",
                              width: "18px",
                              height: "18px",
                              borderRadius: "999px",
                              background: "linear-gradient(135deg, #4ade80, #16a34a)",
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.65rem",
                              fontWeight: 900,
                              boxShadow: "0 0 12px rgba(34,197,94,0.8), inset 0 2px 4px rgba(255,255,255,0.4)",
                              textShadow: "none"
                            }}
                          >
                            {cartItemCount}
                          </motion.span>
                        )}
                      </span>

                      {isActive && (
                        <motion.div
                          layoutId="underline"
                          className="nav-underline"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* Floating Mobile Hamburger Menu */}
      <div className="mobile-floating-wrapper">
        <motion.button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.08, boxShadow: "0 0 15px rgba(74, 222, 128, 0.4)" }}
          whileTap={{ scale: 0.9, rotate: -15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(10, 15, 30, 0.95)',
            border: '1px solid rgba(74, 222, 128, 0.4)',
            padding: '10px',
            borderRadius: '12px',
            color: isOpen ? '#4ade80' : 'white',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.6)',
            width: '46px',
            height: '46px',
            marginLeft: 'auto',
            transition: 'color 0.3s ease'
          }}
        >
          {isOpen ? <X size={24} style={{ strokeWidth: 2.5 }} /> : <Menu size={24} style={{ strokeWidth: 2.5 }} />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-dropdown"
              initial={{ opacity: 0, y: -15, scale: 0.95, rotateX: -10 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, y: -15, scale: 0.95, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{ transformOrigin: "top right" }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => isActive ? "mobile-menu-link active" : "mobile-menu-link"}
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      margin: '2px 0',
                      display: 'block'
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.85rem" }}>
                      <span style={{ color: "inherit", opacity: 0.8 }}>
                        {link.icon}
                      </span>
                      {link.label}
                      {link.isCart && cartItemCount > 0 && (
                        <span style={{
                          minWidth: "20px",
                          height: "20px",
                          padding: "0 6px",
                          borderRadius: "999px",
                          background: "linear-gradient(135deg, #4ade80, #16a34a)",
                          color: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 900,
                          marginLeft: 'auto',
                          boxShadow: "0 0 12px rgba(34,197,94,0.7)",
                          textShadow: "none"
                        }}>
                          {cartItemCount}
                        </span>
                      )}
                    </span>
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {bottomLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "bottom-nav-item active" : "bottom-nav-item"
            }
            style={{ position: "relative" }}
          >
            <motion.span
              className="bottom-nav-icon"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {link.icon}
              {link.path === "/cart" && cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  style={{
                    position: "absolute", top: "-5px", right: "5px",
                    background: "#4ade80", color: "#000", fontSize: "0.6rem", fontWeight: "900",
                    width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "50%", border: "2px solid #050a14",
                    boxShadow: "0 0 8px rgba(74,222,128,0.7)"
                  }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.span>
            <span className="bottom-nav-label" style={{ display: "block", marginTop: "3px" }}>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}