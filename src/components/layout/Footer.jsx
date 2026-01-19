import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialIconVariants = {
    hover: { 
      y: -5, 
      color: "var(--primary)",
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };
  const colVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-topline">
          <div className="footer-ev">
            <img className="footer-ev-img" src="/assets/tuk-tuk.png" alt="ev" />
          </div>
        </div>
        <div className="footer-ambient" />
        <div className="footer-grid">
          <motion.div className="footer-col" variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="footer-brand">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, repeatDelay: 2 }}
              >
                <img src="/assets/logo.png" alt="Logo" style={{ width: 72, height: 72, objectFit: "contain", transform: "scale(1.33)", transformOrigin: "center" }} />
              </motion.div>
            </div>
            <p className="footer-desc">
              Leading the revolution in sustainable energy storage. 
              Creating a work environment that balances high performance with purpose, encouraging every employee to drive impact through innovation, integrity, and customer-centricity.
            </p>
          </motion.div>
          
          <motion.div className="footer-col" variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/news-media">News & Media</Link></li>
              <li><Link to="/career">Career</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4>Contact</h4>
            <ul>
              <li className="footer-contact-item">
                <MapPin size={16} /> Urja Mobility HQ, Delhi, India
              </li>
              <li className="footer-contact-item">
                <Phone size={16} /> +918277343434
              </li>
              <li className="footer-contact-item">
                <Mail size={16} /> info@urjamobility.in
              </li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={colVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4>Stay Updated</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1rem' }}>
              Subscribe to our newsletter for the latest updates on green energy.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  padding: '0.8rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-2)',
                  color: 'var(--foreground)',
                  flex: 1,
                  fontSize: '0.9rem'
                }}
              />
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.8rem 1.2rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--primary)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Go
              </motion.button>
            </div>
            
            <h4 style={{ marginTop: '2rem' }}>Follow Us</h4>
            <div className="social-links">
              <motion.a 
                href="https://www.facebook.com/urjagloballimited" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                whileHover="hover" 
                variants={socialIconVariants}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href="https://x.com/MobilityUrja/with_replies" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Twitter / X"
                whileHover="hover" 
                variants={socialIconVariants}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/company/urjamobility/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                whileHover="hover" 
                variants={socialIconVariants}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/urja_mobility?igsh=MWpwd3V5M2wwb3NmMA==" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                whileHover="hover" 
                variants={socialIconVariants}
              >
                <Instagram size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Urja Energy Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
