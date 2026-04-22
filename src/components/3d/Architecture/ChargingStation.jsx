import React from "react";
import { Box, Cylinder } from "@react-three/drei";

// NOTICE THIS LINE: export const ChargingStation
export const ChargingStation = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
            <Box args={[5, 0.2, 4]} position={[0, 0.1, 0]}><meshStandardMaterial color="#cbd5e1" roughness={0.8} /></Box>
            <Box args={[0.2, 0.05, 3]} position={[-1.5, 0.21, 0]}><meshBasicMaterial color="#fff" /></Box>
            <Box args={[0.2, 0.05, 3]} position={[1.5, 0.21, 0]}><meshBasicMaterial color="#fff" /></Box>

            <group position={[0, 0, -1.5]}>
                <group position={[-2, 1.75, 0]} rotation={[0, 0, -0.1]}>
                    <Cylinder args={[0.1, 0.15, 3.6]}><meshStandardMaterial color="#334155" metalness={0.6} /></Cylinder>
                </group>
                <group position={[2, 1.75, 0]} rotation={[0, 0, 0.1]}>
                    <Cylinder args={[0.1, 0.15, 3.6]}><meshStandardMaterial color="#334155" metalness={0.6} /></Cylinder>
                </group>
                <group position={[0, 3.5, 0.5]} rotation={[0.1, 0, 0]}>
                    <Box args={[5.5, 0.1, 3]}><meshStandardMaterial color="#0f172a" /></Box>
                    <Box args={[5.2, 0.05, 2.8]} position={[0, -0.05, 0]}>
                        <meshPhysicalMaterial color="#4ade80" transmission={0.2} opacity={0.5} transparent />
                    </Box>
                </group>
                <Box args={[5.6, 0.1, 0.1]} position={[0, 3.5, 2]} rotation={[0.1, 0, 0]}>
                    <meshBasicMaterial color="#22c55e" toneMapped={false} />
                </Box>
                <Box args={[5, 0.05, 2.5]} position={[0, 3.65, 0.5]} rotation={[0.1, 0, 0]}>
                    <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} />
                </Box>
            </group>

            <group position={[0, 0, -1]}>
                {[-1.2, 1.2].map((x, i) => (
                    <group key={i} position={[x, 1, 0]}>
                        <Box args={[0.6, 2, 0.4]}><meshStandardMaterial color="#f1f5f9" metalness={0.3} roughness={0.2} /></Box>
                        <Box args={[0.4, 0.5, 0.05]} position={[0, 0.4, 0.21]}><meshBasicMaterial color="#000" /></Box>
                        <Box args={[0.3, 0.05, 0.06]} position={[0, 0.4, 0.21]}><meshBasicMaterial color="#22c55e" toneMapped={false} /></Box>
                        <Box args={[0.15, 0.3, 0.1]} position={[0.15, -0.3, 0.2]}><meshStandardMaterial color="#333" /></Box>
                        <Cylinder args={[0.02, 0.02, 1.2]} position={[0.2, -0.5, 0.2]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                        <Box args={[0.6, 0.3, 0.4]} position={[0, 1, 0]}><meshStandardMaterial color="#16a34a" /></Box>
                    </group>
                ))}
            </group>
        </group>
    );
};