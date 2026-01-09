import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();
  const { scrollYProgress } = useScroll();

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
  ];

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <nav className={`navbar curved ${visible || isOpen ? 'visible' : 'hidden'} ${isOpen ? 'navbar-open' : ''}`}>
      <div className="container nav-inner">
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
        
        <motion.button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.92, rotate: -8 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

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
                    <span className="nav-link-text">{link.label}</span>
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
                  {link.label}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
