import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Youtube, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.15,
      transition: { type: "spring", stiffness: 300, damping: 10 }
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
            <img className="footer-ev-img" src={import.meta.env.BASE_URL + "assets/tuk-tuk.png"} alt="ev" />
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
                <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="Logo" style={{ width: 72, height: 72, objectFit: "contain", transform: "scale(1.33)", transformOrigin: "center" }} />
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
              <li className="footer-contact-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '4px' }} />
                <a href="https://maps.app.goo.gl/98494q94ASKEZDwg9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>11th Floor, Bset Sky Tower, Netaji Subhash Palace, Pitampura, Delhi-110035</a>
              </li>
              <li className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} style={{ flexShrink: 0 }} />
                <span>+918277343434</span>
              </li>
              <li className="footer-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ flexShrink: 0 }} />
                <span>info@urjamobility.in</span>
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
            <div className="social-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {/* Facebook - Blue */}
              <motion.a
                href="https://www.facebook.com/share/1Ba3soCdek/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover="hover"
                variants={socialIconVariants}
                style={{ color: "#1877F2", display: "inline-block" }}
              >
                <Facebook size={24} />
              </motion.a>

              {/* YouTube - Red */}
              <motion.a
                href="https://www.youtube.com/@UrjaMobility"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                whileHover="hover"
                variants={socialIconVariants}
                style={{ color: "#FF0000", display: "inline-block" }}
              >
                <Youtube size={24} />
              </motion.a>

              {/* LinkedIn - Blue */}
              <motion.a
                href="https://www.linkedin.com/company/urjamobility/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover="hover"
                variants={socialIconVariants}
                style={{ color: "#0A66C2", display: "inline-block" }}
              >
                <Linkedin size={24} />
              </motion.a>

              {/* Instagram - Pink/Magenta */}
              <motion.a
                href="https://www.instagram.com/urja_mobility?igsh=MWpwd3V5M2wwb3NmMA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover="hover"
                variants={socialIconVariants}
                style={{ color: "#E1306C", display: "inline-block" }}
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} MTOW MOBILITY PRIVATE LIMITED. All rights reserved.
        </div>
      </div>
    </footer>
  );
}