import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, CheckCircle } from "lucide-react";

export default function Contact() {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
    }, 3000);
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '1rem 1.25rem',
    background: 'rgba(15, 23, 42, 0.6)',
    border: focusedField === fieldName ? '1px solid var(--primary)' : '1px solid var(--border)',
    borderRadius: '12px',
    color: 'var(--text)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: focusedField === fieldName ? '0 0 0 4px rgba(59, 130, 246, 0.1)' : 'none'
  });

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--text-muted)',
    marginLeft: '0.25rem'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', padding: '6rem 1rem 4rem', overflow: 'hidden' }}>
      {/* Ambient Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: '999px',
            marginBottom: '1.5rem',
            color: 'var(--primary)',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            <MessageSquare size={16} /> Contact Us
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Let's Start a <span style={{ color: 'var(--primary)', WebkitTextFillColor: 'initial' }}>Conversation</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Have questions about our battery solutions? We're here to help you power the future with sustainable energy.
          </p>
        </motion.div>

        <motion.div
          className="contact-layout-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Contact Information Column */}
          <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Contact Details <span style={{ height: '2px', flex: 1, background: 'linear-gradient(90deg, var(--border), transparent)' }}></span>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <ContactItem
                  icon={<Mail size={20} />}
                  label="Email Us"
                  value="info@urjamobility.in"
                  subValue="Support usually replies within 24h"
                  color="var(--primary)"
                />
                <ContactItem
                  icon={<Phone size={20} />}
                  label="Call Us"
                  value="+91 82773 43434"
                  subValue="Mon-Fri from 9am to 6pm"
                  color="var(--secondary)"
                />
                <ContactItem
                  icon={<MapPin size={20} />}
                  label="Visit HQ"
                  value="11th Floor, Bset Sky Tower"
                  subValue="Netaji Subhash Palace, Pitampura, Delhi-110035"
                  color="#f59e0b"
                />
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock size={20} style={{ color: 'var(--text-muted)' }} /> Business Hours
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span>Monday - Friday</span>
                  <span style={{ color: 'var(--text)', fontWeight: '500' }}>10:00 AM - 6:30 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span>Saturday</span>
                  <span style={{ color: 'var(--text)', fontWeight: '500' }}>10:00 AM - 6:30 PM</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  <span>Sunday</span>
                  <span style={{ color: 'var(--text)', fontWeight: '500' }}>Closed</span>
                </li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              borderRadius: '24px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Global Presence</h3>
                <p style={{ opacity: 0.9, fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                  We serve clients across India and expanding globally. Join our network of sustainable energy partners.
                </p>
                <button style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.4)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s'
                }}>
                  View Network <Globe size={16} />
                </button>
              </div>
              <Globe
                size={180}
                style={{
                  position: 'absolute',
                  bottom: -40,
                  right: -40,
                  opacity: 0.2,
                  transform: 'rotate(-15deg)'
                }}
              />
            </div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div variants={itemVariants}>
            <div className="contact-form-card" style={{
              background: 'var(--bg-2)',
              border: '1px solid var(--border)',
              borderRadius: '32px',
              padding: '3rem',
              boxShadow: '0 0 40px -10px rgba(59, 130, 246, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '6px',
                background: 'linear-gradient(90deg, var(--primary), var(--accent))'
              }} />

              <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>Send a Message</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                Fill out the form below and our team will get back to you within 24 hours.
              </p>

              <div style={{ position: 'relative', minHeight: '400px' }}>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '1.5rem'
                      }}
                    >
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(34, 197, 94, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--secondary)'
                      }}>
                        <CheckCircle size={40} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Message Sent!</h4>
                        <p style={{ color: 'var(--text-muted)' }}>We'll get back to you shortly.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                      <div className="contact-field-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                          <label style={labelStyle}>Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            placeholder="John Doe"
                            style={inputStyle('name')}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            placeholder="john@example.com"
                            style={inputStyle('email')}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Subject</label>
                        <div style={{ position: 'relative' }}>
                          <select
                            name="subject"
                            value={formData.subject}
                            style={{ ...inputStyle('subject'), appearance: 'none', cursor: 'pointer' }}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            onChange={handleChange}
                          >
                            <option>General Inquiry</option>
                            <option>Sales & Partnerships</option>
                            <option>Support & Service</option>
                            <option>Career Opportunities</option>
                          </select>
                          <div style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: 'var(--text-muted)'
                          }}>
                            ▼
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          rows="5"
                          placeholder="How can we help you today?"
                          style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          marginTop: '1rem',
                          padding: '1rem',
                          background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '1rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.4)'
                        }}
                      >
                        Send Message <Send size={18} />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, subValue, color }) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}
    >
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: `rgba(${hexToRgb(color)}, 0.1)`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: `1px solid rgba(${hexToRgb(color)}, 0.2)`
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{label}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text)', lineHeight: '1.2' }}>{value}</div>
        {subValue && <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{subValue}</div>}
      </div>
    </motion.div>
  );
}

// Helper for hex to rgb
function hexToRgb(hex) {
  if (!hex) return '255, 255, 255';

  // Handle var usage if passed directly (simple fallback)
  if (hex.startsWith('var')) {
    if (hex.includes('primary')) return '59, 130, 246'; // fallback for primary
    if (hex.includes('secondary')) return '34, 197, 94'; // fallback for secondary
    if (hex.includes('accent')) return '34, 197, 94'; // fallback for accent
    return '255, 255, 255';
  }

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
