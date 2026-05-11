import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, Clock, ArrowRight, Zap, Users,
  Globe, Heart, X, Upload, Check, Phone, IndianRupee, Link, GraduationCap
} from "lucide-react";

// --- Job Data ---
const positions = [
  {
    id: 1,
    title: "Senior Battery Engineer",
    department: "R&D",
    location: "Delhi, India",
    type: "Full-time",
    description: "Lead the development of our next-gen solid-state battery packs. You will work closely with the product team to optimize energy density and thermal management.",
    theme: { primary: "#10b981", bg: "rgba(16, 185, 129, 0.05)", border: "rgba(16, 185, 129, 0.2)", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)", shadow: "rgba(16, 185, 129, 0.1)" }
  },
  {
    id: 2,
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Delhi, India",
    type: "Full-time",
    description: "Build scalable IoT platforms for real-time battery monitoring. Experience with React, Node.js, and time-series databases is a plus.",
    theme: { primary: "#3b82f6", bg: "rgba(59, 130, 246, 0.05)", border: "rgba(59, 130, 246, 0.2)", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", shadow: "rgba(59, 130, 246, 0.1)" }
  },
  {
    id: 3,
    title: "Supply Chain Manager",
    department: "Operations",
    location: "Delhi, India",
    type: "Full-time",
    description: "Optimize our procurement and logistics network. Ensure timely delivery of raw materials and distribution of finished battery packs.",
    theme: { primary: "#f59e0b", bg: "rgba(245, 158, 11, 0.05)", border: "rgba(245, 158, 11, 0.2)", gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.1)" }
  },
  {
    id: 4,
    title: "Sales Executive (B2B)",
    department: "Sales",
    location: "Delhi, India",
    type: "Full-time",
    description: "Drive adoption of our BaaS model among fleet operators. You will be responsible for acquiring new key accounts and managing relationships.",
    theme: { primary: "#8b5cf6", bg: "rgba(139, 92, 246, 0.05)", border: "rgba(139, 92, 246, 0.2)", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", shadow: "rgba(139, 92, 246, 0.1)" }
  },
  {
    id: 5,
    title: "Founder's Office (Intern/GET/MET)",
    department: "Leadership",
    location: "Delhi, India",
    type: "Full-time / Internship",
    description: "High-impact roles for freshers. Support the leadership team in technical, operations, and strategic initiatives to scale our EV solutions.",
    theme: { primary: "#64748b", bg: "rgba(100, 116, 139, 0.05)", border: "rgba(100, 116, 139, 0.2)", gradient: "linear-gradient(135deg, #64748b 0%, #475569 100%)", shadow: "rgba(100, 116, 139, 0.1)" }
  },
  {
    id: 6,
    title: "IT Graduate Trainee (Frontend/Backend/AI)",
    department: "Engineering",
    location: "Delhi, India",
    type: "Full-time (0-2 yrs exp)",
    description: "Developing cutting-edge AI tools, Android applications, and scalable web architectures. Perfect for ambitious developers looking to innovate in the EV space.",
    theme: { primary: "#0ea5e9", bg: "rgba(14, 165, 233, 0.05)", border: "rgba(14, 165, 233, 0.2)", gradient: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", shadow: "rgba(14, 165, 233, 0.1)" }
  },
  {
    id: 7,
    title: "R&D Diploma Engineer Trainee (DET)",
    department: "R&D",
    location: "Delhi, India",
    type: "Full-time",
    description: "Technical roles for Electrical, Electronics, and Mechanical diploma holders. Join our R&D lab to build and test high-performance battery systems.",
    theme: { primary: "#ec4899", bg: "rgba(236, 72, 153, 0.05)", border: "rgba(236, 72, 153, 0.2)", gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", shadow: "rgba(236, 72, 153, 0.1)" }
  },
  {
    id: 8,
    title: "Management Trainee (MBA)",
    department: "Business Development",
    location: "Delhi, India",
    type: "Full-time",
    description: "Driving growth across Sales, Finance, and IT Management. We are looking for MBA graduates ready to lead business operations in a fast-paced environment.",
    theme: { primary: "#14b8a6", bg: "rgba(20, 184, 166, 0.05)", border: "rgba(20, 184, 166, 0.2)", gradient: "linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)", shadow: "rgba(20, 184, 166, 0.1)" }
  },
  {
    id: 9,
    title: "Operations & Collections Associate",
    department: "Operations",
    location: "Delhi, India",
    type: "Full-time",
    description: "Join our ground team for marketing and collections. A hands-on role focused on expanding our market footprint and managing regional operations.",
    theme: { primary: "#f97316", bg: "rgba(249, 115, 22, 0.05)", border: "rgba(249, 115, 22, 0.2)", gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", shadow: "rgba(249, 115, 22, 0.1)" }
  }
];

const perks = [
  { icon: Zap, title: "Impact Driven", desc: "Work on technology that directly reduces carbon emissions." },
  { icon: Users, title: "Collaborative Culture", desc: "A flat hierarchy where every voice matters." },
  { icon: Globe, title: "Remote Friendly", desc: "Flexible work policies for many roles." },
  { icon: Heart, title: "Health & Wellness", desc: "Comprehensive insurance and wellness programs." }
];

// Shared styling for form inputs
const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  borderRadius: "0.5rem",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white",
  outline: "none",
  fontSize: "0.9rem",
  colorScheme: "dark" // Forces native dropdowns to use dark mode
};

// Specifically style the dropdown options to ensure visibility
const optionStyle = {
  background: "#0f172a", // Dark slate background
  color: "white",
  padding: "10px"
};

// --- Modal Component ---
const ApplicationModal = ({ job, onClose }) => {
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => { setStep(2); }, 1000);
  };

  if (!mounted) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 999999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)", zIndex: 1 }}
      />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
        style={{
          position: "relative", zIndex: 10, width: "100%", maxWidth: "750px", maxHeight: "90vh",
          display: "flex", flexDirection: "column", background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        }}
      >
        {step === 1 ? (
          <>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: job.theme.bg, flexShrink: 0 }}>
              <div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "white" }}>Apply for {job.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                  <Briefcase size={14} /> {job.department} <span style={{ opacity: 0.3 }}>|</span> <MapPin size={14} /> {job.location}
                </p>
              </div>
              <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "white", padding: "0.5rem", borderRadius: "50%", cursor: "pointer", transition: "all 0.2s" }}><X size={20} /></button>
            </div>

            <div style={{ overflowY: "auto", padding: "2rem", background: "#0f172a" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

                {/* Personal Details Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>First Name *</label>
                    <input required type="text" placeholder="John" style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Last Name *</label>
                    <input required type="text" placeholder="Doe" style={inputStyle} />
                  </div>
                </div>

                {/* Contact Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Email Address *</label>
                    <input required type="email" placeholder="john@example.com" style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Mobile Number *</label>
                    <div style={{ position: "relative" }}>
                      <Phone size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                      <input required type="tel" placeholder="+91 XXXXX XXXXX" style={{ ...inputStyle, paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                </div>

                {/* Location & Education Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Current City *</label>
                    <input required type="text" placeholder="e.g. New Delhi" style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Highest Qualification *</label>
                    <select required style={inputStyle}>
                      <option value="" disabled selected style={optionStyle}>Select Degree</option>
                      <option value="btech" style={optionStyle}>B.Tech / B.E.</option>
                      <option value="mtech" style={optionStyle}>M.Tech / M.E.</option>
                      <option value="mba" style={optionStyle}>MBA / PGDM</option>
                      <option value="diploma" style={optionStyle}>Diploma</option>
                      <option value="other" style={optionStyle}>Other Degree</option>
                    </select>
                  </div>
                </div>

                <hr style={{ border: "0", borderTop: "1px solid rgba(255,255,255,0.05)" }} />

                {/* Experience & Notice Period Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Years of Experience *</label>
                    <select required style={inputStyle}>
                      <option value="" disabled selected style={optionStyle}>Select Experience</option>
                      <option value="0" style={optionStyle}>Fresher / No Experience</option>
                      <option value="1" style={optionStyle}>1 - 3 Years</option>
                      <option value="3" style={optionStyle}>3 - 5 Years</option>
                      <option value="5" style={optionStyle}>5 - 8 Years</option>
                      <option value="8" style={optionStyle}>8+ Years</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Notice Period *</label>
                    <select required style={inputStyle}>
                      <option value="" disabled selected style={optionStyle}>Select Notice Period</option>
                      <option value="0" style={optionStyle}>Immediate Joiner</option>
                      <option value="15" style={optionStyle}>15 Days</option>
                      <option value="30" style={optionStyle}>30 Days</option>
                      <option value="60" style={optionStyle}>60 Days</option>
                      <option value="90" style={optionStyle}>90 Days</option>
                    </select>
                  </div>
                </div>

                {/* CTC Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Current CTC (Annual) *</label>
                    <div style={{ position: "relative" }}>
                      <IndianRupee size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                      <input required type="text" placeholder="e.g. 6,00,000" style={{ ...inputStyle, paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Expected CTC (Annual) *</label>
                    <div style={{ position: "relative" }}>
                      <IndianRupee size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                      <input required type="text" placeholder="e.g. 8,50,000" style={{ ...inputStyle, paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                </div>

                {/* Professional Links Row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>LinkedIn Profile URL</label>
                    <div style={{ position: "relative" }}>
                      <Link size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                      <input type="url" placeholder="https://linkedin.com/in/..." style={{ ...inputStyle, paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Portfolio / GitHub URL</label>
                    <div style={{ position: "relative" }}>
                      <Globe size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                      <input type="url" placeholder="https://..." style={{ ...inputStyle, paddingLeft: "2.5rem" }} />
                    </div>
                  </div>
                </div>

                {/* Resume Upload */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Resume / CV *</label>
                  <div style={{
                    border: "2px dashed rgba(255,255,255,0.2)",
                    borderRadius: "0.75rem",
                    padding: "1.5rem",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.02)",
                    transition: "all 0.2s"
                  }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = job.theme.primary}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
                  >
                    <Upload size={24} style={{ color: job.theme.primary, marginBottom: "0.5rem" }} />
                    <p style={{ color: "white", fontSize: "0.9rem", fontWeight: "500" }}>Click to upload or drag and drop</p>
                    <p style={{ color: "#64748b", fontSize: "0.8rem" }}>PDF, DOCX up to 10MB</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500" }}>Cover Letter / Additional Details</label>
                  <textarea rows={3} placeholder="Tell us why you are a great fit..." style={{ ...inputStyle, resize: "none" }} />
                </div>

                {/* Consent Checkbox */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginTop: "0.5rem" }}>
                  <input type="checkbox" required style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: job.theme.primary }} />
                  <label style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: "1.4" }}>
                    I confirm that the information provided is accurate and agree to the processing of my personal data for recruitment purposes by Urja Mobility.
                  </label>
                </div>

                {/* Actions */}
                <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", justifyContent: "flex-end", position: "sticky", bottom: 0, background: "#0f172a", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <button type="button" onClick={onClose} style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer" }}>Cancel</button>
                  <button type="submit" style={{ padding: "0.75rem 2rem", borderRadius: "0.5rem", background: job.theme.gradient, border: "none", color: "white", fontWeight: "600", cursor: "pointer", boxShadow: `0 4px 12px ${job.theme.shadow}` }}>Submit Application</button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <div style={{ padding: "5rem 2rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}
              style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(34, 197, 94, 0.1)", color: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}
            >
              <Check size={40} />
            </motion.div>
            <h3 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "white", marginBottom: "0.5rem" }}>Application Received!</h3>
            <p style={{ color: "#94a3b8", maxWidth: "400px", lineHeight: "1.6" }}>
              Thanks for applying to be a <strong>{job.title}</strong>. We've sent a confirmation email to you. Our HR team will review your application and get back to you shortly.
            </p>
            <button onClick={onClose} style={{ marginTop: "2.5rem", padding: "0.75rem 2.5rem", borderRadius: "0.5rem", background: "white", border: "none", color: "black", fontWeight: "600", cursor: "pointer" }}>
              Back to Careers
            </button>
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

