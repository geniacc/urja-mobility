import React from "react";
import { motion } from "framer-motion";
import TimelineDemo from "../components/ui/TimelineDemo";

export default function About() {
  return (
    <div className="container" style={{ padding: "4rem 1rem" }}>
      <div className="section-header">
        <h1 className="section-title">About Urja</h1>
        <p className="section-subtitle">Empowering the world with sustainable energy.</p>
      </div>

      <div className="hero-grid align-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Our Mission</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            At Urja, we believe that the future of energy is efficient, sustainable, and accessible. Founded in 2010, we have dedicated over a decade to researching and developing state-of-the-art lithium-ion battery technology.
          </p>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            Our mission is to accelerate the world's transition to renewable energy by providing reliable storage solutions for every need—from personal electronics to grid-scale infrastructure.
          </p>
          
          <div className="stats-grid">
            <div className="stat-item">
              <h3>12+</h3>
              <p>Years of Innovation</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Patents Filed</p>
            </div>
            <div className="stat-item">
              <h3>3</h3>
              <p>Global R&D Centers</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Commitment to Safety</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1513828583688-601bf760b1ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
            alt="Factory" 
            style={{ width: '100%', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
          />
          <div className="about-overlay">
            <h4>Sustainability First</h4>
            <p>Our manufacturing process uses 100% renewable energy and closed-loop water systems.</p>
          </div>
        </motion.div>
      </div>

      <section className="section" style={{ paddingTop: '4rem' }}>
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
        <TimelineDemo />
      </section>
    </div>
  );
}
