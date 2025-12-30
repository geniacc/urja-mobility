import React, { useRef, useMemo, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Cylinder, Box, Cone, Sphere, ScrollControls, Scroll, useScroll, Stars, Sparkles, Text, Cloud, Float, Torus } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// --- 3D Components ---

const TrashCan = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.25, 0.2, 0.8]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#334155" metalness={0.6} />
        </Cylinder>
        <Torus args={[0.26, 0.02, 16, 32]} position={[0, 0.8, 0]} rotation={[Math.PI/2, 0, 0]}>
             <meshStandardMaterial color="#cbd5e1" />
        </Torus>
    </group>
)



const SolarPanelArray = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.08, 0.08, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color="#475569" /></Cylinder>
        <Box args={[1.5, 0.05, 1]} position={[0, 1, 0]} rotation={[0.5, 0, 0]}>
             <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.1} />
             {/* Grid lines */}
             <Box args={[1.4, 0.06, 0.02]} position={[0, 0, 0]}><meshBasicMaterial color="#fff" opacity={0.2} transparent /></Box>
             <Box args={[0.02, 0.06, 0.9]} position={[0, 0, 0]}><meshBasicMaterial color="#fff" opacity={0.2} transparent /></Box>
        </Box>
    </group>
)

const BikeRack = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        {/* Rack Structure */}
        {[-0.6, 0, 0.6].map((x, i) => (
            <Torus key={i} args={[0.3, 0.03, 8, 16]} position={[x, 0.3, 0]} rotation={[0, Math.PI/2, 0]}>
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </Torus>
        ))}
        <Box args={[2, 0.05, 0.1]} position={[0, 0.02, 0]}><meshStandardMaterial color="#64748b" /></Box>
        
        {/* Parked Bike (Simplified) */}
        <group position={[-0.6, 0.35, 0]} rotation={[0, 0.2, 0]}>
             <Torus args={[0.25, 0.02, 16, 32]} position={[-0.35, 0, 0]}><meshStandardMaterial color="#333" /></Torus>
             <Torus args={[0.25, 0.02, 16, 32]} position={[0.35, 0, 0]}><meshStandardMaterial color="#333" /></Torus>
             <Box args={[0.7, 0.03, 0.03]} position={[0, 0.25, 0]}><meshStandardMaterial color="#ef4444" /></Box>
        </group>
    </group>
)

const RecyclingStation = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        {/* 3 Bins */}
        <group position={[-0.45, 0.5, 0]}>
             <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#3b82f6" /></Box> {/* Paper */}
             <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">PAPER</Text>
             <Box args={[0.3, 0.05, 0.3]} position={[0, 0.52, 0]}><meshBasicMaterial color="#1e3a8a" /></Box>
        </group>
        <group position={[0, 0.5, 0]}>
             <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#22c55e" /></Box> {/* Glass/Plastic */}
             <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">RECYCLE</Text>
             <Box args={[0.3, 0.05, 0.3]} position={[0, 0.52, 0]}><meshBasicMaterial color="#14532d" /></Box>
        </group>
        <group position={[0.45, 0.5, 0]}>
             <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#06b6d4" /></Box> {/* Trash */}
             <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">TRASH</Text>
             <Box args={[0.3, 0.05, 0.3]} position={[0, 0.52, 0]}><meshBasicMaterial color="#155e75" /></Box>
        </group>
    </group>
)

const SolarTree = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        {/* Trunk */}
        <Cylinder args={[0.2, 0.4, 4]} position={[0, 2, 0]}>
            <meshStandardMaterial color="#475569" />
        </Cylinder>
        {/* Branches */}
        {[0, 1, 2, 3, 4].map(i => {
            const angle = (i / 5) * Math.PI * 2;
            const y = 2.5 + i * 0.4;
            return (
                <group key={i} position={[0, y, 0]} rotation={[0, angle, 0.5]}>
                    <Cylinder args={[0.05, 0.1, 1.5]} position={[0, 0.75, 0]}>
                        <meshStandardMaterial color="#475569" />
                    </Cylinder>
                    {/* Solar Leaf */}
                    <Box args={[0.8, 0.05, 0.8]} position={[0, 1.5, 0]} rotation={[0.5, 0, 0]}>
                        <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} />
                    </Box>
                </group>
            )
        })}
    </group>
)

const HolographicInfo = ({ position, text }) => (
    <group position={position}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text 
                fontSize={0.3} 
                color="#4ade80" 
                anchorX="center" 
                anchorY="middle"
                outlineWidth={0.02}
                outlineColor="#052e16"
            >
                {text}
            </Text>
            <Box args={[2.5, 0.8, 0.05]} position={[0, 0, -0.05]}>
                <meshBasicMaterial color="#052e16" opacity={0.6} transparent />
            </Box>
        </Float>
        <Cylinder args={[0.02, 0.02, 2]} position={[0, -1.5, 0]}>
             <meshBasicMaterial color="#4ade80" opacity={0.3} transparent />
        </Cylinder>
    </group>
)

const Sun = ({ position = [80, 120, -60], scale = 10 }) => (
    <group position={position} scale={scale}>
        <Sphere args={[1]}>
            <meshBasicMaterial color="#ffffff" />
        </Sphere>
    </group>
)