// --- Main Page Component ---
export default function Career() {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="page-wrapper">
      <AnimatePresence>
        {selectedJob && <ApplicationModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 70% 30%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)", zIndex: 0 }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: "800px" }}>
            <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" }}>
              Power the Future <br />
              <span style={{ color: "var(--primary)" }}>With Urja.</span>
            </h1>
            <p className="hero-subtitle" style={{ fontSize: "1.25rem", color: "var(--muted)", maxWidth: "600px", marginBottom: "2.5rem" }}>
              Join a team of innovators, engineers, and dreamers dedicated to revolutionizing India's electric mobility landscape. We aren't just building batteries; we're building a sustainable tomorrow.
            </p>
            <motion.a href="#positions" className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2rem", borderRadius: "50px" }}>
              View Openings <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="section bg-muted">
        <div className="container">
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title">Why Urja?</h2>
            <p className="section-subtitle">More than just a job.</p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            {perks.map((perk, i) => (
              <motion.div className="career-job-card" key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} style={{ background: "var(--bg-2)", padding: "2rem", borderRadius: "1rem", border: "1px solid var(--border)", textAlign: "center" }} whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}>
                <div style={{ background: "rgba(34, 197, 94, 0.1)", width: "60px", height: "60px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--primary)" }}>
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
          <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title">Open Positions</h2>
            <p className="section-subtitle">Find your role in the revolution.</p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "3rem", maxWidth: "900px", marginInline: "auto" }}>
            {positions.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.01, backgroundColor: job.theme.bg }} style={{ border: `1px solid ${job.theme.border}`, borderRadius: "1rem", padding: "2rem", background: "var(--bg-2)", cursor: "default", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "4px", background: job.theme.gradient }} />
                <div style={{ flex: "1 1 400px", paddingLeft: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>{job.title}</h3>
                    <span style={{ fontSize: "0.75rem", padding: "0.25rem 0.75rem", borderRadius: "20px", background: job.theme.bg, color: job.theme.primary, border: `1px solid ${job.theme.border}`, fontWeight: "600" }}>{job.department}</span>
                  </div>
                  <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>{job.description}</p>
                  <div className="career-job-meta" style={{ display: "flex", gap: "1.5rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={16} /> {job.location}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Clock size={16} /> {job.type}</div>
                  </div>
                </div>
                <div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedJob(job)} style={{ borderRadius: "50px", padding: "0.75rem 2rem", background: job.theme.gradient, color: "white", border: "none", fontWeight: "600", boxShadow: `0 4px 14px ${job.theme.shadow}`, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Apply Now <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Section updated with multiple emails */}
          <div style={{ textAlign: "center", marginTop: "5rem", padding: "3rem", borderRadius: "1rem", border: "1px dashed rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", fontWeight: "600" }}>Don't see a perfect fit?</h3>
            <p style={{ color: "var(--muted)", marginBottom: "2rem", maxWidth: "500px", marginInline: "auto" }}>We are always looking for exceptional talent. Send us your resume directly and our HR team will reach out when a suitable role opens up.</p>

            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:hr1@urjamobility.in" style={{ color: "var(--primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "50px", background: "rgba(34, 197, 94, 0.1)" }}>
                hr1@urjamobility.in
              </a>
              <a href="mailto:hr@urjamobility.in" style={{ color: "var(--primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "50px", background: "rgba(34, 197, 94, 0.1)" }}>
                hr@urjamobility.in
              </a>
              <a href="mailto:info@urjamobility.in" style={{ color: "var(--primary)", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "50px", background: "rgba(34, 197, 94, 0.1)" }}>
                info@urjamobility.in
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}