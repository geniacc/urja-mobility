import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categories, stats } from "../data/mockData";
import { motion, AnimatePresence } from "framer-motion";
import { Battery, Zap, ChevronRight, ShieldCheck, Car, Home, Sun, Plane, Zap as ZapIcon, Cpu } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Product3D from "../components/Product3D";

export default function Products() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeSubcategory, setActiveSubcategory] = useState(categories[0].subcategories[0]?.id);
  const [activeGroup, setActiveGroup] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Update subcategory and group when category changes
  useEffect(() => {
    const cat = categories.find(c => c.id === activeCategory);
    if (cat && cat.subcategories.length > 0) {
      const firstSub = cat.subcategories[0];
      setActiveSubcategory(firstSub.id);
      if (firstSub.groups && firstSub.groups.length > 0) {
        setActiveGroup(firstSub.groups[0].id);
      } else {
        setActiveGroup(null);
      }
    } else {
      setActiveSubcategory(null);
      setActiveGroup(null);
    }
  }, [activeCategory]);

  // Update group when subcategory changes
  useEffect(() => {
    const cat = categories.find(c => c.id === activeCategory);
    const sub = cat?.subcategories.find(s => s.id === activeSubcategory);
    if (sub && sub.groups && sub.groups.length > 0) {
      setActiveGroup(sub.groups[0].id);
    } else {
      setActiveGroup(null);
    }
  }, [activeSubcategory, activeCategory]);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === activeSubcategory);
  const currentGroup = currentSubcategory?.groups?.find(g => g.id === activeGroup);

  let productsToDisplay = [];
  if (currentSubcategory) {
    if (currentSubcategory.groups && currentGroup) {
      productsToDisplay = currentGroup.items.map(item => ({ 
        ...item, 
        color: currentCategory.color, 
        categoryName: currentGroup.title 
      }));
    } else if (currentSubcategory.items) {
      productsToDisplay = currentSubcategory.items.map(item => ({ 
        ...item, 
        color: currentCategory.color, 
        categoryName: currentCategory.title 
      }));
    }
  }

  const accentColor = currentCategory ? currentCategory.color : "#22c55e";

  // Icon helper
  const getCategoryIcon = (id) => {
    switch(id) {
      case 'automotive': return <Car size={20} />;
      case 'inverter-battery': return <Home size={20} />;
      case 'solar-app': return <Sun size={20} />;
      case 'drone': return <Plane size={20} />;
      case 'ev-charger': return <ZapIcon size={20} />;
      case 'inverter': return <Cpu size={20} />;
      default: return <Battery size={20} />;
    }
  };

  return (
    <div className="page-container" style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        padding: '6rem 2rem 4rem', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '4rem',
        alignItems: 'center',
        minHeight: '80vh'
      }}>
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1rem', 
            background: `rgba(255, 255, 255, 0.05)`, 
            borderRadius: '999px',
            color: accentColor,
            fontWeight: '600',
            marginBottom: '1.5rem',
            border: `1px solid ${accentColor}40`
          }}>
            {currentCategory?.tagline || "Next-Gen Energy Systems"}
          </div>
          <h1 style={{ 
            fontSize: '4rem', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {currentCategory?.title || "Power for Every Purpose"}
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--muted)', 
            maxWidth: '500px', 
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}>
            {currentCategory?.description || "From compact home backups to industrial-grade grid storage, discover the technology driving the clean energy revolution."}
          </p>
          
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap color="var(--primary)" size={24} />
              <span style={{ color: 'var(--text-secondary)' }}>High Efficiency</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck color="var(--secondary)" size={24} />
              <span style={{ color: 'var(--text-secondary)' }}>Long Cycle Life</span>
            </div>
          </div>
        </motion.div>

        {/* Hero 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ height: '500px', width: '100%', position: 'relative' }}
        >
           <div style={{
             position: 'absolute',
             top: '50%',
             left: '50%',
             transform: 'translate(-50%, -50%)',
             width: '400px',
             height: '400px',
             background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
             filter: 'blur(40px)',
             zIndex: 0
           }} />
           <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
             <ambientLight intensity={0.5} />
             <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
             <pointLight position={[-10, -10, -10]} intensity={0.5} />
             <Product3D color={accentColor} />
             <Environment preset="city" />
             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
           </Canvas>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section style={{ 
        borderTop: '1px solid var(--border)', 
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.02)'
      }}>
        <div className="container" style={{ padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{stat.value}</div>
              <div style={{ color: 'var(--muted)', textTransform: 'uppercase', fontSize: '0.875rem', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="container" style={{ padding: "6rem 2rem" }}>
        
        {/* Category Tabs (Main Groups) */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 1.5rem',
                borderRadius: '16px',
                border: '1px solid',
                borderColor: activeCategory === cat.id ? cat.color : 'var(--border)',
                background: activeCategory === cat.id ? `${cat.color}10` : 'var(--bg-2)',
                color: activeCategory === cat.id ? cat.color : 'var(--muted)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
            >
              {cat.image ? (
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ 
                    height: '50px', 
                    width: 'auto', 
                    objectFit: 'contain',
                    marginBottom: '0.25rem',
                    filter: activeCategory === cat.id ? 'none' : 'grayscale(100%) opacity(0.6)',
                    transition: 'all 0.3s ease'
                  }} 
                />
              ) : (
                getCategoryIcon(cat.id)
              )}
              <span style={{ textAlign: 'center', fontSize: '0.9rem' }}>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Subcategory Tabs (Subgroups) */}
        {currentCategory?.subcategories.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: currentSubcategory?.groups?.length > 0 ? '1rem' : '4rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
            padding: '0.5rem',
            background: 'var(--bg-2)',
            borderRadius: '99px',
            width: 'fit-content',
            margin: currentSubcategory?.groups?.length > 0 ? '0 auto 1rem auto' : '0 auto 4rem auto',
            border: '1px solid var(--border)'
          }}>
            {currentCategory.subcategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategory(sub.id)}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '99px',
                  border: 'none',
                  background: activeSubcategory === sub.id ? accentColor : 'transparent',
                  color: activeSubcategory === sub.id ? '#fff' : 'var(--muted)',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {sub.title}
              </button>
            ))}
          </div>
        )}

        {/* Group Tabs (Level 3) */}
        {currentSubcategory?.groups?.length > 0 && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '4rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}>
            {currentSubcategory.groups.map(group => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                style={{
                  padding: '0.4rem 1.2rem',
                  borderRadius: '99px',
                  border: `1px solid ${activeGroup === group.id ? accentColor : 'var(--border)'}`,
                  background: activeGroup === group.id ? accentColor : 'transparent',
                  color: activeGroup === group.id ? '#fff' : 'var(--muted)',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {group.title}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <motion.div 
          layout 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2.5rem',
            justifyContent: 'center'
          }}
        >
          <AnimatePresence mode="popLayout">
            {productsToDisplay.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ 
                  opacity: hoveredProduct && hoveredProduct !== product.id ? 0.4 : 1, 
                  scale: hoveredProduct && hoveredProduct !== product.id ? 0.95 : 1, 
                  y: 0,
                  filter: hoveredProduct && hoveredProduct !== product.id ? 'blur(2px)' : 'blur(0px)'
                }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  zIndex: 10,
                  transition: { duration: 0.2 } 
                }}
                onHoverStart={() => setHoveredProduct(product.id)}
                onHoverEnd={() => setHoveredProduct(null)}
                style={{
                  background: 'var(--bg-2)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Card Header / Image Area */}
                <div style={{ 
                  height: '200px', 
                  background: `linear-gradient(135deg, var(--bg-3) 0%, ${product.color}10 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Abstract background shape */}
                  <div style={{
                    position: 'absolute',
                    width: '150%',
                    height: '150%',
                    background: `radial-gradient(circle, ${product.color}20 0%, transparent 60%)`,
                    top: '-50%',
                    left: '-50%',
                    transform: hoveredProduct === product.id ? 'translate(10%, 10%)' : 'translate(0, 0)',
                    transition: 'transform 0.5s ease'
                  }} />
                  
                  <motion.div
                    animate={{ 
                      scale: hoveredProduct === product.id ? 1.1 : 1,
                      rotate: hoveredProduct === product.id ? 5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '160px',
                          objectFit: 'contain',
                          filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.3))'
                        }}
                      />
                    ) : (
                      <Battery size={80} color={product.color} strokeWidth={1} />
                    )}
                  </motion.div>

                  <div style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '99px',
                    fontSize: '0.75rem',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {product.specs}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    color: product.color, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem' 
                  }}>
                    {product.categoryName}
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '0.75rem',
                    color: 'var(--text-primary)'
                  }}>
                    {product.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--muted)', 
                    fontSize: '0.95rem', 
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                    flex: 1
                  }}>
                    {product.desc}
                  </p>
                  
                  <button style={{
                    background: 'transparent',
                    border: `1px solid ${product.color}`,
                    color: product.color,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    zIndex: 20,
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = product.color;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = product.color;
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  >
                    View Specifications <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <div style={{ 
          marginTop: '8rem', 
          background: 'linear-gradient(to right, var(--bg-2), var(--bg-3))', 
          borderRadius: '24px', 
          padding: '4rem',
          textAlign: 'center',
          border: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Need a Custom Solution?</h2>
            <p style={{ color: 'var(--muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Our engineering team specializes in bespoke battery configurations for unique industrial and commercial applications.
            </p>
            <button className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Contact Sales Team
            </button>
          </div>
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.05) 0%, transparent 50%)',
            zIndex: 0
          }} />
        </div>
      </section>
    </div>
  );
}
