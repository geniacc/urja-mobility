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
      {/* Dynamic styles to handle ONLY the new top-right mobile menu without touching your CSS files */}
      <style>
        {`
          .mobile-floating-wrapper {
            display: none;
            position: fixed;
            top: 15px;
            right: 15px;
            z-index: 9999;
          }
          @media (max-width: 768px) {
            .mobile-floating-wrapper {
              display: block;
            }
          }
          .mobile-dropdown {
            position: absolute;
            top: 60px;
            right: 0;
            width: 260px;
            background: rgba(3, 7, 18, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.7);
            display: flex;
            flex-direction: column;
            padding: 0.75rem;
          }
        `}
      </style>

      {/* Desktop Navbar */}
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
        </div>
      </nav>

      {/* NEW: Floating Mobile Hamburger Menu (Top Right) */}
      <div className="mobile-floating-wrapper">
        <motion.button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.92, rotate: -8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '10px',
            borderRadius: '12px',
            color: 'white',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            width: '46px',
            height: '46px',
            marginLeft: 'auto'
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-dropdown"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "top right" }}
            >
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => isActive ? "mobile-menu-link active" : "mobile-menu-link"}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '10px',
                    margin: '2px 0'
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "1rem" }}>
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
                        fontWeight: 800,
                        marginLeft: 'auto'
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

      {/* Bottom Nav (Kept intact for smaller mobile functionality as defined in your CSS) */}
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