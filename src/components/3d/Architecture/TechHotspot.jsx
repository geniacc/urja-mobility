import React, { useState, useRef } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export const TechHotspot = ({ position, title, content }) => {
    const [active, setActive] = useState(false);
    const ringRef = useRef();
    const scannerRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.y += 0.02;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
        }
        if (scannerRef.current) {
            scannerRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.5;
        }
    });

    return (
        <group position={position}>
            {/* Holographic Spinning Ring */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.3, 0.02, 16, 64]} />
                <meshBasicMaterial color="#4ade80" toneMapped={false} transparent opacity={0.8} />
            </mesh>

            {/* Scanning Laser Beam */}
            <mesh ref={scannerRef}>
                <cylinderGeometry args={[0.25, 0.25, 0.02, 32]} />
                <meshBasicMaterial color="#4ade80" toneMapped={false} transparent opacity={0.4} />
            </mesh>

            {/* Invisible Hitbox for Clicking */}
            <mesh onClick={(e) => { e.stopPropagation(); setActive(!active); }} visible={false}>
                <sphereGeometry args={[0.4, 16, 16]} />
                <meshBasicMaterial />
            </mesh>

            {/* Interactive Label Layer */}
            <Html distanceFactor={8} position={[0, 0.4, 0]} center transform>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pointerEvents: 'auto',
                    fontFamily: 'sans-serif'
                }}>
                    <button
                        onClick={() => setActive(!active)}
                        style={{
                            background: 'rgba(15, 23, 42, 0.95)',
                            color: '#4ade80',
                            border: '1px solid #4ade80',
                            borderRadius: '20px',
                            padding: '6px 14px',
                            cursor: 'pointer',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            boxShadow: '0 0 20px rgba(74, 222, 128, 0.4)',
                            transition: 'transform 0.2s'
                        }}
                    >
                        {active ? '✕ CLOSE' : '⚡ TECH SPECS'}
                    </button>

                    {active && (
                        <div style={{
                            marginTop: '12px',
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(10px)',
                            color: '#0f172a',
                            padding: '15px',
                            borderRadius: '10px',
                            width: '220px',
                            fontSize: '13px',
                            lineHeight: '1.5',
                            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                            borderTop: '4px solid #4ade80'
                        }}>
                            <strong style={{ display: 'block', marginBottom: '6px', color: '#1e293b' }}>{title}</strong>
                            <p style={{ margin: 0, opacity: 0.8 }}>{content}</p>
                        </div>
                    )}
                </div>
            </Html>
        </group>
    );
};