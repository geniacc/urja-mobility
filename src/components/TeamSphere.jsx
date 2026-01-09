import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import { teamMembers } from '../data/mockData';
import * as THREE from 'three';

function Card({ position, member }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.lookAt(0, 0, 0);
    }
  });
  
  return (
    <group position={position} ref={ref}>
      <Html transform distanceFactor={15} style={{ opacity: 1, transition: 'opacity 0.5s' }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: '200px',
            height: '140px',
            perspective: '1000px',
            cursor: 'pointer',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
          }}
        >
          <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            // transform: 'rotateY(180deg)' // Removed: We handle orientation via lookAt
          }}>
            {/* Front Side (facing sphere center) - showing LOGO/BACK */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}>
              URJA
            </div>

            {/* Back Side (facing outwards) - showing INFO */}
            <div style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'rgba(15, 23, 42, 0.95)',
              border: `1px solid ${hovered ? '#22c55e' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              boxShadow: hovered ? '0 0 20px rgba(34, 197, 94, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.3)',
            }}>
               <img 
                src={member.image} 
                alt={member.name} 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  marginBottom: '0.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }} 
              />
              <h3 style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#f8fafc', margin: 0 }}>{member.name}</h3>
              <p style={{ fontSize: '0.65rem', color: '#94a3b8', margin: '0.1rem 0' }}>{member.role}</p>
              <p style={{ fontSize: '0.6rem', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>{member.department}</p>
            </div>
          </div>
        </div>
      </Html>
    </group>
  );
}

function Sphere({ count = 49, radius = 10 }) {
  const group = useRef();
  
  // Fibonacci Sphere Algorithm
  const points = useMemo(() => {
    const p = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      p.push(new THREE.Vector3(x * radius, y * radius, z * radius));
    }
    return p;
  }, [count, radius]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.001;
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
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
        <Card key={i} position={pos} member={teamMembers[i % teamMembers.length]} />
      ))}
    </group>
  );
}

export default function TeamSphere() {
  return (
    <div style={{ width: '100%', height: '100vh', minHeight: '1000px', position: 'relative', background: 'transparent' }}>
       <div className="section-header" style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, pointerEvents: 'none' }}>
        <h2 className="section-title">Our Global Team</h2>
        <p className="section-subtitle">Meet the 49+ experts driving our vision worldwide.</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 32], fov: 50 }} dpr={[1, 2]}>
        <fog attach="fog" args={['#020617', 20, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
