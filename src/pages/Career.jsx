import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Users, Globe, Heart } from "lucide-react";

const positions = [
  {
    id: 1,
    title: "Senior Battery Engineer",
    department: "R&D",
    location: "Delhi, India",
    type: "Full-time",
    description: "Lead the development of our next-gen solid-state battery packs. You will work closely with the product team to optimize energy density and thermal management."
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Build scalable IoT platforms for real-time battery monitoring. Experience with React, Node.js, and time-series databases is a plus."
  },
  {
    id: 3,
    title: "Supply Chain Manager",
    department: "Operations",
    location: "Bhopal, India",
    type: "Full-time",
    description: "Optimize our procurement and logistics network. Ensure timely delivery of raw materials and distribution of finished battery packs."
  },
  {
    id: 4,
    title: "Sales Executive (B2B)",
    department: "Sales",
    location: "Mumbai, India",
    type: "Full-time",
    description: "Drive adoption of our BaaS model among fleet operators. You will be responsible for acquiring new key accounts and managing relationships."
  }
];

const perks = [
  { icon: Zap, title: "Impact Driven", desc: "Work on technology that directly reduces carbon emissions." },
  { icon: Users, title: "Collaborative Culture", desc: "A flat hierarchy where every voice matters." },
  { icon: Globe, title: "Remote Friendly", desc: "Flexible work policies for many roles." },
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive insurance and wellness programs." }
];

export default function Career() {
  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)",
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: "800px" }}
          >
            <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Power the Future <br />
              <span style={{ color: "var(--primary)" }}>With Urja.</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.25rem", color: "var(--muted)", maxWidth: "600px", marginBottom: "2.5rem" }}>
              Join a team of innovators, engineers, and dreamers dedicated to revolutionizing India's electric mobility landscape. We aren't just building batteries; we're building a sustainable tomorrow.
            </p>
            <motion.a 
              href="#positions"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", borderRadius: "50px" }}
            >
              View Openings <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section bg-muted">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Urja?</h2>
            <p className="section-subtitle">More than just a job.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: "var(--bg-2)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  border: "1px solid var(--border)",
                  textAlign: "center"
                }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
              >
                <div style={{ 
                  background: "rgba(34, 197, 94, 0.1)", 
                  width: "60px", 
                  height: "60px", 
                  borderRadius: "50%", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                  color: "var(--primary)"
                }}>
                  <perk.icon size={28} />
                </div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>{perk.title}</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Open Positions</h2>
            <p className="section-subtitle">Find your role in the revolution.</p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "3rem", maxWidth: "900px", marginInline: "auto" }}>
            {positions.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.03)" }}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  background: "var(--bg-2)",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1.5rem"
                }}
              >
                <div style={{ flex: "1 1 400px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{job.title}</h3>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "20px", 
                      background: "rgba(34, 197, 94, 0.1)", 
                      color: "var(--primary)",
                      border: "1px solid rgba(34, 197, 94, 0.2)"
                    }}>
                      {job.department}
                    </span>
                  </div>
                  <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{job.description}</p>
                  <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <MapPin size={16} /> {job.location}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Clock size={16} /> {job.type}
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-outline" style={{ borderRadius: "50px", padding: "0.75rem 1.5rem" }}>
                    Apply Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "4rem" }}>
            <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>Don't see a perfect fit? Send us your resume anyway.</p>
            <a href="mailto:careers@urjamobility.in" style={{ color: "var(--primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Email us at careers@urjamobility.in <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
