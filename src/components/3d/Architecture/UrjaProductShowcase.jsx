import React, { useRef } from "react";
import { Box, Text, Float, Cylinder, Html, MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const UrjaProductShowcase = ({ position, rotation }) => {
    const scannerRef = useRef();

    useFrame((state) => {
        if (scannerRef.current) {
            // Scanner goes up and down
            scannerRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 1.5;
        }
    });

    return (
        <group position={position} rotation={rotation}>
            {/* 1. Base Pedestal */}
            <Box args={[8, 0.4, 4]} position={[0, 0.2, 0]}>
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </Box>
            <Box args={[7.8, 0.05, 3.8]} position={[0, 0.41, 0]}>
                <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
            </Box>

            {/* Premium Glass Dome Encasing the Products */}
            <Box args={[7.6, 4, 3.6]} position={[0, 2.41, 0]}>
                <meshPhysicalMaterial
                    color="#e0f2fe"
                    metalness={0.9}
                    roughness={0.05}
                    transmission={0.4}
                    transparent
                    opacity={0.7}
                    envMapIntensity={1}
                />
            </Box>

            {/* Animated Scanning Laser inside the dome */}
            <Box ref={scannerRef} args={[7.4, 0.02, 3.4]} position={[0, 1.5, 0]}>
                <meshBasicMaterial color="#0ea5e9" transparent opacity={0.5} toneMapped={false} />
            </Box>

            {/* 2. Standard 105Ah LFP Battery Unit */}
            <group position={[-2, 1.4, 0]}>
                <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
                    <Box args={[1.2, 1.4, 0.8]} castShadow>
                        <meshPhysicalMaterial color="#334155" metalness={0.9} roughness={0.1} clearcoat={1} />
                    </Box>
                    <Box args={[1.22, 0.1, 0.82]} position={[0, 0.5, 0]}>
                        <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
                    </Box>
                    <Text position={[0, 0.1, 0.42]} fontSize={0.18} color="#ffffff">105Ah</Text>
                    <Text position={[0, -0.15, 0.42]} fontSize={0.08} color="#94a3b8">LFP CHEMISTRY</Text>
                </Float>
                <Cylinder args={[0.6, 0.6, 1.2]} position={[0, -0.6, 0]}>
                    <meshBasicMaterial color="#0ea5e9" transparent opacity={0.1} toneMapped={false} />
                </Cylinder>
            </group>

            {/* 3. Heavy Duty 232Ah Hybrid Inverter Unit */}
            <group position={[2, 1.6, 0]}>
                <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
                    <Box args={[1.6, 1.8, 1.2]} castShadow>
                        <meshPhysicalMaterial color="#0f172a" metalness={0.8} roughness={0.3} clearcoat={0.5} />
                    </Box>
                    <Box args={[1.62, 0.05, 1.22]} position={[0, 0.6, 0]}>
                        <meshBasicMaterial color="#fbbf24" toneMapped={false} />
                    </Box>
                    <Text position={[0, 0.2, 0.62]} fontSize={0.25} color="#fbbf24">232Ah</Text>
                    <Text position={[0, -0.15, 0.62]} fontSize={0.12} color="#cbd5e1">SOLAR HYBRID</Text>
                </Float>
                <Cylinder args={[0.8, 0.8, 1.4]} position={[0, -0.7, 0]}>
                    <meshBasicMaterial color="#fbbf24" transparent opacity={0.1} toneMapped={false} />
                </Cylinder>
            </group>

            {/* 4. Interactive HTML UI Panel */}
            <group position={[0, 5, 0]}>
                <Html transform center distanceFactor={12}>
                    <div style={{
                        background: 'rgba(15, 23, 42, 0.85)',
                        backdropFilter: 'blur(10px)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid #0ea5e9',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        textAlign: 'center',
                        width: '250px'
                    }}>
                        <h2 style={{ margin: '0 0 10px 0', fontSize: '22px', color: '#0ea5e9' }}>URJA MOBILITY</h2>
                        <p style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#cbd5e1' }}>Next-Gen Energy Storage</p>
                        <button
                            onClick={() => alert("Open Tech Specs Modal!")}
                            style={{
                                background: '#0ea5e9',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                width: '100%',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.background = '#0284c7'}
                            onMouseOut={(e) => e.target.style.background = '#0ea5e9'}
                        >
                            View Datasheets
                        </button>
                    </div>
                </Html>
            </group>
        </group>
    );
};