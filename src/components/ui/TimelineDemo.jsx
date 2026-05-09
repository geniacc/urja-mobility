import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PlayCircle, ExternalLink, ArrowRight } from "lucide-react";

// Helper to resolve images safely
function resolveAsset(filename) {
  if (!filename) return null;
  return `/assets/${filename}`;
}

export default function TimelineDemo() {
  const milestones = [
    {
      date: "Nov 2023",
      title: "Foundation & Early Vision",
      text: "Founded in New Delhi with a mission to democratize electric mobility through an innovative BaaS model. Pankaj Chopra laid the groundwork, soon joined by Anagh Ojha to accelerate execution.",
      images: ["Pankaj Sir.jpeg", "Anagh sir.jpeg"],
      color: "#3b82f6",
      type: "founders"
    },
    {
      date: "Jan-Feb 2024",
      title: "Market Entry & Deployment",
      text: "Officially entered India’s EV ecosystem with a leasing-first approach. By Feb 6th, the first battery was successfully deployed, validating the commercial business model.",
      image: "tuk-tuk.png",
      color: "#8b5cf6",
      link: "https://zuice.in/",
      linkText: "Explore our Products",
      linkIcon: <ExternalLink size={16} />
    },
    {
      date: "Mid 2024",
      title: "Rapid Market Traction",
      text: "Early success highlighted massive demand for affordable EV energy solutions. We deployed 5,000 batteries within the first financial year, generating ₹15Cr in business.",
      metrics: [
        { label: "Business Achieved", value: "15Cr+" },
        { label: "Batteries Deployed", value: "1,000+" },
      ],
      color: "#f59e0b",
      link: "https://www.youtube.com/watch?v=NXm7ppf8yAA",
      linkText: "Watch: The Vision Grid Podcast",
      linkIcon: <PlayCircle size={16} />
    },
    {
      date: "Oct 2024",
      title: "₹100 Crore Pre-Series A",
      text: "Secured ~$12 Million funding led by Mufin Green Finance to expand our retail network and scale daily energy deployment to 300 MWh.",
      color: "#10b981",
      link: "https://www.youtube.com/watch?v=Oclzom8YYks",
      linkText: "Watch: ET Now Swadesh Interview",
      linkIcon: <PlayCircle size={16} />
    },
    {
      date: "2025",
      title: "Nationwide Ecosystem",
      text: "Forged massive supply chain partnerships with leaders like Eastman. We maintained a highly reliable leasing model while integrating advanced IoT analytics.",
      image: "eastman-urja-mobility-1536x864.jpg",
      metrics: [
        { label: "Total Deployed", value: "10,000+" },
        { label: "Default Ratio", value: "~0.9%" },
      ],
      color: "#ec4899",
      link: "https://audiencereports.in/anagh-ojha-engineering-a-sustainable-future-wit/",
      linkText: "Read: Engineering a Sustainable Future",
      linkIcon: <ExternalLink size={16} />
    },
    {
      date: "Dec 2025",
      title: "Showcase at EV Expo",
      text: "Participated in the major EV Expo at Pragati Maidan, New Delhi. We showcased our advanced battery solutions, engaging with industry leaders and expanding our expanding B2B network.",
      images: ["expo 1.jpeg", "expo 2.jpeg", "expo 3.jpeg"],
      color: "#ef4444",
      type: "gallery"
    },
    {
      date: "Today",
      title: "Powering the Revolution",
      text: "Redefining how India adopts electric mobility through flexible, finance-driven battery solutions and high-performance energy storage.",
      quote: "Making clean energy accessible, scalable, and financially viable for all.",
      color: "#06b6d4",
    },
  ];

  return (
    <div style={{ padding: "4rem 1rem", background: "transparent" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        {milestones.map((item, index) => {
          const topOffset = `calc(10vh + ${index * 32}px)`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{
                position: "sticky",
                top: topOffset,
                marginBottom: "5rem",
                background: "rgba(10, 15, 28, 0.8)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderTop: `2px solid ${item.color}`,
                borderRadius: "28px",
                padding: "3rem",
                boxShadow: "0 40px 80px -20px rgba(0, 0, 0, 0.6)",
                display: "grid",
                gridTemplateColumns: window.innerWidth <= 868 ? "1fr" : "1.2fr 1fr",
                gap: "3rem",
                alignItems: "center",
              }}
            >
              {/* CONTENT SECTION */}
              <div>
                <div style={{ display: "inline-block", background: `${item.color}15`, color: item.color, padding: "8px 20px", borderRadius: "99px", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  {item.date}
                </div>

                <h3 style={{ fontSize: "2.8rem", fontWeight: 900, color: "#ffffff", marginBottom: "1.25rem", lineHeight: "1.05", letterSpacing: "-0.03em" }}>
                  {item.title}
                </h3>

                <p style={{ color: "#94a3b8", fontSize: "1.15rem", lineHeight: "1.75", marginBottom: "2.5rem", maxWidth: "90%" }}>
                  {item.text}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      background: "#ffffff",
                      color: "#0f172a",
                      padding: "0.85rem 1.75rem",
                      borderRadius: "14px",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                      e.currentTarget.style.boxShadow = `0 12px 30px ${item.color}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {item.linkIcon}
                    {item.linkText}
                  </a>
                )}

                {item.quote && (
                  <div style={{ borderLeft: `4px solid ${item.color}`, paddingLeft: "1.5rem", marginTop: "1rem" }}>
                    <p style={{ color: "#cbd5e1", fontSize: "1.25rem", fontStyle: "italic", lineHeight: "1.6", margin: 0 }}>
                      "{item.quote}"
                    </p>
                  </div>
                )}
              </div>

              {/* VISUALS SECTION */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {/* METRICS GRID */}
                {item.metrics && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    {item.metrics.map((m, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", padding: "1.75rem", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ color: item.color, fontSize: "2.25rem", fontWeight: 900, marginBottom: "4px" }}>{m.value}</div>
                        <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 800, letterSpacing: "1px" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SINGLE IMAGE */}
                {item.image && (
                  <div style={{ width: "100%", height: "280px", borderRadius: "22px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
                    <img src={resolveAsset(item.image)} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(10,15,28,0.4), transparent)` }} />
                  </div>
                )}

                {/* MULTI-IMAGE GRIDS (Founders/Expo) */}
                {item.images && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: item.type === "gallery" ? "repeat(3, 1fr)" : "1fr 1fr",
                    gap: "1rem",
                    height: "280px"
                  }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
                        <img src={resolveAsset(img)} alt="Urja Moment" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {item.type === "founders" && (
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", padding: "1.25rem 0.5rem 0.75rem", textAlign: "center", fontSize: "0.85rem", fontWeight: "800", color: "#fff" }}>
                            {i === 0 ? "Pankaj Chopra" : "Anagh Ojha"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="timeline-root"
      ref={containerRef}
      style={{
        width: "100%",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "2rem 1rem" : "4rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
            marginBottom: "1rem",
            color: "var(--text)",
            fontWeight: 800,
          }}
        >
          A timeline of highlights across our recent milestones.
        </h2>

      </div>

      <div
        ref={ref}
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "4rem",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
              gap: isMobile ? "1rem" : "2rem",
              paddingTop: index === 0 ? "1rem" : "3rem",
              alignItems: "start",
            }}
          >
            <motion.div
              style={{
                position: "sticky",
                top: "100px",
                alignSelf: "start",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                zIndex: 2,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              animate={{ y: [0, -3, 0] }}
            >
              <div
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--bg-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--bg-3)",
                    border: "1px solid var(--border)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: isMobile ? "1.5rem" : "2.5rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-muted)",
                }}
              >
                {item.title}
              </h3>
            </motion.div>

            <div style={{ width: "100%", paddingLeft: isMobile ? "3.5rem" : "0" }}>{item.content}</div>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: "20px",
            top: 0,
            width: "2px",
            overflow: "hidden",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 99%)",
            height: height + "px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-gradient-fill"
          />
        </div>
      </div>
    </div>
  );
}