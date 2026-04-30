import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, ExternalLink, ArrowRight } from "lucide-react";

// Helper to resolve images safely
function resolveAsset(filename) {
  if (!filename) return null;
  return `/assets/${filename}`;
}

export default function TimelineDemo() {
  // Urja Mobility Journey Data mapped with your actual YouTube & Article Links
  const milestones = [
    {
      date: "Nov 2023",
      title: "Foundation & Early Vision",
      text: "Founded in New Delhi with a mission to democratize electric mobility through an innovative BaaS model. Pankaj Chopra laid the groundwork, soon joined by Anagh Ojha to accelerate execution.",
      images: ["Pankaj Sir.jpeg", "Anagh sir.jpeg"],
      color: "#3b82f6", // Blue
    },
    {
      date: "Jan-Feb 2024",
      title: "Market Entry & Deployment",
      text: "Officially entered India’s EV ecosystem with a leasing-first approach. By Feb 6th, the first battery was successfully deployed, validating the commercial business model.",
      image: "tuk-tuk.png",
      color: "#8b5cf6", // Purple
      link: "https://zuice.in/",
      linkText: "Explore our Products",
      linkIcon: <ExternalLink size={16} />
    },
    {
      date: "Mid 2024",
      title: "Rapid Market Traction",
      text: "Early success highlighted massive demand for affordable EV energy solutions. We deployed 5,000 batteries within the first financial year, generating ₹15Cr in business.",
      metrics: [
        { label: "Business Achieved", value: "₹15Cr" },
        { label: "Batteries Deployed", value: "1,000+" },
      ],
      color: "#f59e0b", // Orange
      link: "https://www.youtube.com/watch?v=NXm7ppf8yAA",
      linkText: "Watch: The Vision Grid Podcast",
      linkIcon: <PlayCircle size={16} />
    },
    {
      date: "Oct 2024",
      title: "₹100 Crore Pre-Series A",
      text: "Secured ~$12 Million funding led by Mufin Green Finance to expand our retail network and scale daily energy deployment to a massive 300 MWh.",
      color: "#10b981", // Green
      link: "https://www.youtube.com/watch?v=Oclzom8YYks",
      linkText: "Watch: ET Now Swadesh Interview",
      linkIcon: <PlayCircle size={16} />
    },
    {
      date: "2025",
      title: "Nationwide Ecosystem",
      text: "Forged massive supply chain partnerships with industry leaders like Eastman. We maintained a highly reliable leasing model while integrating advanced IoT analytics.",
      image: "eastman-urja-mobility-1536x864.jpg",
      metrics: [
        { label: "Total Deployed", value: "10,000+" },
        { label: "Default Ratio", value: "~0.9%" },
      ],
      color: "#ec4899", // Pink
      link: "https://audiencereports.in/anagh-ojha-engineering-a-sustainable-future-wit/",
      linkText: "Read: Engineering a Sustainable Future",
      linkIcon: <ExternalLink size={16} />
    },
    {
      date: "Today",
      title: "Powering the Revolution",
      text: "Urja Mobility stands as a fast-scaling EV energy company, redefining how India adopts electric mobility through flexible, finance-driven battery solutions.",
      quote: "Making clean energy accessible, scalable, and financially viable for all.",
      color: "#06b6d4", // Cyan
    },
  ];

  return (
    <div style={{ padding: "2rem 1rem", background: "transparent" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative" }}>

        {milestones.map((item, index) => {
          // Calculates the sticky top offset so cards stack visibly
          const topOffset = `calc(10vh + ${index * 30}px)`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                position: "sticky",
                top: topOffset, // This creates the 3D card stacking effect
                marginBottom: "4rem", // Space between cards before they stack
                background: "rgba(15, 23, 42, 0.75)", // Deep slate glassmorphism
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: `2px solid ${item.color}`, // Neon accent line at the top
                borderRadius: "24px",
                padding: "2.5rem",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0,0,0,0.2)",
                display: "grid",
                gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "1.2fr 1fr",
                gap: "2.5rem",
                alignItems: "center",
                transformOrigin: "top center",
              }}
            >

              {/* LEFT SIDE: Text & Links */}
              <div>
                <div style={{ display: "inline-block", background: `${item.color}20`, color: item.color, padding: "6px 16px", borderRadius: "99px", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "1px", marginBottom: "1.5rem" }}>
                  {item.date}
                </div>

                <h3 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#f8fafc", marginBottom: "1rem", lineHeight: "1.1" }}>
                  {item.title}
                </h3>

                <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: "1.7", marginBottom: "2rem" }}>
                  {item.text}
                </p>

                {/* CLICKABLE ACTION BUTTON */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      background: "#f8fafc",
                      color: "#020617",
                      padding: "0.75rem 1.5rem",
                      borderRadius: "12px",
                      fontWeight: 700,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxShadow: "0 4px 15px rgba(255,255,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 8px 25px ${item.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,255,255,0.1)";
                    }}
                  >
                    {item.linkIcon}
                    {item.linkText}
                  </a>
                )}

                {/* QUOTE (For "Today" section) */}
                {item.quote && (
                  <div style={{ borderLeft: `4px solid ${item.color}`, paddingLeft: "1.5rem" }}>
                    <p style={{ color: "#e2e8f0", fontSize: "1.2rem", fontStyle: "italic", lineHeight: "1.6", margin: 0 }}>
                      "{item.quote}"
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: Visuals & Metrics */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* METRICS */}
                {item.metrics && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {item.metrics.map((m, i) => (
                      <div key={i} style={{ background: "rgba(0,0,0,0.4)", padding: "1.5rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ color: item.color, fontSize: "2rem", fontWeight: 900 }}>{m.value}</div>
                        <div style={{ color: "#64748b", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: 700, marginTop: "4px" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* SINGLE IMAGE */}
                {item.image && (
                  <div style={{ width: "100%", height: "240px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${item.color}40, transparent)`, zIndex: 1, pointerEvents: "none" }} />
                    <img src={resolveAsset(item.image)} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                )}

                {/* DUAL FOUNDER IMAGES */}
                {item.images && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", height: "240px" }}>
                    {item.images.map((img, i) => (
                      <div key={i} style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
                        <img src={resolveAsset(img)} alt="Leader" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.9))", padding: "1rem 0.5rem 0.5rem", textAlign: "center", fontSize: "0.8rem", fontWeight: "bold", color: "#fff" }}>
                          {i === 0 ? "Pankaj Chopra" : "Anagh Ojha"}
                        </div>
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