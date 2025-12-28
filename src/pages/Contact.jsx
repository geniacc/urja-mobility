import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="container" style={{ padding: "4rem 1rem" }}>
      <div className="section-header">
        <h1 className="section-title">Get in Touch</h1>
        <p className="section-subtitle">Have questions about our products? We're here to help.</p>
      </div>

      <div className="hero-grid" style={{ alignItems: 'start', gap: '4rem' }}>
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Email Us</div>
                  <div style={{ color: 'var(--muted)' }}>hello@urja.com</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Call Us</div>
                  <div style={{ color: 'var(--muted)' }}>+1 (555) 123-4567</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', background: 'var(--bg-2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Visit Us</div>
                  <div style={{ color: 'var(--muted)' }}>123 Energy Lane, Tech City, TC 90210</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--bg-2)', padding: '2rem', borderRadius: 'var(--radius)' }}>
            <h4 style={{ marginBottom: '1rem' }}>Business Hours</h4>
            <ul style={{ color: 'var(--muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Monday - Friday</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Saturday</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h3 style={{ marginBottom: '1.5rem' }}>Send us a Message</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="John Doe" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="john@example.com" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Subject</label>
              <select className="form-input">
                <option>General Inquiry</option>
                <option>Sales & Partnerships</option>
                <option>Support</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="5" placeholder="How can we help you?"></textarea>
            </div>
            
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Send Message <Send size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
