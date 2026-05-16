import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Users, Zap, Globe } from "lucide-react";
import TimelineDemo from "../components/ui/TimelineDemo";
import TeamSphere from "../components/TeamSphere";
import { teamMembers } from "../data/mockData";

const activeTeam = teamMembers.filter(m => m.image && m.image.trim() !== "");

export default function About() {
  const [teamView, setTeamView] = useState("sphere");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* CSS Toolkit: Glassmorphism base + reactive neon properties */}
      <style>{`
        /* Dynamic Shimmering Text for Headlines (Blue + Greenish Texture) */
        @keyframes shine {
          to { background-position: 200% center; }
        }
        .text-dynamic-shine {
          background: linear-gradient(
            to right,
            #ffffff 10%,
            #93c5fd 30%,
            #4ade80 50%, 
            #3b82f6 70%,
            #ffffff 90%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: shine 6s linear infinite;
        }

        .dynamic-glass {
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Shimmer effect on hover */
        .dynamic-glass::after {
          content: "";
          position: absolute;
          top: 0; left: -150%;
          width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
          transform: skewX(-20deg);
          transition: 0.7s ease;
          pointer-events: none;
        }
        .dynamic-glass:hover::after {
          left: 150%;
        }

        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .diagram-ring {
          position: absolute;
          border-radius: 50%;
          animation: spin-slow 24s linear infinite;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .mobile-horizontal-scroll {
            display: flex !important;
            flex-direction: row !important;
            overflow-x: auto !important;
            scroll-snap-type: x mandatory !important;
            flex-wrap: nowrap !important;
            margin-left: -1rem !important;
            margin-right: -1rem !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-bottom: 1.5rem !important;
            scrollbar-width: none;
          }
          .mobile-horizontal-scroll::-webkit-scrollbar {
            display: none;
          }
          .mobile-horizontal-scroll > * {
            flex: 0 0 85% !important;
            scroll-snap-align: center !important;
            min-width: 0 !important;
          }
          .dynamic-glass:hover {
            transform: none !important;
          }
        }
      `}</style>

      {/* SECTION 1: OVERVIEW & MISSION/VISION */}
      <section style={{ padding: isMobile ? "2rem 0" : "6rem 0", position: "relative", overflow: "hidden" }}>
        {/* Main Background Glows */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ position: "absolute", top: "-10%", left: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)", filter: "blur(80px)", zIndex: -1 }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)", filter: "blur(80px)", zIndex: -1 }}
        />

        <div className="container">
          <div className="section-header" style={{ textAlign: "center", position: "relative", zIndex: 10 }}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-dynamic-shine"
              style={{
                fontSize: isMobile ? "2.6rem" : "4.5rem",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                marginBottom: "0.5rem",
                display: "inline-block"
              }}
            >
              Urja Mobility
            </motion.h1>
            <p className="section-subtitle" style={{ fontSize: isMobile ? "1rem" : "1.25rem", color: "#94a3b8", marginTop: "0.5rem" }}>
              Redefining how electric vehicles are powered and adopted <span style={{ color: "var(--secondary)" }}>Across India</span>.
            </p>
          </div>

          {/* ABOUT US CARD */}
          <div style={{ marginTop: isMobile ? "2rem" : "4rem", maxWidth: "900px", margin: isMobile ? "1.5rem auto 0" : "4rem auto 0", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="dynamic-glass"
              style={{
                padding: isMobile ? "2rem 1.5rem" : "4rem",
                background: "linear-gradient(145deg, #0f172a 0%, #070a12 100%)",
                border: "2px solid rgba(255, 255, 255, 0.15)"
              }}
            >
              <div className="diagram-ring" style={{ width: '280px', height: '280px', top: '-80px', right: '-80px', border: '2px dashed rgba(59, 130, 246, 0.25)', opacity: 0.4 }} />
              <div className="diagram-ring" style={{ width: '380px', height: '380px', bottom: '-120px', left: '-120px', border: '1px solid rgba(34, 197, 94, 0.15)', opacity: 0.3, animationDirection: 'reverse' }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                <h2 style={{ fontSize: isMobile ? '1.6rem' : '2.6rem', marginBottom: '1.5rem', background: "linear-gradient(to right, #f8fafc, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontWeight: 800 }}>About Us</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: isMobile ? '0.95rem' : '1.15rem', lineHeight: '1.8' }}>
                  Urja Mobility is an Indian clean-energy technology company redefining how electric vehicles are powered and adopted across India. Focused primarily on the commercial electric vehicle segment, the company provides flexible and innovative energy solutions that make electric mobility more accessible and economically viable for businesses, drivers, and fleet operators.
                </p>
                <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: isMobile ? '0.9rem' : '1.1rem', lineHeight: '1.8' }}>
                  Urja Mobility specializes in <span style={{ color: "var(--primary)", fontWeight: 600 }}>Battery-as-a-Service (BaaS)</span> and <span style={{ color: "var(--secondary)", fontWeight: 600 }}>Energy-as-a-Service (EaaS)</span> models that enable customers to lease high-performance lithium-ion batteries for electric two-wheelers and three-wheelers under structured usage plans. By converting upfront battery ownership costs into predictable operational expenses, Urja Mobility removes key financial barriers to EV adoption.
                </p>
                <p style={{ color: 'var(--muted)', fontSize: isMobile ? '0.9rem' : '1.1rem', lineHeight: '1.8' }}>
                  Headquartered in New Delhi, India, the company is steadily expanding its footprint across multiple cities, supporting India’s transition toward cleaner and more sustainable transportation.
                </p>
              </div>
            </motion.div>
          </div>

          {/* MISSION & VISION SECTIONS */}
          <div className={`hero-grid align-start ${isMobile ? "mobile-horizontal-scroll" : ""}`} style={{ marginTop: isMobile ? "2.5rem" : "5rem", gap: isMobile ? "1rem" : "2.5rem", display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

            {/* MISSION CARD */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={isMobile ? {} : { y: -10, boxShadow: "0 25px 45px rgba(59, 130, 246, 0.25)", borderColor: "rgba(59, 130, 246, 0.7)" }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="dynamic-glass"
              style={{
                padding: isMobile ? "2rem 1.5rem" : "3rem",
                background: "linear-gradient(135deg, #091326 0%, #030712 100%)",
                border: "2px solid rgba(59, 130, 246, 0.45)"
              }}
            >
              <motion.div
                animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.2, 0.9, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", width: "120px", height: "120px", background: "rgba(59, 130, 246, 0.2)", filter: "blur(40px)", top: "10%", right: "10%", pointerEvents: "none", borderRadius: "50%" }}
              />

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(59, 130, 246, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59, 130, 246, 0.5)" }}
                  >
                    <Target size={22} color="#60a5fa" />
                  </motion.div>
                  <h2 style={{ fontSize: isMobile ? '1.4rem' : '2rem', color: "#fff", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Our Mission</h2>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: '1.7', margin: 0 }}>
                  To democratize sustainable electric mobility through affordable, flexible battery leasing. We eliminate high upfront asset costs, turning clean energy into an accessible service that empowers commercial EV users to scale efficiently and operate profitably.
                </p>
              </div>
            </motion.div>

            {/* VISION CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={isMobile ? {} : { y: -10, boxShadow: "0 25px 45px rgba(34, 197, 94, 0.22)", borderColor: "rgba(34, 197, 94, 0.7)" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="dynamic-glass"
              style={{
                padding: isMobile ? "2rem 1.5rem" : "3rem",
                background: "linear-gradient(135deg, #05160e 0%, #010408 100%)",
                border: "2px solid rgba(34, 197, 94, 0.45)"
              }}
            >
              <motion.div
                animate={{ x: [0, -30, 30, 0], y: [0, 40, -10, 0], scale: [1, 1.3, 0.8, 1] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ position: "absolute", width: "120px", height: "120px", background: "rgba(34, 197, 94, 0.18)", filter: "blur(40px)", bottom: "10%", left: "10%", pointerEvents: "none", borderRadius: "50%" }}
              />

              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
                  <motion.div
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "46px", height: "46px", borderRadius: "12px", background: "rgba(34, 197, 94, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34, 197, 94, 0.5)" }}
                  >
                    <Eye size={22} color="#4ade80" />
                  </motion.div>
                  <h2 style={{ fontSize: isMobile ? '1.4rem' : '2rem', color: "#fff", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Our Vision</h2>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: isMobile ? '0.9rem' : '1.05rem', lineHeight: '1.7', margin: 0 }}>
                  To catalyze India’s green transportation revolution by making battery energy universally accessible, seamlessly integrated, and economically uncompromised—positioning electric vehicles as the primary ecosystem choice across the country.
                </p>
              </div>
            </motion.div>
          </div>

          {/* CORPORATE CULTURE SECTION */}
          <div style={{ marginTop: isMobile ? "3rem" : "8rem" }}>
            <div className="section-header" style={{ marginBottom: isMobile ? "2rem" : "4rem", textAlign: "center" }}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-dynamic-shine"
                style={{
                  fontSize: isMobile ? "2.2rem" : "3.6rem",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  display: "inline-block",
                  marginBottom: "0.5rem"
                }}
              >
                Corporate Culture
              </motion.h2>
              <p className="section-subtitle" style={{ maxWidth: "800px", margin: "1rem auto 0", lineHeight: "1.6", fontSize: isMobile ? "0.9rem" : "1.1rem", color: "#94a3b8" }}>
                Together, these cultural values create a work environment that balances high performance with purpose, encouraging every employee to drive impact through innovation, integrity, and customer-centricity.
              </p>
            </div>

            <div
              className={isMobile ? "mobile-horizontal-scroll" : ""}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(300px, 1fr))" : "repeat(4, 1fr)",
                gap: isMobile ? "1rem" : "1.5rem"
              }}
            >
              {[
                { title: "Purpose-Driven", icon: <Lightbulb size={24} />, color: "#eab308", coreBg: "#16140b", text: "We align individuals with a shared mission to deliver clean energy accessibility and accelerate India's green transport transition." },
                { title: "Collaborative & Adaptive", icon: <Users size={24} />, color: "#3b82f6", coreBg: "#0b111e", text: "We nurture agility, cross-functional teamwork, and close relationships with field teams and users to continuously refine our products." },
                { title: "Innovation Focused", icon: <Zap size={24} />, color: "#f97316", coreBg: "#17100b", text: "We encourage creative experimentation and proactive ownership to continuously enhance operational reliability and customer experience." },
                { title: "Sustainable Impact", icon: <Globe size={24} />, color: "#22c55e", coreBg: "#0a1610", text: "Sustainability is embedded into our daily tech workflows, promoting environmental stewardship and long-term ecosystem value." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={isMobile ? {} : { y: -10, scale: 1.02, borderColor: item.color, boxShadow: `0 20px 40px ${item.color}25` }}
                  transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="dynamic-glass"
                  style={{
                    padding: isMobile ? "1.5rem" : "2rem 1.25rem",
                    cursor: "default",
                    background: `linear-gradient(145deg, ${item.coreBg} 0%, #03060c 100%)`,
                    border: `2px solid ${item.color}45`
                  }}
                >
                  {/* Local background pulse glow */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
                    style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: item.color, filter: "blur(50px)", zIndex: 0 }}
                  />

                  <div style={{ position: "relative", zIndex: 1 }}>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 12 }}
                      style={{
                        display: "inline-flex",
                        padding: "0.75rem",
                        borderRadius: "14px",
                        background: `linear-gradient(135deg, ${item.color}25, transparent)`,
                        border: `1px solid ${item.color}50`,
                        color: item.color,
                        marginBottom: "1.25rem"
                      }}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 style={{ fontSize: isMobile ? "1.1rem" : "1.2rem", marginBottom: "0.75rem", color: "#f8fafc", fontWeight: 700 }}>{item.title}</h3>
                    <p style={{ color: "var(--muted)", lineHeight: "1.6", fontSize: isMobile ? "0.85rem" : "0.9rem", margin: 0 }}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: GLOBAL TEAM */}
      <section style={{ position: "relative", padding: isMobile ? "2rem 0" : "4rem 0", background: "linear-gradient(to bottom, #020617, #0f172a, #020617)" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "60%", height: "60%", background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)", filter: "blur(80px)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {!isMobile && (
            <div className="container" style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
              <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: 9999, padding: 6, display: "inline-flex", gap: 6 }}>
                <button
                  onClick={() => setTeamView("sphere")}
                  style={{ padding: "0.6rem 1rem", fontSize: "1rem", borderRadius: 9999, border: "none", cursor: "pointer", fontWeight: 700, background: teamView === "sphere" ? "var(--primary)" : "transparent", color: teamView === "sphere" ? "#fff" : "var(--text)" }}
                >
                  3D Sphere
                </button>
                <button
                  onClick={() => setTeamView("belt")}
                  style={{ padding: "0.6rem 1rem", fontSize: "1rem", borderRadius: 9999, border: "none", cursor: "pointer", fontWeight: 700, background: teamView === "belt" ? "var(--secondary)" : "transparent", color: teamView === "belt" ? "#031432" : "var(--text)" }}
                >
                  Animated Belt
                </button>
              </div>
            </div>
          )}

          {(!isMobile && teamView === "sphere") ? (
            <TeamSphere members={activeTeam} />
          ) : (
            <TeamBelt members={activeTeam} isMobile={isMobile} />
          )}
        </div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="section" style={{ padding: isMobile ? '1.5rem 0' : '8rem 0' }}>
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: isMobile ? '1rem' : undefined }}>
            <h2 className="section-title" style={{ fontSize: isMobile ? "1.8rem" : undefined }}>Journey</h2>
            <p className="section-subtitle" style={{ fontSize: isMobile ? "0.85rem" : undefined }}>Highlights from our 12 milestone journey.</p>
          </motion.div>
        </div>
        <div style={{ marginTop: isMobile ? "0" : "4rem", transform: isMobile ? "scale(0.85)" : "none", transformOrigin: "top center", width: "100%" }}>
          <TimelineDemo />
        </div>
      </section>

    </div>
  );
}

