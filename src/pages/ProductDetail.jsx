import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <-- 1. IMPORTED THE CART CONTEXT
import { categories } from "../data/mockData";
import { AnimatePresence, motion, useMotionValue, useMotionTemplate } from "framer-motion";
import {
  Zap, Battery, CheckCircle2, ShieldCheck, Box, Cpu,
  ShoppingCart, Star, FileText, ChevronRight, Download,
  TrendingDown, Leaf, Activity
} from "lucide-react";

// --- Utility Components ---
const SpotlightCard = ({ children, style = {}, spotlightColor = "rgba(255,255,255,0.1)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div onMouseMove={handleMouseMove} className="group" style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      <motion.div
        style={{
          pointerEvents: "none", position: "absolute", inset: 0,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
          opacity: 0, zIndex: 1
        }}
        whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
};

// --- Data Formatters ---
const formatValue = (value) => {
  if (value === null || value === undefined || value === "Pending" || value === "TBD" || value === "") return "-";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const humanizeKey = (key) => {
  if (!key) return "";
  return String(key).replace(/_/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim()
    .replace(/^./, str => str.toUpperCase());
};

const flattenObject = (obj, prefix = "") => {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, nextKey));
      return acc;
    }
    acc[nextKey] = value;
    return acc;
  }, {});
};

