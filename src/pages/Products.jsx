import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, ChevronRight, Car, Home, Sun, Plane, Zap as ZapIcon, Cpu, ExternalLink } from "lucide-react";

export default function Products() {
  const navigate = useNavigate();
  const hasTechnical = (item) => Boolean(item?.details?.technical);
  const formatValue = (value) => {
    if (value === null || value === undefined) return "TBD";
    if (typeof value === "string") {
      const normalized = value.trim();
      if (!normalized) return "TBD";
      if (normalized.toLowerCase() === "pending") return "TBD";
      return normalized;
    }
    return String(value);
  };

  const getProductImage = (title) => {
    if (!title) return null;
    const t = title.toLowerCase();

    // Inverters
    if (t.includes("mppt")) return import.meta.env.BASE_URL + "assets/24V%20MPPT%20Solar%20Inverter.jpeg";
    if (t.includes("3000va") || t.includes("3kva")) return import.meta.env.BASE_URL + "assets/3000VA%20DSP%20Solar%20Hybrid%20UPS.jpeg";
    if (t.includes("2000va") || t.includes("2kva")) return import.meta.env.BASE_URL + "assets/2000VA%20(2KVA)%2024V%20DSP%20Solar%20Hybrid%20UPS.jpeg";
    if (t.includes("1050va")) return import.meta.env.BASE_URL + "assets/1050VA%20Solar%20UPS.jpeg";
    if (t.includes("1000va") || t.includes("1kva")) return import.meta.env.BASE_URL + "assets/1000VA%20DSP%20Solar%20Hybrid%20UPS%20.jpeg";
    if (t.includes("850va")) return import.meta.env.BASE_URL + "assets/850VA%2012V%20Solar%20UPS.jpeg";
    if (t.includes("300va")) return import.meta.env.BASE_URL + "assets/300VA%20DSP%20Solar%20Hybrid%20UPS.jpeg";

    // Batteries
    if (t.includes("232")) return import.meta.env.BASE_URL + "assets/51.2v%20232ah%201.png";
    if (t.includes("230")) return import.meta.env.BASE_URL + "assets/51.2v%20230ah%201.png";
    if (t.includes("64v") && t.includes("105")) return import.meta.env.BASE_URL + "assets/64%20v%20105ah%201.png";
    if (t.includes("105") && !t.includes("1050")) return import.meta.env.BASE_URL + "assets/51.2v%20105ah%201.png";
    if (t.includes("100") && !t.includes("1000")) return import.meta.env.BASE_URL + "assets/51.2v%20100ah%201.png";
    if (t.includes("50a")) return import.meta.env.BASE_URL + "assets/51.2v%2050a%201.png";
    if (t.includes("25a")) return import.meta.env.BASE_URL + "assets/51.2v%2025a%201.png";

    return null;
  };

  const visibleCategories = useMemo(() => {
    const isNotDSPSolarHybridSeries = (entity) => {
      if (!entity || !entity.title) return true;
      return entity.title.toLowerCase().trim() !== "dsp solar hybrid ups series";
    };

    return (categories || [])
      .map((cat) => {
        const subcategories = (cat.subcategories || [])
          .filter(isNotDSPSolarHybridSeries)
          .map((sub) => {
            if (sub.items) {
              const items = sub.items.filter(isNotDSPSolarHybridSeries).filter(hasTechnical);
              if (!items.length) return null;
              return { ...sub, items };
            }
            if (sub.groups) {
              const groups = sub.groups
                .filter(isNotDSPSolarHybridSeries)
                .map((group) => {
                  const items = (group.items || []).filter(isNotDSPSolarHybridSeries).filter(hasTechnical);
                  if (!items.length) return null;
                  return { ...group, items };
                }).filter(Boolean);
              if (!groups.length) return null;
              return { ...sub, groups };
            }
            return null;
          }).filter(Boolean);
        if (!subcategories.length) return null;
        return { ...cat, subcategories };
      }).filter(Boolean);
  }, []);

  const [activeCategory, setActiveCategory] = useState(visibleCategories[0]?.id);
  const [activeSubcategory, setActiveSubcategory] = useState(visibleCategories[0]?.subcategories?.[0]?.id);
  const [activeGroup, setActiveGroup] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const cat = visibleCategories.find(c => c.id === activeCategory);
    if (cat && cat.subcategories.length > 0) {
      const firstSub = cat.subcategories[0];
      setActiveSubcategory(firstSub.id);
      if (firstSub.groups && firstSub.groups.length > 0) {
        setActiveGroup(firstSub.groups[0].id);
      } else {
        setActiveGroup(null);
      }
    } else {
      setActiveSubcategory(null);
      setActiveGroup(null);
    }
  }, [activeCategory, visibleCategories]);

  useEffect(() => {
    const cat = visibleCategories.find(c => c.id === activeCategory);
    const sub = cat?.subcategories.find(s => s.id === activeSubcategory);
    if (sub && sub.groups && sub.groups.length > 0) {
      setActiveGroup(sub.groups[0].id);
    } else {
      setActiveGroup(null);
    }
  }, [activeSubcategory, activeCategory, visibleCategories]);

  const currentCategory = visibleCategories.find(c => c.id === activeCategory);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === activeSubcategory);
  const currentGroup = currentSubcategory?.groups?.find(g => g.id === activeGroup);

  let productsToDisplay = [];
  if (currentSubcategory) {
    if (currentSubcategory.groups && currentGroup) {
      productsToDisplay = currentGroup.items.map(item => ({ ...item, color: currentCategory.color, categoryName: currentGroup.title }));
    } else if (currentSubcategory.items) {
      productsToDisplay = currentSubcategory.items.map(item => ({ ...item, color: currentCategory.color, categoryName: currentCategory.title }));
    }
  }

  const accentColor = currentCategory ? currentCategory.color : "#22c55e";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (activeCategory || !visibleCategories.length) return;
    setActiveCategory(visibleCategories[0].id);
  }, [activeCategory, visibleCategories]);

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'automotive': return <Car size={20} />;
      case 'inverter-battery': return <Home size={20} />;
      case 'solar-app': return <Sun size={20} />;
      case 'drone': return <Plane size={20} />;
      case 'ev-charger': return <ZapIcon size={20} />;
      case 'inverter': return <Cpu size={20} />;
      default: return <Battery size={20} />;
    }
  };

  const heroPadding = isMobile ? '4rem 1rem 2rem' : '6rem 2rem 4rem';
  const heroGap = isMobile ? '2.5rem' : '4rem';
  const heroMinHeight = isMobile ? 'auto' : '80vh';

  if (!visibleCategories.length) {
    return (
      <div className="page-container" style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "var(--nav-height, 100px)" }}>
        <section style={{ padding: "7rem 2rem", textAlign: "center" }}>
          <h1 style={{ color: "var(--text-primary)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800 }}>Products</h1>
          <p style={{ color: "var(--muted)", marginTop: "1rem" }}>New product data is coming soon.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden', paddingTop: "var(--nav-height, 100px)" }}>

      {/* Hero Section */}
      <section className="products-hero-grid" style={{ position: 'relative', padding: heroPadding, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: heroGap, alignItems: 'center', minHeight: heroMinHeight }}>
        <motion.div className="products-hero-text" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ textAlign: isMobile ? 'center' : 'left' }}>
          <div style={{ display: 'inline-block', position: 'relative', color: accentColor, fontWeight: 700, letterSpacing: '0.5px', marginBottom: '1.5rem', fontSize: '1rem' }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ color: accentColor, textShadow: `0 6px 18px ${accentColor}40` }}>
              {"Technical Catalogue"}
            </motion.span>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ position: 'absolute', left: 0, bottom: -6, height: 2, width: '100%', transformOrigin: isMobile ? '50%' : '0%', background: accentColor, boxShadow: `0 0 12px ${accentColor}80` }} />
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', color: '#fff', letterSpacing: '-1px', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            {"Products".split(" ").map((word, i) => (
              <motion.span key={i} initial={{ opacity: 0, y: 50, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: i * 0.12 + 0.1, type: "spring", stiffness: 100, damping: 20 }} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--text-primary)', maxWidth: '700px', margin: isMobile ? '0 auto 2rem auto' : '0 0 2.5rem 0', lineHeight: 1.8, textShadow: '0 6px 20px rgba(0,0,0,0.35)' }}>
            {"Select a category and product to view its full technical specification sheet."}
          </motion.p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: isMobile ? "center" : "flex-start" }}>
            {["General", "Electrical", "Mechanical", "Protection"].map((tag, i) => (
              <span key={i} style={{ border: "1px solid var(--border)", padding: "0.5rem 0.9rem", borderRadius: "999px", color: "var(--text-secondary)", background: "rgba(255,255,255,0.03)", fontSize: isMobile ? "0.85rem" : "1rem" }}>{tag}</span>
            ))}
          </div>
        </motion.div>

        <motion.div className="products-hero-visual" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{ height: isMobile ? '280px' : '500px', width: '100%', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: isMobile ? '200px' : '400px', height: isMobile ? '200px' : '400px', background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`, filter: 'blur(40px)', zIndex: 0 }} />
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
            <div style={{ display: "grid", gap: "1rem", justifyItems: "center" }}>
              <div style={{ width: isMobile ? 80 : 120, height: isMobile ? 80 : 120, borderRadius: 24, border: `1px solid ${accentColor}55`, background: `${accentColor}12`, display: "grid", placeItems: "center" }}>
                {getCategoryIcon(currentCategory?.id)}
              </div>
              <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, fontSize: isMobile ? "0.9rem" : "1rem" }}>
                {currentCategory?.title || "Category"}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products Grid Section */}
      <section className="container" style={{ padding: isMobile ? "2rem 0.75rem 4rem" : "6rem 2rem" }}>

        {/* Category Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: isMobile ? '1.5rem' : '2rem', flexWrap: 'wrap', gap: isMobile ? '0.5rem' : '1.5rem' }}>
          {visibleCategories.map(cat => (
            <button className="product-category-button" key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: isMobile ? '0.65rem 0.5rem' : '1rem 1.5rem', borderRadius: '16px', border: '1px solid', borderColor: activeCategory === cat.id ? cat.color : 'var(--border)', background: activeCategory === cat.id ? `${cat.color}10` : 'var(--bg-2)', color: activeCategory === cat.id ? cat.color : 'var(--muted)', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', minWidth: isMobile ? 'calc(50% - 0.25rem)' : '120px' }}>
              <span style={{ width: isMobile ? 36 : 46, height: isMobile ? 36 : 46, borderRadius: 14, display: "grid", placeItems: "center", border: `1px solid ${activeCategory === cat.id ? cat.color : "var(--border)"}`, background: activeCategory === cat.id ? `${cat.color}12` : "rgba(255,255,255,0.03)", color: activeCategory === cat.id ? cat.color : "var(--muted)" }}>
                {getCategoryIcon(cat.id)}
              </span>
              <span style={{ textAlign: 'center', fontSize: isMobile ? '0.75rem' : '0.9rem' }}>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Subcategory Tabs */}
        {currentCategory?.subcategories.length > 0 && (
          <div className="product-subcategory-tabs" style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center', marginBottom: currentSubcategory?.groups?.length > 0 ? (isMobile ? '1rem' : '1rem') : (isMobile ? '2rem' : '4rem'), flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '0.5rem', padding: '0.5rem', background: 'var(--bg-2)', borderRadius: '99px', width: isMobile ? '100%' : 'fit-content', margin: currentSubcategory?.groups?.length > 0 ? (isMobile ? '0 auto 1rem auto' : '0 auto 1rem auto') : (isMobile ? '0 auto 2rem auto' : '0 auto 4rem auto'), border: '1px solid var(--border)', overflowX: isMobile ? 'auto' : 'visible', scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {currentCategory.subcategories.map(sub => (
              <button key={sub.id} onClick={() => setActiveSubcategory(sub.id)} style={{ padding: isMobile ? '0.4rem 1rem' : '0.5rem 1.5rem', borderRadius: '99px', border: 'none', background: activeSubcategory === sub.id ? accentColor : 'transparent', color: activeSubcategory === sub.id ? '#fff' : 'var(--muted)', fontWeight: '500', fontSize: isMobile ? '0.85rem' : '1rem', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: "nowrap", flex: isMobile ? "0 0 auto" : "initial" }}>
                {sub.title}
              </button>
            ))}
          </div>
        )}

        {/* Group Tabs */}
        {currentSubcategory?.groups?.length > 0 && (
          <div style={{ display: 'flex', justifyContent: isMobile ? 'flex-start' : 'center', marginBottom: isMobile ? '2rem' : '4rem', flexWrap: isMobile ? 'nowrap' : 'wrap', gap: '0.5rem', overflowX: isMobile ? 'auto' : 'visible', scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
            {currentSubcategory.groups.map(group => (
              <button key={group.id} onClick={() => setActiveGroup(group.id)} style={{ padding: isMobile ? '0.35rem 1rem' : '0.4rem 1.2rem', borderRadius: '99px', border: `1px solid ${activeGroup === group.id ? accentColor : 'var(--border)'}`, background: activeGroup === group.id ? accentColor : 'transparent', color: activeGroup === group.id ? '#fff' : 'var(--muted)', fontSize: isMobile ? '0.8rem' : '0.9rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s ease', whiteSpace: "nowrap", flex: isMobile ? "0 0 auto" : "initial" }}>
                {group.title}
              </button>
            ))}
          </div>
        )}

        {/* 
            Bypassing the 'products-grid' class on mobile to override the CSS !important.
            This ensures the gridTemplateColumns defined inline successfully executes a 2-column layout.
        */}
        <motion.div
          layout
          className={!isMobile ? "products-grid" : ""}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? '0.6rem' : '2.5rem',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <AnimatePresence mode="popLayout">
            {productsToDisplay.map(product => {
              const technical = product?.details?.technical || {};
              const descriptionText = technical?.application ? formatValue(technical.application) : technical?.general?.application ? formatValue(technical.general.application) : "TBD";
              // Shrink description drastically for 2-column mobile view so it fits cleanly
              const descriptionShort = isMobile ? (descriptionText.length > 30 ? descriptionText.slice(0, 30) + "..." : descriptionText) : descriptionText;

              const voltageBadge = technical?.general?.nominalVoltage || technical?.general?.systemVoltage || technical?.electrical?.nominalVoltage || technical?.electrical?.outputVoltageNominal;
              const capacityBadge = technical?.general?.nominalCapacity || technical?.general?.capacity || technical?.general?.outputCapacity || technical?.electrical?.outputCurrentNominal || technical?.electrical?.outputCurrent;
              const powerBadge = technical?.general?.nominalEnergy || technical?.electrical?.powerOutput || technical?.electrical?.peakDischargeCurrent;

              const quickBadges = [voltageBadge, capacityBadge, powerBadge].filter(Boolean).slice(0, 3).map(formatValue);
              const batteryImg = product.image || getProductImage(product.title);

              return (
                <motion.div
                  className="product-list-card"
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: hoveredProduct && hoveredProduct !== product.id ? 0.4 : 1, scale: hoveredProduct && hoveredProduct !== product.id ? 0.95 : 1, y: 0, filter: hoveredProduct && hoveredProduct !== product.id ? 'blur(2px)' : 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  whileHover={{ y: -12, scale: 1.02, zIndex: 10, transition: { duration: 0.2 } }}
                  whileTap={isMobile ? { scale: 0.95, opacity: 0.9 } : {}}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  onClick={() => { if (isMobile) navigate(`/product/${product.id}`); }} // Entire card clickable on mobile
                  style={{ background: 'var(--bg-2)', borderRadius: isMobile ? '12px' : '16px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', display: 'flex', flexDirection: 'column', cursor: isMobile ? 'pointer' : 'default' }}
                >

                  {/* Card Header / Image Area */}
                  <div style={{ height: isMobile ? '120px' : '200px', background: `linear-gradient(135deg, var(--bg-3) 0%, ${product.color}10 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: isMobile ? '0.75rem' : '1.5rem' }}>
                    <div style={{ position: 'absolute', width: '150%', height: '150%', background: `radial-gradient(circle, ${product.color}20 0%, transparent 60%)`, top: '-50%', left: '-50%', transform: hoveredProduct === product.id ? 'translate(10%, 10%)' : 'translate(0, 0)', transition: 'transform 0.5s ease' }} />

                    {batteryImg ? (
                      <motion.img src={batteryImg} alt={product.title} animate={{ scale: hoveredProduct === product.id ? 1.08 : 1, rotate: hoveredProduct === product.id ? 2 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ width: '90%', height: '100%', objectFit: 'contain', zIndex: 1, filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.4))' }} />
                    ) : (
                      <motion.div animate={{ scale: hoveredProduct === product.id ? 1.1 : 1, rotate: hoveredProduct === product.id ? 5 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} style={{ zIndex: 1 }}>
                        <Battery size={isMobile ? 40 : 80} color={product.color} strokeWidth={1} />
                      </motion.div>
                    )}

                    {/* Single top badge on mobile to save space */}
                    <div style={{ position: 'absolute', bottom: isMobile ? 'auto' : '1rem', top: isMobile ? '0.5rem' : 'auto', right: isMobile ? '0.5rem' : '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: isMobile ? '0.15rem 0.5rem' : '0.25rem 0.75rem', borderRadius: '99px', fontSize: isMobile ? '0.6rem' : '0.75rem', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', zIndex: 2 }}>
                      {quickBadges[0] || "TBD"}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: isMobile ? '0.75rem' : '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', fontWeight: '700', color: product.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.categoryName}</div>
                    <h3 style={{ fontSize: isMobile ? '0.95rem' : '1.4rem', fontWeight: '700', lineHeight: 1.2, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>{product.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: isMobile ? '0.75rem' : '0.9rem', lineHeight: 1.4, marginBottom: isMobile ? '0.5rem' : '1.25rem', flex: 1 }}>{descriptionShort}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? "0.25rem" : "0.5rem", marginBottom: isMobile ? "0" : "1.5rem" }}>
                      {(quickBadges.length ? quickBadges : ["TBD", "TBD"]).slice(0, 2).map((badge, idx) => (
                        <span key={`${product.id}-badge-${idx}`} style={{ fontSize: isMobile ? "0.6rem" : "0.75rem", padding: isMobile ? "0.2rem 0.4rem" : "0.35rem 0.7rem", borderRadius: "999px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.03)", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{badge}</span>
                      ))}
                    </div>

                    {/* Button only on Desktop */}
                    {!isMobile && (
                      <button style={{ background: 'transparent', border: `1px solid ${product.color}`, color: product.color, padding: '0.75rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s ease', zIndex: 20, position: 'relative' }} onMouseEnter={(e) => { e.currentTarget.style.background = product.color; e.currentTarget.style.color = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = product.color; }} onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
                        View Specifications <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- ZUICE INVERTERS DIRECT LINK SECTION --- */}
      <section className="container" style={{ padding: isMobile ? "0 1rem 4rem" : "0 2rem 6rem", marginTop: "1rem" }}>
        <motion.a href="https://zuice.in/#/products" target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ display: "block", textDecoration: "none", background: "linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(20,20,20,0.9) 100%)", border: "1px solid var(--border)", borderColor: "rgba(34,197,94,0.3)", borderRadius: "24px", padding: isMobile ? "1.5rem" : "3.5rem", position: "relative", overflow: "hidden", cursor: "pointer", boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }} whileHover={{ scale: 1.01, borderColor: "#22c55e", boxShadow: "0 15px 40px rgba(34,197,94,0.15)" }} whileTap={{ scale: 0.98 }}>
          <div style={{ position: "absolute", top: "-50%", right: "-10%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "space-between", gap: "2rem", zIndex: 2, position: "relative", textAlign: isMobile ? "center" : "left" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ background: "rgba(34,197,94,0.15)", padding: "0.4rem", borderRadius: "10px", display: "grid", placeItems: "center" }}>
                  <img src={import.meta.env.BASE_URL + "assets/zuice_logo.png"} alt="Zuice Logo" style={{ width: isMobile ? "70px" : "100px", height: isMobile ? "70px" : "100px", objectFit: "contain" }} />
                </div>
                <span style={{ color: "#22c55e", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", fontSize: "0.85rem" }}>Partner Brand</span>
              </div>
              <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem", lineHeight: 1.1 }}>Zuice Inverters</h2>
              <p style={{ color: "var(--text-muted)", fontSize: isMobile ? "0.95rem" : "1.05rem", lineHeight: 1.6, maxWidth: "600px", margin: 0 }}>Looking for smart home and consumer-ready solar inverters? Explore the complete Zuice inverter lineup on our dedicated partner platform.</p>
            </div>
            <div style={{ background: "#22c55e", color: "#000", padding: "1rem 2rem", borderRadius: "14px", fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", whiteSpace: "nowrap", width: isMobile ? "100%" : "auto" }}>
              Go to Zuice Catalog <ExternalLink size={18} />
            </div>
          </div>
        </motion.a>
      </section>

    </div>
  );
}