import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function BatteryIntelligence() {
  return (
    <section className="section" style={{ background: "linear-gradient(to bottom, #0f172a, #020617)", padding: "6rem 0" }}>
      <div className="container">
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "4rem", 
          alignItems: "center" 
        }}>
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title" style={{ textAlign: "left", marginBottom: "1.5rem", background: "linear-gradient(to right, #fff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Battery Intelligence
            </h2>
            <p className="section-subtitle" style={{ textAlign: "left", marginBottom: "2.5rem", maxWidth: "100%", color: "#94a3b8", lineHeight: 1.8 }}>
              Every Urja battery is equipped with an advanced BMS that communicates real-time health, efficiency, and predictive maintenance data to our cloud. This ensures optimal performance and longevity for every unit deployed.
            </p>
            
            <ul style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
              {["Real-time Monitoring", "Predictive Analytics", "Safety Protocols", "Cloud Integration"].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: "#e2e8f0", fontSize: "1.1rem" }}
                >
                  <div style={{ background: "rgba(34, 197, 94, 0.1)", padding: "0.25rem", borderRadius: "50%" }}>
                    <CheckCircle size={20} color="#4ade80" />
                  </div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", fontSize: "1.1rem" }}
            >
              Explore Tech <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            {/* Glow Effect */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
              background: "radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)",
              zIndex: 0,
              pointerEvents: "none"
            }} />
            
            <div style={{ 
              position: "relative", 
              zIndex: 1, 
              borderRadius: "1.5rem", 
              overflow: "hidden", 
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
              padding: "2rem"
            }}>
              <img 
                src="/assets/industrial-power-main.png" 
                alt="Battery Intelligence" 
                style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
