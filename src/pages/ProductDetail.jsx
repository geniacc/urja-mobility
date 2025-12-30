import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data/mockData";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from "framer-motion";
import { Battery, Zap, Target, Thermometer, ArrowLeft, CheckCircle2, ShieldCheck, Download, FileText, Sparkles } from "lucide-react";

// --- Components for Advanced Animations ---

const SpotlightCard = ({ children, style = {}, spotlightColor = "rgba(255,255,255,0.1)" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group"
      style={{ 
        ...style, 
        position: 'relative', 
        overflow: 'hidden' 
      }}
    >
      <motion.div
        style={{
          pointerEvents: "none",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
          opacity: 0,
          zIndex: 1
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

const FloatingParticle = ({ color, delay }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: Math.random() * 200 + 50,
      height: Math.random() * 200 + 50,
      borderRadius: '50%',
      background: color,
      filter: 'blur(80px)',
      opacity: 0.15,
      zIndex: 0,
      pointerEvents: 'none',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
    }}
    animate={{
      x: [0, Math.random() * 100 - 50, 0],
      y: [0, Math.random() * 100 - 50, 0],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: Math.random() * 10 + 10,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
  />
);

// --- Main Component ---

export default function ProductDetail() {
  const { id } = useParams();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Find product logic
  let product = null;
  let category = null;

  for (const cat of categories) {
    for (const sub of cat.subcategories) {
      if (sub.items) {
        const found = sub.items.find(i => i.id === id);
        if (found) {
          product = found;
          category = cat;
          break;
        }
      }
      if (sub.groups) {
        for (const group of sub.groups) {
          const found = group.items.find(i => i.id === id);
          if (found) {
            product = found;
            category = cat;
            break;
          }
        }
      }
      if (product) break;
    }
    if (product) break;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h2>Product not found</h2>
        <Link to="/products" style={{ marginTop: "1rem", color: "var(--primary)" }}>Back to Products</Link>
      </div>
    );
  }

  const details = product.details || {};
  const accentColor = category ? category.color : "var(--primary)";

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'battery': return <Battery size={32} strokeWidth={1.5} />;
      case 'zap': return <Zap size={32} strokeWidth={1.5} />;
      case 'target': return <Target size={32} strokeWidth={1.5} />;
      case 'thermometer': return <Thermometer size={32} strokeWidth={1.5} />;
      default: return <ShieldCheck size={32} strokeWidth={1.5} />;
    }
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <div className="page-container" style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: accentColor,
          transformOrigin: '0%',
          scaleX,
          zIndex: 100
        }}
      />

      {/* Hero Section */}
      <section ref={targetRef} style={{ 
        position: 'relative', 
        height: '85vh', 
        minHeight: '600px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#fff'
      }}>
        {details.heroImage ? (
          <motion.div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120%', 
            backgroundImage: `url('${details.heroImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
            y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']),
            scale: useTransform(scrollYProgress, [0, 1], [1.1, 1])
          }} />
        ) : (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${accentColor} 0%, #000 100%)`
          }} />
        )}
        
        {/* Animated Particles in Hero */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {[...Array(5)].map((_, i) => (
            <FloatingParticle key={i} color={accentColor} delay={i * 2} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Link to="/products" style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'rgba(255,255,255,0.8)', 
              marginBottom: '2rem',
              textDecoration: 'none',
              fontSize: '0.9rem',
              background: 'rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '99px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <ArrowLeft size={16} /> Back to Products
            </Link>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              marginBottom: '1.5rem', 
              fontWeight: '800', 
              lineHeight: 1.1,
              textShadow: '0 20px 40px rgba(0,0,0,0.5)',
              letterSpacing: '-2px'
            }}>
              {product.title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                  style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{ 
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
                maxWidth: '700px', 
                margin: '0 auto',
                lineHeight: 1.6,
                fontWeight: 300
              }}
            >
              {product.desc}
            </motion.p>

            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: "spring", bounce: 0.5 }}
              style={{ 
                marginTop: '3rem', 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2.5rem', 
                background: accentColor, 
                borderRadius: '99px',
                fontWeight: '700',
                fontSize: '1.1rem',
                boxShadow: `0 0 50px ${accentColor}80`,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              <Zap size={20} fill="currentColor" />
              {product.specs}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Overview Section */}
      {details.overview && (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg)', position: 'relative' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '1.5rem', fontWeight: '700' }}>
                Product <span style={{ color: accentColor }}>Overview</span>
              </h2>
              <p style={{ 
                fontSize: '1.2rem', 
                lineHeight: 1.8, 
                color: 'var(--text-primary)',
                fontWeight: 400 
              }}>
                {details.overview}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Why Lithium-ion Section */}
      {details.whyLithiumIon && (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg-2)' }}>
          <div className="container">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '3rem', fontWeight: '700', textAlign: 'center' }}
             >
               Why <span style={{ color: accentColor }}>Lithium-ion</span>
             </motion.h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
               {details.whyLithiumIon.map((group, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   style={{ background: 'var(--bg)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}
                 >
                   <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: accentColor, fontWeight: '700' }}>{group.title}</h3>
                   <ul style={{ listStyle: 'none', padding: 0 }}>
                     {group.items.map((item, i) => (
                       <li key={i} style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                         <span style={{ color: accentColor, marginTop: '4px' }}>•</span>
                         {item}
                       </li>
                     ))}
                   </ul>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      {details.applications && (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg)' }}>
          <div className="container">
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '3rem', fontWeight: '700', textAlign: 'center' }}
             >
               Applications
             </motion.h2>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
               {details.applications.map((app, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   style={{ padding: '1.5rem', borderLeft: `4px solid ${accentColor}`, background: 'var(--bg-2)' }}
                 >
                   <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '700' }}>{app.title}</h3>
                   <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>{app.desc}</p>
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
      )}

      {/* Versatile Product Line Section */}
      {details.versatileLine && (
        <section style={{ padding: '6rem 2rem', background: 'var(--bg-2)' }}>
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', marginBottom: '2rem', fontWeight: '700' }}
             >
               Versatile <span style={{ color: accentColor }}>Product Line</span>
             </motion.h2>
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-primary)' }}
             >
               {details.versatileLine.map((line, idx) => (
                 <p key={idx} style={{ marginBottom: '1rem' }}>{line}</p>
               ))}
             </motion.div>
          </div>
        </section>
      )}

      {/* Safety Features Section */}
      {details.safetyFeatures && (
        <section style={{ padding: '8rem 2rem', background: 'var(--bg)', position: 'relative' }}>
          {/* Background Elements */}
          <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '600px', height: '600px', background: `radial-gradient(circle, ${accentColor}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
          
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
              <div style={{ display: 'inline-block', padding: '0.5rem 1rem', borderRadius: '99px', background: `${accentColor}15`, color: accentColor, fontWeight: '600', marginBottom: '1rem' }}>
                <ShieldCheck size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Maximum Protection
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                Safety <span style={{ color: accentColor }}>First</span>
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                Engineered with multi-layer protection systems to ensure reliability in the most demanding conditions.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2rem' 
              }}
            >
              {details.safetyFeatures.map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <SpotlightCard
                    spotlightColor={accentColor}
                    style={{
                      background: 'var(--bg-2)',
                      padding: '2.5rem',
                      borderRadius: '24px',
                      border: '1px solid var(--border)',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                      height: '100%'
                    }}
                  >
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '16px', 
                      background: `linear-gradient(135deg, ${accentColor}20, transparent)`, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: accentColor,
                      boxShadow: `0 10px 30px -10px ${accentColor}40`
                    }}>
                      {getIcon(feature.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem' }}>{feature.title}</h3>
                      <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{feature.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Explore Features Section */}
      {details.exploreFeatures && (
        <section style={{ padding: '8rem 2rem', position: 'relative' }}>
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ textAlign: 'center', marginBottom: '5rem' }}
            >
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1.5rem', fontWeight: '800' }}>
                Explore <span style={{ color: accentColor }}>Features</span>
              </h2>
              <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
                {details.exploreFeaturesDescription || "Trontek Battery offers complete installation solutions for your specific cart"}
              </p>
            </motion.div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2.5rem' 
            }}>
              {details.exploreFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <SpotlightCard
                    spotlightColor={accentColor}
                    style={{
                      background: 'var(--bg-2)',
                      padding: '0', 
                      borderRadius: '24px',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ height: '220px', overflow: 'hidden', width: '100%' }}>
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                    <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{feature.title}</h3>
                      {feature.desc && <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{feature.desc}</p>}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Key Features Section */}
      <section style={{ padding: '8rem 2rem', background: 'var(--bg-2)', overflow: 'hidden', position: 'relative' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '3rem', fontWeight: '800' }}>
              Key <span style={{ color: accentColor }}>Features</span>
            </h2>
            {details.keyFeatures ? (
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
                {details.keyFeatures.map((feature, idx) => (
                  <motion.li 
                    key={idx} 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 + 0.2 }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1.5rem', 
                      fontSize: '1.15rem', 
                      color: 'var(--text-primary)',
                      padding: '1.25rem',
                      background: 'var(--bg)',
                      borderRadius: '16px',
                      border: '1px solid var(--border)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: idx * 0.05 + 0.3 }}
                    >
                      <CheckCircle2 size={24} color={accentColor} />
                    </motion.div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div style={{ padding: '2rem', border: '1px dashed var(--border)', borderRadius: '12px', color: 'var(--muted)' }}>
                <p>Detailed features for this product are coming soon.</p>
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1.2, bounce: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
              {/* Decorative Animated Circles */}
              {[1, 2, 3].map((i) => (
                 <motion.div
                  key={i}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    position: 'absolute',
                    width: `${100 + i * 20}%`,
                    height: `${100 + i * 20}%`,
                    border: `1px solid ${accentColor}`,
                    borderRadius: '50%',
                    zIndex: 0,
                    opacity: 0.2
                  }}
                 />
              ))}

              {/* Glow behind image */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle, ${accentColor}40 0%, transparent 70%)`,
                filter: 'blur(40px)',
                zIndex: 0
              }} />

              {product.image && (
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ 
                    padding: '4rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    backdropFilter: 'blur(20px)',
                    borderRadius: '50%', 
                    border: `1px solid ${accentColor}40`,
                    boxShadow: `0 20px 60px ${accentColor}20`,
                    zIndex: 1,
                    position: 'relative'
                  }}
                >
                  <img src={product.image} alt={product.title} style={{ width: '100%', maxWidth: '380px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))' }} />
                </motion.div>
              )}
          </motion.div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section style={{ padding: '8rem 2rem', background: 'var(--bg)', position: 'relative' }}>
         {/* Background Elements */}
         <div style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '800px', height: '800px', background: `radial-gradient(circle, ${accentColor}05 0%, transparent 70%)`, pointerEvents: 'none' }} />
         
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '99px', background: 'var(--bg-2)', border: '1px solid var(--border)', marginBottom: '1rem', color: 'var(--muted)' }}>
                <Sparkles size={16} color={accentColor} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>Performance Metrics</span>
              </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', fontWeight: '800' }}>
              Technical <span style={{ color: accentColor }}>Specifications</span>
            </h2>
            <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Detailed performance metrics and operating parameters.
            </p>
          </motion.div>

          {details.techSpecs ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
                gap: '1.5rem' 
              }}
            >
              {Object.entries(details.techSpecs).map(([key, value], idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <SpotlightCard
                    spotlightColor={accentColor}
                    style={{
                      background: 'var(--bg-2)',
                      padding: '1.5rem',
                      borderRadius: '20px',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      boxShadow: '0 4px 20px -10px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                      {key}
                    </div>
                    <div style={{ fontSize: '1.35rem', fontWeight: '700', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                      {value}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          ) : details.specImage ? (
             // Fallback to Image but stylized
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                background: 'var(--bg-2)', 
                padding: '2.5rem', 
                borderRadius: '32px', 
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2.5rem',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px -20px rgba(0,0,0,0.2)'
              }}
            >
               {/* Ambient Glow */}
               <div style={{ position: 'absolute', top: '-50%', left: '0', right: '0', height: '100%', background: `linear-gradient(to bottom, ${accentColor}10, transparent)`, pointerEvents: 'none' }} />

              <div style={{ 
                position: 'absolute', 
                top: '1.5rem', 
                right: '1.5rem',
                padding: '0.5rem 1rem',
                background: accentColor,
                color: '#fff',
                borderRadius: '99px',
                fontSize: '0.8rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                zIndex: 2,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
              }}>
                <FileText size={14} /> Spec Sheet
              </div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ width: '100%', borderRadius: '16px', overflow: 'hidden' }}
              >
                <img 
                  src={details.specImage} 
                  alt={`${product.title} Specifications`} 
                  style={{ 
                    width: '100%', 
                    height: 'auto', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                  }} 
                />
              </motion.div>
              
              <motion.a 
                href={details.specImage} 
                download 
                whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${accentColor}60` }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 2.5rem',
                  background: 'var(--text-primary)',
                  color: 'var(--bg)',
                  borderRadius: '16px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '1.1rem',
                  zIndex: 2
                }}
              >
                <Download size={20} /> Download Specifications
              </motion.a>
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '4rem' }}>
              <p>Technical specifications are currently unavailable for this product.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
