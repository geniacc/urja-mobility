import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data/mockData';

const ImpactStats = () => {
  const beltItems = [...stats, ...stats];
  const getProgress = (value) => Math.max(0, Math.min(100, Number(value ?? 0)));
  const palettes = [
    { a: '#22c55e', b: '#3b82f6' },
    { a: '#a855f7', b: '#3b82f6' },
    { a: '#f97316', b: '#ef4444' },
    { a: '#06b6d4', b: '#22c55e' },
    { a: '#f59e0b', b: '#a855f7' },
    { a: '#3b82f6', b: '#06b6d4' }
  ];
  const hexToRgb = (hex) => {
    const raw = hex.replace('#', '').trim();
    const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw;
    const n = parseInt(full, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };
  const rgba = (hex, alpha) => {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const cardColors = (index) => palettes[index % palettes.length];

  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg-2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <style>{`
          @keyframes impactBeltWaveDrift {
            0% { transform: translateX(0) translateY(0); }
            25% { transform: translateX(-25%) translateY(-6px); }
            50% { transform: translateX(-50%) translateY(0); }
            75% { transform: translateX(-25%) translateY(6px); }
            100% { transform: translateX(0) translateY(0); }
          }
          @keyframes impactFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0px); }
          }
          @media (prefers-reduced-motion: reduce) {
            .impact-belt-track { animation: none !important; transform: translateX(0) !important; }
            .impact-float { animation: none !important; }
          }
          .impact-belt-viewport:hover .impact-belt-track { animation-play-state: paused; }
        `}</style>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Our Impact
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Driving the future of clean energy with measurable results and reliable performance.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="impact-belt-viewport"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '0.75rem 0',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: `
              radial-gradient(800px circle at 15% 30%, rgba(59,130,246,0.12), transparent 55%),
              radial-gradient(700px circle at 85% 70%, rgba(34,197,94,0.12), transparent 55%),
              rgba(2,6,23,0.35)
            `
          }}
        >
          <div
            className="impact-belt-track"
            style={{
              display: 'flex',
              width: 'max-content',
              gap: '1.25rem',
              alignItems: 'stretch',
              animation: 'impactBeltWaveDrift 34s ease-in-out infinite'
            }}
          >
            {beltItems.map((stat, index) => {
              const c = cardColors(index);
              const p = getProgress(stat.progress);
              return (
                <motion.div
                  key={`${stat.label}-${index}`}
                  whileHover={{ y: -3, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="impact-float"
                  style={{
                    width: '320px',
                    padding: '1.25rem 1.5rem',
                    background: `linear-gradient(180deg, ${rgba(c.a, 0.18)} 0%, rgba(2,6,23,0.65) 55%, rgba(2,6,23,0.5) 100%)`,
                    borderRadius: '20px',
                    boxShadow: `0 18px 50px -28px ${rgba(c.b, 0.55)}, 0 12px 30px -20px rgba(0,0,0,0.55)`,
                    border: `1px solid ${rgba(c.a, 0.22)}`,
                    position: 'relative',
                    overflow: 'hidden',
                    flex: '0 0 auto',
                    backdropFilter: 'blur(10px)',
                    animation: `impactFloat ${4.8 + (index % 5) * 0.35}s ease-in-out ${-(index % 7) * 0.35}s infinite`
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(500px circle at 10% 10%, ${rgba(c.b, 0.18)}, transparent 55%)`,
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '3px',
                    background: `linear-gradient(90deg, ${c.a}, ${c.b})`
                  }} />

                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', position: 'relative' }}>
                    <div style={{
                      fontSize: '2.25rem',
                      fontWeight: '900',
                      background: `linear-gradient(90deg, ${c.a}, ${c.b})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.75)',
                      fontWeight: '900',
                      textTransform: 'uppercase',
                      letterSpacing: '1.1px',
                      whiteSpace: 'nowrap'
                    }}>
                      {p}%
                    </div>
                  </div>

                  <div style={{
                    marginTop: '0.35rem',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.72)',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '1.1px',
                    position: 'relative'
                  }}>
                    {stat.label}
                  </div>

                  <div style={{ marginTop: '1rem', position: 'relative' }}>
                    <div style={{
                      height: '10px',
                      width: '100%',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${p}%`,
                        borderRadius: '999px',
                        background: `linear-gradient(90deg, ${c.a}, ${c.b})`,
                        boxShadow: `0 0 20px ${rgba(c.b, 0.35)}`
                      }} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
