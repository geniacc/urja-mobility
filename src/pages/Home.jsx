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
        /* 1. Global Reset */
        html, body {
          width: 100% !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
          margin: 0;
          padding: 0;
        }
        
        *, *::before, *::after {
          box-sizing: border-box !important;
        }

        .page-wrapper {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }

        /* 2. SPECIFIC PERFORMANCE SECTION FIX */
        @media (max-width: 768px) {
          .performance-section-fix {
            display: block !important;
            width: 100% !important;
            padding: 0 1.25rem !important;
            margin: 2.5rem 0 !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          /* Reset all nested Z-pattern styles for mobile fit */
          .performance-section-fix * {
            max-width: 100% !important;
            transform: none !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            text-align: center !important;
            left: auto !important;
            right: auto !important;
          }

          .performance-section-fix h2 {
            font-size: 1.5rem !important;
            line-height: 1.2 !important;
            margin-bottom: 1rem !important;
          }

          .performance-section-fix p {
            font-size: 0.95rem !important;
            margin-bottom: 1.5rem !important;
          }

          /* General mobile layout helpers */
          .section { padding: 2.5rem 1rem !important; }
          .swipe-container {
            display: flex !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            width: calc(100% + 2rem) !important;
            margin-left: -1rem !important;
            padding: 0 1rem 1.5rem !important;
            scrollbar-width: none;
          }
          .swipe-container::-webkit-scrollbar { display: none; }
          .swipe-item { flex: 0 0 88vw !important; scroll-snap-align: center !important; }
          .compressed-roadmap-mobile { zoom: 0.75; width: 100% !important; overflow: hidden; }
        }
      `}</style>

      <div className="page-wrapper">
        <Hero categories={categories} />
        <ImpactStats />

        {/* --- THE FIX IS APPLIED HERE --- */}
        <div className="performance-section-fix">
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
          <div className="container">
            <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="section-title">Why Choose Urja?</h2>
              <p className="section-subtitle">We don't just build batteries; we engineer reliability.</p>
            </motion.div>
            <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
              <div className="why-icons-row" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
                {[
                  { title: "Advanced Safety", icon: <ShieldCheck size={20} /> },
                  { title: "Long Lifespan", icon: <Clock size={20} /> },
                  { title: "Eco-Friendly", icon: <Leaf size={20} /> }
                ].map((feature, i) => (
                  <motion.button
                    key={feature.title}
                    className={`why-icon ${activeWhyIndex === i ? "active" : ""}`}
                    variants={itemVariants}
                    onClick={() => setActiveWhyIndex(i)}
                    style={{ flex: "1 1 auto", minWidth: "120px", maxWidth: "250px", padding: "0.5rem" }}
                  >
                    <span className="why-icon-circle">{feature.icon}</span>
                    <span className="why-icon-label" style={{ fontSize: "0.9rem" }}>{feature.title}</span>
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
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Trusted Partners</h2>
            </div>
            <div className="swipe-container" style={{ display: isMobile ? undefined : "grid", gridTemplateColumns: isMobile ? undefined : "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <motion.div className="swipe-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>"Unmatched discipline and excellence."</h3>
                <p style={{ color: "var(--muted)", margin: "1rem 0" }}>Pradeep Kandpal, Founder of Ecostar Innovation.</p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <CheckCircle size={18} color="#38bdf8" /> <span style={{ fontSize: "0.85rem" }}>10k+ successful battery finances together.</span>
                  </li>
                </ul>
              </motion.div>
              <motion.div className="swipe-item" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <VideoCard
                  src={import.meta.env.BASE_URL + "assets/trusted partner 1 .mp4"}
                  title="Ecostar Review"
                  poster={import.meta.env.BASE_URL + "assets/Pradeep Kantpal, Founder & Director of Ecostar Innovation.jpeg"}
                  onOpen={() => openModal({ src: import.meta.env.BASE_URL + "assets/trusted partner 1 .mp4", title: "Ecostar Review" })}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section-title">Rapid Support</h2>
            <div className="swipe-container" style={{ display: isMobile ? undefined : "grid", gridTemplateColumns: isMobile ? undefined : "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
              <div className="swipe-item">
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800 }}>On-the-ground Assistance</h3>
                <p style={{ color: "var(--muted)", margin: "1rem 0" }}>Our field team keeps drivers moving with rapid hardware fixes.</p>
              </div>
              <div className="swipe-item">
                <VideoCard src={import.meta.env.BASE_URL + "assets/problem fixing 1 .mp4"} title="Problem Fixing" onOpen={() => openModal({ src: import.meta.env.BASE_URL + "assets/problem fixing 1 .mp4", title: "Rapid Support" })} />
              </div>
            </div>
          </div>
        </section>

        <div className="compressed-roadmap-mobile">
          <StrategicRoadmap />
        </div>

        <PresenceMap />

        {/* DATA + REALITY SECTION */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Data + Reality</h2>

            {/* Live Grid Status - Moved to top for better hierarchy */}
            <div style={{ padding: "1.25rem", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--bg-2)", marginBottom: "2rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Live Grid Status</div>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                <div><small>Online</small><br /><strong style={{ color: "#4ade80" }}>96%</strong></div>
                <div><small>Charging</small><br /><strong style={{ color: "#38bdf8" }}>84%</strong></div>
                <div><small>Tickets</small><br /><strong style={{ color: "#f97316" }}>7 Open</strong></div>
              </div>
            </div>

            {/* Video & Document Side-by-Side Grid */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "2rem" }}>

              {/* Driver Feedback Video */}
              <div>
                <VideoCard
                  src={import.meta.env.BASE_URL + "assets/driver response 5 .mp4"}
                  title="Driver Feedback"
                  onOpen={openModal}
                />
              </div>

              {/* Reality Document */}
              <div>
                <div
                  onClick={() => openModal({ src: import.meta.env.BASE_URL + "assets/reality document .jpeg", title: "Reality Document" })}
                  style={{
                    background: "var(--bg-2)",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative",
                    aspectRatio: "16 / 9",
                    height: "100%", // Ensures it fills the grid column height nicely
                  }}
                >
                  <img
                    src={import.meta.env.BASE_URL + "assets/reality document .jpeg"}
                    alt="Reality Document"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 0,
                      padding: "0.6rem 0.9rem",
                      backdropFilter: "blur(10px)",
                      background: "rgba(15,23,42,0.45)",
                      borderTop: "1px solid rgba(148,163,184,0.2)"
                    }}
                  >
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>Reality Document</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* --- MEDIA MODAL --- */}
      {createPortal(
        <AnimatePresence>
          {modal && (
            <motion.div className="home-media-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(2,6,23,0.9)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={closeModal}>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} style={{ width: "95%", maxWidth: "1100px", background: "#000", borderRadius: "12px", overflow: "hidden", position: "relative" }} onClick={(e) => e.stopPropagation()}>
                <button onClick={closeModal} style={{ position: "absolute", top: 10, right: 10, zIndex: 10, background: "rgba(0,0,0,0.5)", border: "none", color: "#fff", borderRadius: "50%", padding: "5px" }}><X size={20} /></button>
                {modal.src.match(/\.(jpeg|jpg|png)$/) ? (
                  <img src={modal.src} alt={modal.title} style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
                ) : (
                  <video src={modal.src} controls autoPlay style={{ width: "100%", maxHeight: "80vh" }} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Live Grid Status (Desktop only) */}
      {isDesktop && liveVisible && !footerVisible && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: "fixed", left: "1rem", bottom: "1rem", zIndex: 40 }}>
          <div style={{ background: "#0f172a", padding: "0.85rem", borderRadius: "1rem", border: "1px solid #334155", color: "#fff", display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <div style={{ width: 12, height: 12, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 10px #22c55e" }} />
            <span style={{ fontSize: "0.85rem" }}>Live Grid Status: <strong>Stable</strong></span>
          </div>
        </motion.div>
      )}
    </>
  );
}