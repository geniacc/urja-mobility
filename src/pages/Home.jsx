import React, { useState, useEffect, useMemo, useRef } from "react";
import Hero from "../components/Hero";
import PresenceMap from "../components/PresenceMap";
import StrategicRoadmap from "../components/StrategicRoadmap";
import BatteryIntelligence from "../components/BatteryIntelligence";
import { categories, stats, testimonials } from "../data/mockData";
import { motion } from "framer-motion";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 50 }
  }
};

const TestimonialSlider = ({ items }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(id);
  }, [items.length]);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const active = items[index];
  return (
    <div className="testimonial-wrapper">
      <div className="testimonial-grid-bg" />
      <motion.div
        key={index}
        className="testimonial-inner"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="testimonial-left">
          <motion.div 
            className="testimonial-img-wrap" 
            whileHover={{ scale: 1.02, rotate: 0.4 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <img src={active.image} alt="partner" className="testimonial-img" />
            <span className="testimonial-img-shadow" />
          </motion.div>
        </div>
        <div className="testimonial-right">
          <div className="testimonial-name">{active.name}</div>
          <div className="testimonial-role">{active.role}</div>
          <p className="testimonial-quote">"{active.text}"</p>
          <div className="testimonial-nav">
            <button className="nav-btn" onClick={prev} aria-label="Previous"><ChevronLeft size={18} /></button>
            <button className="nav-btn" onClick={next} aria-label="Next"><ChevronRight size={18} /></button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const marqueeRef = useRef(null);
  const partnerImages = [
    "/assets/1.png", "/assets/2.png", "/assets/3.png", "/assets/4.png", 
    "/assets/5.png", "/assets/6.png", "/assets/7.png", "/assets/8.png", 
    "/assets/9.png", "/assets/10.png", "/assets/11.png", "/assets/12.png"
  ];
  const featuredProducts = useMemo(() => {
    const list = [];
    categories.forEach(cat => {
      cat.subcategories?.forEach(sub => {
        sub.items?.forEach(item => {
          if (item.image) list.push({ title: item.title, image: item.image, color: cat.color });
        });
        sub.groups?.forEach(group => {
          group.items?.forEach(item => {
            if (item.image) list.push({ title: item.title, image: item.image, color: cat.color });
          });
        });
      });
    });
    return list;
  }, []);
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cards = el.querySelectorAll(".product-card");
      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const dist = Math.abs(x - cx) / (rect.width / 2);
        const minScale = 0.85;
        const maxScale = 1.15;
        const scale = minScale + Math.min(dist, 1) * (maxScale - minScale);
        card.style.setProperty("--pos-scale", scale.toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <Hero categories={categories} />
      
      {/* Feature Section: Moving Product Cards */}
      <section className="feature-marquee">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">A quick glance at what we build.</p>
          </motion.div>
        </div>
        {/* Marquee Row */}
        <div className="marquee" ref={marqueeRef}>
          <div className="marquee-inner">
            {/* Track A */}
            <div className="marquee-track">
              {featuredProducts.map((p, i) => (
                <div 
                  key={`a-${i}`} 
                  className="product-card"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - r.left;
                    const y = e.clientY - r.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.removeProperty('--mouse-x');
                    e.currentTarget.style.removeProperty('--mouse-y');
                  }}
                >
                  <motion.div 
                    className="product-card-inner"
                    whileHover={{ rotateY: 8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    <div className="product-card-top">
                      <span className="product-badge">Product</span>
                      <div className="product-spark" />
                    </div>
                    <div className="product-card-body">
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }} />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
            {/* Track B (duplicate for seamless loop) */}
            <div className="marquee-track">
              {featuredProducts.map((p, i) => (
                <div 
                  key={`b-${i}`} 
                  className="product-card"
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - r.left;
                    const y = e.clientY - r.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.removeProperty('--mouse-x');
                    e.currentTarget.style.removeProperty('--mouse-y');
                  }}
                >
                  <motion.div 
                    className="product-card-inner"
                    whileHover={{ rotateY: 8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 120, damping: 12 }}
                  >
                    <div className="product-card-top">
                      <span className="product-badge">Product</span>
                      <div className="product-spark" />
                    </div>
                    <div className="product-card-body">
                      <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))' }} />
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
          <div className="rikshaw-2d-row">
            <div className="rikshaw-road"></div>
            <div className="rikshaw-2d">
              <div className="ev-trail"></div>
              <div className="ev-trail"></div>
              <div className="ev-trail"></div>
              <img className="rikshaw-img" src="/assets/tuk-tuk.png" alt="tuk-tuk" />
            </div>
          </div>
      </section>
      


      {/* Features/Why Choose Us */}
      <section className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose Urja?</h2>
            <p className="section-subtitle">We don't just build batteries; we engineer reliability.</p>
          </motion.div>

          <motion.div 
            className="card-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {[
              { title: "Advanced Safety", desc: "Multi-layer BMS protection against thermal runaway." },
              { title: "Long Lifespan", desc: "Cells engineered for 5000+ charge cycles." },
              { title: "Eco-Friendly", desc: "95% recyclable materials and sustainable manufacturing." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="card"
                variants={itemVariants}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5), 0 0 30px var(--primary-glow)"
                }}
              >
                <div className="card-icon">
                  <CheckCircle size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Trusted Partners</h2>
            <p className="section-subtitle">Driving impact together with our partners.</p>
          </motion.div>
          <TestimonialSlider
            items={partnerImages.map((img, i) => ({
              image: img,
              text: testimonials[i % testimonials.length].text,
              name: testimonials[i % testimonials.length].name,
              role: testimonials[i % testimonials.length].role,
            }))}
          />
        </div>
      </section>

      <BatteryIntelligence />
      <StrategicRoadmap />
      <PresenceMap />
    </>
  );
}