const FireHydrant = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.15, 0.2, 0.6]} position={[0, 0.3, 0]}>
            <meshStandardMaterial color="#ef4444" />
        </Cylinder>
        <Sphere args={[0.16]} position={[0, 0.6, 0]}>
             <meshStandardMaterial color="#ef4444" />
        </Sphere>
        {/* Caps */}
        <Cylinder args={[0.08, 0.08, 0.1]} position={[0.15, 0.4, 0]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#cbd5e1" />
        </Cylinder>
        <Cylinder args={[0.08, 0.08, 0.1]} position={[-0.15, 0.4, 0]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#cbd5e1" />
        </Cylinder>
    </group>
)

export const Rikshaw = ({ scroll, mini = false, speed = 0.02 }) => {
  const group = useRef();
  const chassis = useRef();
  const wheelsRef = useRef([]);
  const lastOffset = useRef(0);
  const direction = useRef(1);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const START_OFFSET_BASE = useMemo(() => {
    // Align start near Urja Mobility building index within Road generation (length 60)
    const idx = 1; // chosen TownBuilding slot
    const total = 60;
    return 0.02 + (idx / total) * 0.96;
  }, []);
  
  // Define a complex curved path for the road
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 50),
        new THREE.Vector3(0, 0, 20),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -20),
        new THREE.Vector3(15, 0, -40),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(-15, 0, -100),
        new THREE.Vector3(-10, 0, -130),
        new THREE.Vector3(10, 0, -160),
        new THREE.Vector3(0, 0, -190),
        new THREE.Vector3(0, 0, -220),
        new THREE.Vector3(0, 0, -250)
    ]);
  }, []);

  useFrame((state, delta) => {
    const timeOffset = (state.clock.elapsedTime * speed) % 1;
    const offset = scroll?.offset ?? timeOffset;
    const scrollDelta = (scroll?.offset ?? 0) - lastOffset.current;
    
    if (Math.abs(scrollDelta) > 0.0001) {
      direction.current = scrollDelta > 0 ? 1 : -1;
    }
    
    lastOffset.current = scroll?.offset ?? lastOffset.current;
    // Limit point to 0-1 range to avoid errors at extremes
    const safeOffset = Math.max(0, Math.min(1, START_OFFSET_BASE + offset));
    const point = curve.getPointAt(safeOffset);
    
    // Path Following (Outer Group)
    if (group.current) {
      group.current.position.lerp(point, 0.1);
      const tangent = curve.getTangentAt(safeOffset);
      if (direction.current === -1) tangent.negate();
      
      dummy.position.copy(group.current.position);
      dummy.lookAt(group.current.position.clone().add(tangent));
      group.current.quaternion.slerp(dummy.quaternion, 0.1);
    }

    // Physics & Animation (Chassis Group)
    if (chassis.current) {
      const tangent = curve.getTangentAt(safeOffset);
      if (direction.current === -1) tangent.negate();
      
      // Slight suspension bounce
      chassis.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.02;
      
      // Body roll on turns (Applied to inner group to avoid quaternion conflict)
      // We use lerp for smooth transition
      chassis.current.rotation.z = THREE.MathUtils.lerp(chassis.current.rotation.z, -tangent.x * 0.2, 0.1);
    }

    wheelsRef.current.forEach(wheel => {
      if (wheel) wheel.rotation.x -= 20 * delta * direction.current;
    });

    // Third Person Perspective Camera - Elevated for better view
    // Use dummy quaternion (path orientation) instead of group quaternion (which includes roll)
    // to prevent camera from tilting with the rickshaw
    if (!mini) {
      const cameraOffset = new THREE.Vector3(0, 8, 12); 
      cameraOffset.applyQuaternion(dummy.quaternion);
      const cameraPos = point.clone().add(cameraOffset);
      
      const lookAtOffset = new THREE.Vector3(0, 2, -10);
      lookAtOffset.applyQuaternion(dummy.quaternion);
      const lookAtPos = point.clone().add(lookAtOffset);

      state.camera.position.lerp(cameraPos, 0.1);
      state.camera.lookAt(lookAtPos);
    }
  });

  return (
    <group ref={group} scale={0.6}>
      <group ref={chassis}>
      {/* --- Detailed EV Rikshaw Model --- */}
      
      {/* Chassis Frame - Detailed */}
      <Box args={[1.4, 0.2, 2.8]} position={[0, 0.4, -0.2]} castShadow receiveShadow>
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </Box>
      <Cylinder args={[0.05, 0.05, 1.4]} rotation={[0, 0, Math.PI/2]} position={[0, 0.3, 1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder> {/* Axle */}

      {/* Main Body Shell (Green & Yellow) */}
      <group position={[0, 1.1, -0.25]}>
          {/* Lower Body with Automotive Paint */}
          <Box args={[1.5, 1.2, 2.6]} position={[0, 0, 0]} castShadow receiveShadow>
             <meshPhysicalMaterial 
                color="#16a34a" 
                roughness={0.2} 
                metalness={0.6} 
                clearcoat={1} 
                clearcoatRoughness={0.05}
                envMapIntensity={1}
             />
          </Box>
          {/* Decorative Stripe */}
          <Box args={[1.52, 0.2, 2.62]} position={[0, 0, 0]}>
             <meshStandardMaterial color="#3b82f6" />
          </Box>
          
          {/* Back Curve Simulation */}
          <Cylinder args={[0.75, 0.75, 1.2, 32]} rotation={[0, 0, Math.PI/2]} position={[0, 0, -1.3]}>
             <meshPhysicalMaterial 
                color="#16a34a" 
                roughness={0.2} 
                metalness={0.6} 
                clearcoat={1} 
                clearcoatRoughness={0.05}
                envMapIntensity={1}
             />
          </Cylinder>
      </group>

      {/* Roof Structure - Detailed */}
      <group position={[0, 2.4, -0.2]}>
          {/* Top Canopy (Yellow Canvas Texture Simulation) */}
          <Box args={[1.6, 0.15, 2.8]} position={[0, 0, 0]}>
             <meshStandardMaterial 
                color="#3b82f6" 
                roughness={0.9} 
             />
          </Box>
          {/* Roof Rack */}
          <Box args={[1.4, 0.05, 2.6]} position={[0, 0.1, 0]}><meshStandardMaterial color="#b45309" /></Box>
          
          {/* Roof Supports */}
          <Cylinder args={[0.04, 0.04, 1.4]} position={[0.7, -0.7, 1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
          <Cylinder args={[0.04, 0.04, 1.4]} position={[-0.7, -0.7, 1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
          <Cylinder args={[0.04, 0.04, 1.4]} position={[0.7, -0.7, -1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
          <Cylinder args={[0.04, 0.04, 1.4]} position={[-0.7, -0.7, -1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
      </group>

      {/* Front Windshield Area */}
      <group position={[0, 1.8, 1.15]} rotation={[0.15, 0, 0]}>
         {/* Frame */}
         <Box args={[1.5, 1.1, 0.1]}>
             <meshStandardMaterial color="#1e293b" />
         </Box>
         {/* Realistic Glass with Wipers */}
         <Box args={[1.4, 1, 0.05]} position={[0, 0, 0.03]}>
             <meshPhysicalMaterial 
                color="#e0f2fe" 
                transmission={1} 
                opacity={1} 
                roughness={0} 
                thickness={0.1} 
                ior={1.5}
                chromaticAberration={0.06}
                transparent 
                envMapIntensity={1.5}
             />
         </Box>
         {/* Wipers */}
         <Box args={[0.02, 0.8, 0.02]} position={[0.3, 0, 0.06]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#111" /></Box>
         <Box args={[0.02, 0.8, 0.02]} position={[-0.3, 0, 0.06]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#111" /></Box>
      </group>

      {/* Driver Seat & Driver */}
      <group position={[0, 0.9, 0.5]}>
         <Box args={[1.2, 0.2, 0.6]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1e1e1e" />
         </Box>
         {/* Simple Driver Dummy */}
         <group position={[0, 0.6, 0]}>
             {/* Body */}
             <Box args={[0.5, 0.7, 0.3]} position={[0, 0, 0]}>
                 <meshStandardMaterial color="#fff" />
             </Box>
             {/* Head with Cap */}
             <Sphere args={[0.25]} position={[0, 0.55, 0]}>
                 <meshStandardMaterial color="#fca5a5" />
             </Sphere>
             <Cylinder args={[0.26, 0.26, 0.1]} position={[0, 0.65, 0]}><meshStandardMaterial color="#1e3a8a" /></Cylinder> {/* Cap */}
             <Box args={[0.3, 0.05, 0.2]} position={[0, 0.6, 0.25]}><meshStandardMaterial color="#1e3a8a" /></Box> {/* Brim */}
             
             {/* Sunglasses */}
            <group position={[0, 0.58, 0.18]}>
                <Box args={[0.1, 0.05, 0.05]} position={[0.08, 0, 0]}><meshStandardMaterial color="black" roughness={0.2} /></Box>
                <Box args={[0.1, 0.05, 0.05]} position={[-0.08, 0, 0]}><meshStandardMaterial color="black" roughness={0.2} /></Box>
                <Box args={[0.06, 0.01, 0.05]} position={[0, 0, 0]}><meshStandardMaterial color="black" /></Box>
            </group>

             {/* Arms reaching for handle */}
             <Box args={[0.1, 0.6, 0.1]} position={[0.25, 0.1, 0.3]} rotation={[1, 0, -0.2]}><meshStandardMaterial color="#fff" /></Box>
             <Box args={[0.1, 0.6, 0.1]} position={[-0.25, 0.1, 0.3]} rotation={[1, 0, 0.2]}><meshStandardMaterial color="#fff" /></Box>
         </group>
      </group>
      
      {/* Handlebars & Console */}
      <group position={[0, 1.4, 0.9]} rotation={[0.4, 0, 0]}>
         <Cylinder args={[0.04, 0.04, 1.2]} rotation={[0, 0, Math.PI/2]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.8} />
         </Cylinder>
         {/* Digital Dashboard */}
         <Box args={[0.8, 0.3, 0.2]} position={[0, -0.2, 0.1]}>
             <meshStandardMaterial color="#333" />
         </Box>
         <Box args={[0.6, 0.2, 0.01]} position={[0, -0.2, 0.21]}>
             <meshBasicMaterial color="#0ea5e9" /> {/* Screen */}
         </Box>
      </group>

      {/* Headlight */}
      <group position={[0, 0.8, 1.35]}>
        <Cylinder args={[0.18, 0.18, 0.2]} rotation={[Math.PI/2, 0, 0]}>
             <meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={5} toneMapped={false} />
        </Cylinder>
        <Cylinder args={[0.2, 0.2, 0.15]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, -0.05]}>
             <meshStandardMaterial color="#333" />
        </Cylinder>
        {/* Headlight Glass Cover */}
        <Cylinder args={[0.19, 0.19, 0.05]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.1]}>
             <meshPhysicalMaterial 
                transmission={1} 
                opacity={0.5} 
                transparent 
                roughness={0}
             />
        </Cylinder>
      </group>
      
      {/* Side Mirrors - Realistic */}
      <group position={[0.8, 1.7, 1.2]} rotation={[0, -0.3, 0]}>
          <Cylinder args={[0.02, 0.02, 0.3]} rotation={[0, 0, 0.5]} />
          <Box args={[0.2, 0.3, 0.05]} position={[0.1, 0.2, 0]}>
              <meshStandardMaterial color="#333" />
          </Box>
          <Box args={[0.18, 0.28, 0.01]} position={[0.1, 0.2, 0.025]}>
              <meshPhysicalMaterial color="#fff" metalness={1} roughness={0} />
          </Box>
      </group>
      <group position={[-0.8, 1.7, 1.2]} rotation={[0, 0.3, 0]}>
          <Cylinder args={[0.02, 0.02, 0.3]} rotation={[0, 0, -0.5]} />
          <Box args={[0.2, 0.3, 0.05]} position={[-0.1, 0.2, 0]}>
              <meshStandardMaterial color="#333" />
          </Box>
          <Box args={[0.18, 0.28, 0.01]} position={[-0.1, 0.2, 0.025]}>
              <meshPhysicalMaterial color="#fff" metalness={1} roughness={0} />
          </Box>
      </group>

      {/* Wheels with Realistic Rims & Tires */}
      {/* Front Wheel (1) */}
      <group position={[0, 0.35, 1.6]} ref={el => wheelsRef.current[0] = el}>
         {/* Tire (Rubber) */}
         <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#111827" roughness={0.9} />
         </Cylinder>
         {/* Rim (Chrome/Alloy) */}
         <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
         </Cylinder>
         {/* Spokes simulation */}
         <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
         <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
      </group>

      {/* Rear Wheels (2) */}
      <group position={[-0.7, 0.35, -1]} ref={el => wheelsRef.current[1] = el}>
         <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#111827" roughness={0.9} />
         </Cylinder>
         <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
         </Cylinder>
         <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
         <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
      </group>
      <group position={[0.7, 0.35, -1]} ref={el => wheelsRef.current[2] = el}>
         <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#111827" roughness={0.9} />
         </Cylinder>
         <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI/2]}>
             <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
         </Cylinder>
         <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
         <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI/2]}><meshStandardMaterial color="#94a3b8" /></Box>
      </group>

      {/* Battery Pack Detail (Back) - More Techy */}
      <group position={[0, 0.7, -1.35]}>
         <Box args={[1.2, 0.5, 0.3]}>
             <meshStandardMaterial color="#22c55e" />
         </Box>
         {/* Heat Sink Fins */}
         <Box args={[1.1, 0.05, 0.35]} position={[0, 0.1, 0]}><meshStandardMaterial color="#14532d" /></Box>
         <Box args={[1.1, 0.05, 0.35]} position={[0, -0.1, 0]}><meshStandardMaterial color="#14532d" /></Box>
         {/* Status LED */}
         <Box args={[0.3, 0.1, 0.05]} position={[0, 0, 0.16]}>
             <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} toneMapped={false} />
         </Box>
      </group>

      {/* License Plate */}
      <group position={[0, 0.5, -1.6]}>
        <Box args={[0.6, 0.15, 0.05]}>
            <meshStandardMaterial color="#fff" />
        </Box>
        <Text position={[0, 0, 0.03]} fontSize={0.1} color="black" anchorX="center" anchorY="middle">
            URJA-EV
        </Text>
      </group>
      </group>
    </group>
  );
};

const EnergyTube = ({ curve, offset, color }) => {
  return (
    <mesh position={[offset, 0, 0]}>
      <tubeGeometry args={[curve, 100, 0.15, 8, false]} />
      <meshToonMaterial color={color} />
    </mesh>
  );
};

const Pedestrian = ({ curve, startOffset, side, color }) => {
    const group = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();
    const leftArm = useRef();
    const rightArm = useRef();
    const offsetRef = useRef(startOffset);
    // Reduced speed significantly for realistic walking
    const speed = 0.002 + Math.random() * 0.002; 
    
    // Random features
    const hasBackpack = useMemo(() => Math.random() > 0.6, []);
    const pantsColor = useMemo(() => ["#1e293b", "#334155", "#475569"][Math.floor(Math.random()*3)], []);
    const hairColor = useMemo(() => ["#000", "#3f3f46", "#713f12"][Math.floor(Math.random()*3)], []);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime * 8;
        
        // Move along curve
        offsetRef.current = (offsetRef.current + speed * delta) % 1;
        const point = curve.getPointAt(offsetRef.current);
        const tangent = curve.getTangentAt(offsetRef.current);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        
        // Calculate position on sidewalk (Road radius 12, Sidewalk radius 16, so pos is ~14)
        const sidewalkOffset = 14; 
        const pos = point.clone().add(normal.multiplyScalar(side * sidewalkOffset));
        
        if (group.current) {
            group.current.position.copy(pos);
            // Look along tangent
            const lookTarget = pos.clone().add(tangent);
            group.current.lookAt(lookTarget);
            // Rotate 180 if walking other way? For now all walk forward
        }

        // Walking animation
        if(leftLeg.current && rightLeg.current) {
             leftLeg.current.rotation.x = Math.sin(t) * 0.6;
             rightLeg.current.rotation.x = Math.sin(t + Math.PI) * 0.6;
        }
        if(leftArm.current && rightArm.current) {
             leftArm.current.rotation.x = Math.sin(t + Math.PI) * 0.6;
             rightArm.current.rotation.x = Math.sin(t) * 0.6;
        }
        // Bobbing
        if(group.current) {
            group.current.position.y = 0 + Math.abs(Math.sin(t)) * 0.1;
        }
    });

    return (
        <group ref={group} scale={0.45}>
            {/* Head */}
            <Sphere args={[0.3]} position={[0, 1.7, 0]}>
                <meshStandardMaterial color="#fca5a5" />
            </Sphere>
            {/* Hair */}
            <Box args={[0.32, 0.15, 0.35]} position={[0, 1.9, -0.05]}>
                <meshStandardMaterial color={hairColor} />
            </Box>

            {/* Torso (Shirt) */}
            <Box args={[0.5, 0.45, 0.3]} position={[0, 1.25, 0]}>
                <meshStandardMaterial color={color} />
            </Box>
            {/* Pants */}
            <Box args={[0.48, 0.4, 0.28]} position={[0, 0.85, 0]}>
                <meshStandardMaterial color={pantsColor} />
            </Box>

            {/* Backpack */}
            {hasBackpack && (
                <Box args={[0.4, 0.5, 0.2]} position={[0, 1.3, -0.25]}>
                    <meshStandardMaterial color="#333" />
                </Box>
            )}

            {/* Legs */}
            <group position={[-0.15, 0.7, 0]} ref={leftLeg}>
                <Cylinder args={[0.1, 0.1, 0.7]} position={[0, -0.35, 0]}>
                    <meshStandardMaterial color={pantsColor} />
                </Cylinder>
            </group>
            <group position={[0.15, 0.7, 0]} ref={rightLeg}>
                 <Cylinder args={[0.1, 0.1, 0.7]} position={[0, -0.35, 0]}>
                    <meshStandardMaterial color={pantsColor} />
                </Cylinder>
            </group>
            {/* Arms */}
            <group position={[-0.3, 1.4, 0]} ref={leftArm}>
                <Box args={[0.15, 0.6, 0.15]} position={[0, -0.25, 0]}>
                    <meshStandardMaterial color={color} />
                </Box>
            </group>
            <group position={[0.3, 1.4, 0]} ref={rightArm}>
                <Box args={[0.15, 0.6, 0.15]} position={[0, -0.25, 0]}>
                    <meshStandardMaterial color={color} />
                </Box>
            </group>
        </group>
    )
}

const TrafficVehicle = ({ curve, startOffset, speed, color, laneOffset, type = 'sedan' }) => {
    const group = useRef();
    const offsetRef = useRef(startOffset);

    useFrame((state, delta) => {
        // Move along curve
        offsetRef.current = (offsetRef.current + speed * delta);
        // Loop around
        if (offsetRef.current > 1) offsetRef.current -= 1;
        if (offsetRef.current < 0) offsetRef.current += 1;

        const point = curve.getPointAt(offsetRef.current);
        const tangent = curve.getTangentAt(offsetRef.current);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        
        // Lane offset
        const pos = point.clone().add(normal.multiplyScalar(laneOffset));
        
        if (group.current) {
            group.current.position.copy(pos);
            // Look along tangent
            const lookTarget = pos.clone().add(tangent);
            group.current.lookAt(lookTarget);
            
            if (speed < 0) {
                 group.current.rotation.y += Math.PI;
            }
        }
    });

    const VehicleBody = () => {
        if (type === 'truck') {
            return (
                <group scale={0.8}>
                    {/* Cab - Detailed */}
                    <Box args={[1.5, 2, 1.5]} position={[0, 1.5, 1]}>
                        <meshStandardMaterial color={color} roughness={0.4} />
                    </Box>
                    {/* Windshield */}
                    <Box args={[1.4, 0.8, 0.1]} position={[0, 2, 1.76]}>
                        <meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} />
                    </Box>
                    {/* Grille */}
                    <Box args={[1.2, 0.6, 0.1]} position={[0, 1.2, 1.76]}>
                        <meshStandardMaterial color="#333" />
                    </Box>
                    {/* Side Mirrors */}
                    <Box args={[0.1, 0.4, 0.2]} position={[0.8, 1.8, 1.5]}><meshStandardMaterial color="#333" /></Box>
                    <Box args={[0.1, 0.4, 0.2]} position={[-0.8, 1.8, 1.5]}><meshStandardMaterial color="#333" /></Box>

                    {/* Cargo - Detailed */}
                    <Box args={[1.6, 2.2, 3.5]} position={[0, 1.6, -1.5]}>
                        <meshStandardMaterial color="#e2e8f0" roughness={0.6} />
                    </Box>
                    {/* Rear Doors details */}
                    <Box args={[0.7, 2, 0.1]} position={[0.4, 1.6, -3.26]}><meshStandardMaterial color="#cbd5e1" /></Box>
                    <Box args={[0.7, 2, 0.1]} position={[-0.4, 1.6, -3.26]}><meshStandardMaterial color="#cbd5e1" /></Box>

                     {/* Wheels */}
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[0.8, 0.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[-0.8, 0.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[0.8, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[-0.8, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                     {/* Lights */}
                    <Box args={[0.3, 0.1, 0.1]} position={[0.5, 0.8, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                    <Box args={[0.3, 0.1, 0.1]} position={[-0.5, 0.8, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                </group>
            )
        } else if (type === 'bus') {
             return (
                <group scale={0.7}>
                    <Box args={[1.8, 2, 6]} position={[0, 1.5, 0]}>
                        <meshStandardMaterial color={color} roughness={0.3} />
                    </Box>
                    {/* Windshield - Big */}
                    <Box args={[1.7, 1.2, 0.1]} position={[0, 1.8, 3.01]}>
                        <meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} />
                    </Box>
                    {/* Destination Board */}
                    <Box args={[1.4, 0.3, 0.1]} position={[0, 2.7, 3.01]}>
                        <meshBasicMaterial color="#000" />
                    </Box>
                    <Box args={[1.2, 0.1, 0.11]} position={[0, 2.7, 3.01]}>
                        <meshBasicMaterial color="#fbbf24" toneMapped={false} />
                    </Box>
                    <Text position={[0, 2.7, 3.04]} fontSize={0.28} color="#000">URJA MOBILITY</Text>

                    {/* Windows - Side Strip */}
                    <Box args={[1.82, 0.8, 5.8]} position={[0, 1.8, 0]}><meshStandardMaterial color="#1e293b" /></Box>
                    
                    {/* Door */}
                    <Box args={[0.1, 1.8, 0.8]} position={[0.91, 1.2, 2]}><meshStandardMaterial color="#475569" /></Box>

                    {/* Wheels */}
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[0.9, 0.4, 2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[-0.9, 0.4, 2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[0.9, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI/2]} position={[-0.9, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                    {/* Headlights */}
                    <Box args={[0.25, 0.15, 0.1]} position={[0.6, 0.6, 3.01]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                    <Box args={[0.25, 0.15, 0.1]} position={[-0.6, 0.6, 3.01]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                </group>
             )
        } else {
            // Sedan - Detailed
             return (
                <group scale={0.7}>
                    {/* Lower Body */}
                    <Box args={[1.8, 0.6, 3.5]} position={[0, 0.6, 0]}>
                        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
                    </Box>
                    {/* Upper Cabin */}
                    <Box args={[1.5, 0.5, 2]} position={[0, 1.15, -0.2]}>
                        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
                    </Box>
                    {/* Windows - All around */}
                    <Box args={[1.52, 0.4, 1.8]} position={[0, 1.15, -0.2]}>
                        <meshStandardMaterial color="#1e293b" />
                    </Box>
                    {/* Windshield Glass Effect */}
                    <Box args={[1.4, 0.4, 1.9]} position={[0, 1.15, -0.2]}>
                        <meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} transmission={0.5} thickness={0.1} />
                    </Box>

                    {/* Side Mirrors */}
                    <Box args={[0.2, 0.15, 0.1]} position={[0.8, 0.9, 0.5]}><meshStandardMaterial color={color} /></Box>
                    <Box args={[0.2, 0.15, 0.1]} position={[-0.8, 0.9, 0.5]}><meshStandardMaterial color={color} /></Box>

                    {/* License Plates */}
                    <Box args={[0.5, 0.15, 0.05]} position={[0, 0.4, 1.76]}><meshStandardMaterial color="#fff" /></Box>
                    <Box args={[0.5, 0.15, 0.05]} position={[0, 0.4, -1.76]}><meshStandardMaterial color="#fff" /></Box>

                    <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI/2]} position={[0.8, 0.35, 1]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI/2]} position={[-0.8, 0.35, 1]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI/2]} position={[0.8, 0.35, -1]}><meshStandardMaterial color="#111" /></Cylinder>
                    <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI/2]} position={[-0.8, 0.35, -1]}><meshStandardMaterial color="#111" /></Cylinder>
                     {/* Headlights */}
                     <Box args={[0.4, 0.2, 0.1]} position={[0.5, 0.6, 1.76]}>
                        <meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} />
                     </Box>
                     <Box args={[0.4, 0.2, 0.1]} position={[-0.5, 0.6, 1.76]}>
                        <meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} />
                     </Box>
                     {/* Taillights */}
                     <Box args={[0.4, 0.2, 0.1]} position={[0.5, 0.6, -1.76]}>
                        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
                     </Box>
                     <Box args={[0.4, 0.2, 0.1]} position={[-0.5, 0.6, -1.76]}>
                        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} />
                     </Box>
                </group>
            )
        }
    }

    return (
        <group ref={group}>
            <VehicleBody />
        </group>
    )
}

const TrafficLight = ({ position, rotation }) => {
    const [activeLight, setActiveLight] = useState(0); // 0: Red, 1: Yellow, 2: Green
    const activeRef = useRef(0);
    useFrame(({ clock }) => {
        const t = clock.elapsedTime + position[0]; 
        const cycle = t % 10;
        let next = 0;
        if (cycle < 4) next = 2; // Green 4s
        else if (cycle < 5) next = 1; // Yellow 1s
        else next = 0; // Red 5s
        if (next !== activeRef.current) {
            activeRef.current = next;
            setActiveLight(next);
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Pole */}
            <Cylinder args={[0.1, 0.15, 5]} position={[0, 2.5, 0]}>
                <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
            </Cylinder>
            
            {/* Main Housing */}
            <Box args={[0.5, 1.4, 0.4]} position={[0, 4.2, 0]}>
                <meshStandardMaterial color="#0f172a" />
            </Box>
            
            {/* Back Plate (for contrast) */}
            <Box args={[0.6, 1.5, 0.05]} position={[0, 4.2, -0.2]}>
                <meshStandardMaterial color="#fbbf24" /> 
            </Box>

            {/* Lights */}
            {/* Red */}
            <group position={[0, 4.6, 0.2]}>
                <Sphere args={[0.15]} scale={[1, 1, 0.6]}>
                     <meshStandardMaterial 
                        color={activeLight === 0 ? "#ff0000" : "#450a0a"} 
                        emissive={activeLight === 0 ? "#ff0000" : "#000000"}
                        emissiveIntensity={activeLight === 0 ? 3 : 0}
                     />
                </Sphere>
                {/* Hood */}
                <Cylinder args={[0.16, 0.16, 0.3, 16, 1, true, 0, Math.PI]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
                    <meshStandardMaterial color="#0f172a" side={THREE.DoubleSide} />
                </Cylinder>
            </group>

            {/* Yellow */}
            <group position={[0, 4.2, 0.2]}>
                <Sphere args={[0.15]} scale={[1, 1, 0.6]}>
                     <meshStandardMaterial 
                        color={activeLight === 1 ? "#eab308" : "#422006"} 
                        emissive={activeLight === 1 ? "#eab308" : "#000000"}
                        emissiveIntensity={activeLight === 1 ? 3 : 0}
                     />
                </Sphere>
                 <Cylinder args={[0.16, 0.16, 0.3, 16, 1, true, 0, Math.PI]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
                    <meshStandardMaterial color="#0f172a" side={THREE.DoubleSide} />
                </Cylinder>
            </group>

            {/* Green */}
            <group position={[0, 3.8, 0.2]}>
                <Sphere args={[0.15]} scale={[1, 1, 0.6]}>
                     <meshStandardMaterial 
                        color={activeLight === 2 ? "#22c55e" : "#052e16"} 
                        emissive={activeLight === 2 ? "#22c55e" : "#000000"}
                        emissiveIntensity={activeLight === 2 ? 3 : 0}
                     />
                </Sphere>
                 <Cylinder args={[0.16, 0.16, 0.3, 16, 1, true, 0, Math.PI]} rotation={[Math.PI/2, 0, 0]} position={[0, 0.1, 0]}>
                    <meshStandardMaterial color="#0f172a" side={THREE.DoubleSide} />
                </Cylinder>
            </group>
        </group>
    )
}

const BusStop = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        {/* Platform */}
        <Box args={[3, 0.2, 1.5]} position={[0, 0.1, 0]}>
            <meshStandardMaterial color="#cbd5e1" />
        </Box>
        {/* Shelter Back */}
        <Box args={[3, 2.2, 0.1]} position={[0, 1.2, -0.7]}>
            <meshPhysicalMaterial color="#94a3b8" transmission={0.5} roughness={0.1} />
        </Box>
        {/* Shelter Roof */}
        <Box args={[3.2, 0.1, 1.8]} position={[0, 2.3, 0]}>
            <meshStandardMaterial color="#334155" />
        </Box>
        {/* Supports */}
        <Cylinder args={[0.05, 0.05, 2.2]} position={[1.4, 1.1, -0.6]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <Cylinder args={[0.05, 0.05, 2.2]} position={[-1.4, 1.1, -0.6]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <Cylinder args={[0.05, 0.05, 2.2]} position={[1.4, 1.1, 0.8]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <Cylinder args={[0.05, 0.05, 2.2]} position={[-1.4, 1.1, 0.8]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        
        {/* Bench inside */}
        <Box args={[2, 0.1, 0.4]} position={[0, 0.5, -0.4]}>
            <meshStandardMaterial color="#78350f" />
        </Box>
        <Box args={[0.1, 0.4, 0.4]} position={[0.8, 0.3, -0.4]}><meshStandardMaterial color="#333" /></Box>
        <Box args={[0.1, 0.4, 0.4]} position={[-0.8, 0.3, -0.4]}><meshStandardMaterial color="#333" /></Box>

        {/* Ad Panel */}
        <Box args={[0.1, 1.8, 1.2]} position={[1.5, 1.1, 0]}>
            <meshStandardMaterial color="#1e293b" />
        </Box>
        <Box args={[0.05, 1.6, 1]} position={[1.45, 1.1, 0]}>
            <meshBasicMaterial color="#fff" />
        </Box>
        <Text position={[1.45, 1.1, 0.06]} fontSize={0.35} color="#fbbf24">URJA MOBILITY</Text>
        
        {/* Bus Sign */}
        <group position={[-1.8, 0, 0.8]}>
            <Cylinder args={[0.05, 0.05, 2.5]} position={[0, 1.25, 0]}><meshStandardMaterial color="#333" /></Cylinder>
            <Box args={[0.6, 0.6, 0.05]} position={[0, 2.2, 0]}>
                <meshStandardMaterial color="#2563eb" />
            </Box>
            <Text position={[0, 2.2, 0.03]} fontSize={0.2} color="white">BUS</Text>
        </group>
    </group>
)

const TrafficSign = ({ position, rotation, type = 'stop' }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.05, 0.05, 2]} position={[0, 1, 0]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
        {type === 'stop' && (
            <group position={[0, 2, 0]}>
                <Cylinder args={[0.4, 0.4, 0.05, 8]} rotation={[Math.PI/2, 0, 0]}>
                    <meshStandardMaterial color="#ef4444" />
                </Cylinder>
                <Text position={[0, 0, 0.03]} fontSize={0.25} color="white">STOP</Text>
            </group>
        )}
        {type === 'limit' && (
            <group position={[0, 2, 0]}>
                <Box args={[0.6, 0.8, 0.05]}>
                    <meshStandardMaterial color="#fff" />
                </Box>
                <Text position={[0, 0.1, 0.03]} fontSize={0.3} color="black">50</Text>
                <Text position={[0, -0.2, 0.03]} fontSize={0.1} color="black">LIMIT</Text>
            </group>
        )}
    </group>
)

const Billboard = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[4.5, 2.5, 0.2]} position={[0, 1.25, 0]}>
            <meshStandardMaterial color="#111827" />
        </Box>
        <Box args={[4.2, 2.2, 0.05]} position={[0, 1.25, 0.11]}>
            <meshBasicMaterial color="#0b1020" />
        </Box>
        <Text position={[0, 1.25, 0.13]} fontSize={0.6} color="#fbbf24">URJA MOBILITY</Text>
        <Text position={[0, 1.25, -0.13]} fontSize={0.6} color="#fbbf24" rotation={[0, Math.PI, 0]}>URJA MOBILITY</Text>
        <Cylinder args={[0.15, 0.15, 1.2]} position={[0, 0.6, -0.6]}>
            <meshStandardMaterial color="#374151" />
        </Cylinder>
        <Cylinder args={[0.15, 0.15, 1.2]} position={[0, 0.6, 0.6]}>
            <meshStandardMaterial color="#374151" />
        </Cylinder>
    </group>
)

const UrjaMobilityBuilding = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[12, 0.8, 12]} position={[0, 0.4, 0]}>
            <meshStandardMaterial color="#334155" />
        </Box>
        <Box args={[10, 15, 10]} position={[0, 8.3, 0]}>
            <meshPhysicalMaterial color="#fbbf24" metalness={0.7} roughness={0.2} transmission={0.15} transparent opacity={0.9} />
        </Box>
        <Cylinder args={[3, 3, 14.8]} position={[0, 8.2, 0]}>
            <meshStandardMaterial color="#111827" />
        </Cylinder>
        <Box args={[10.5, 0.3, 10.5]} position={[0, 4.5, 0]}>
            <meshBasicMaterial color="#fbbf24" toneMapped={false} />
        </Box>
        <group position={[0, 13, 5.2]}>
            <Text fontSize={1.1} color="#0ea5e9" anchorX="center" anchorY="middle" outlineWidth={0.06} outlineColor="#ffffff">
                URJA MOBILITY
            </Text>
        </group>
        <group position={[5.2, 13, 0]} rotation={[0, Math.PI/2, 0]}>
            <Text fontSize={1.1} color="#0ea5e9" anchorX="center" anchorY="middle" outlineWidth={0.06} outlineColor="#ffffff">
                URJA MOBILITY
            </Text>
        </group>
        <Box args={[10.8, 0.6, 10.8]} position={[0, 16.1, 0]}>
            <meshStandardMaterial color="#1f2937" />
        </Box>
    </group>
)

const Road = () => {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 50),
        new THREE.Vector3(0, 0, 20),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -20),
        new THREE.Vector3(15, 0, -40),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(-15, 0, -100),
        new THREE.Vector3(-10, 0, -130),
        new THREE.Vector3(10, 0, -160),
        new THREE.Vector3(0, 0, -190),
        new THREE.Vector3(0, 0, -220),
        new THREE.Vector3(0, 0, -250)
    ]);
  }, []);

  return (
    <>
      {/* Ground Plane with more texture/color variation */}
      <mesh position={[0, -0.5, -50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial color="#86efac" roughness={1} />
      </mesh>
      
      {/* Grass Tufts - Removed for performance */}
      {/* {Array.from({ length: 350 }).map((_, i) => { ... })} */}

      {/* Asphalt Road - Pitch Black & Wider */}
      {/* Lowered to y=-1.2 so top surface is at y=0 (Radius 12 * Scale 0.1 = 1.2 height offset) */}
      <mesh position={[0, -1.2, 0]} scale={[1, 0.1, 1]} receiveShadow>
         <tubeGeometry args={[curve, 60, 12, 8, false]} />
         <meshStandardMaterial color="#1c1917" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Road Markings - Dashed Lines */}
      {Array.from({ length: 65 }).map((_, i) => {
          // Evenly spaced dashes
          const t = i / 70;
          const point = curve.getPointAt(t);
          const tangent = curve.getTangentAt(t);
          const rotation = Math.atan2(tangent.x, tangent.z);
          return (
             <mesh key={i} position={[point.x, 0.02, point.z]} rotation={[-Math.PI/2, 0, rotation]}>
                 <planeGeometry args={[0.4, 3]} />
                 <meshBasicMaterial color="#ffffff" />
             </mesh>
          )
      })}

      {/* Sidewalks - Pushed out */}
      {/* Lowered to y=-1.61 so top surface is at y=-0.01 (Radius 16 * Scale 0.1 = 1.6 height offset) */}
      <mesh position={[0, -1.61, 0]} scale={[1, 0.1, 1]} receiveShadow>
         <tubeGeometry args={[curve, 80, 16, 16, false]} />
         <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
      </mesh>
      
      {/* Sidewalk Joints - Reduced for performance */}
      {Array.from({ length: 10 }).map((_, i) => {
          const t = i / 10;
          const point = curve.getPointAt(t);
          const tangent = curve.getTangentAt(t);
          const rotation = Math.atan2(tangent.x, tangent.z);
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
          
          // Joints on both sides
          const leftPos = point.clone().add(normal.multiplyScalar(-14)); // Center of left sidewalk (approx)
          const rightPos = point.clone().add(normal.multiplyScalar(14)); // Center of right sidewalk
          
          return (
             <group key={`joint-${i}`}>
                 <mesh position={[leftPos.x, 0.01, leftPos.z]} rotation={[0, rotation, 0]}>
                     <Box args={[4, 0.02, 0.05]}>
                         <meshStandardMaterial color="#94a3b8" roughness={1} />
                     </Box>
                 </mesh>
                 <mesh position={[rightPos.x, 0.01, rightPos.z]} rotation={[0, rotation, 0]}>
                     <Box args={[4, 0.02, 0.05]}>
                         <meshStandardMaterial color="#94a3b8" roughness={1} />
                     </Box>
                 </mesh>
             </group>
          )
      })}
      
      {/* Curb Stones - Raised edges on both sides */}
      <mesh position={[0, -1.15, 0]} scale={[1, 0.1, 1]}>
         <tubeGeometry args={[curve, 80, 12.5, 16, false]} />
         <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>

      {/* Crosswalks at intervals */}
      {[0.15, 0.35, 0.55, 0.75, 0.95].map((t, i) => {
          const point = curve.getPointAt(t);
          const tangent = curve.getTangentAt(t);
          const rotation = Math.atan2(tangent.x, tangent.z);
          return (
             <group key={`cross-${i}`} position={[point.x, 0.03, point.z]} rotation={[0, rotation, 0]}>
                 {/* Stripes */}
                 {Array.from({ length: 12 }).map((_, j) => (
                     <mesh key={j} position={[(j - 5.5) * 1.5, 0, 0]} rotation={[-Math.PI/2, 0, 0]}>
                         <planeGeometry args={[0.8, 5]} />
                         <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
                     </mesh>
                 ))}
                 
                 {/* Traffic Lights */}
                 {/* For Left Lane (Moving Forward) - Stop before crosswalk */}
                 <TrafficLight position={[-14, 0, -6]} rotation={[0, Math.PI, 0]} />
                 
                 {/* For Right Lane (Moving Backward) - Stop after crosswalk (from perspective of tangent) */}
                 <TrafficLight position={[14, 0, 6]} rotation={[0, 0, 0]} />
             </group>
          )
      })}

      {/* Street Lamps along the road */}
      {Array.from({ length: 8 }).map((_, i) => {
           const t = i / 8;
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           
           // Alternate sides
           const side = i % 2 === 0 ? 1 : -1;
           const pos = point.clone().add(normal.multiplyScalar(side * 14)); // On sidewalk
           const rotation = Math.atan2(tangent.x, tangent.z);
           
           // Rotate lamp to face road.
           return (
               <StreetLamp 
                 key={i} 
                 position={pos} 
                 rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} 
               />
           )
      })}

      {/* Manholes on Road */}
      {Array.from({ length: 5 }).map((_, i) => {
           const t = 0.1 + (i / 8) * 0.8 + Math.random() * 0.05;
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           // Randomly left or right lane
           const offset = (Math.random() - 0.5) * 10; 
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           const pos = point.clone().add(normal.multiplyScalar(offset));
           
           return <Manhole key={`mh-${i}`} position={[pos.x, 0.01, pos.z]} rotation={[0, rotation, 0]} />
      })}

      {/* Street Props: Benches, Trash Cans, Fire Hydrants, Bike Racks, Recycling, Info */}
      {Array.from({ length: 12 }).map((_, i) => {
           const t = 0.02 + (i / 12) * 0.96 + Math.random() * 0.01;
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           const side = i % 2 === 0 ? 1 : -1;
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           const pos = point.clone().add(normal.multiplyScalar(side * 15));
           
           const type = Math.random();
           
           if (type > 0.9) {
               return <BikeRack key={`bike-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
           } else if (type > 0.8) {
               return <RecyclingStation key={`recycle-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
           } else if (type > 0.7) {
               const texts = ["Zero Carbon", "Solar Power", "Eco Zone", "Clean Air", "Green City"];
               const text = texts[Math.floor(Math.random() * texts.length)];
               // Position slightly higher for visibility
               return <HolographicInfo key={`holo-${i}`} position={[pos.x, 1.5, pos.z]} text={text} />
           } else if (type > 0.45) {
               return <Bench key={`bench-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
           } else if (type > 0.25) {
               return <TrashCan key={`trash-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation, 0]} />
           } else {
               // Fire Hydrant usually near curb (closer)
               const hydrantPos = point.clone().add(normal.multiplyScalar(side * 13));
               return <FireHydrant key={`hydrant-${i}`} position={[hydrantPos.x, 0, hydrantPos.z]} rotation={[0, rotation, 0]} />
           }
      })}

      {/* Eco Infrastructure: Wind Turbines & Solar Arrays & Solar Trees */}
      {Array.from({ length: 5 }).map((_, i) => {
           const t = 0.1 + (i / 5) * 0.85 + Math.random() * 0.02;
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           const side = i % 2 === 0 ? 1 : -1;
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           
           const type = Math.random();
           
           if (type > 0.6) {
               // Wind Turbine (Far back)
               const pos = point.clone().add(normal.multiplyScalar(side * (40 + Math.random() * 10)));
               return <WindTurbine key={`wind-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + Math.PI/2, 0]} />
           } else if (type > 0.3) {
               // Solar Tree (Mid distance - acts as a transition)
               const pos = point.clone().add(normal.multiplyScalar(side * (30 + Math.random() * 5)));
               return <SolarTree key={`solar-tree-${i}`} position={[pos.x, 0, pos.z]} scale={1 + Math.random() * 0.5} />
           } else {
               // Solar Array (Mid distance)
               const pos = point.clone().add(normal.multiplyScalar(side * (25 + Math.random() * 5)));
               return <SolarPanelArray key={`solar-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
           }
      })}

      {/* Billboards */}
      {[0.12, 0.28, 0.44, 0.62, 0.78, 0.9].map((t, i) => {
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           const side = i % 2 === 0 ? 1 : -1;
           const pos = point.clone().add(normal.multiplyScalar(side * 16));
           return <Billboard key={`bb-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? -Math.PI/2 : Math.PI/2), 0]} />
      })}
      {/* Bus Stops along sidewalks near mid-road segments */}
      {[0.15, 0.35, 0.55, 0.75, 0.9].map((t, i) => {
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           const side = i % 2 === 0 ? 1 : -1;
           const pos = point.clone().add(normal.multiplyScalar(side * 15));
           return (
             <BusStop 
               key={`bus-${i}`} 
               position={[pos.x, 0, pos.z]} 
               rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} 
             />
           )
      })}

      {/* Traffic Signs near crosswalk intervals */}
      {[0.1, 0.25, 0.4, 0.55, 0.7, 0.85].map((t, i) => {
           const point = curve.getPointAt(t);
           const tangent = curve.getTangentAt(t);
           const rotation = Math.atan2(tangent.x, tangent.z);
           const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
           const side = i % 2 === 0 ? 1 : -1;
           const pos = point.clone().add(normal.multiplyScalar(side * 13.5));
           const type = i % 2 === 0 ? 'stop' : 'limit';
           return (
             <TrafficSign 
               key={`sign-${i}`} 
               position={[pos.x, 0, pos.z]} 
               rotation={[0, rotation + (side === 1 ? -Math.PI/2 : Math.PI/2), 0]} 
               type={type}
             />
           )
      })}

      {/* Traffic Vehicles */}
      {Array.from({ length: 4 }).map((_, i) => {
           // Organized Traffic: Left Lane moves forward, Right Lane moves backward
           const isLeft = i % 2 === 0; // Alternate lanes for better distribution
           const laneOffset = isLeft ? -6 : 6;
           
           const type = Math.random() > 0.8 ? 'bus' : Math.random() > 0.6 ? 'truck' : 'sedan';
           
           // CONSTANT Speed to prevent collisions (Physics requirement)
           // Left lane (forward): +0.02
           // Right lane (backward): -0.02
           const speed = 0.02 * (isLeft ? 1 : -1);

           // Spaced out start positions to ensure no overlap at spawn
           const startOffset = (i / 16) + (Math.random() * 0.01);
           
           const color = ["#ef4444", "#3b82f6", "#eab308", "#ffffff", "#000000", "#f97316"][Math.floor(Math.random() * 6)];
           
           // Ensure trucks/buses are not neon colors mostly
           const vehicleColor = (type === 'truck' || type === 'bus') && Math.random() > 0.3 
                ? ["#fff", "#cbd5e1", "#334155"][Math.floor(Math.random()*3)] 
                : color;

           return <TrafficVehicle key={`car-${i}`} curve={curve} startOffset={startOffset} speed={speed} color={vehicleColor} laneOffset={laneOffset} type={type} />
      })}
      
      {/* Moving Pedestrians Loop */}
      {Array.from({ length: 5 }).map((_, i) => {
           const side = i % 2 === 0 ? 1 : -1;
           const startOffset = Math.random();
           const color = Math.random() > 0.5 ? "#ef4444" : "#3b82f6";
           return <Pedestrian key={`ped-${i}`} curve={curve} startOffset={startOffset} side={side} color={color} />
      })}

      {/* Birds in the Sky */}
      {Array.from({ length: 3 }).map((_, i) => {
           const x = (Math.random() - 0.5) * 100;
           const z = (Math.random() - 0.5) * 300 - 50;
           const y = 15 + Math.random() * 10;
           const speed = 0.5 + Math.random() * 0.5;
           const range = 5 + Math.random() * 5;
           return <Bird key={`bird-${i}`} position={[x, y, z]} speed={speed} range={range} />
      })}

      {/* Town Buildings & Trees & Charging Stations Generation */}
      {Array.from({ length: 25 }).map((_, i) => {
          // Increased count to cover extended road
          const t = 0.02 + (i / 25) * 0.96; 
          
          const point = curve.getPointAt(t);
          const tangent = curve.getTangentAt(t);
          const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
          
          const rotation = Math.atan2(tangent.x, tangent.z);
          const side = i % 2 === 0 ? 1 : -1;

          // Deterministic Pattern (Modulo 8)
          // Ensures every structure is separated by a tree on its side of the road
          // Sequence Right (Evens): House -> Tree -> House -> Tree
          // Sequence Left (Odds): Building -> Tree -> Charging Station -> Tree
          
          const patternIndex = i % 8;
          
          // 0: Small House (Right)
          // 1: Town Building (Left)
          // 2: Town Building (Right) - New
          // 3: Tree (Left) - Revert
          // 4: Small House (Right)
          // 5: Charging Station (Left)
          // 6: Town Building (Right) - New
          // 7: Town Building (Left) - New (Added more buildings on left)

          const isTree = patternIndex === 3;
          const isChargingStation = patternIndex === 5;
          const isBuilding = patternIndex === 1 || patternIndex === 2 || patternIndex === 6 || patternIndex === 7;
          const isSmallHouse = patternIndex === 0 || patternIndex === 4;
          const isZuiceHQ = i === 9; // Specific slot for Zuice HQ
          const isUrjaMobility = i === 1 && patternIndex === 1; // Designate index 1 as Urja Mobility
          const isVerticalGarden = (isBuilding) && !isZuiceHQ && !isUrjaMobility && !isSmallHouse && Math.random() > 0.5; // Some new buildings are green

          // Place Objects - Depth Separation to prevent overlapping
          let distance = 26; 
          if (isSmallHouse) distance = 22; // Small houses closer to road
          if (isBuilding) distance = 35; // Big buildings further back (Physics separation)
          if (isChargingStation) distance = 24; 
          if (isTree) distance = 28;
          
          // Slight randomization in depth
          distance += Math.random() * 1;

          const pos = point.clone().add(normal.multiplyScalar(side * distance));

          return (
            <group key={i}>
                {isZuiceHQ ? (
                     <ZuiceBuilding position={pos} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
                ) : isTree ? (
                    <RoadsideTree position={pos} />
                ) : (
                    isChargingStation ? (
                        <ChargingStation position={pos} rotation={[0, rotation + (side === 1 ? -Math.PI/2 : Math.PI/2), 0]} />
                    ) : (
                        isBuilding || isVerticalGarden ? (
                            isUrjaMobility ? (
                                <UrjaMobilityBuilding position={pos} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
                            ) : isVerticalGarden ? (
                                <VerticalGardenBuilding position={pos} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
                            ) : (
                                <TownBuilding position={pos} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
                            )
                        ) : (
                            <SmallHouse position={pos} rotation={[0, rotation + (side === 1 ? Math.PI/2 : -Math.PI/2), 0]} />
                        )
                    )
                )}
            </group>
          );
      })}
    </>
  );
};

const ChargingStation = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Platform Base - Modern concrete */}
            <Box args={[5, 0.2, 4]} position={[0, 0.1, 0]}>
                <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
            </Box>
            {/* Parking Lines */}
            <Box args={[0.2, 0.05, 3]} position={[-1.5, 0.21, 0]}><meshBasicMaterial color="#fff" /></Box>
            <Box args={[0.2, 0.05, 3]} position={[1.5, 0.21, 0]}><meshBasicMaterial color="#fff" /></Box>

            {/* Canopy Structure - Futuristic */}
            <group position={[0, 0, -1.5]}>
                {/* Pillars - Angled */}
                <group position={[-2, 1.75, 0]} rotation={[0, 0, -0.1]}>
                    <Cylinder args={[0.1, 0.15, 3.6]}><meshStandardMaterial color="#334155" metalness={0.6} /></Cylinder>
                </group>
                <group position={[2, 1.75, 0]} rotation={[0, 0, 0.1]}>
                     <Cylinder args={[0.1, 0.15, 3.6]}><meshStandardMaterial color="#334155" metalness={0.6} /></Cylinder>
                </group>
                
                {/* Roof - Curved */}
                <group position={[0, 3.5, 0.5]} rotation={[0.1, 0, 0]}>
                     <Box args={[5.5, 0.1, 3]}>
                        <meshStandardMaterial color="#0f172a" />
                     </Box>
                     {/* Glass Panels underneath */}
                     <Box args={[5.2, 0.05, 2.8]} position={[0, -0.05, 0]}>
                         <meshPhysicalMaterial color="#4ade80" transmission={0.2} opacity={0.5} transparent />
                     </Box>
                </group>

                {/* Green Energy Glow Strip on Roof Edge */}
                <Box args={[5.6, 0.1, 0.1]} position={[0, 3.5, 2]} rotation={[0.1, 0, 0]}>
                    <meshBasicMaterial color="#22c55e" toneMapped={false} />
                </Box>
                
                {/* Solar Panels on Station Roof */}
                <Box args={[5, 0.05, 2.5]} position={[0, 3.65, 0.5]} rotation={[0.1, 0, 0]}>
                     <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} />
                </Box>
            </group>

            {/* Charging Units - High Tech */}
            <group position={[0, 0, -1]}>
                {[-1.2, 1.2].map((x, i) => (
                    <group key={i} position={[x, 1, 0]}>
                        {/* Main Body */}
                        <Box args={[0.6, 2, 0.4]}>
                            <meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.2} />
                        </Box>
                        {/* Interface Screen */}
                        <Box args={[0.4, 0.5, 0.05]} position={[0, 0.4, 0.21]}>
                            <meshBasicMaterial color="#000" />
                        </Box>
                        {/* Status Bar (Animated Logic would be here, static for now) */}
                        <Box args={[0.3, 0.05, 0.06]} position={[0, 0.4, 0.21]}>
                            <meshBasicMaterial color="#22c55e" toneMapped={false} />
                        </Box>
                        {/* Connector Holster */}
                        <Box args={[0.15, 0.3, 0.1]} position={[0.15, -0.3, 0.2]}>
                            <meshStandardMaterial color="#333" />
                        </Box>
                        {/* Cable - Simplified curve */}
                        <Cylinder args={[0.02, 0.02, 1.2]} position={[0.2, -0.5, 0.2]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                        
                        {/* Branding Top */}
                        <Box args={[0.6, 0.3, 0.4]} position={[0, 1, 0]}>
                             <meshStandardMaterial color="#16a34a" />
                        </Box>
                    </group>
                ))}
            </group>
        </group>
    )
}

const RoadsideTree = ({ position }) => {
    const scale = 1 + Math.random() * 1.5;
    // Removed expensive per-frame wind animation for performance
    
    const leafColors = ["#15803d", "#16a34a", "#4d7c0f", "#3f6212", "#047857"];
    
    return (
        <group position={position} scale={scale}>
            {/* Trunk - Simplified */}
            <Cylinder args={[0.2, 0.25, 2]} position={[0, 1, 0]} segments={6}><meshStandardMaterial color="#5d4037" roughness={1} /></Cylinder>
            
            {/* Foliage - Simplified to single mesh if possible or fewer chunks */}
            <group position={[0, 2.2, 0]}>
                 <mesh position={[0, 0, 0]}>
                     <dodecahedronGeometry args={[1.5, 0]} />
                     <meshStandardMaterial color={leafColors[0]} roughness={0.8} />
                 </mesh>
                 <mesh position={[0.8, 0.5, 0]}>
                    <dodecahedronGeometry args={[1.0, 0]} />
                    <meshStandardMaterial color={leafColors[1]} roughness={0.8} />
                </mesh>
                <mesh position={[-0.8, 0.4, 0.2]}>
                     <dodecahedronGeometry args={[1.0, 0]} />
                     <meshStandardMaterial color={leafColors[2]} roughness={0.8} />
                 </mesh>
                 <mesh position={[0, 0.8, -0.6]}>
                     <dodecahedronGeometry args={[1.1, 0]} />
                     <meshStandardMaterial color={leafColors[3]} roughness={0.8} />
                 </mesh>
                 <mesh position={[0.4, 1.2, 0.4]}>
                     <dodecahedronGeometry args={[0.8, 0]} />
                     <meshStandardMaterial color={leafColors[4]} roughness={0.8} />
                 </mesh>
                 
                 {/* Lower Details */}
                 <mesh position={[0.5, -0.5, 0.5]}>
                     <dodecahedronGeometry args={[0.6, 0]} />
                     <meshStandardMaterial color={leafColors[2]} roughness={0.8} />
                 </mesh>
                 <mesh position={[-0.5, -0.4, -0.4]}>
                     <dodecahedronGeometry args={[0.7, 0]} />
                     <meshStandardMaterial color={leafColors[0]} roughness={0.8} />
                 </mesh>
            </group>
        </group>
    )
}

const DeliveryDrone = ({ position, range = 10, speed = 1 }) => {
    const group = useRef();
    const rotors = useRef([]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Figure 8 flight path
        if (group.current) {
            group.current.position.x = position[0] + Math.sin(t * speed) * range;
            group.current.position.z = position[2] + Math.sin(t * speed * 2) * (range / 2);
            group.current.position.y = position[1] + Math.cos(t * speed) * 1;
            
            // Bank into turns
            group.current.rotation.z = -Math.sin(t * speed) * 0.2;
            group.current.rotation.x = Math.cos(t * speed * 2) * 0.1;
        }
        // Spin rotors
        rotors.current.forEach(rotor => {
            if (rotor) rotor.rotation.y += 0.5;
        });
    });

    return (
        <group ref={group} position={position}>
            {/* Body */}
            <Box args={[0.4, 0.1, 0.4]}><meshStandardMaterial color="#fff" /></Box>
            <Box args={[0.2, 0.1, 0.2]} position={[0, -0.1, 0]}><meshStandardMaterial color="#22c55e" /></Box> {/* Package */}
            
            {/* Arms */}
            <Box args={[0.8, 0.05, 0.05]} rotation={[0, Math.PI/4, 0]}><meshStandardMaterial color="#333" /></Box>
            <Box args={[0.8, 0.05, 0.05]} rotation={[0, -Math.PI/4, 0]}><meshStandardMaterial color="#333" /></Box>

            {/* Rotors */}
            {[
                [0.28, 0, 0.28], [-0.28, 0, 0.28],
                [0.28, 0, -0.28], [-0.28, 0, -0.28]
            ].map((pos, i) => (
                <group key={i} position={pos} ref={el => rotors.current[i] = el}>
                    <Cylinder args={[0.15, 0.15, 0.01, 4]}><meshStandardMaterial color="#333" opacity={0.5} transparent /></Cylinder>
                </group>
            ))}
        </group>
    )
}

const StreetLamp = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
            {/* Pole - Tapered */}
            <Cylinder args={[0.08, 0.15, 6]} position={[0, 3, 0]}>
                <meshStandardMaterial color="#334155" roughness={0.5} />
            </Cylinder>
            {/* Base - Decorative */}
            <Cylinder args={[0.25, 0.35, 0.6]} position={[0, 0.3, 0]}>
                 <meshStandardMaterial color="#1e293b" />
            </Cylinder>

            {/* Arm - Curved */}
            <group position={[0, 5.8, 0]}>
                 <Box args={[0.1, 0.1, 1.2]} position={[0, 0, 0.6]}>
                    <meshStandardMaterial color="#334155" />
                </Box>
                {/* Support Strut */}
                <Box args={[0.05, 0.05, 0.8]} position={[0, -0.4, 0.4]} rotation={[0.5, 0, 0]}>
                     <meshStandardMaterial color="#334155" />
                </Box>
                
                {/* Small Solar Panel on Top of Arm */}
                <Box args={[0.4, 0.05, 0.6]} position={[0, 0.1, 0.6]} rotation={[0.1, 0, 0]}>
                    <meshStandardMaterial color="#1e3a8a" roughness={0.2} />
                </Box>
                
                {/* Green Energy Banner Hanging */}
                <group position={[0, -1.5, 0.3]} rotation={[0, Math.PI/2, 0]}>
                    <Box args={[0.6, 1.2, 0.05]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#22c55e" />
                    </Box>
                    <Text position={[0, 0.3, 0.06]} fontSize={0.15} color="white">CLEAN</Text>
                    <Text position={[0, 0, 0.06]} fontSize={0.15} color="white">ENERGY</Text>
                    <Text position={[0, -0.3, 0.06]} fontSize={0.15} color="white">ZONE</Text>
                </group>
            </group>

            {/* Head - Modern LED */}
            <group position={[0, 5.8, 1.3]}>
                <Box args={[0.4, 0.15, 0.7]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#1e293b" />
                </Box>
                 {/* Light Source (Emissive Mesh + Actual Light) */}
                <Box args={[0.3, 0.05, 0.5]} position={[0, -0.05, 0]}>
                     <meshBasicMaterial color="#fef08a" toneMapped={false} />
                </Box>
                {/* Glass Cover */}
                <Box args={[0.32, 0.02, 0.52]} position={[0, -0.08, 0]}>
                    <meshPhysicalMaterial transmission={1} opacity={0.6} transparent roughness={0} />
                </Box>
                <pointLight position={[0, -0.5, 0]} intensity={2} distance={15} decay={2} color="#fef08a" />
            </group>
        </group>
    )
}


const SmallHouse = ({ position, rotation }) => {
    // Smaller, cozy dimensions - Reduced width for separation
    const width = 4.5 + Math.random() * 1.5; // Max width 6
    const depth = 4 + Math.random() * 2;
    const height = 3.5; // Single story
    const wallColor = Math.random() > 0.5 ? "#fef3c7" : "#ffedd5"; // Warm colors
    const roofColor = "#7c2d12";

    return (
        <group position={position} rotation={rotation}>
             {/* Base Foundation */}
            <Box args={[width + 1, 0.4, depth + 1]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#94a3b8" roughness={0.9} />
            </Box>
            
            {/* Picket Fence Front */}
            <group position={[0, 0.4, depth/2 + 2]}>
                 {/* Rails */}
                 <Box args={[width + 2, 0.1, 0.05]} position={[0, 0.2, 0]}><meshStandardMaterial color="#fff" /></Box>
                 <Box args={[width + 2, 0.1, 0.05]} position={[0, 0.6, 0]}><meshStandardMaterial color="#fff" /></Box>
                 {/* Posts */}
                 {Array.from({ length: Math.floor(width + 2) * 2 }).map((_, i) => (
                      <Box key={i} args={[0.1, 0.8, 0.05]} position={[-width/2 - 1 + i*0.5, 0.4, 0]}><meshStandardMaterial color="#fff" /></Box>
                 ))}
                 {/* Gate Gap */}
                 {/* (Simplified: Fence goes across) */}
            </group>

            {/* Pathway */}
            <Box args={[1.5, 0.05, 2]} position={[0, 0.05, depth/2 + 1]}>
                <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
            </Box>

            {/* Main Body */}
            <Box args={[width, height, depth]} position={[0, height/2 + 0.4, 0]}>
                <meshStandardMaterial color={wallColor} />
            </Box>
            
            {/* Detailed Entrance Steps */}
            <group position={[0, 0.4, depth/2 + 0.4]}>
                <Box args={[1.6, 0.2, 0.4]} position={[0, 0, 0]}><meshStandardMaterial color="#94a3b8" /></Box>
                <Box args={[1.6, 0.2, 0.4]} position={[0, -0.2, 0.4]}><meshStandardMaterial color="#94a3b8" /></Box>
            </group>

            {/* Pitched Roof (Triangular Prism) */}
            <group position={[0, height + height/3 + 0.2, 0]} rotation={[0, Math.PI/4, 0]}>
                <Cylinder args={[0, width/1.3, height/1.5, 4]} rotation={[0, 0, 0]}>
                    <meshStandardMaterial color={roofColor} />
                </Cylinder>
                
                {/* Solar Panels on Roof - DOUBLE SIDED & VISIBLE */}
                {/* Side 1 */}
                <group position={[0, 0, width/2.8]} rotation={[Math.PI/4, 0, 0]}>
                     <Box args={[width - 1.5, 0.15, width/2.2]} position={[0, 0, 0]}>
                         <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} emissive="#1e40af" emissiveIntensity={0.2} />
                     </Box>
                     {/* Detailed Grid Lines */}
                     <Box args={[width - 1.5, 0.16, 0.05]} position={[0, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[0, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[0.5, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[-0.5, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                </group>

                {/* Side 2 (Opposite) */}
                <group position={[0, 0, -width/2.8]} rotation={[-Math.PI/4, 0, 0]}>
                     <Box args={[width - 1.5, 0.15, width/2.2]} position={[0, 0, 0]}>
                         <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} emissive="#1e40af" emissiveIntensity={0.2} />
                     </Box>
                     <Box args={[width - 1.5, 0.16, 0.05]} position={[0, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[0, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[0.5, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                     <Box args={[0.05, 0.16, width/2.2]} position={[-0.5, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                </group>
                
                {/* Chimney - with Smoke Particle suggestion */}
                <group position={[width/3, 0.5, 0]}>
                    <Box args={[0.6, 1.2, 0.6]}>
                        <meshStandardMaterial color="#78350f" />
                    </Box>
                    <Sphere args={[0.3]} position={[0, 0.8, 0]} scale={[1, 0.5, 1]}><meshBasicMaterial color="#333" /></Sphere>
                </group>
            </group>

            {/* Door with Frame and Knob */}
            <group position={[0, 1.3 + 0.2, depth/2 + 0.05]}>
                 <Box args={[1.2, 2.2, 0.1]}>
                    <meshStandardMaterial color="#573623" />
                </Box>
                {/* Frame */}
                <Box args={[1.4, 2.3, 0.08]} position={[0, 0.05, -0.01]}><meshStandardMaterial color="#fff" /></Box>
                {/* Knob */}
                <Sphere args={[0.08]} position={[0.4, 0, 0.06]}><meshStandardMaterial color="#fbbf24" metalness={0.8} /></Sphere>
            </group>

            {/* Windows with Shutters and Flower Boxes */}
            <group position={[width/3, 2, depth/2 + 0.05]}>
                <Box args={[1, 1, 0.1]}><meshStandardMaterial color="#93c5fd" /></Box>
                <Box args={[0.4, 1, 0.1]} position={[-0.7, 0, 0]}><meshStandardMaterial color="#573623" /></Box>
                <Box args={[0.4, 1, 0.1]} position={[0.7, 0, 0]}><meshStandardMaterial color="#573623" /></Box>
                {/* Flower Box */}
                <Box args={[1.2, 0.3, 0.3]} position={[0, -0.65, 0.1]}>
                    <meshStandardMaterial color="#8b4513" />
                </Box>
                {/* Flowers */}
                <Sphere args={[0.15]} position={[-0.4, -0.5, 0.1]}><meshStandardMaterial color="#f472b6" /></Sphere>
                <Sphere args={[0.15]} position={[0, -0.5, 0.1]}><meshStandardMaterial color="#fbbf24" /></Sphere>
                <Sphere args={[0.15]} position={[0.4, -0.5, 0.1]}><meshStandardMaterial color="#f472b6" /></Sphere>
            </group>
            <group position={[-width/3, 2, depth/2 + 0.05]}>
                <Box args={[1, 1, 0.1]}><meshStandardMaterial color="#93c5fd" /></Box>
                <Box args={[0.4, 1, 0.1]} position={[-0.7, 0, 0]}><meshStandardMaterial color="#573623" /></Box>
                <Box args={[0.4, 1, 0.1]} position={[0.7, 0, 0]}><meshStandardMaterial color="#573623" /></Box>
                 {/* Flower Box */}
                <Box args={[1.2, 0.3, 0.3]} position={[0, -0.65, 0.1]}>
                    <meshStandardMaterial color="#8b4513" />
                </Box>
                {/* Flowers */}
                <Sphere args={[0.15]} position={[-0.4, -0.5, 0.1]}><meshStandardMaterial color="#f472b6" /></Sphere>
                <Sphere args={[0.15]} position={[0, -0.5, 0.1]}><meshStandardMaterial color="#fbbf24" /></Sphere>
                <Sphere args={[0.15]} position={[0.4, -0.5, 0.1]}><meshStandardMaterial color="#f472b6" /></Sphere>
            </group>

            {/* Prominent External Energy System */}
            <group position={[width/2 + 0.1, 1.5, 0]} rotation={[0, Math.PI/2, 0]}>
                 {/* Mounting Board */}
                 <Box args={[2, 2.5, 0.1]} position={[0, 0, 0]}>
                     <meshStandardMaterial color="#cbd5e1" />
                 </Box>
                 {/* Inverter Unit - Detailed */}
                 <Box args={[0.8, 1, 0.3]} position={[-0.4, 0.4, 0.2]}>
                     <meshStandardMaterial color="#fff" />
                 </Box>
                 <Box args={[0.6, 0.3, 0.31]} position={[-0.4, 0.6, 0.2]}>
                     <meshStandardMaterial color="#ef4444" />
                 </Box>
                 {/* Digital Display */}
                 <Box args={[0.4, 0.2, 0.31]} position={[-0.4, 0.4, 0.2]}>
                     <meshBasicMaterial color="#000" />
                 </Box>
                 
                 {/* Battery Unit (Large) - Detailed */}
                 <Box args={[1, 1.2, 0.4]} position={[0.4, -0.4, 0.25]}>
                     <meshStandardMaterial color="#22c55e" />
                 </Box>
                 <Box args={[0.8, 0.1, 0.41]} position={[0.4, -0.2, 0.25]}><meshStandardMaterial color="#16a34a" /></Box>
                 <Box args={[0.8, 0.1, 0.41]} position={[0.4, -0.6, 0.25]}><meshStandardMaterial color="#16a34a" /></Box>
                 
                 {/* Status Light (Blinking) */}
                 <StatusLight position={[0.4, 0, 0.45]} />
                 
                 {/* Cable connection */}
                 <Cylinder args={[0.02, 0.02, 1]} position={[0, 0, 0.2]} rotation={[0, 0, -0.5]}>
                    <meshStandardMaterial color="#1e293b" />
                 </Cylinder>
            </group>
        </group>
    )
}

const StatusLight = ({ position }) => {
    const mesh = useRef();
    useFrame(({ clock }) => {
        if(mesh.current) {
            mesh.current.material.opacity = (Math.sin(clock.elapsedTime * 5) + 1) / 2;
        }
    });
    return (
        <Sphere args={[0.08]} position={position} ref={mesh}>
            <meshBasicMaterial color="#4ade80" transparent />
        </Sphere>
    )
}

const ZuiceBuilding = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
             {/* Base */}
            <Box args={[7, 0.5, 7]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#334155" />
            </Box>

            {/* Main Tower - Modern Glass */}
            <Box args={[6, 12, 6]} position={[0, 6.25, 0]}>
                <meshPhysicalMaterial color="#16a34a" metalness={0.9} roughness={0.1} transmission={0.2} transparent opacity={0.8} />
            </Box>
            
            {/* Core Structure (Visible through glass) */}
            <Cylinder args={[2, 2, 11.5]} position={[0, 6, 0]}>
                 <meshStandardMaterial color="#1e293b" />
            </Cylinder>

            {/* Neon Strips */}
            <Box args={[6.1, 0.2, 6.1]} position={[0, 3, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>
            <Box args={[6.1, 0.2, 6.1]} position={[0, 6, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>
            <Box args={[6.1, 0.2, 6.1]} position={[0, 9, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>

            {/* ZUICE Logo Signage */}
            <group position={[0, 10, 3.1]}>
                <Text 
                    fontSize={1.5} 
                    color="#ffffff" 
                    anchorX="center" 
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#4ade80"
                >
                    ZUICE
                </Text>
            </group>
            <group position={[3.1, 10, 0]} rotation={[0, Math.PI/2, 0]}>
                <Text 
                    fontSize={1.5} 
                    color="#ffffff" 
                    anchorX="center" 
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#4ade80"
                >
                    ZUICE
                </Text>
            </group>
             <group position={[-3.1, 10, 0]} rotation={[0, -Math.PI/2, 0]}>
                <Text 
                    fontSize={1.5} 
                    color="#ffffff" 
                    anchorX="center" 
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#4ade80"
                >
                    ZUICE
                </Text>
            </group>
            
             {/* Roof */}
            <Box args={[6.2, 0.5, 6.2]} position={[0, 12.5, 0]}>
                <meshStandardMaterial color="#1e293b" />
            </Box>
             {/* Antenna */}
            <Cylinder args={[0.1, 0.05, 4]} position={[0, 14.5, 0]}>
                 <meshStandardMaterial color="#94a3b8" />
            </Cylinder>
            <Sphere args={[0.3]} position={[0, 16.5, 0]}>
                 <meshBasicMaterial color="#ef4444" />
            </Sphere>
        </group>
    )
}

const VerticalGardenBuilding = ({ position, rotation }) => {
    const width = 6;
    const height = 12;
    const depth = 6;

    return (
        <group position={position} rotation={rotation}>
             {/* Base Structure */}
             <Box args={[width, height, depth]} position={[0, height/2, 0]}>
                 <meshStandardMaterial color="#f1f5f9" />
             </Box>
             
             {/* Glass Facade Strips */}
             <Box args={[width + 0.1, height, 2]} position={[0, height/2, 0]}>
                 <meshPhysicalMaterial color="#bfdbfe" transmission={0.4} roughness={0} />
             </Box>

             {/* Green Wall Blocks */}
             {Array.from({ length: 5 }).map((_, i) => {
                 const side = i % 4; // 0: front, 1: right, 2: back, 3: left
                 let pos = [0, 0, 0];
                 let rot = [0, 0, 0];
                 const y = 2 + Math.random() * (height - 3);
                 
                 if (side === 0) { pos = [0, y, depth/2 + 0.2]; }
                 else if (side === 1) { pos = [width/2 + 0.2, y, 0]; rot = [0, Math.PI/2, 0]; }
                 else if (side === 2) { pos = [0, y, -depth/2 - 0.2]; }
                 else { pos = [-width/2 - 0.2, y, 0]; rot = [0, Math.PI/2, 0]; }

                 // Randomize position slightly
                 if (side % 2 === 0) pos[0] += (Math.random() - 0.5) * width * 0.8;
                 else pos[2] += (Math.random() - 0.5) * depth * 0.8;

                 return (
                     <group key={i} position={pos} rotation={rot}>
                         <Box args={[1.5, 1, 0.4]}>
                             <meshStandardMaterial color="#16a34a" roughness={1} />
                         </Box>
                         {/* Plants */}
                         {Array.from({ length: 5 }).map((_, j) => (
                             <mesh key={j} position={[(Math.random()-0.5)*1.2, 0.5, 0.2]}>
                                 <dodecahedronGeometry args={[0.3, 0]} />
                                 <meshStandardMaterial color={["#15803d", "#166534", "#4d7c0f"][Math.floor(Math.random()*3)]} />
                             </mesh>
                         ))}
                     </group>
                 )
             })}
             
             {/* Roof Garden */}
             <group position={[0, height, 0]}>
                 <Box args={[width, 0.5, depth]} position={[0, 0.25, 0]}><meshStandardMaterial color="#334155" /></Box>
                 {/* Trees on roof */}
                 <RoadsideTree position={[width/3, 0.25, depth/3]} />
                 <RoadsideTree position={[-width/3, 0.25, -depth/3]} />
                 <Bush position={[width/3, 0.25, -depth/3]} />
                 <Bush position={[-width/3, 0.25, depth/3]} />
             </group>
        </group>
    )
}

const TownBuilding = ({ position, rotation }) => {
    // Randomized building dimensions - Reduced width for separation
    const numFloors = Math.floor(2 + Math.random() * 3); // 2 to 4 floors
    const floorHeight = 3;
    const width = 5 + Math.random() * 3; // Max width 8
    const depth = 6 + Math.random() * 4;
    const height = numFloors * floorHeight;

    // Generate colors for variety
    const buildingColor = Math.random() > 0.5 ? "#f1f5f9" : "#e2e8f0";
    const hasAwning = Math.random() > 0.3;
    const roofType = Math.random() > 0.5 ? 'utility' : 'solar';

    return (
        <group position={position} rotation={rotation}>
            {/* Base */}
            <Box args={[width + 0.5, 0.5, depth + 0.5]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#334155" />
            </Box>

            {/* Main Structure */}
            <Box args={[width, height, depth]} position={[0, height/2 + 0.5, 0]}>
                <meshStandardMaterial color={buildingColor} />
            </Box>

            {/* Floors Separation Lines (Architectural Detail) */}
            {Array.from({ length: numFloors }).map((_, i) => (
                <Box key={i} args={[width + 0.2, 0.2, depth + 0.2]} position={[0, (i + 1) * floorHeight + 0.5, 0]}>
                    <meshStandardMaterial color="#94a3b8" />
                </Box>
            ))}
            
            {/* Ground Floor Shop Front - Enhanced */}
            <group position={[0, 1.5, depth/2 + 0.1]}>
                 {/* Shop Frame */}
                <Box args={[width - 1, 2.8, 0.2]} position={[0, 0, 0]}><meshStandardMaterial color="#1e293b" /></Box>
                
                {/* Glass Window (Left) */}
                <Box args={[(width - 1)/2 - 0.8, 2.4, 0.1]} position={[-(width-1)/4, 0, 0.1]}>
                    <meshPhysicalMaterial color="#93c5fd" transmission={0.5} roughness={0} />
                </Box>
                
                {/* Glass Door (Right) */}
                <group position={[(width-1)/4, -0.2, 0.1]}>
                    <Box args={[1.2, 2.2, 0.1]}><meshPhysicalMaterial color="#bfdbfe" transmission={0.5} roughness={0} /></Box>
                    <Box args={[1.3, 2.3, 0.05]}><meshStandardMaterial color="#333" /></Box> {/* Frame */}
                    <Box args={[0.1, 0.4, 0.15]} position={[-0.5, 0, 0.05]}><meshStandardMaterial color="#cbd5e1" /></Box> {/* Handle */}
                </group>

                {/* Shop Sign */}
                <Box args={[width - 1, 0.6, 0.3]} position={[0, 1.8, 0.1]}>
                    <meshStandardMaterial color={["#2563eb", "#dc2626", "#16a34a", "#d97706"][Math.floor(Math.random()*4)]} />
                </Box>
            </group>
            
            {/* Planters at entrance */}
            <group position={[(width-1)/4 + 1, 0.5, depth/2 + 0.5]}>
                 <Cylinder args={[0.3, 0.2, 0.4]}><meshStandardMaterial color="#8b4513" /></Cylinder>
                 <Sphere args={[0.3]} position={[0, 0.3, 0]}><meshStandardMaterial color="#22c55e" /></Sphere>
            </group>
            <group position={[-(width-1)/4 - 1, 0.5, depth/2 + 0.5]}>
                 <Cylinder args={[0.3, 0.2, 0.4]}><meshStandardMaterial color="#8b4513" /></Cylinder>
                 <Sphere args={[0.3]} position={[0, 0.3, 0]}><meshStandardMaterial color="#22c55e" /></Sphere>
            </group>
            
            {/* Awning */}
            {hasAwning && (
                <group position={[0, 3.2, depth/2 + 0.8]} rotation={[0.4, 0, 0]}>
                     <Box args={[width - 0.8, 0.1, 1.5]}>
                         <meshStandardMaterial color={["#dc2626", "#2563eb", "#16a34a"][Math.floor(Math.random()*3)]} />
                     </Box>
                </group>
            )}

            {/* Windows - Grid Pattern */}
            {Array.from({ length: numFloors - 1 }).map((_, floorIndex) => {
                // Start from 2nd floor (index 0 maps to floor 2)
                const actualFloor = floorIndex + 1;
                const windowsPerFloor = Math.floor(width / 2);
                return Array.from({ length: windowsPerFloor }).map((__, winIndex) => {
                    // Spread windows across the width
                    const xPos = -width/2 + (width / (windowsPerFloor + 1)) * (winIndex + 1);
                    const hasBalcony = Math.random() > 0.8;
                    const isLit = Math.random() > 0.7; // 30% windows lit
                    const hasAC = !hasBalcony && Math.random() > 0.7;

                    return (
                        <group key={`${floorIndex}-${winIndex}`} position={[xPos, (actualFloor * floorHeight) + 1.5 + 0.5, depth/2 + 0.05]}>
                            {/* Window Frame */}
                            <Box args={[1.2, 1.8, 0.1]}><meshStandardMaterial color="#475569" /></Box>
                            {/* Glass */}
                            <Box args={[1, 1.6, 0.1]} position={[0, 0, 0.02]}>
                                {isLit ? (
                                     <meshBasicMaterial color="#fef3c7" toneMapped={false} />
                                ) : (
                                     <meshPhysicalMaterial color="#bfdbfe" metalness={0.8} roughness={0.1} />
                                )}
                            </Box>
                            
                            {/* Balcony */}
                            {hasBalcony && (
                                <group position={[0, -0.9, 0.5]}>
                                    <Box args={[1.6, 0.1, 1]} position={[0, 0, 0]}><meshStandardMaterial color="#334155" /></Box>
                                    {/* Railings */}
                                    <Box args={[1.6, 0.6, 0.05]} position={[0, 0.35, 0.45]}><meshStandardMaterial color="#334155" /></Box>
                                    <Box args={[0.05, 0.6, 1]} position={[0.75, 0.35, 0]}><meshStandardMaterial color="#334155" /></Box>
                                    <Box args={[0.05, 0.6, 1]} position={[-0.75, 0.35, 0]}><meshStandardMaterial color="#334155" /></Box>
                                </group>
                            )}
                            
                            {/* AC Unit */}
                            {hasAC && (
                                <Box args={[0.6, 0.5, 0.4]} position={[0.6, -0.6, 0.2]}>
                                    <meshStandardMaterial color="#cbd5e1" />
                                    {/* Fan Grille */}
                                    <Cylinder args={[0.2, 0.2, 0.05]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.21]}>
                                        <meshStandardMaterial color="#333" />
                                    </Cylinder>
                                </Box>
                            )}
                        </group>
                    )
                })
            })}

            {/* Roof Details */}
            <group position={[0, height + 0.5, 0]}>
                {/* Parapet */}
                <Box args={[width, 0.5, depth]} position={[0, 0.25, 0]}><meshStandardMaterial color="#cbd5e1" /></Box>
                <Box args={[width-0.4, 0.6, depth-0.4]} position={[0, 0.3, 0]}><meshStandardMaterial color="#333" /></Box> {/* Inner roof dark */}
                
                {roofType === 'utility' ? (
                    <>
                        {/* HVAC Unit */}
                        <group position={[width/4, 0.8, -depth/4]}>
                            <Box args={[1.5, 1, 1.5]}><meshStandardMaterial color="#94a3b8" /></Box>
                            <Cylinder args={[0.3, 0.3, 0.2]} position={[0, 0.5, 0]}><meshStandardMaterial color="#475569" /></Cylinder> {/* Fan */}
                        </group>

                        {/* Water Tank */}
                        <group position={[-width/4, 1.5, depth/4]}>
                             <Cylinder args={[0.8, 0.8, 1.5]}><meshStandardMaterial color="#000" /></Cylinder> {/* Black plastic tank */}
                             <Cylinder args={[0.9, 0.9, 0.1]} position={[0, 0.8, 0]}><meshStandardMaterial color="#000" /></Cylinder> {/* Lid */}
                             <Cylinder args={[0.1, 0.1, 2]} position={[0, -1, 0]} rotation={[0, 0, 0.5]}><meshStandardMaterial color="#64748b" /></Cylinder> {/* Pipe */}
                        </group>
                        
                        {/* Antenna */}
                        <group position={[0, 1, 0]}>
                            <Cylinder args={[0.05, 0.05, 3]}><meshStandardMaterial color="#94a3b8" /></Cylinder>
                            <Box args={[1, 0.05, 0.05]} position={[0, 1.2, 0]}><meshStandardMaterial color="#94a3b8" /></Box>
                            <Box args={[0.8, 0.05, 0.05]} position={[0, 0.8, 0]}><meshStandardMaterial color="#94a3b8" /></Box>
                        </group>
                    </>
                ) : (
                    /* Rooftop Solar Farm */
                    <group position={[0, 0.1, 0]}>
                         {/* Solar Frames - Tilted */}
                         <group rotation={[0.3, 0, 0]}>
                             <Box args={[width - 1, 0.1, depth - 2]}>
                                 <meshStandardMaterial color="#1e3a8a" />
                             </Box>
                             {/* Solar Cells Pattern */}
                             {Array.from({ length: 4 }).map((_, i) => (
                                <Box key={i} args={[width - 1.2, 0.05, (depth - 2)/4 - 0.1]} position={[0, 0.05, -depth/2 + 1.5 + i * ((depth-2)/4)]}>
                                     <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={0.2} roughness={0.2} metalness={0.8} />
                                </Box>
                             ))}
                         </group>
                         {/* Support Legs */}
                         <Cylinder args={[0.05, 0.05, 1]} position={[width/2 - 0.5, -0.5, -depth/2 + 1]}><meshStandardMaterial color="#64748b" /></Cylinder>
                         <Cylinder args={[0.05, 0.05, 1]} position={[-width/2 + 0.5, -0.5, -depth/2 + 1]}><meshStandardMaterial color="#64748b" /></Cylinder>
                         
                         {/* Roof Vents */}
                         <Box args={[1, 0.8, 1]} position={[width/3, 0.4, depth/3]}>
                             <meshStandardMaterial color="#64748b" />
                         </Box>
                         <Cylinder args={[0.3, 0.3, 0.6]} position={[width/3, 0.8, depth/3]}>
                             <meshStandardMaterial color="#475569" />
                         </Cylinder>
                    </group>
                )}
            </group>
        </group>
    )
}

const Bird = ({ position, speed, range }) => {
    const group = useRef();
    const wingLeft = useRef();
    const wingRight = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Circular flight path
        if(group.current) {
            group.current.position.x = position[0] + Math.sin(t * speed) * range;
            group.current.position.z = position[2] + Math.cos(t * speed) * range;
            group.current.rotation.y = -t * speed; // Face forward
        }
        // Flapping
        if(wingLeft.current && wingRight.current) {
            wingLeft.current.rotation.z = Math.sin(t * 15) * 0.5;
            wingRight.current.rotation.z = -Math.sin(t * 15) * 0.5;
        }
    });

    return (
        <group ref={group} position={position}>
            {/* Body */}
            <Cone args={[0.1, 0.3, 4]} rotation={[Math.PI/2, 0, 0]}><meshStandardMaterial color="#333" /></Cone>
            {/* Wings */}
            <group ref={wingLeft} position={[0.1, 0, 0]}>
                 <Box args={[0.4, 0.05, 0.15]} position={[0.2, 0, 0]}><meshStandardMaterial color="#333" /></Box>
            </group>
            <group ref={wingRight} position={[-0.1, 0, 0]}>
                 <Box args={[0.4, 0.05, 0.15]} position={[-0.2, 0, 0]}><meshStandardMaterial color="#333" /></Box>
            </group>
        </group>
    )
}

const Manhole = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.05, 16]} />
            <meshStandardMaterial color="#334155" roughness={0.9} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
             <cylinderGeometry args={[0.5, 0.5, 0.02, 16]} />
             <meshStandardMaterial color="#475569" roughness={0.8} metalness={0.6} />
        </mesh>
    </group>
)

const Bench = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        {/* Legs */}
        <Box args={[0.1, 0.4, 0.5]} position={[0.6, 0.2, 0]}><meshStandardMaterial color="#1e293b" /></Box>
        <Box args={[0.1, 0.4, 0.5]} position={[-0.6, 0.2, 0]}><meshStandardMaterial color="#1e293b" /></Box>
        {/* Seat */}
        <Box args={[1.4, 0.1, 0.6]} position={[0, 0.42, 0]}><meshStandardMaterial color="#78350f" /></Box>
        {/* Backrest */}
        <Box args={[1.4, 0.6, 0.1]} position={[0, 0.7, -0.25]} rotation={[0.2, 0, 0]}><meshStandardMaterial color="#78350f" /></Box>
    </group>
)

const WindTurbine = ({ position, rotation }) => {
    const blades = useRef();
    useFrame((state) => {
        if(blades.current) {
            blades.current.rotation.z -= 0.05; // Faster spin for realism
        }
    });

    return (
        <group position={position} rotation={rotation} scale={3}>
            {/* Tower - Tapered */}
            <Cylinder args={[0.15, 0.6, 12, 16]} position={[0, 6, 0]}>
                <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </Cylinder>
            
            {/* Base Door */}
            <Box args={[0.3, 0.6, 0.1]} position={[0, 0.3, 0.5]}>
                <meshStandardMaterial color="#cbd5e1" />
            </Box>

            {/* Nacelle - Aerodynamic shape */}
            <group position={[0, 12, 0]}>
                 <Box args={[0.7, 0.8, 1.8]} position={[0, 0, 0.2]}>
                    <meshStandardMaterial color="#f8fafc" />
                 </Box>
                 {/* Rounded back */}
                 <Sphere args={[0.5]} position={[0, 0, -0.6]}>
                    <meshStandardMaterial color="#f8fafc" />
                 </Sphere>
                 {/* Aviation Light */}
                 <Sphere args={[0.1]} position={[0, 0.45, -0.6]}>
                     <meshBasicMaterial color="#ef4444" toneMapped={false} />
                 </Sphere>
                 <pointLight position={[0, 0.5, -0.6]} color="#ef4444" distance={5} intensity={2} />
            </group>

            {/* Blades Hub */}
            <group position={[0, 12, 1.15]} ref={blades}>
                <Sphere args={[0.4]} scale={[1, 1, 1.5]}>
                    <meshStandardMaterial color="#e2e8f0" />
                </Sphere>
                {/* 3 Blades - Tapered and twisted */}
                {[0, 2.09, 4.18].map((rot, i) => (
                    <group key={i} rotation={[0, 0, rot]}>
                        <group position={[0, 3.2, 0]} rotation={[0, 0.2, 0]}>
                             {/* Blade using scaled cylinder for airfoil shape approximation */}
                            <Cylinder args={[0.05, 0.25, 6.5, 8]} scale={[1, 1, 0.2]}>
                                <meshStandardMaterial color="#f8fafc" roughness={0.2} />
                            </Cylinder>
                        </group>
                    </group>
                ))}
            </group>
        </group>
    )
}

const Rock = ({ position, scale = 1 }) => (
    <group position={position} scale={scale} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}>
        <mesh>
            <dodecahedronGeometry args={[0.8, 0]} />
            <meshStandardMaterial color="#64748b" roughness={0.9} flatShading />
        </mesh>
    </group>
)

const Bush = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        <mesh position={[0, 0.4, 0]}>
            <dodecahedronGeometry args={[0.6, 0]} />
            <meshStandardMaterial color="#166534" roughness={1} flatShading />
        </mesh>
        <mesh position={[0.4, 0.3, 0.3]}>
            <dodecahedronGeometry args={[0.4, 0]} />
            <meshStandardMaterial color="#15803d" roughness={1} flatShading />
        </mesh>
        <mesh position={[-0.4, 0.3, -0.3]}>
            <dodecahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#14532d" roughness={1} flatShading />
        </mesh>
    </group>
)

const Forest = ({ count = 40 }) => {
  const trunkRef = useRef();
  const foliage1Ref = useRef();
  const foliage2Ref = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const treeData = useMemo(() => {
    return Array.from({ length: count }).map(() => {
        const x = (Math.random() - 0.5) * 350;
        const z = -Math.random() * 250;
        const scale = 1 + Math.random() * 1.5;
        if (Math.abs(x) < 50) return null;
        return { position: [x, 0, z], scale };
    }).filter(Boolean);
  }, [count]);

  useLayoutEffect(() => {
    if (!trunkRef.current || !foliage1Ref.current || !foliage2Ref.current) return;

    treeData.forEach((data, i) => {
        const { position, scale } = data;
        
        // Trunk
        dummy.position.set(position[0], 1 * scale, position[2]);
        dummy.scale.set(scale, scale, scale);
        dummy.rotation.set(0, 0, 0);
        dummy.updateMatrix();
        trunkRef.current.setMatrixAt(i, dummy.matrix);
        
        // Foliage 1 (Main)
        dummy.position.set(position[0], 2.2 * scale, position[2]);
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        foliage1Ref.current.setMatrixAt(i, dummy.matrix);

        // Foliage 2 (Top)
        dummy.position.set(position[0], 3.0 * scale, position[2]);
        dummy.scale.set(scale * 0.8, scale * 0.8, scale * 0.8);
        dummy.updateMatrix();
        foliage2Ref.current.setMatrixAt(i, dummy.matrix);
    });
    
    trunkRef.current.instanceMatrix.needsUpdate = true;
    foliage1Ref.current.instanceMatrix.needsUpdate = true;
    foliage2Ref.current.instanceMatrix.needsUpdate = true;
  }, [treeData]);

  return (
    <group>
        <instancedMesh ref={trunkRef} args={[null, null, treeData.length]}>
            <cylinderGeometry args={[0.2, 0.25, 2, 6]} />
            <meshStandardMaterial color="#5d4037" roughness={1} />
        </instancedMesh>
        <instancedMesh ref={foliage1Ref} args={[null, null, treeData.length]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#16a34a" roughness={0.8} />
        </instancedMesh>
        <instancedMesh ref={foliage2Ref} args={[null, null, treeData.length]}>
            <dodecahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#15803d" roughness={0.8} />
        </instancedMesh>
    </group>
  )
}

const RockField = ({ count = 30 }) => {
    const ref = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const rockData = useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const x = (Math.random() - 0.5) * 200;
            const z = -Math.random() * 100;
             if (Math.abs(x) < 30) return null;
             return { position: [x, 0.3, z], scale: 0.3 + Math.random()*0.5 };
        }).filter(Boolean);
    }, [count]);

    useLayoutEffect(() => {
        if (!ref.current) return;
        rockData.forEach((data, i) => {
            dummy.position.set(data.position[0], data.position[1], data.position[2]);
            dummy.scale.set(data.scale, data.scale, data.scale);
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            dummy.updateMatrix();
            ref.current.setMatrixAt(i, dummy.matrix);
        });
        ref.current.instanceMatrix.needsUpdate = true;
    }, [rockData]);
    
    return (
        <instancedMesh ref={ref} args={[null, null, rockData.length]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#57534e" roughness={0.9} />
        </instancedMesh>
    )
}

const EnvironmentProps = () => (
  <group>
    {/* Background Forests (Detailed) */}
    <Forest count={60} />
    <RockField count={40} />

    {/* Distant Wind Farm */}
    <WindTurbine position={[-80, 0, -200]} rotation={[0, 0.5, 0]} />
    <WindTurbine position={[-120, 0, -220]} rotation={[0, 0.6, 0]} />
    <WindTurbine position={[80, 0, -200]} rotation={[0, -0.5, 0]} />

    {/* Floating Volumetric Clouds */}
    <Cloud position={[-40, 35, -120]} speed={0.15} opacity={0.5} segments={10} bounds={[60, 12, 60]} volume={10} color="#ffffff" />
    <Cloud position={[10, 40, -160]} speed={0.18} opacity={0.55} segments={12} bounds={[70, 14, 70]} volume={12} color="#ffffff" />
    <Cloud position={[60, 32, -110]} speed={0.14} opacity={0.5} segments={10} bounds={[50, 10, 50]} volume={9} color="#e6f2ff" />
    <Cloud position={[-70, 38, -180]} speed={0.16} opacity={0.5} segments={12} bounds={[70, 14, 70]} volume={12} color="#e6f2ff" />
    
    {/* Birds Flock */}
    <Bird position={[0, 25, -50]} speed={0.5} range={30} />
    <Bird position={[10, 28, -60]} speed={0.6} range={35} />
    <Bird position={[-10, 22, -40]} speed={0.4} range={25} />
  </group>
);

const Scene = () => {
  const scroll = useScroll();
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[50, 80, 20]} 
        intensity={1.2} 
        castShadow={false}
      />
      
      {/* Soft Shadows for realism - Disabled for performance */}
      {/* <SoftShadows size={25} samples={10} focus={0} /> */}

      <color attach="background" args={['#0a0f1d']} />
      <fog attach="fog" args={['#0a0f1d', 20, 140]} />
      <Environment preset="night" />
      <Stars />
      
      <Road />
      <EnvironmentProps />
      <Rikshaw scroll={scroll} />
      
      {/* Contact Shadows for realism - Disabled for performance */}
      {/* <ContactShadows position={[0, -0.01, 0]} opacity={0.35} scale={12} blur={1} far={3} /> */}

      {/* Atmospheric Particles */}
      <Sparkles count={20} scale={[160, 40, 160]} size={5} speed={0.35} opacity={0.45} color="#fff" position={[0, 25, -100]} />

      {/* Post Processing disabled */}
    </>
  );
};

export default function Hero({ categories }) {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', height: '100vh', background: 'var(--bg)' }}>
      <Canvas dpr={[1, 1]} shadows={false} camera={{ position: [5, 5, 10], fov: 60 }} gl={{ antialias: false, powerPreference: 'high-performance' }}>
        <ScrollControls pages={5} damping={0.3}>
          <Scene />
          <Scroll html style={{ width: '100%', height: '100%' }}>
            <motion.div 
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: [0, -2, 0], scale: 1 }}
              transition={{ duration: 0.7, y: { repeat: Infinity, duration: 8, ease: "easeInOut" } }}
              className="hero-copy"
            >
              <motion.h1 
                className="hero-headline"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Drive the Future
              </motion.h1>
              <motion.p 
                className="hero-sub"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Explore Urja’s world of fun, clean energy.
              </motion.p>
              <motion.div 
                className="hero-chips"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <span className="hero-chip">EV</span>
                <span className="hero-chip">Home</span>
                <span className="hero-chip">Industrial</span>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="hero-about"
            >
              <div className="hero-title">About Us</div>
              <div className="hero-sub" style={{ marginLeft: 'auto' }}>
                We build safe, reliable batteries for mobility, homes, and industry.
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="hero-products"
            >
              <div className="hero-title">Products</div>
              <div className="hero-sub">
                Explore packs and systems engineered for performance and safety.
              </div>
              <motion.button 
                onClick={() => navigate('/products')}
                className="hero-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ pointerEvents: 'auto' }}
              >
                See Catalog
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="hero-contact"
            >
              <div className="hero-title center">Say Hello</div>
              <div className="hero-sub center" style={{ margin: '2rem auto', maxWidth: '600px' }}>
                Partner with us to power a cleaner future.
              </div>
              <motion.button 
                onClick={() => navigate('/contact')}
                className="hero-btn large"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                style={{ pointerEvents: 'auto' }}
              >
                Contact Us
              </motion.button>
            </motion.div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
