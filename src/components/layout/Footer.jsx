import React from "react";
import { Link } from "react-router-dom";
import { BatteryCharging, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
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

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-brand">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, repeatDelay: 2 }}
              >
                <BatteryCharging size={24} style={{ display: 'inline', marginRight: '8px' }} />
              </motion.div>
              Urja
            </div>
            <p className="footer-desc">
              Leading the revolution in sustainable energy storage. 
              Powering homes, vehicles, and industries with next-gen battery technology.
            </p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#9ca3af' }}>
                <MapPin size={16} /> 123 Energy Lane, Tech City
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#9ca3af' }}>
                <Phone size={16} /> +1 (555) 123-4567
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#9ca3af' }}>
                <Mail size={16} /> hello@urja.com
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <motion.a href="#" whileHover="hover" variants={socialIconVariants}><Facebook size={20} /></motion.a>
              <motion.a href="#" whileHover="hover" variants={socialIconVariants}><Twitter size={20} /></motion.a>
              <motion.a href="#" whileHover="hover" variants={socialIconVariants}><Linkedin size={20} /></motion.a>
              <motion.a href="#" whileHover="hover" variants={socialIconVariants}><Instagram size={20} /></motion.a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Urja Energy Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
