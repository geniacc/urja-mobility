import React, { useState, useEffect, useMemo, useRef } from "react";
import Hero from "../components/Hero";
import ImpactStats from "../components/ImpactStats";
import PresenceMap from "../components/PresenceMap";
import StrategicRoadmap from "../components/StrategicRoadmap";
import ZPatternFeature from "../components/ZPatternFeature";
import VideoCard from "../components/VideoCard";
import { categories, stats, testimonials } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { CheckCircle, ChevronLeft, ChevronRight, ShieldCheck, Clock, Leaf, X, ZoomIn, ZoomOut, Wrench, Truck, Activity } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 50 }
  }
};

export default function Home() {
  const marqueeRef = useRef(null);
  const [liveVisible, setLiveVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = (v) => {
    setModal(v);
    setZoomLevel(1);
  };

  const closeModal = () => {
    setModal(null);
    setZoomLevel(1);
  };

  const featuredProducts = useMemo(() => {
    const list = [];
    categories.forEach(cat => {
      cat.subcategories?.forEach(sub => {
        sub.items?.forEach(item => {
          if (item.image) list.push({ title: item.title, image: item.image, color: cat.color });
        });
        sub.groups?.forEach(group => {
          group.items?.forEach(item => {
            if (item.image) list.push({ title: item.title, image: item.image, color: cat.color });
          });
        });
      });
    });
    return list;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isDesktop || typeof window === "undefined") return;
    let hideTimer;
    const onActivity = () => {
      setLiveVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        setLiveVisible(false);
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
  }, [isDesktop]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer.footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFooterVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const isMobile = !isDesktop;

  return (
    <>
      <style>{`
        /* 1. Global Overflow & Box Sizing Reset */
        html, body {
          max-width: 100vw !important;
          overflow-x: hidden !important;
        }
        
        *, *::before, *::after {
          box-sizing: border-box !important;
        }

        .page-wrapper {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .swipe-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          align-items: stretch;
        }

        .swipe-item {
          width: 100%;
          display: flex;
          flex-direction: column;
        }

        /* 2. Mobile Specific Overrides */
        @media (max-width: 768px) {
          .page-wrapper {
            font-size: 90%;
          }
          
          h1, h2, h3 {
            font-size: 85% !important;
            line-height: 1.2 !important;
          }

          .section {
            padding: 2.5rem 1rem !important;
          }

          /* Horizontal Swipe Carousels for specific sections */
          .swipe-container {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            margin-left: -1rem !important;
            margin-right: -1rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-bottom: 1.5rem !important;
            gap: 1rem !important;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .swipe-container::-webkit-scrollbar {
            display: none;
          }

          .swipe-item {
            flex: 0 0 88vw !important;
            scroll-snap-align: center !important;
            min-width: 0 !important;
          }

          /* 3. STRATEGIC VISION SHRINK FIX 
             Natively zooms out the component so it fits neatly without being massive */
          .compressed-roadmap-mobile {
            zoom: 0.7; /* Shrinks the entire component by 30% */
            margin-top: -1rem; /* Pulls it up slightly */
            padding: 0 1rem;
          }
          
          /* Fallback for Firefox which handles scaling differently */
          @supports (-moz-appearance:none) {
            .compressed-roadmap-mobile {
              transform: scale(0.7);
              transform-origin: top center;
              margin-bottom: -15%; /* Removes empty space left by scaling */
            }
          }
        }
      `}</style>

      {/* Global wrapper to prevent ANY horizontal scrolling/overflowing */}
      <div className="page-wrapper">
        <Hero categories={categories} />
        <ImpactStats />

        <div style={{ padding: "0 1rem", width: "100%" }}>
          <ZPatternFeature
            title="Real-World Performance You Can Trust"
            description="Our drivers experience less downtime and higher earnings. Hear directly from the field about how our battery swapping infrastructure keeps them moving."
            videoSrc={import.meta.env.BASE_URL + "assets/driver response 1 .mp4"}
            videoTitle="Driver Response 1"
            reverse={false}
            onOpenModal={openModal}
          />
        </div>

        {/* Features/Why Choose Us */}
        <section className="section">
          <div className="container" style={{ width: "100%", maxWidth: "100%" }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Why Choose Urja?</h2>
              <p className="section-subtitle">We don't just build batteries; we engineer reliability.</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="why-icons-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {[
                  {
                    title: "Advanced Safety",
                    desc: "Multi-layer BMS protection against thermal runaway.",
                    icon: <ShieldCheck size={20} />
                  },
                  {
                    title: "Long Lifespan",
                    desc: "Cells engineered for 5000+ charge cycles.",
                    icon: <Clock size={20} />
                  },
                  {
                    title: "Eco-Friendly",
                    desc: "95% recyclable materials and sustainable manufacturing.",
                    icon: <Leaf size={20} />
                  }
                ].map((feature, i) => (
                  <motion.button
                    key={feature.title}
                    type="button"
                    className={`why-icon ${activeWhyIndex === i ? "active" : ""}`}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.03 }}
                    onMouseEnter={() => setActiveWhyIndex(i)}
                    onClick={() => setActiveWhyIndex(i)}
                    style={{ flex: "1 1 auto", minWidth: "120px", maxWidth: "250px", padding: "0.5rem" }}
                  >
                    <span className="why-icon-circle">
                      {feature.icon}
                    </span>
                    <span className="why-icon-label" style={{ fontSize: "0.9rem" }}>
                      {feature.title}
                    </span>
                  </motion.button>
                ))}
              </div>
              <div className="why-detail" style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.95rem" }}>
                {[
                  "Multi-layer BMS protection against thermal runaway.",
                  "Cells engineered for 5000+ charge cycles.",
                  "95% recyclable materials and sustainable manufacturing."
                ][activeWhyIndex]}
              </div>
            </motion.div>
          </div>
        </section>

        {/* TRUSTED PARTNERS SECTION */}
        <section className="section bg-muted">
          <div className="container" style={{ width: "100%", maxWidth: "100%" }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Trusted Partners</h2>
              <p className="section-subtitle">Real voices, real impact. Hear directly from the visionaries we work with.</p>
            </motion.div>

            {/* Applies swipe carousel logic automatically on mobile */}
            <div className="swipe-container" style={{ display: isMobile ? undefined : "grid", gridTemplateColumns: isMobile ? undefined : "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(1rem, 4vw, 3rem)", alignItems: "center" }}>
              {/* Written Breakdown */}
              <motion.div
                className="swipe-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <div style={{ display: "inline-block", padding: "0.35rem 0.85rem", background: "rgba(56, 189, 248, 0.1)", color: "#38bdf8", border: "1px solid rgba(56, 189, 248, 0.2)", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                  A 10/10 Partnership Rating
                </div>
                <h3 style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)", fontWeight: 800, marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  "Unmatched discipline and operational excellence."
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "clamp(0.85rem, 3vw, 1.1rem)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                  <strong>Pradeep Kantpal, Founder & Director of Ecostar Innovation</strong>, breaks down his three-year journey scaling alongside Urja Mobility's ecosystem.
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Over 10,000 to 15,000 successful battery finances powered together.",
                    "Flawless execution and rapid order fulfillment across pan-India operations.",
                    "Transparent infrastructure with dedicated testing labs and instant on-ground support."
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--muted)" }}>
                      <CheckCircle size={18} color="#38bdf8" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Video Component */}
              <motion.div
                className="swipe-item"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{ overflow: "hidden" }}
              >
                <VideoCard
                  src={import.meta.env.BASE_URL + "assets/trusted partner 1 .mp4"}
                  title={"Ecostar Innovation Review"}
                  poster={import.meta.env.BASE_URL + "assets/Pradeep Kantpal, Founder & Director of Ecostar Innovation.jpeg"}
                  onOpen={() => openModal({
                    src: import.meta.env.BASE_URL + "assets/trusted partner 1 .mp4",
                    title: "Ecostar Innovation Review",
                    subtitle: import.meta.env.BASE_URL + "assets/trusted-partner-1.vtt",
                    poster: import.meta.env.BASE_URL + "assets/Pradeep Kantpal, Founder & Director of Ecostar Innovation.jpeg"
                  })}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* RAPID SUPPORT SECTION */}
        <section className="section">
          <div className="container" style={{ width: "100%", maxWidth: "100%" }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Rapid Support</h2>
              <p className="section-subtitle">Field teams resolve issues quickly to keep fleets on the move.</p>
            </motion.div>

            <div className="swipe-container" style={{ display: isMobile ? undefined : "grid", gridTemplateColumns: isMobile ? undefined : "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "clamp(1rem, 4vw, 3rem)", alignItems: "center" }}>
              <motion.div
                className="swipe-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ display: "inline-block", padding: "0.35rem 0.85rem", background: "rgba(249, 115, 22, 0.1)", color: "#f97316", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                  Maximum Uptime Guaranteed
                </div>
                <h3 style={{ fontSize: "clamp(1.3rem, 4vw, 2rem)", fontWeight: 800, marginBottom: "0.75rem", lineHeight: 1.2 }}>
                  On-the-ground Assistance
                </h3>
                <p style={{ color: "var(--muted)", fontSize: "clamp(0.85rem, 3vw, 1.1rem)", marginBottom: "1.25rem", lineHeight: 1.5 }}>
                  Technology is only as good as the team behind it. Real technicians, real fixes. Our field team is deployed instantly to resolve hardware issues, ensuring less downtime and higher earnings for drivers.
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Instant deployment of field technicians to resolve hardware and software issues.",
                    "Transparent ticket tracking with response times aggressively optimized.",
                    "Fully-equipped mobile units for immediate, on-site problem fixing."
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", color: "var(--muted)" }}>
                      <CheckCircle size={18} color="#f97316" style={{ flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.85rem", lineHeight: 1.4 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {!isMobile ? (
                <motion.div
                  className="swipe-item"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <VideoCard
                    src={import.meta.env.BASE_URL + "assets/problem fixing 1 .mp4"}
                    title={"Problem Fixing"}
                    onOpen={() => openModal({
                      src: import.meta.env.BASE_URL + "assets/problem fixing 1 .mp4",
                      title: "Rapid Problem Fixing"
                    })}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="swipe-item"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  style={{ height: "100%" }}
                >
                  <div style={{
                    background: "linear-gradient(135deg, var(--bg-2) 0%, rgba(249, 115, 22, 0.1) 100%)",
                    border: "1px solid rgba(249, 115, 22, 0.2)",
                    borderRadius: "16px",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justify: "center",
                    gap: "1.5rem",
                    height: "100%",
                    minHeight: "250px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                  }}>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                      <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}><Wrench size={44} color="#f97316" /></motion.div>
                      <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><Truck size={44} color="#f97316" /></motion.div>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}><Activity size={44} color="#f97316" /></motion.div>
                    </div>
                    <div style={{ textAlign: "center", color: "#f97316", fontWeight: 700, fontSize: "1.1rem", lineHeight: "1.4" }}>
                      Real-time fleet diagnostics <br />& direct dispatch
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* --- STRATEGIC VISION COMPRESSION WRAPPER --- */}
        <div className="compressed-roadmap-mobile" style={{ width: "100%", overflowX: "hidden" }}>
          <StrategicRoadmap />
        </div>

        <PresenceMap />

        {/* --- DATA + REALITY SECTION --- */}
        <section className="section">
          <div className="container" style={{ width: "100%", maxWidth: "100%" }}>
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Data + Reality</h2>
              <p className="section-subtitle">Connecting real-time metrics with real driver outcomes.</p>
            </motion.div>

            <div className="swipe-container">
              {/* 1. Live Grid Status Box */}
              <div className="swipe-item">
                <div style={{ padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--bg-2)", boxShadow: "0 10px 30px rgba(0,0,0,0.35)", display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                  <div style={{ fontSize: "0.95rem", color: "var(--muted)", marginBottom: "0.75rem", fontWeight: 700 }}>Live Grid Status</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: "0.75rem" }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Packs online</div>
                      <div style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", fontWeight: 800, color: "#4ade80" }}>96%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Charging nodes</div>
                      <div style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", fontWeight: 800, color: "#38bdf8" }}>84%</div>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>Field tickets</div>
                      <div style={{ fontSize: "clamp(1rem, 3vw, 1.3rem)", fontWeight: 800, color: "#f97316" }}>7 open</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--muted)" }}>10,000+ deployed batteries and energy nodes monitored in real time.</div>
                </div>
              </div>

              {/* 2. Reality Document Image */}
              <div className="swipe-item">
                <motion.div
                  whileHover={isDesktop ? { y: -5 } : {}}
                  onClick={() => openModal({ src: import.meta.env.BASE_URL + "assets/reality document .jpeg", title: "Reality Document" })}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    background: "var(--bg-2)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                  }}
                >
                  <img
                    src={import.meta.env.BASE_URL + "assets/reality document .jpeg"}
                    alt="Reality Document"
                    style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "200px", display: "block" }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1rem 1rem 0.75rem", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)", color: "white", fontWeight: 700, fontSize: "1rem" }}>
                    Reality Document
                  </div>
                </motion.div>
              </div>

              {/* 3. Driver Response 5 Video */}
              <div className="swipe-item">
                <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                  <VideoCard src={import.meta.env.BASE_URL + "assets/driver response 5 .mp4"} title={"Driver Response 5"} onOpen={openModal} />
                </div>
              </div>

            </div>
          </div>
        </section>

      </div> {/* End of page-wrapper */}

      {/* --- MODAL --- */}
      {createPortal(
        <AnimatePresence>
          {modal && (
            <motion.div
              className="home-media-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(2,6,23,0.85)",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                justify: "center",
                padding: "clamp(0.5rem, 2vw, 2rem)"
              }}
              onClick={closeModal}
            >
              <motion.div
                initial={{ y: 20, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 10, scale: 0.98, opacity: 0 }}
                style={{
                  width: "min(1200px, 100%)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "var(--bg-2)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                  position: "relative"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    width: 36,
                    height: 36,
                    borderRadius: "999px",
                    backdropFilter: "blur(8px)",
                    background: "rgba(15,23,42,0.65)",
                    border: "1px solid rgba(148,163,184,0.4)",
                    color: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justify: "center",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                    zIndex: 20
                  }}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>

                <div style={{
                  position: "relative",
                  width: "100%",
                  height: modal.src.match(/\.(jpeg|jpg|gif|png)$/) ? "clamp(50vh, 75vh, 800px)" : "auto",
                  aspectRatio: modal.src.match(/\.(jpeg|jpg|gif|png)$/) ? "auto" : "16 / 9",
                  background: "#000",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justify: "center"
                }}>
                  {modal.src.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                    <>
                      <motion.img
                        src={encodeURI(modal.src)}
                        alt={modal.title}
                        drag={zoomLevel > 1}
                        dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                        dragElastic={0.1}
                        animate={zoomLevel === 1 ? { x: 0, y: 0, scale: 1 } : { scale: zoomLevel }}
                        transition={{ type: "tween", duration: 0.2 }}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block",
                          cursor: zoomLevel > 1 ? "grab" : "zoom-in"
                        }}
                        whileDrag={{ cursor: "grabbing" }}
                        onClick={() => { if (zoomLevel === 1) setZoomLevel(2.5); }}
                      />

                      {/* Floating Zoom Controls */}
                      <div style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "1rem",
                        display: "flex",
                        gap: "0.5rem",
                        background: "rgba(15,23,42,0.8)",
                        backdropFilter: "blur(8px)",
                        padding: "0.4rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(148,163,184,0.3)",
                        zIndex: 10
                      }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.max(1, prev - 0.5)); }}
                          style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: "0.25rem" }}
                          aria-label="Zoom Out"
                        >
                          <ZoomOut size={18} />
                        </button>
                        <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
                        <button
                          onClick={(e) => { e.stopPropagation(); setZoomLevel(prev => Math.min(4, prev + 0.5)); }}
                          style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer", display: "flex", padding: "0.25rem" }}
                          aria-label="Zoom In"
                        >
                          <ZoomIn size={18} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <video
                      src={encodeURI(modal.src)}
                      poster={modal.poster}
                      controls
                      autoPlay
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                    >
                      {modal.subtitle && (
                        <track
                          kind="subtitles"
                          src={encodeURI(modal.subtitle)}
                          srcLang="en"
                          label="English"
                          default
                        />
                      )}
                    </video>
                  )}
                </div>

                <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 700, fontSize: "clamp(0.85rem, 3vw, 1rem)" }}>{modal.title}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Live Grid Float (Desktop only) */}
      {isDesktop && liveVisible && !footerVisible && (
        <motion.div
          initial={{ opacity: 0, y: 18, x: -12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "fixed",
            left: "1rem",
            bottom: "1rem",
            zIndex: 40,
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              width: "min(320px, 80vw)",
              borderRadius: "1.1rem",
              padding: "0.85rem 0.95rem",
              background: "rgba(15,23,42,0.96)",
              border: "1px solid rgba(148,163,184,0.7)",
              boxShadow: "0 18px 40px -24px rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.75rem"
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at 30% 30%, #4ade80, #16a34a)",
                display: "flex",
                alignItems: "center",
                justify: "center",
                boxShadow: "0 0 18px rgba(34,197,94,0.7)",
                flexShrink: 0
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "999px",
                  background: "#022c22",
                  border: "2px solid #bbf7d0"
                }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.2rem"
                }}
              >
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#e5e7eb"
                  }}
                >
                  Live Grid Status
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#22c55e",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "999px",
                      background: "#22c55e"
                    }}
                  />
                  Stable
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  marginBottom: "0.45rem"
                }}
              >
                Monitoring more than 10,000 deployed batteries and energy nodes
                in real time.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "0.6rem",
                  fontSize: "0.72rem",
                  color: "#e5e7eb"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "0.1rem" }}>Packs online</div>
                  <div style={{ fontWeight: 700, color: "#4ade80" }}>96%</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "0.1rem" }}>Charging nodes</div>
                  <div style={{ fontWeight: 700, color: "#38bdf8" }}>84%</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "0.1rem" }}>Field tickets</div>
                  <div style={{ fontWeight: 700, color: "#f97316" }}>7 open</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}