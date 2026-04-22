import React from "react";
import { Box, Cylinder, Text, MeshTransmissionMaterial } from "@react-three/drei";

// MAGIC KEYWORDS: export const
export const UrjaBuilding = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
            <Box args={[12, 0.8, 12]} position={[0, 0.4, 0]}>
                <meshStandardMaterial color="#334155" />
            </Box>
            <Box args={[10, 15, 10]} position={[0, 8.3, 0]}>
                <meshPhysicalMaterial
                    color="#fbbf24"
                    metalness={0.7}
                    roughness={0.2}
                    transmission={0.4}
                    transparent
                    opacity={0.9}
                    envMapIntensity={2}
                />
            </Box>
            <Cylinder args={[3, 3, 14.8]} position={[0, 8.2, 0]}>
                <meshStandardMaterial color="#111827" />
            </Cylinder>
            <Box args={[10.5, 0.3, 10.5]} position={[0, 4.5, 0]}>
                <meshBasicMaterial color="#fbbf24" toneMapped={false} />
            </Box>
            <group position={[0, 13, 5.2]}>
                <Text fontSize={1.1} color="#0ea5e9" anchorX="center" anchorY="middle" outlineWidth={0.06} outlineColor="#ffffff">URJA MOBILITY</Text>
            </group>
            <group position={[5.2, 13, 0]} rotation={[0, Math.PI / 2, 0]}>
                <Text fontSize={1.1} color="#0ea5e9" anchorX="center" anchorY="middle" outlineWidth={0.06} outlineColor="#ffffff">URJA MOBILITY</Text>
            </group>
            <Box args={[10.8, 0.6, 10.8]} position={[0, 16.1, 0]}>
                <meshStandardMaterial color="#1f2937" />
            </Box>
        </group>
    );
};