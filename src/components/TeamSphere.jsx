import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { teamMembers } from '../data/mockData';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function Card({ position, member, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  const [imgSrc, setImgSrc] = useState('');
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const fallbacks = useMemo(() => {
    const norm = (member?.name || '').trim().replace(/[^A-Za-z0-9\s-]/g, '').replace(/\s+/g, '-');
    const primaryPng = norm ? `/assets/${norm}.png` : '';
    const primaryJpg = norm ? `/assets/${norm}.jpg` : '';
    const provided = member?.image || '';
    const dicebear = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(member?.name || 'URJA')}`;
    return [primaryPng, primaryJpg, provided, dicebear].filter(Boolean);
  }, [member]);
  useEffect(() => {
    setFallbackIndex(0);
    setImgSrc(fallbacks[0] || '');
  }, [fallbacks]);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  });
  
  return (
    <group position={position} ref={ref}>
      <Html transform distanceFactor={15} style={{ opacity: 1, transition: 'opacity 0.3s' }}>
        <motion.div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => onSelect?.(member, imgSrc)}
          whileHover={{ scale: 1.12 }}
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(34,197,94,0.2))',
            border: hovered ? '2px solid #22c55e' : '2px solid rgba(255,255,255,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered ? '0 0 20px rgba(34,197,94,0.4)' : '0 6px 12px rgba(0,0,0,0.35)',
            overflow: 'hidden'
          }}
        >
          <img
            src={imgSrc}
            alt={member.name}
            onError={() => {
              const next = fallbackIndex + 1;
              if (next < fallbacks.length) {
                setFallbackIndex(next);
                setImgSrc(fallbacks[next]);
              }
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </Html>
    </group>
  );
}

function Sphere({ count = 49, radius = 10, onSelect, velocityRef, draggingRef }) {
  const group = useRef();
  
  const points = useMemo(() => {
    const p = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      
      const theta = phi * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      p.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return p;
  }, [count, radius]);

  useFrame((state) => {
    if (group.current) {
      const v = velocityRef.current;
      const base = draggingRef.current ? 0 : 0.0016;
      group.current.rotation.y += base + v.vx;
      group.current.rotation.x += v.vy * 0.6;
      v.vx *= 0.98;
      v.vy *= 0.98;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[7, 32, 32]} />
        <meshStandardMaterial color="#0f172a" transparent opacity={0.8} roughness={0.1} metalness={0.8} />
      </mesh>
      <pointLight color="#3b82f6" intensity={2} distance={20} />
      {points.map((pos, i) => (
        <Card key={i} position={pos} member={teamMembers[i % teamMembers.length]} onSelect={onSelect} />
      ))}
    </group>
  );
}

export default function TeamSphere() {
  const [selected, setSelected] = useState(null);
  const [selectedImg, setSelectedImg] = useState('');
  const velocityRef = useRef({ vx: 0, vy: 0 });
  const draggingRef = useRef(false);
  const posRef = useRef({ x: 0, y: 0 });
  return (
    <div style={{ width: '100%', height: '100vh', minHeight: '1000px', position: 'relative', background: 'transparent' }}>
       <div className="section-header" style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, pointerEvents: 'none' }}>
        <h2 className="section-title">Our Global Team</h2>
        <p className="section-subtitle">Meet the 49+ experts driving our vision worldwide.</p>
      </div>
      <div style={{ height: '100%', display: 'grid', gridTemplateColumns: 'minmax(300px, 420px) 1fr', gap: '2rem' }}>
        <div style={{ alignSelf: 'center', marginLeft: '2rem' }}>
          <div style={{
            background: 'var(--bg-2)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            boxShadow: '0 30px 50px rgba(0,0,0,0.35)',
            padding: '1.5rem',
            maxWidth: 420
          }}>
            {!selected ? (
              <div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem' }}>Meet Our Team</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
                  Click any moving circle to view details here.
                </div>
              </div>
            ) : (
              <div>
                <motion.div
                  whileHover={{ scale: 1.02, rotateX: -4, rotateY: 6 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                  style={{
                    width: '100%',
                    height: 240,
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    marginBottom: '1rem',
                    background: 'var(--bg-3)',
                    boxShadow: '0 18px 50px -28px rgba(0,0,0,0.55)',
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img 
                    src={selectedImg} 
                    alt={selected?.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      objectPosition: '50% 30%' 
                    }} 
                  />
                </motion.div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <motion.div
                    whileHover={{ scale: 1.06, rotateZ: 1.5 }}
                    transition={{ type: 'spring', stiffness: 260 }}
                    style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--border)' }}
                  >
                    <img src={selectedImg} alt={selected?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' }} />
                  </motion.div>
                  <div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{selected?.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{selected?.role}</div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 800, color: '#031432', background: 'var(--secondary)', padding: '2px 8px', borderRadius: 999, display: 'inline-block', marginTop: 6 }}>
                      {selected?.department}
                    </div>
                  </div>
                </div>
                <div style={{ color: 'var(--text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Dedicated contributor to Urja Mobility’s mission.
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => { setSelected(null); setSelectedImg(''); }}
                    style={{ padding: '0.6rem 1rem', borderRadius: 10, border: '1px solid var(--border)', background: 'var(--bg-3)', color: 'var(--text)', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <Canvas
            camera={{ position: [0, 0, 32], fov: 50 }}
            dpr={[1, 2]}
            onPointerDown={(e) => {
              draggingRef.current = true;
              posRef.current.x = e.clientX ?? 0;
              posRef.current.y = e.clientY ?? 0;
            }}
            onPointerMove={(e) => {
              if (!draggingRef.current) return;
              const dx = (e.clientX ?? 0) - posRef.current.x;
              const dy = (e.clientY ?? 0) - posRef.current.y;
              posRef.current.x = e.clientX ?? 0;
              posRef.current.y = e.clientY ?? 0;
              velocityRef.current.vx = dx * 0.0008;
              velocityRef.current.vy = dy * 0.0008;
            }}
            onPointerUp={() => {
              draggingRef.current = false;
            }}
            onPointerLeave={() => {
              draggingRef.current = false;
            }}
            style={{ width: '100%', height: '100%' }}
          >
            <fog attach="fog" args={['#020617', 20, 40]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Sphere
              onSelect={(m, img) => { setSelected(m); setSelectedImg(img); }}
              velocityRef={velocityRef}
              draggingRef={draggingRef}
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