function TeamBelt({ members, isMobile }) {
  const items = [...members, ...members];
  return (
    <div style={{ position: "relative", padding: "1rem 0" }}>
      <style>{`
        @keyframes teamBeltScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .team-belt:hover .team-track { animation-play-state: paused; }
      `}</style>
      <div className="team-belt" style={{ position: "relative", overflow: "hidden", maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", borderRadius: 24, border: "1px solid var(--border)", background: "linear-gradient(180deg, rgba(59,130,246,0.06), rgba(2,6,23,0.6))", padding: isMobile ? "0.75rem 0" : "1rem 0" }}>
        <div className="team-track" style={{ display: "flex", width: "max-content", gap: isMobile ? "0.75rem" : "1rem", alignItems: "stretch", animation: "teamBeltScroll 80s linear infinite" }}>
          {items.map((m, i) => (
            <motion.div
              key={`${m.name}-${i}`}
              whileHover={isMobile ? {} : { y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260 }}
              style={{ width: isMobile ? 220 : 260, background: "var(--bg-2)", borderRadius: isMobile ? 14 : 18, border: "1px solid var(--border)", boxShadow: "0 18px 50px -28px rgba(0,0,0,0.55)", padding: isMobile ? "0.75rem" : "0.9rem", flex: "0 0 auto", position: "relative", overflow: "hidden" }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, height: 3, width: "100%", background: "linear-gradient(90deg, var(--primary), var(--secondary))" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {m?.image ? (
                  <img src={m.image} alt={m.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: isMobile ? 36 : 44, height: isMobile ? 36 : 44, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.2)", background: "linear-gradient(135deg, #3b82f6, #1e293b)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: "bold", fontSize: isMobile ? "0.85rem" : "1rem", flexShrink: 0 }}>
                    {m.name ? (m.name.split(" ").length >= 2 ? (m.name.split(" ")[0][0] + m.name.split(" ")[1][0]).toUpperCase() : m.name.substring(0, 2).toUpperCase()) : "UM"}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: isMobile ? "0.85rem" : "0.95rem", color: "#f8fafc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name}</div>
                  <div style={{ fontSize: isMobile ? "0.65rem" : "0.75rem", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.role}</div>
                </div>
              </div>
              <div style={{ marginTop: "0.6rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: isMobile ? "0.6rem" : "0.7rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800 }}>{m.department}</div>
                <div style={{ fontSize: isMobile ? "0.6rem" : "0.7rem", color: "rgba(255,255,255,0.6)" }}>Team</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}