import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Text } from "@react-three/drei";
import * as THREE from "three";

// NOTICE THE 'export const' HERE!
export const TrafficVehicle = ({ curve, startOffset, speed, color, laneOffset, type = 'sedan' }) => {
    const group = useRef();
    const offsetRef = useRef(startOffset);

    useFrame((state, delta) => {
        offsetRef.current = (offsetRef.current + speed * delta);
        if (offsetRef.current > 1) offsetRef.current -= 1;
        if (offsetRef.current < 0) offsetRef.current += 1;

        const point = curve.getPointAt(offsetRef.current);
        const tangent = curve.getTangentAt(offsetRef.current);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

        const pos = point.clone().add(normal.multiplyScalar(laneOffset));

        if (group.current) {
            group.current.position.copy(pos);
            const lookTarget = pos.clone().add(tangent);
            group.current.lookAt(lookTarget);

            if (speed < 0) {
                group.current.rotation.y += Math.PI;
            }
        }
    });

    if (type === 'truck') {
        return (
            <group ref={group} scale={0.8}>
                {/* Neon Underglow */}
                <Box args={[1.5, 0.1, 3.5]} position={[0, 0.2, -1.0]}><meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} /></Box>
                <Box args={[1.5, 2, 1.5]} position={[0, 1.5, 1]}><meshStandardMaterial color={color} roughness={0.4} /></Box>
                <Box args={[1.4, 0.8, 0.1]} position={[0, 2, 1.76]}><meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} /></Box>
                <Box args={[1.2, 0.6, 0.1]} position={[0, 1.2, 1.76]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[0.1, 0.4, 0.2]} position={[0.8, 1.8, 1.5]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[0.1, 0.4, 0.2]} position={[-0.8, 1.8, 1.5]}><meshStandardMaterial color="#333" /></Box>
                <Box args={[1.6, 2.2, 3.5]} position={[0, 1.6, -1.5]}><meshStandardMaterial color="#e2e8f0" roughness={0.6} /></Box>
                <Box args={[0.7, 2, 0.1]} position={[0.4, 1.6, -3.26]}><meshStandardMaterial color="#cbd5e1" /></Box>
                <Box args={[0.7, 2, 0.1]} position={[-0.4, 1.6, -3.26]}><meshStandardMaterial color="#cbd5e1" /></Box>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[0.8, 0.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0.4, 1.2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[0.8, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Box args={[0.3, 0.1, 0.1]} position={[0.5, 0.8, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                <Box args={[0.3, 0.1, 0.1]} position={[-0.5, 0.8, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
            </group>
        );
    } else if (type === 'bus') {
        return (
            <group ref={group} scale={0.7}>
                {/* Neon Underglow */}
                <Box args={[1.8, 0.1, 5.8]} position={[0, 0.2, 0]}><meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} /></Box>
                <Box args={[1.8, 2, 6]} position={[0, 1.5, 0]}><meshStandardMaterial color={color} roughness={0.3} /></Box>
                <Box args={[1.7, 1.2, 0.1]} position={[0, 1.8, 3.01]}><meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} /></Box>
                <Box args={[1.4, 0.3, 0.1]} position={[0, 2.7, 3.01]}><meshBasicMaterial color="#000" /></Box>
                <Box args={[1.2, 0.1, 0.11]} position={[0, 2.7, 3.01]}><meshBasicMaterial color="#fbbf24" toneMapped={false} /></Box>
                <Text position={[0, 2.7, 3.04]} fontSize={0.28} color="#000">URJA MOBILITY</Text>
                <Box args={[1.82, 0.8, 5.8]} position={[0, 1.8, 0]}><meshStandardMaterial color="#1e293b" /></Box>
                <Box args={[0.1, 1.8, 0.8]} position={[0.91, 1.2, 2]}><meshStandardMaterial color="#475569" /></Box>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[0.9, 0.4, 2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[-0.9, 0.4, 2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[0.9, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.4, 0.4, 0.3]} rotation={[0, 0, Math.PI / 2]} position={[-0.9, 0.4, -2]}><meshStandardMaterial color="#111" /></Cylinder>
                <Box args={[0.25, 0.15, 0.1]} position={[0.6, 0.6, 3.01]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                <Box args={[0.25, 0.15, 0.1]} position={[-0.6, 0.6, 3.01]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
            </group>
        );
    } else {
        return (
            <group ref={group} scale={0.7}>
                {/* Neon Underglow */}
                <Box args={[1.8, 0.1, 3.5]} position={[0, 0.2, 0]}><meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} /></Box>
                <Box args={[1.8, 0.6, 3.5]} position={[0, 0.6, 0]}><meshStandardMaterial color={color} metalness={0.6} roughness={0.2} /></Box>
                <Box args={[1.5, 0.5, 2]} position={[0, 1.15, -0.2]}><meshStandardMaterial color={color} metalness={0.6} roughness={0.2} /></Box>
                <Box args={[1.52, 0.4, 1.8]} position={[0, 1.15, -0.2]}><meshStandardMaterial color="#1e293b" /></Box>
                <Box args={[1.4, 0.4, 1.9]} position={[0, 1.15, -0.2]}><meshPhysicalMaterial color="#bfdbfe" metalness={0.9} roughness={0} transmission={0.5} thickness={0.1} /></Box>
                <Box args={[0.2, 0.15, 0.1]} position={[0.8, 0.9, 0.5]}><meshStandardMaterial color={color} /></Box>
                <Box args={[0.2, 0.15, 0.1]} position={[-0.8, 0.9, 0.5]}><meshStandardMaterial color={color} /></Box>
                <Box args={[0.5, 0.15, 0.05]} position={[0, 0.4, 1.76]}><meshStandardMaterial color="#fff" /></Box>
                <Box args={[0.5, 0.15, 0.05]} position={[0, 0.4, -1.76]}><meshStandardMaterial color="#fff" /></Box>
                <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[0.8, 0.35, 1]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0.35, 1]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[0.8, 0.35, -1]}><meshStandardMaterial color="#111" /></Cylinder>
                <Cylinder args={[0.35, 0.35, 0.2]} rotation={[0, 0, Math.PI / 2]} position={[-0.8, 0.35, -1]}><meshStandardMaterial color="#111" /></Cylinder>
                <Box args={[0.4, 0.2, 0.1]} position={[0.5, 0.6, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                <Box args={[0.4, 0.2, 0.1]} position={[-0.5, 0.6, 1.76]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={2} /></Box>
                <Box args={[0.4, 0.2, 0.1]} position={[0.5, 0.6, -1.76]}><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} /></Box>
                <Box args={[0.4, 0.2, 0.1]} position={[-0.5, 0.6, -1.76]}><meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1} /></Box>
            </group>
        );
    }
};