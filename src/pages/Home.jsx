import React, { useState, useEffect, useMemo, useRef } from "react";
import Hero from "../components/Hero";
import ImpactStats from "../components/ImpactStats";
import CallToAction from "../components/CallToAction";
import PresenceMap from "../components/PresenceMap";
import StrategicRoadmap from "../components/StrategicRoadmap";
import ZPatternFeature from "../components/ZPatternFeature";
import VideoCard from "../components/VideoCard";
import { categories, stats, testimonials } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight, ShieldCheck, Clock, Leaf, X } from "lucide-react";

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

const TestimonialSlider = ({ items }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const active = items[index];
  return (
    <div className="testimonial-wrapper">
      <div className="testimonial-grid-bg" />
      <motion.div
        key={index}
        className="testimonial-inner"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="testimonial-left">
          <motion.div
            className="testimonial-img-wrap"
            whileHover={{ scale: 1.02, rotate: 0.4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <img src={active.image} alt="partner" className="testimonial-img" />
            <span className="testimonial-img-shadow" />
          </motion.div>
        </div>
        <div className="testimonial-right">
          <div className="testimonial-name">{active.name}</div>
          <div className="testimonial-role">{active.role}</div>
          <p className="testimonial-quote">"{active.text}"</p>
          <div className="testimonial-nav">
            <button className="nav-btn" onClick={prev} aria-label="Previous"><ChevronLeft size={18} /></button>
            <button className="nav-btn" onClick={next} aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const marqueeRef = useRef(null);
  const [liveVisible, setLiveVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [modal, setModal] = useState(null);
  const openModal = (v) => setModal(v);
  const closeModal = () => setModal(null);
  const partnerImages = [
    "/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png",
    "/assets/5.png", "/assets/6.png", "/assets/7.png", "/assets/8.png",
    "/assets/9.png", "/assets/10.png", "/assets/11.png", "/assets/12.png"
  ];
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
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cards = el.querySelectorAll(".product-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const dist = Math.abs(x - cx) / (rect.width / 2);
        const minScale = 0.85;
        const maxScale = 1.15;
        const scale = minScale + Math.min(dist, 1) * (maxScale - minScale);
        card.style.setProperty("--pos-scale", scale.toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <Hero categories={categories} />
      <ImpactStats />

      <ZPatternFeature
        title="Real-World Performance You Can Trust"
        description="Our drivers experience less downtime and higher earnings. Hear directly from the field about how our battery swapping infrastructure keeps them moving."
        videoSrc="/assets/driver response 1 .mp4"
        videoTitle="Driver Response 1"
        reverse={false}
        onOpenModal={openModal}
      />
      <ZPatternFeature
        title="Rapid On-Ground Problem Fixing"
        description="Technology is only as good as the team behind it. Our field technicians are deployed instantly to resolve hardware issues, ensuring maximum uptime for every Urja Mobility vehicle."
        videoSrc="/assets/problem fixing 1 .mp4"
        videoTitle="Problem Fixing"
        reverse={true}
        onOpenModal={openModal}
      />



      {/* Features/Why Choose Us */}
      <section className="section">
        <div className="container">
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
            <div className="why-icons-row">
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
                >
                  <span className="why-icon-circle">
                    {feature.icon}
                  </span>
                  <span className="why-icon-label">
                    {feature.title}
                  </span>
                </motion.button>
              ))}
            </div>
            <div className="why-detail">
              {[
                "Multi-layer BMS protection against thermal runaway.",
                "Cells engineered for 5000+ charge cycles.",
                "95% recyclable materials and sustainable manufacturing."
              ][activeWhyIndex]}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Trusted Partners</h2>
            <p className="section-subtitle">Driving impact together with our partners.</p>
          </motion.div>
          <TestimonialSlider
            items={partnerImages.map((img, i) => ({
              image: img,
              text: testimonials[i % testimonials.length].text,
              name: testimonials[i % testimonials.length].name,
              role: testimonials[i % testimonials.length].role,
            }))}
          />
        </div>
      </section>



      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Rapid Support</h2>
            <p className="section-subtitle">Field teams resolve issues quickly to keep fleets on the move.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.75rem" }}>On-the-ground Assistance</h3>
              <p style={{ color: "var(--muted)" }}>Real technicians, real fixes. Response times and ticket resolutions are tracked and optimized.</p>
            </div>
            <VideoCard src={"/assets/problem fixing 1 .mp4"} title={"Problem Fixing"} onOpen={openModal} />
          </div>
        </div>
      </section>
      <StrategicRoadmap />
      <PresenceMap />

      <section className="section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Data + Reality</h2>
            <p className="section-subtitle">Connecting real-time metrics with real driver outcomes.</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "stretch" }}>
            <div style={{ padding: "1.5rem", borderRadius: "16px", border: "1px solid var(--border)", background: "var(--bg-2)", boxShadow: "0 10px 30px rgba(0,0,0,0.35)" }}>
              <div style={{ fontSize: "1rem", color: "var(--muted)", marginBottom: "0.5rem", fontWeight: 700 }}>Live Grid Status</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Packs online</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#4ade80" }}>96%</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Charging nodes</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#38bdf8" }}>84%</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Field tickets</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#f97316" }}>7 open</div>
                </div>
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>10,000+ deployed batteries and energy nodes monitored in real time.</div>
            </div>
            <VideoCard src={"/assets/driver response 4 .mp4"} title={"Driver Response"} onOpen={openModal} />
          </div>
        </div>
      </section>
      <CallToAction />
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(2,6,23,0.7)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem"
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 10, scale: 0.98, opacity: 0 }}
              style={{
                width: "min(1000px, 95vw)",
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
                  width: 40,
                  height: 40,
                  borderRadius: "999px",
                  backdropFilter: "blur(8px)",
                  background: "rgba(15,23,42,0.55)",
                  border: "1px solid rgba(148,163,184,0.4)",
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.45)"
                }}
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#000" }}>
                <video
                  src={encodeURI(modal.src)}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                />
              </div>
              <div style={{ padding: "0.9rem 1rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 700 }}>{modal.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
                justifyContent: "center",
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
