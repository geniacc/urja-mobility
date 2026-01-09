import React from "react";
import { motion } from "framer-motion";
import { 
  BatteryCharging, 
  Zap, 
  Wifi, 
  Wrench, 
  Users, 
  Share2, 
  Car, 
  Handshake, 
  Coins, 
  Clock, 
  Layers,
  Brain
} from "lucide-react";

const CircuitPattern = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.1, pointerEvents: 'none' }}>
    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M10 10 L30 10 L30 30" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M70 70 L90 70 L90 90" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="30" r="2" fill="currentColor" />
      <circle cx="70" cy="70" r="2" fill="currentColor" />
    </pattern>
    <rect width="100%" height="100%" fill="url(#circuit)" />
  </svg>
);

const StatCard = ({ icon: Icon, value, label, subtext, color }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    style={{ 
      background: "rgba(255,255,255,0.05)", 
      border: `1px solid ${color}40`,
      borderRadius: "1rem",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      backdropFilter: "blur(10px)"
    }}
  >
    <div style={{ color: color, marginBottom: "0.5rem" }}>
      <Icon size={48} />
    </div>
    <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#fff", lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: "1rem", color: color, fontWeight: "600", marginTop: "0.25rem" }}>{label}</div>
    {subtext && <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.25rem" }}>{subtext}</div>}
  </motion.div>
);

const StakeholderCard = ({ icon: Icon, title, subtitle, color }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: `0 10px 20px -5px ${color}30` }}
    style={{
      background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      border: `1px solid ${color}30`,
      borderRadius: "0.75rem",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }}
  >
    <div style={{ 
      background: `${color}20`, 
      padding: "0.75rem", 
      borderRadius: "0.5rem",
      color: color
    }}>
      <Icon size={24} />
    </div>
    <div style={{ textAlign: "left" }}>
      <div style={{ color: "#fff", fontWeight: "600", fontSize: "0.9rem" }}>{title}</div>
      <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>{subtitle}</div>
    </div>
  </motion.div>
);

export default function StrategicRoadmap() {
  return (
    <section style={{ 
      position: "relative", 
      padding: "4rem 2rem", 
      background: "#020617", 
      color: "#fff",
      overflow: "hidden"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 50% 0%, #1e3a8a 0%, #020617 60%)",
        opacity: 0.4,
        zIndex: 0
      }} />
      <div style={{ color: "#3b82f6" }}>
        <CircuitPattern />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}
          >
            <Wifi size={24} color="#4ade80" />
            <div style={{ position: "relative" }}>
               <BatteryCharging size={64} color="#4ade80" />
               <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                 <Zap size={24} fill="#4ade80" color="#4ade80" />
               </div>
            </div>
            <Wifi size={24} color="#4ade80" />
          </motion.div>
          
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            style={{ 
              fontSize: "clamp(2rem, 5vw, 3.5rem)", 
              fontWeight: "800", 
              background: "linear-gradient(to right, #4ade80, #3b82f6)", 
              WebkitBackgroundClip: "text", 
              WebkitTextFillColor: "transparent",
              marginBottom: "0.5rem"
            }}
          >
            STRATEGIC VISION 2026
          </motion.h1>
          <h2 style={{ fontSize: "2rem", color: "#fff", letterSpacing: "2px" }}>URJA MOBILITY</h2>
        </div>

        {/* KEY STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          <StatCard 
            icon={Layers} 
            value="10,000" 
            label="Batteries Deployed" 
            color="#4ade80" 
          />
          <StatCard 
            icon={Wrench} 
            value="↓ 0.2%" 
            label="Annual Service Rate" 
            color="#60a5fa" 
            subtext="Reliability First"
          />
        </div>

        {/* STAKEHOLDER PILLARS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}>
          <StakeholderCard icon={Brain} title="Team" subtitle="Powering Innovation" color="#3b82f6" />
          <StakeholderCard icon={Users} title="Leaders" subtitle="Guiding Vision" color="#4ade80" />
          <StakeholderCard icon={Share2} title="Channel Partners" subtitle="Expanding Reach" color="#60a5fa" />
          <StakeholderCard icon={Car} title="Drivers/Customers" subtitle="Moving India Forward" color="#4ade80" />
          <StakeholderCard icon={Handshake} title="Vendor Partners" subtitle="Quality Supply" color="#3b82f6" />
          <StakeholderCard icon={Coins} title="Investors" subtitle="Backing the Charge" color="#4ade80" />
        </div>

        {/* CORE MESSAGING */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <h3 style={{ 
            fontSize: "1.8rem", 
            fontWeight: "bold", 
            color: "#4ade80", 
            marginBottom: "1.5rem" 
          }}>
            "Unlearn to Learn. Upgrade the Operating System."
          </h3>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", background: "rgba(255,255,255,0.05)", padding: "1rem 2rem", borderRadius: "2rem" }}>
            <Clock size={20} color="#60a5fa" />
            <span style={{ fontSize: "1.2rem", fontStyle: "italic", color: "#e2e8f0" }}>"We can pause. Time won't."</span>
          </div>
        </div>

        {/* TECHNICAL FOCUS & ROADMAP */}
        <div style={{ 
          background: "linear-gradient(90deg, #0f172a, #1e293b)", 
          border: "1px solid #334155", 
          borderRadius: "1rem", 
          padding: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem"
        }}>
          <div style={{ 
            background: "#4ade80", 
            color: "#020617", 
            padding: "0.5rem 1rem", 
            borderRadius: "0.5rem", 
            fontWeight: "bold",
            fontSize: "1.2rem"
          }}>
            2026
          </div>
          
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.9rem" }}>
            <div>
              <span style={{ color: "#94a3b8", marginRight: "0.5rem" }}>In-house:</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>BMS • IoT</span>
            </div>
            <div>
              <span style={{ color: "#94a3b8", marginRight: "0.5rem" }}>R&D:</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>Solid-state • Sodium-ion</span>
            </div>
            <div>
              <span style={{ color: "#94a3b8", marginRight: "0.5rem" }}>Patents:</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>Precision SOC & SOH</span>
            </div>
          </div>
        </div>

        {/* FOOTER CTA */}
        <div style={{ marginTop: "4rem", textAlign: "center" }}>
          <div style={{ 
            border: "1px solid #4ade80", 
            padding: "1rem 2rem", 
            display: "inline-block", 
            borderRadius: "0.5rem",
            background: "rgba(74, 222, 128, 0.1)",
            marginBottom: "1rem"
          }}>
            <span style={{ color: "#4ade80", fontWeight: "bold" }}>CTA: </span>
            <span style={{ color: "#fff" }}>Reply with your ONE 2026 commitment.</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: "0.9rem" }}>— Anagh & Pankaj (Founders, Urja Mobility)</div>
        </div>

      </div>
    </section>
  );
}
