import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Text, RoundedBox } from '@react-three/drei';

export default function Product3D({ color = "#16a34a" }) {
  const group = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) * 0.2;
    group.current.rotation.x = Math.cos(t / 4) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main Battery Unit */}
        <RoundedBox args={[2.5, 3.5, 1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial 
            color="#334155" 
            metalness={0.8} 
            roughness={0.2} 
            clearcoat={1} 
            clearcoatRoughness={0.1}
          />
        </RoundedBox>

        {/* Accent Panel */}
        <RoundedBox args={[2.2, 3.2, 1.05]} radius={0.05} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#1e293b" 
            metalness={0.5} 
            roughness={0.5}
          />
        </RoundedBox>

        {/* Energy Core (Glowing) */}
        <RoundedBox args={[1.8, 2, 1.1]} radius={0.05} smoothness={4} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial 
            color="#0f172a" 
            metalness={0.9} 
            roughness={0.1}
          />
        </RoundedBox>
        
        {/* LED Indicators */}
        <group position={[0, -1, 0.6]}>
          {[-0.5, 0, 0.5].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
          ))}
        </group>

        {/* Branding Text */}
        <Text
          position={[0, 0.2, 0.6]}
          fontSize={0.3}
          color={color}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          URJA
        </Text>
        <Text
          position={[0, -0.1, 0.6]}
          fontSize={0.15}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          POWER CORE
        </Text>
      </Float>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
    </group>
  );
}
