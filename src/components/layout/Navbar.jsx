import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Home, Boxes, Info, Newspaper, Briefcase, Phone, ShoppingCart } from "lucide-react";
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
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About Us" },
    { path: "/news-media", label: "News & Media" },
    { path: "/career", label: "Career" },
    { path: "/contact", label: "Contact" },
    { path: "/login", label: "Login" },
    { path: "/cart", label: "Cart", isCart: true },
  ];

  const bottomLinks = [
    { path: "/", label: "Home", icon: <Home size={18} /> },
    { path: "/products", label: "Products", icon: <Boxes size={18} /> },
    { path: "/cart", label: "Cart", icon: <ShoppingCart size={18} /> },
    { path: "/news-media", label: "News", icon: <Newspaper size={18} /> },
    { path: "/contact", label: "Contact", icon: <Phone size={18} /> },
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <nav className={`navbar curved ${visible || isOpen ? 'visible' : 'hidden'} ${isOpen ? 'navbar-open' : ''}`}>
        <div className="container nav-inner" style={{ position: "relative" }}>
          <motion.div className="nav-progress" style={{ scaleX: scrollYProgress }} />
          <NavLink to="/" className="brand">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <div className="brand-glow" />
              <img src="/assets/logo.png" alt="Logo" style={{ width: 92, height: 92, objectFit: "contain" }} />
            </motion.div>
          </NavLink>

          <motion.div
            className="nav-links desktop-only"
            initial="hidden"
            animate="visible"
            key={visible ? 'links-visible' : 'links-hidden'}
            transition={{ staggerChildren: 0.03 }}
          >
            {links.map((link) => (
              <motion.div key={link.path} variants={linkVariants} whileHover={{ y: -2 }}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                >
                  {({ isActive }) => (
                    <>
                      <span className="nav-link-text" style={link.isCart ? { display: "inline-flex", alignItems: "center", gap: "0.35rem", position: "relative" } : undefined}>
                        {link.isCart && <ShoppingCart size={17} />}
                        {link.label}
                        {link.isCart && cartItemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{
                              position: "absolute",
                              top: "-12px",
                              right: "-16px",
                              width: "18px",
                              height: "18px",
                              borderRadius: "999px",
                              background: "#22c55e",
                              color: "#fff",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.65rem",
                              fontWeight: 800,
                              boxShadow: "0 0 12px rgba(34,197,94,0.55)"
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
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <motion.button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              whileTap={{ scale: 0.92, rotate: -8 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => isActive ? "mobile-menu-link active" : "mobile-menu-link"}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                      {link.isCart && <ShoppingCart size={18} />}
                      {link.label}
                      {link.isCart && cartItemCount > 0 && (
                        <span style={{
                          minWidth: "20px",
                          height: "20px",
                          padding: "0 6px",
                          borderRadius: "999px",
                          background: "#22c55e",
                          color: "#fff",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 800
                        }}>
                          {cartItemCount}
                        </span>
                      )}
                    </span>
                  </NavLink>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

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
            <span className="bottom-nav-icon">
              {link.icon}
              {/* Added badge logic to bottom nav icon too */}
              {link.path === "/cart" && cartItemCount > 0 && (
                <span style={{
                  position: "absolute", top: "-4px", right: "10px",
                  background: "#10b981", color: "white", fontSize: "0.6rem", fontWeight: "bold",
                  width: "16px", height: "16px", display: "flex", alignItems: "center", justifyContent: "center",
                  borderRadius: "50%", border: "2px solid var(--bg)"
                }}>
                  {cartItemCount}
                </span>
              )}
            </span>
            <span className="bottom-nav-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
