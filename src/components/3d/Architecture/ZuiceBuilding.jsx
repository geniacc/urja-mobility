import React from "react";
import { Box, Cylinder, Sphere, Text, MeshTransmissionMaterial } from "@react-three/drei";

// MAGIC KEYWORDS: export const
export const ZuiceBuilding = ({ position, rotation }) => {
    return (
        <group position={position} rotation={rotation}>
            <Box args={[7, 0.5, 7]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#334155" />
            </Box>

            <Box args={[6, 12, 6]} position={[0, 6.25, 0]}>
                <meshPhysicalMaterial
                    color="#16a34a"
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.4}
                    transparent
                    opacity={0.8}
                    envMapIntensity={2}
                />
            </Box>

            <Cylinder args={[2, 2, 11.5]} position={[0, 6, 0]}>
                <meshStandardMaterial color="#1e293b" />
            </Cylinder>

            <Box args={[6.1, 0.2, 6.1]} position={[0, 3, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>
            <Box args={[6.1, 0.2, 6.1]} position={[0, 6, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>
            <Box args={[6.1, 0.2, 6.1]} position={[0, 9, 0]}><meshBasicMaterial color="#4ade80" toneMapped={false} /></Box>

            <group position={[0, 10, 3.1]}>
                <Text fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#4ade80">ZUICE</Text>
            </group>
            <group position={[3.1, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
                <Text fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#4ade80">ZUICE</Text>
            </group>
            <group position={[-3.1, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <Text fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle" outlineWidth={0.05} outlineColor="#4ade80">ZUICE</Text>
            </group>

            <Box args={[6.2, 0.5, 6.2]} position={[0, 12.5, 0]}>
                <meshStandardMaterial color="#1e293b" />
            </Box>
            <Cylinder args={[0.1, 0.05, 4]} position={[0, 14.5, 0]}>
                <meshStandardMaterial color="#94a3b8" />
            </Cylinder>
            <Sphere args={[0.3]} position={[0, 16.5, 0]}>
                <meshBasicMaterial color="#ef4444" />
            </Sphere>
        </group>
    );
};