// --- Animation Variants ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart(); // <-- 2. EXTRACTED ADD TO CART FUNCTION
  const [activeImage, setActiveImage] = useState(0);
  const [activeMainTab, setActiveMainTab] = useState("features"); // 'features', 'specs', 'roi', 'downloads'
  const [quantity, setQuantity] = useState(1);
  const [cartNotice, setCartNotice] = useState(false);

  // Helper to map title to specific asset filenames with URL encoding for spaces
  const getProductImage = (title) => {
    if (!title) return null;
    const t = title.toLowerCase();

    // 1. INVERTERS, MPPT & UPS 
    if (t.includes("mppt")) return "/assets/24V%20MPPT%20Solar%20Inverte.jpeg";
    if (t.includes("3000va") || t.includes("3kva")) return "/assets/3000VA%20DSP%20Solar%20Hybrid%20UPS.jpeg";
    if (t.includes("2000va") || t.includes("2kva")) return "/assets/2000VA%20(2KVA)%2024V%20DSP%20Solar%20Hybrid%20UPS.jpeg";
    if (t.includes("1050va")) return "/assets/1050VA%20Solar%20UPS.jpeg";
    if (t.includes("1000va") || t.includes("1kva")) return "/assets/1000VA%20DSP%20Solar%20Hybrid%20UPS%20.jpeg";
    if (t.includes("850va")) return "/assets/850VA%2012V%20Solar%20UPS.jpeg";
    if (t.includes("300va")) return "/assets/300VA%20DSP%20Solar%20Hybrid%20UPS.jpeg";

    // 2. LFP BATTERIES 
    if (t.includes("232")) return "/assets/51.2v%20232ah.png";
    if (t.includes("64v") && t.includes("105")) return "/assets/64v%20105ah.png";
    if (t.includes("105") && !t.includes("1050")) return "/assets/51.2v%20105ah.png";
    if (t.includes("100") && !t.includes("1000")) return "/assets/51.2v%20100ah.png";
    if (t.includes("50a")) return "/assets/51.2v%2050a.png";
    if (t.includes("25a")) return "/assets/51.2v%2025a.png";

    return null;
  };

  // 1. Find Product
  let product = null;
  let category = null;
  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (sub.items) {
        const found = sub.items.find(i => i.id === id);
        if (found) { product = found; category = cat; break; }
      }
      if (sub.groups) {
        for (const group of sub.groups) {
          const found = group.items.find(i => i.id === id);
          if (found) { product = found; category = cat; break; }
        }
      }
      if (product) break;
    }
    if (product) break;
  }

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [id]);

  if (!product) {
    return (
      <div style={{ padding: "10rem 2rem", textAlign: "center", minHeight: "100vh", paddingTop: "var(--nav-height, 100px)" }}>
        <h2>Product not found</h2>
        <Link to="/products" style={{ color: "var(--primary)", marginTop: "1rem", display: "inline-block" }}>Back to Products</Link>
      </div>
    );
  }

  const accentColor = category ? category.color : "#3b82f6";
  const details = product.details || {};

  // Set up the dynamic gallery array
  const batteryImg = product.image || getProductImage(product.title);
  const galleryImages = details.gallery || [batteryImg, null, null, null];
  const currentDisplayImage = galleryImages[activeImage] || batteryImg;

  const handleAddToCart = () => {
    addToCart({ ...product, image: currentDisplayImage || batteryImg }, quantity);
    setCartNotice(true);
    window.clearTimeout(window.__urjaCartNoticeTimer);
    window.__urjaCartNoticeTimer = window.setTimeout(() => setCartNotice(false), 2200);
  };

  // 2. Extract Technical Data
  const technicalSpecs = useMemo(() => {
    const provided = details.technical || {};
    const derived = {
      general: provided.general || details.general,
      electrical: provided.electrical || details.electrical || details.electricalSpecs,
      mechanical: provided.mechanical || details.mechanical || details.mechanicalSpecs,
      bms: provided.bms || details.bms || details.protection,
      compliance: provided.compliance || details.compliance || details.safetyCompliance
    };
    return Object.values(derived).some(v => v) ? derived : null;
  }, [details]);

  const techSections = useMemo(() => {
    if (!technicalSpecs) return [];
    return [
      { id: "general", label: "General", data: technicalSpecs.general },
      { id: "electrical", label: "Electrical", data: technicalSpecs.electrical },
      { id: "mechanical", label: "Mechanical", data: technicalSpecs.mechanical },
      { id: "bms", label: "BMS / Protection", data: technicalSpecs.bms },
      { id: "compliance", label: "Compliance", data: technicalSpecs.compliance }
    ].filter(s => s.data && (Array.isArray(s.data) ? s.data.length > 0 : Object.keys(s.data).length > 0));
  }, [technicalSpecs]);

  const [activeTechSection, setActiveTechSection] = useState(techSections[0]?.id || "general");

  return (
    <motion.div
      className="page-container"
      initial="hidden" animate="visible" variants={pageVariants}
      style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: "6rem", paddingTop: "var(--nav-height, 100px)", overflowX: "hidden" }}
    >
      <AnimatePresence>
        {cartNotice && (
          <motion.div
            initial={{ opacity: 0, y: -18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            style={{
              position: "fixed",
              top: "96px",
              right: "24px",
              zIndex: 1500,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.95rem 1.15rem",
              borderRadius: "14px",
              background: "rgba(15, 23, 42, 0.96)",
              border: "1px solid rgba(34,197,94,0.45)",
              color: "var(--text)",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45), 0 0 22px rgba(34,197,94,0.16)",
              backdropFilter: "blur(14px)"
            }}
          >
            <CheckCircle2 size={20} color="#22c55e" />
            <div>
              <div style={{ fontWeight: 800, lineHeight: 1.2 }}>Item added to cart</div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>{quantity} x {product.title}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Breadcrumbs */}
      <motion.div variants={itemVariants} style={{ background: "var(--bg-2)", borderBottom: "1px solid var(--border)", padding: "1rem 2rem" }}>
        <div className="container" style={{ maxWidth: "1280px", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          <Link to="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Products</Link>
          <ChevronRight size={14} />
          <span style={{ color: "var(--text-muted)" }}>{category?.title || "Category"}</span>
          <ChevronRight size={14} />
          <span style={{ color: accentColor, fontWeight: 600 }}>{product.title}</span>
        </div>
      </motion.div>

      <div className="container" style={{ maxWidth: "1280px", padding: "3rem 2rem" }}>

        {/* Top Product Box */}
        <div className="product-detail-main-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "4rem", marginBottom: "5rem" }}>

          {/* Left: Gallery */}
          <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <SpotlightCard spotlightColor={accentColor} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "24px", height: "500px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: "60%", height: "60%", background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`, filter: "blur(40px)" }}
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 1.1, x: -50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000 || offset.x < -50) {
                      setActiveImage((prev) => (prev + 1) % 4); // Swipe left
                    } else if (swipe > 10000 || offset.x > 50) {
                      setActiveImage((prev) => (prev - 1 + 4) % 4); // Swipe right
                    }
                  }}
                  style={{ zIndex: 2, cursor: "grab", touchAction: "none", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
                  whileTap={{ cursor: "grabbing", scale: 0.95 }}
                >
                  {currentDisplayImage ? (
                    <img
                      src={currentDisplayImage}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        filter: `drop-shadow(0 30px 50px ${accentColor}40)`,
                        pointerEvents: "none"
                      }}
                    />
                  ) : (
                    <Battery size={200} color={accentColor} strokeWidth={0.5} style={{ filter: `drop-shadow(0 30px 50px ${accentColor}50)` }} />
                  )}
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>

            <div className="product-thumb-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
              {[0, 1, 2, 3].map((idx) => {
                const thumbImg = galleryImages[idx];

                return (
                  <motion.button
                    key={idx} onClick={() => setActiveImage(idx)} whileHover={{ y: -5 }}
                    style={{ position: "relative", height: "90px", borderRadius: "16px", background: "var(--bg-2)", border: activeImage === idx ? `2px solid ${accentColor}` : "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden" }}
                  >
                    {activeImage === idx && <motion.div layoutId="activeThumb" style={{ position: "absolute", inset: 0, background: `${accentColor}10` }} />}

                    {thumbImg ? (
                      <img src={thumbImg} style={{ width: "70%", height: "70%", objectFit: "contain", zIndex: 2, opacity: activeImage === idx ? 1 : 0.6 }} />
                    ) : (
                      <Box size={28} color={activeImage === idx ? accentColor : "var(--text-muted)"} style={{ zIndex: 2 }} />
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Modern E-Commerce Buy Box */}
          <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column" }}>

            {/* Category & SKU */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <span style={{ color: accentColor, fontWeight: 700, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
                {category?.title || "Premium Series"}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "monospace" }}>
                SKU: URJ-{product.id || "LFP-105-X"}
              </span>
            </div>

            {/* Title & Reviews */}
            <h1 style={{ fontSize: "clamp(2rem, 3vw, 2.5rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "1rem" }}>
              {product.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", color: "#f59e0b" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
              </div>
              <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.95rem" }}>4.8</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem", textDecoration: "underline", cursor: "pointer" }}>
                Read 124 Reviews
              </span>
            </div>

            {/* Pricing Section */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  ₹{product.price || "85,999"}
                </span>
                <span style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--text-muted)", textDecoration: "line-through", marginBottom: "0.3rem" }}>
                  ₹{product.msrp || "99,999"}
                </span>
                <span style={{ background: "#10b98115", color: "#10b981", padding: "4px 8px", borderRadius: "6px", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.4rem" }}>
                  Save 14%
                </span>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginTop: "0.5rem" }}>Includes GST. EMI starts at ₹4,100/mo.</p>
            </div>

            {/* Description */}
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              {product.desc || "Engineered to the URJA MOBILITY standard for maximum reliability. Experience seamless LFP power delivery and smart energy management for heavy storage applications."}
            </p>

            {/* Stock & Delivery (Urgency) */}
            <div style={{ background: "var(--bg-2)", padding: "1.2rem", borderRadius: "12px", border: "1px solid var(--border)", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b98180" }}></div>
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>In Stock & Ready to Ship</span>
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <span><strong style={{ color: "var(--text-primary)" }}>Free Delivery</strong> to West Bengal via Urja Logistics.</span>
                <span>Order within <strong style={{ color: "#f59e0b" }}>3 hrs 15 mins</strong> for dispatch today.</span>
              </div>
            </div>

            {/* Action Controls: Quantity + Add to Cart */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              {/* Quantity Selector */}
              <div style={{ display: "flex", alignItems: "center", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "12px", padding: "0.5rem" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "1.2rem", width: "36px", height: "36px", cursor: "pointer", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseOver={(e) => e.target.style.background = "var(--bg-3)"} onMouseOut={(e) => e.target.style.background = "transparent"}>-</button>
                <span style={{ width: "40px", textAlign: "center", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} style={{ background: "transparent", border: "none", color: "var(--text-primary)", fontSize: "1.2rem", width: "36px", height: "36px", cursor: "pointer", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseOver={(e) => e.target.style.background = "var(--bg-3)"} onMouseOut={(e) => e.target.style.background = "transparent"}>+</button>
              </div>

              {/* Primary CTA */}
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ flex: 1, background: accentColor, color: "#fff", border: "none", padding: "0 1.5rem", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", fontWeight: 800, fontSize: "1.1rem", cursor: "pointer", boxShadow: `0 10px 25px ${accentColor}40` }}
              >
                <ShoppingCart size={22} /> Add to Cart
              </motion.button>

            </div>

            {/* Trust Badges */}
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", fontWeight: 600 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><ShieldCheck size={18} color={accentColor} /> Secure Checkout</div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><CheckCircle2 size={18} color={accentColor} /> 5-Year Warranty</div>
            </div>

          </motion.div>
        </div>

        {/* --- DYNAMIC TABS SECTION --- */}
        <motion.div className="product-tabs-panel" variants={itemVariants} style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "24px", overflow: "hidden" }}>

          <div style={{ display: "flex", overflowX: "auto", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)", position: "relative" }}>
            {[
              { id: "features", label: "Core Value", icon: <ShieldCheck size={18} /> },
              { id: "specs", label: "Technical Data", icon: <Cpu size={18} /> },
              { id: "downloads", label: "Downloads", icon: <Download size={18} /> }
            ].map(tab => (
              <button
                key={tab.id} onClick={() => setActiveMainTab(tab.id)}
                style={{
                  flex: 1, minWidth: "160px", padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  background: "transparent", border: "none",
                  color: activeMainTab === tab.id ? accentColor : "var(--text-muted)",
                  fontWeight: activeMainTab === tab.id ? 800 : 600, cursor: "pointer", position: "relative", zIndex: 2
                }}
              >
                {activeMainTab === tab.id && <motion.div layoutId="activeTabBottom" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px", background: accentColor, borderRadius: "3px 3px 0 0" }} />}
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="product-tab-content" style={{ padding: "4rem 3rem", minHeight: "450px" }}>
            <AnimatePresence mode="wait">

              {/* TAB 1: CORE FEATURES */}
              {activeMainTab === "features" && (
                <motion.div key="features" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                  {[
                    { icon: <Activity size={32} />, title: "Smart Battery Management", desc: "Built-in algorithms protect against overcharging, short-circuiting, and temperature extremes automatically." },
                    { icon: <Leaf size={32} />, title: "Eco-Friendly Footprint", desc: "100% recyclable components with zero toxic heavy metals. Clean energy from manufacturing to end-of-life." },
                    { icon: <ShieldCheck size={32} />, title: "Drop-in Replacement", desc: "Designed to perfectly match standard form factors. Upgrade your legacy systems in minutes, not hours." }
                  ].map((feat, i) => (
                    <SpotlightCard key={i} spotlightColor={accentColor} style={{ padding: "2.5rem", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "20px" }}>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{ color: accentColor, marginBottom: "1.5rem", background: `${accentColor}15`, display: "inline-block", padding: "1rem", borderRadius: "16px", originX: 0 }}
                      >
                        {feat.icon}
                      </motion.div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "1rem", color: "var(--text-primary)" }}>{feat.title}</h3>
                      <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{feat.desc}</p>
                    </SpotlightCard>
                  ))}
                </motion.div>
              )}

              {/* TAB 2: TECHNICAL SPECS */}
              {activeMainTab === "specs" && (
                <motion.div key="specs" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  {techSections.length > 0 ? (
                    <div className="product-tech-grid" style={{ display: "grid", gridTemplateColumns: "250px 1fr", gap: "4rem" }}>
                      {/* Side Nav */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {techSections.map(section => (
                          <button
                            key={section.id} onClick={() => setActiveTechSection(section.id)}
                            style={{ textAlign: "left", padding: "1rem 1.2rem", borderRadius: "12px", border: "none", cursor: "pointer", transition: "all 0.2s", background: activeTechSection === section.id ? `${accentColor}15` : "transparent", color: activeTechSection === section.id ? accentColor : "var(--text-primary)", fontWeight: activeTechSection === section.id ? 800 : 600 }}
                          >
                            {section.label}
                          </button>
                        ))}
                      </div>

                      {/* Data Display */}
                      <div style={{ position: "relative" }}>
                        <AnimatePresence mode="wait">
                          {techSections.map(section => {
                            if (section.id !== activeTechSection) return null;
                            const isList = Array.isArray(section.data);
                            const entries = !isList ? Object.entries(flattenObject(section.data)) : [];

                            return (
                              <motion.div key={section.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
                                <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "2rem", color: "var(--text-primary)" }}>{section.label} Specifications</h3>

                                {isList ? (
                                  <ul style={{ display: "grid", gap: "1rem", listStyle: "none", padding: 0 }}>
                                    {section.data.map((item, idx) => (
                                      <li key={idx} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
                                        <CheckCircle2 size={20} color={accentColor} style={{ flexShrink: 0, marginTop: "2px" }} />
                                        <span style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{formatValue(item)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                ) : (
                                  <div className="tech-spec-table" style={{ display: "grid", gap: "0", background: "var(--bg)", borderRadius: "16px", border: "1px solid var(--border)", overflow: "hidden" }}>
                                    {entries.map(([key, value], idx) => (
                                      <div className="tech-spec-row" key={key} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", padding: "1.25rem 1.5rem", borderBottom: idx !== entries.length - 1 ? "1px solid var(--border)" : "none", background: idx % 2 === 0 ? "transparent" : "var(--bg-2)" }}>
                                        <div style={{ color: "var(--text-muted)", fontWeight: 600, display: "flex", alignItems: "center" }}>{humanizeKey(key)}</div>
                                        <div style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "monospace", fontSize: "1.1rem" }}>
                                          {Array.isArray(value) ? value.join(", ") : formatValue(value)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                      <Cpu size={48} color="var(--text-muted)" style={{ marginBottom: "1rem", opacity: 0.5 }} />
                      <h3 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)" }}>Full Specifications Pending</h3>
                      <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>Detailed engineering data is currently being updated for this model.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 4: DOWNLOADS */}
              {activeMainTab === "downloads" && (
                <motion.div className="downloads-grid" key="downloads" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
                  {[
                    {
                      title: "Product Datasheet",
                      desc: "Comprehensive technical specifications",
                      type: "PDF",
                      size: "2.4 MB",
                      fileUrl: "/assets/MANUAL ECOSTAR 400W.pdf" // Adjust path as needed
                    },
                    {
                      title: "Installation Manual",
                      desc: "Wiring and mounting instructions",
                      type: "PDF",
                      size: "5.1 MB",
                      fileUrl: "/assets/MANUAL ECOSTAR 1000W.pdf" // Adjust path as needed
                    },
                    {
                      title: "Warranty Document",
                      desc: "Terms, conditions, and coverage details",
                      type: "PDF",
                      size: "1.2 MB",
                      fileUrl: "/assets/MANUAL ECOSTAR 1200W.pdf" // Adjust path as needed
                    }
                  ].map((doc, idx) => (
                    <motion.div whileHover={{ y: -5, borderColor: accentColor }} key={idx} style={{ border: "1px solid var(--border)", background: "var(--bg)", borderRadius: "20px", padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center", transition: "border-color 0.2s" }}>
                      <div style={{ background: `${accentColor}15`, padding: "1.2rem", borderRadius: "16px", color: accentColor }}>
                        <FileText size={28} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontWeight: 800, marginBottom: "0.35rem", fontSize: "1.1rem" }}>{doc.title}</h4>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{doc.desc}</p>
                        <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--text-secondary)" }}>
                          <span style={{ background: "var(--bg-2)", border: "1px solid var(--border)", padding: "0.3rem 0.6rem", borderRadius: "6px" }}>{doc.type}</span>
                          <span style={{ background: "var(--bg-2)", border: "1px solid var(--border)", padding: "0.3rem 0.6rem", borderRadius: "6px" }}>{doc.size}</span>
                        </div>
                      </div>

                      <motion.a
                        href={doc.fileUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ background: "transparent", border: "none", color: accentColor, cursor: "pointer", display: "inline-flex" }}
                      >
                        <Download size={24} />
                      </motion.a>

                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
