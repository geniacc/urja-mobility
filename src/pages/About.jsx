import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Lightbulb, Users, Zap, Globe } from "lucide-react";
import TimelineDemo from "../components/ui/TimelineDemo";
import TeamSphere from "../components/TeamSphere";

export default function About() {
  return (
    <div style={{ paddingTop: "80px" }}> {/* Offset for fixed navbar */}
      
      {/* SECTION 1: OVERVIEW & MISSION/VISION */}
      <section style={{ padding: "6rem 0", position: "relative", overflow: "hidden" }}>
        {/* Background Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: -1
          }} 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "-10%",
            width: "60%",
            height: "60%",
            background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            zIndex: -1
          }} 
        />

        <div className="container">
          <div className="section-header">
            <h1 className="section-title" style={{ 
              background: "linear-gradient(135deg, #fff 30%, #3b82f6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Urja Mobility</h1>
            <p className="section-subtitle">Redefining how electric vehicles are powered and adopted <span style={{ color: "var(--secondary)" }}>across India</span>.</p>
          </div>

          {/* ABOUT US */}
          <div style={{ marginTop: "4rem", maxWidth: "900px", margin: "4rem auto 0", textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6 }}
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.0) 100%)",
                padding: "3rem",
                borderRadius: "2rem",
                border: "1px solid rgba(255,255,255,0.05)",
                boxShadow: "0 0 40px rgba(0,0,0,0.2)"
              }}
            >
               <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', background: "linear-gradient(to right, #f8fafc, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>About Us</h2>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.15rem', lineHeight: '1.8' }}>
                 Urja Mobility is an Indian clean-energy technology company redefining how electric vehicles are powered and adopted across India. Focused primarily on the commercial electric vehicle segment, the company provides flexible and innovative energy solutions that make electric mobility more accessible and economically viable for businesses, drivers, and fleet operators.
               </p>
               <p style={{ color: 'var(--muted)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
                 Urja Mobility specializes in Battery-as-a-Service (BaaS) and Energy-as-a-Service (EaaS) models that enable customers to lease high-performance lithium-ion batteries for electric two-wheelers and three-wheelers under structured usage plans. By converting upfront battery ownership costs into predictable operational expenses, Urja Mobility removes key financial barriers to EV adoption.
               </p>
               <p style={{ color: 'var(--muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                 Headquartered in New Delhi, India, the company is steadily expanding its footprint across multiple cities, supporting India’s transition toward cleaner and more sustainable transportation.
               </p>
            </motion.div>
          </div>

          {/* MISSION & VISION GRID */}
          <div className="hero-grid align-start" style={{ marginTop: "6rem", gap: "4rem", display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* MISSION */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: "var(--primary)" }}>Our Mission</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                To democratize access to sustainable electric mobility by delivering innovative, affordable, and flexible battery leasing and energy solutions that eliminate high upfront costs and empower commercial EV users to operate efficiently and profitably.
              </p>
              <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Urja Mobility’s approach centres around making energy a service rather than a barrier to adoption, enabling drivers and businesses to focus on growth while accessing reliable, high-performance battery systems.
              </p>
            </motion.div>

            {/* VISION */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ background: "rgba(255,255,255,0.03)", padding: "2rem", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.1)" }}
            >
               <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: "var(--secondary)" }}>Our Vision</h2>
               <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                 To be a catalyst for India’s electric mobility transformation, where battery energy becomes universally accessible, seamlessly integrated, and economically viable — enabling EVs to become the preferred choice of transport across the country.
               </p>
               <p style={{ color: 'var(--muted)', marginTop: '1rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
                 This vision supports India’s broader clean-energy goals by advancing scalable, user-centric energy solutions that drive widespread EV adoption and reduce carbon emissions.
               </p>
            </motion.div>
          </div>

          {/* CORPORATE CULTURE */}
          <div style={{ marginTop: "8rem" }}>
             <div className="section-header" style={{ marginBottom: "4rem" }}>
                <h2 className="section-title">Corporate Culture</h2>
                <p className="section-subtitle" style={{ maxWidth: "800px", margin: "1rem auto 0", lineHeight: "1.6", fontSize: "1.1rem" }}>
                  Together, these cultural values create a work environment that balances high performance with purpose, encouraging every employee to drive impact through innovation, integrity, and customer-centricity.
                </p>
             </div>
             
             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
                {[
                  { title: "Purpose-Driven Engagement", icon: <Lightbulb size={24} />, color: "#eab308", text: "We cultivate a workplace where individuals are aligned with a shared purpose — to make electric energy accessible and to contribute meaningfully to India’s clean energy transition." },
                  { title: "Collaborative & Adaptive Spirit", icon: <Users size={24} />, color: "#3b82f6", text: "Urja Mobility nurtures a culture of collaboration, agility, and cross-functional teamwork. Employees work closely with partners, field teams, and end-users to continuously refine products." },
                  { title: "Innovation & Customer Focus", icon: <Zap size={24} />, color: "#f97316", text: "Teams are encouraged to think creatively, experiment with new approaches, and take ownership of solutions that improve user experience, performance, and operational reliability." },
                  { title: "Sustainability & Impact", icon: <Globe size={24} />, color: "#22c55e", text: "Sustainability is not just a strategy — it is embedded in how we operate. The company promotes responsible practices that support environmental stewardship and long-term value creation." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    whileHover={{ 
                      y: -10, 
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderColor: item.color
                    }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ 
                      background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)", 
                      padding: "2rem", 
                      borderRadius: "1rem", 
                      border: "1px solid rgba(255,255,255,0.05)",
                      cursor: "default"
                    }}
                  >
                    <div style={{ 
                      display: "inline-flex", 
                      padding: "0.8rem", 
                      borderRadius: "50%", 
                      background: `${item.color}20`, 
                      color: item.color,
                      marginBottom: "1.5rem"
                    }}>
                      {item.icon}
                    </div>
                    <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "#f8fafc" }}>{item.title}</h3>
                    <p style={{ color: "var(--muted)", lineHeight: "1.6", fontSize: "0.95rem" }}>{item.text}</p>
                  </motion.div>
                ))}
             </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: GLOBAL TEAM */}
      <section style={{ position: "relative", padding: "4rem 0", background: "linear-gradient(to bottom, #020617, #0f172a, #020617)" }}>
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "60%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <TeamSphere />
        </div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="section" style={{ padding: '8rem 0' }}>
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Journey</h2>
            <p className="section-subtitle">Highlights from our 12 milestone journey.</p>
          </motion.div>
        </div>
        <div style={{ marginTop: "4rem" }}>
          <TimelineDemo />
        </div>
      </section>

    </div>
  );
}
