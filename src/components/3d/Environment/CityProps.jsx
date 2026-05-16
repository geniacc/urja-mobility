import React, { useRef, useState, useMemo, useLayoutEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Sphere, Text, Float, Torus, Cone, useTexture } from "@react-three/drei";
import * as THREE from "three";

// --- Street Props ---
export const TrashCan = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.25, 0.2, 0.8]} position={[0, 0.4, 0]}><meshStandardMaterial color="#334155" metalness={0.6} /></Cylinder>
        <Torus args={[0.26, 0.02, 16, 32]} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#cbd5e1" /></Torus>
    </group>
);

export const Bench = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[0.1, 0.4, 0.5]} position={[0.6, 0.2, 0]}><meshStandardMaterial color="#1e293b" /></Box>
        <Box args={[0.1, 0.4, 0.5]} position={[-0.6, 0.2, 0]}><meshStandardMaterial color="#1e293b" /></Box>
        <Box args={[1.4, 0.1, 0.6]} position={[0, 0.42, 0]}><meshStandardMaterial color="#78350f" /></Box>
        <Box args={[1.4, 0.6, 0.1]} position={[0, 0.7, -0.25]} rotation={[0.2, 0, 0]}><meshStandardMaterial color="#78350f" /></Box>
    </group>
);

export const FireHydrant = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.15, 0.2, 0.6]} position={[0, 0.3, 0]}><meshStandardMaterial color="#ef4444" /></Cylinder>
        <Sphere args={[0.16]} position={[0, 0.6, 0]}><meshStandardMaterial color="#ef4444" /></Sphere>
        <Cylinder args={[0.08, 0.08, 0.1]} position={[0.15, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
        <Cylinder args={[0.08, 0.08, 0.1]} position={[-0.15, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
    </group>
);

export const Manhole = ({ position, rotation }) => (
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
);

// --- Nature ---
export const RoadsideTree = ({ position }) => {
    const scale = 1 + Math.random() * 1.5;
    const leafColors = ["#15803d", "#16a34a", "#4d7c0f", "#3f6212", "#047857"];
    return (
        <group position={position} scale={scale}>
            <Cylinder args={[0.2, 0.25, 2]} position={[0, 1, 0]} segments={6}><meshStandardMaterial color="#5d4037" roughness={1} /></Cylinder>
            <group position={[0, 2.2, 0]}>
                <mesh position={[0, 0, 0]}><dodecahedronGeometry args={[1.5, 0]} /><meshStandardMaterial color={leafColors[0]} roughness={0.8} /></mesh>
                <mesh position={[0.8, 0.5, 0]}><dodecahedronGeometry args={[1.0, 0]} /><meshStandardMaterial color={leafColors[1]} roughness={0.8} /></mesh>
                <mesh position={[-0.8, 0.4, 0.2]}><dodecahedronGeometry args={[1.0, 0]} /><meshStandardMaterial color={leafColors[2]} roughness={0.8} /></mesh>
                <mesh position={[0, 0.8, -0.6]}><dodecahedronGeometry args={[1.1, 0]} /><meshStandardMaterial color={leafColors[3]} roughness={0.8} /></mesh>
                <mesh position={[0.4, 1.2, 0.4]}><dodecahedronGeometry args={[0.8, 0]} /><meshStandardMaterial color={leafColors[4]} roughness={0.8} /></mesh>
            </group>
        </group>
    )
};

export const Bush = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        <mesh position={[0, 0.4, 0]}><dodecahedronGeometry args={[0.6, 0]} /><meshStandardMaterial color="#166534" roughness={1} flatShading /></mesh>
        <mesh position={[0.4, 0.3, 0.3]}><dodecahedronGeometry args={[0.4, 0]} /><meshStandardMaterial color="#15803d" roughness={1} flatShading /></mesh>
        <mesh position={[-0.4, 0.3, -0.3]}><dodecahedronGeometry args={[0.5, 0]} /><meshStandardMaterial color="#14532d" roughness={1} flatShading /></mesh>
    </group>
);

// --- Green Energy & Eco Props ---
export const SolarTree = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        <Cylinder args={[0.2, 0.4, 4]} position={[0, 2, 0]}><meshStandardMaterial color="#475569" /></Cylinder>
        {[0, 1, 2, 3, 4].map(i => {
            const angle = (i / 5) * Math.PI * 2;
            const y = 2.5 + i * 0.4;
            return (
                <group key={i} position={[0, y, 0]} rotation={[0, angle, 0.5]}>
                    <Cylinder args={[0.05, 0.1, 1.5]} position={[0, 0.75, 0]}><meshStandardMaterial color="#475569" /></Cylinder>
                    <Box args={[0.8, 0.05, 0.8]} position={[0, 1.5, 0]} rotation={[0.5, 0, 0]}><meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} /></Box>
                </group>
            )
        })}
    </group>
);

export const SolarPanelArray = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.08, 0.08, 1]} position={[0, 0.5, 0]}><meshStandardMaterial color="#475569" /></Cylinder>
        <Box args={[1.5, 0.05, 1]} position={[0, 1, 0]} rotation={[0.5, 0, 0]}>
            <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.1} />
            <Box args={[1.4, 0.06, 0.02]} position={[0, 0, 0]}><meshBasicMaterial color="#fff" opacity={0.2} transparent /></Box>
            <Box args={[0.02, 0.06, 0.9]} position={[0, 0, 0]}><meshBasicMaterial color="#fff" opacity={0.2} transparent /></Box>
        </Box>
    </group>
);

export const WindTurbine = ({ position, rotation }) => {
    const blades = useRef();
    useFrame(() => { if (blades.current) blades.current.rotation.z -= 0.05; });
    return (
        <group position={position} rotation={rotation} scale={3}>
            <Cylinder args={[0.15, 0.6, 12, 16]} position={[0, 6, 0]}><meshStandardMaterial color="#f8fafc" roughness={0.3} /></Cylinder>
            <group position={[0, 12, 0]}>
                <Box args={[0.7, 0.8, 1.8]} position={[0, 0, 0.2]}><meshStandardMaterial color="#f8fafc" /></Box>
                <Sphere args={[0.5]} position={[0, 0, -0.6]}><meshStandardMaterial color="#f8fafc" /></Sphere>
                <Sphere args={[0.1]} position={[0, 0.45, -0.6]}><meshBasicMaterial color="#ef4444" toneMapped={false} /></Sphere>
            </group>
            <group position={[0, 12, 1.15]} ref={blades}>
                <Sphere args={[0.4]} scale={[1, 1, 1.5]}><meshStandardMaterial color="#e2e8f0" /></Sphere>
                {[0, 2.09, 4.18].map((rot, i) => (
                    <group key={i} rotation={[0, 0, rot]}>
                        <group position={[0, 3.2, 0]} rotation={[0, 0.2, 0]}>
                            <Cylinder args={[0.05, 0.25, 6.5, 8]} scale={[1, 1, 0.2]}><meshStandardMaterial color="#f8fafc" roughness={0.2} /></Cylinder>
                        </group>
                    </group>
                ))}
            </group>
        </group>
    )
};

export const HolographicInfo = ({ position, text }) => (
    <group position={position}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <Text fontSize={0.3} color="#4ade80" anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#052e16">{text}</Text>
            <Box args={[2.5, 0.8, 0.05]} position={[0, 0, -0.05]}><meshBasicMaterial color="#052e16" opacity={0.6} transparent /></Box>
        </Float>
        <Cylinder args={[0.02, 0.02, 2]} position={[0, -1.5, 0]}><meshBasicMaterial color="#4ade80" opacity={0.3} transparent /></Cylinder>
    </group>
);

export const RecyclingStation = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <group position={[-0.45, 0.5, 0]}>
            <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#3b82f6" /></Box>
            <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">PAPER</Text>
        </group>
        <group position={[0, 0.5, 0]}>
            <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#22c55e" /></Box>
            <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">RECYCLE</Text>
        </group>
        <group position={[0.45, 0.5, 0]}>
            <Box args={[0.4, 1, 0.4]}><meshStandardMaterial color="#06b6d4" /></Box>
            <Text position={[0, 0.2, 0.21]} fontSize={0.12} color="white">TRASH</Text>
        </group>
    </group>
);

export const BikeRack = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        {[-0.6, 0, 0.6].map((x, i) => (
            <Torus key={i} args={[0.3, 0.03, 8, 16]} position={[x, 0.3, 0]} rotation={[0, Math.PI / 2, 0]}><meshStandardMaterial color="#94a3b8" metalness={0.8} /></Torus>
        ))}
        <Box args={[2, 0.05, 0.1]} position={[0, 0.02, 0]}><meshStandardMaterial color="#64748b" /></Box>
    </group>
);

// --- General City Infrastructure ---
export const StreetLamp = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.08, 0.15, 6]} position={[0, 3, 0]}><meshStandardMaterial color="#334155" roughness={0.5} /></Cylinder>
        <Cylinder args={[0.25, 0.35, 0.6]} position={[0, 0.3, 0]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <group position={[0, 5.8, 0]}>
            <Box args={[0.1, 0.1, 1.2]} position={[0, 0, 0.6]}><meshStandardMaterial color="#334155" /></Box>
            <Box args={[0.05, 0.05, 0.8]} position={[0, -0.4, 0.4]} rotation={[0.5, 0, 0]}><meshStandardMaterial color="#334155" /></Box>
        </group>
        <group position={[0, 5.8, 1.3]}>
            <Box args={[0.4, 0.15, 0.7]} position={[0, 0, 0]}><meshStandardMaterial color="#1e293b" /></Box>
            <Box args={[0.3, 0.05, 0.5]} position={[0, -0.05, 0]}><meshBasicMaterial color="#fef08a" toneMapped={false} /></Box>
        </group>
    </group>
);

export const TrafficLight = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.1, 0.15, 5]} position={[0, 2.5, 0]}><meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} /></Cylinder>
        <Box args={[0.5, 1.4, 0.4]} position={[0, 4.2, 0]}><meshStandardMaterial color="#0f172a" /></Box>
        <group position={[0, 4.6, 0.2]}><Sphere args={[0.15]} scale={[1, 1, 0.6]}><meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={2} /></Sphere></group>
        <group position={[0, 4.2, 0.2]}><Sphere args={[0.15]} scale={[1, 1, 0.6]}><meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.2} /></Sphere></group>
        <group position={[0, 3.8, 0.2]}><Sphere args={[0.15]} scale={[1, 1, 0.6]}><meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.2} /></Sphere></group>
    </group>
);

// --- UPDATED BILLBOARD COMPONENT ---
export const Billboard = ({ position, rotation }) => {
    // We'll use two refs now to animate the logo on both sides
    const logoFrontRef = useRef();
    const logoBackRef = useRef();

    const logoTexture = useTexture(`${import.meta.env.BASE_URL}assets/logo.png`);

    useFrame((state) => {
        // Create a subtle pulsing effect for the logo to make it feel "alive"
        const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 4) * 0.2;

        if (logoFrontRef.current) logoFrontRef.current.opacity = pulse;
        if (logoBackRef.current) logoBackRef.current.opacity = pulse;
    });

    return (
        <group position={position} rotation={rotation}>
            {/* Main Structural Frame */}
            <Box args={[4.5, 2.5, 0.2]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
            </Box>

            {/* Black LED Screen Backdrop */}
            <Box args={[4.3, 2.3, 0.22]} position={[0, 1.5, 0]}>
                {/* Changed to a dark black/grey material */}
                <meshStandardMaterial color="#050505" roughness={0.6} metalness={0.2} />
            </Box>

            {/* Front Facing Highlighted Logo */}
            <mesh position={[0, 1.5, 0.12]}>
                <planeGeometry args={[3.8, 1.8]} />
                <meshBasicMaterial
                    ref={logoFrontRef}
                    map={logoTexture}
                    transparent={true}
                    alphaTest={0.05}
                    depthWrite={false}
                    toneMapped={false}       // Prevents the engine from darkening the glow
                    color={[1.5, 1.5, 1.5]}  // Overdrives the brightness of your PNG
                />
            </mesh>

            {/* Back Facing Highlighted Logo */}
            <mesh position={[0, 1.5, -0.12]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[3.8, 1.8]} />
                <meshBasicMaterial
                    ref={logoBackRef}
                    map={logoTexture}
                    transparent={true}
                    alphaTest={0.05}
                    depthWrite={false}
                    toneMapped={false}
                    color={[1.5, 1.5, 1.5]}
                />
            </mesh>

            {/* Support Poles */}
            <Cylinder args={[0.1, 0.1, 1.5]} position={[-1.5, 0.75, 0]}>
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 1.5]} position={[1.5, 0.75, 0]}>
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            </Cylinder>
        </group>
    );
};

export const BusStop = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[3, 0.2, 1.5]} position={[0, 0.1, 0]}><meshStandardMaterial color="#cbd5e1" /></Box>
        <Box args={[3, 2.2, 0.1]} position={[0, 1.2, -0.7]}><meshPhysicalMaterial color="#94a3b8" transmission={0.5} roughness={0.1} /></Box>
        <Box args={[3.2, 0.1, 1.8]} position={[0, 2.3, 0]}><meshStandardMaterial color="#334155" /></Box>
        <Cylinder args={[0.05, 0.05, 2.2]} position={[1.4, 1.1, -0.6]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <Cylinder args={[0.05, 0.05, 2.2]} position={[-1.4, 1.1, -0.6]}><meshStandardMaterial color="#1e293b" /></Cylinder>
        <Box args={[2, 0.1, 0.4]} position={[0, 0.5, -0.4]}><meshStandardMaterial color="#78350f" /></Box>
    </group>
);

export const TrafficSign = ({ position, rotation, type = 'stop' }) => (
    <group position={position} rotation={rotation}>
        <Cylinder args={[0.05, 0.05, 2]} position={[0, 1, 0]}><meshStandardMaterial color="#cbd5e1" /></Cylinder>
        <group position={[0, 2, 0]}>
            {type === 'stop' ? (
                <Cylinder args={[0.4, 0.4, 0.05, 8]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#ef4444" /></Cylinder>
            ) : (
                <Box args={[0.6, 0.8, 0.05]}><meshStandardMaterial color="#fff" /></Box>
            )}
        </group>
    </group>
);

export const Pedestrian = ({ curve, startOffset, side, color }) => {
    const group = useRef();
    const offsetRef = useRef(startOffset);
    const speed = 0.002 + Math.random() * 0.002;

    const leftArm = useRef();
    const rightArm = useRef();
    const leftLeg = useRef();
    const rightLeg = useRef();

    useFrame((state, delta) => {
        offsetRef.current = (offsetRef.current + speed * delta) % 1;
        const point = curve.getPointAt(offsetRef.current);
        const tangent = curve.getTangentAt(offsetRef.current);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const pos = point.clone().add(normal.multiplyScalar(side * 14));

        if (group.current) {
            group.current.position.copy(pos);
            group.current.lookAt(pos.clone().add(tangent));
            group.current.position.y = 0.5 + Math.abs(Math.sin(state.clock.elapsedTime * 8)) * 0.1;
        }

        const walkCycle = state.clock.elapsedTime * 10;
        if (leftArm.current && rightArm.current && leftLeg.current && rightLeg.current) {
            leftArm.current.rotation.x = Math.sin(walkCycle) * 0.5;
            rightArm.current.rotation.x = -Math.sin(walkCycle) * 0.5;
            leftLeg.current.rotation.x = -Math.sin(walkCycle) * 0.6;
            rightLeg.current.rotation.x = Math.sin(walkCycle) * 0.6;
        }
    });

    return (
        <group ref={group} scale={0.45}>
            <Sphere args={[0.3]} position={[0, 1.7, 0]}><meshStandardMaterial color="#fca5a5" /></Sphere>
            <Box args={[0.5, 0.45, 0.3]} position={[0, 1.25, 0]}><meshStandardMaterial color={color} /></Box>

            <group ref={leftArm} position={[0.35, 1.4, 0]}>
                <Box args={[0.15, 0.5, 0.15]} position={[0, -0.25, 0]}><meshStandardMaterial color={color} /></Box>
            </group>
            <group ref={rightArm} position={[-0.35, 1.4, 0]}>
                <Box args={[0.15, 0.5, 0.15]} position={[0, -0.25, 0]}><meshStandardMaterial color={color} /></Box>
            </group>

            <group ref={leftLeg} position={[0.15, 1.0, 0]}>
                <Box args={[0.18, 0.6, 0.2]} position={[0, -0.3, 0]}><meshStandardMaterial color="#1e293b" /></Box>
            </group>
            <group ref={rightLeg} position={[-0.15, 1.0, 0]}>
                <Box args={[0.18, 0.6, 0.2]} position={[0, -0.3, 0]}><meshStandardMaterial color="#1e293b" /></Box>
            </group>
        </group>
    )
};

// --- Town Building ---
export const TownBuilding = ({ position, rotation }) => {
    const height = 15;
    return (
        <group position={position} rotation={rotation}>
            <Box args={[7, height, 7]} position={[0, height / 2, 0]} castShadow receiveShadow>
                <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
            </Box>
            {[...Array(6)].map((_, i) => (
                <Box key={i} args={[7.2, 0.8, 7.2]} position={[0, (i + 1) * (height / 7), 0]}>
                    <meshBasicMaterial color="#38bdf8" toneMapped={false} transparent opacity={0.4} />
                </Box>
            ))}
            <Box args={[0.2, height + 0.2, 0.2]} position={[3.55, height / 2, 3.55]}>
                <meshBasicMaterial color="#0ea5e9" toneMapped={false} />
            </Box>
            <Cylinder args={[0.05, 0.05, 4]} position={[2, height + 2, 2]}><meshStandardMaterial color="#94a3b8" /></Cylinder>
            <Sphere args={[0.15]} position={[2, height + 4, 2]}><meshBasicMaterial color="#ef4444" toneMapped={false} /></Sphere>
        </group>
    );
};

// --- Small House ---
export const SmallHouse = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[5, 4, 5]} position={[0, 2, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#f8fafc" />
        </Box>

        <Box args={[1.2, 2.4, 0.2]} position={[0, 1.2, 2.5]}><meshStandardMaterial color="#1e293b" /></Box>
        <Sphere args={[0.1]} position={[0.8, 2.5, 2.6]}><meshBasicMaterial color="#fef08a" toneMapped={false} /></Sphere>

        {[[-1.5, 2.2], [1.5, 2.2]].map((pos, i) => (
            <group key={i} position={[pos[0], pos[1], 2.51]}>
                <Box args={[1.2, 1.2, 0.05]}><meshStandardMaterial color="#bae6fd" roughness={0.1} /></Box>
                <Box args={[1.2, 0.1, 0.1]}><meshStandardMaterial color="#334155" /></Box>
                <Box args={[0.1, 1.2, 0.1]}><meshStandardMaterial color="#334155" /></Box>
            </group>
        ))}

        <group position={[0, 4, 0]}>
            <Box args={[5.8, 0.5, 5.8]} position={[0, 0.25, 0]}><meshStandardMaterial color="#334155" /></Box>
            <mesh rotation={[-0.3, 0, 0]} position={[0, 0.7, 0]}>
                <Box args={[5, 0.1, 4.5]}><meshStandardMaterial color="#1e1b4b" metalness={0.9} roughness={0.1} /></Box>
                <Box args={[5.1, 0.11, 0.1]} position={[0, 0, 0]}><meshBasicMaterial color="#ffffff" opacity={0.1} transparent /></Box>
            </mesh>
        </group>

        <Box args={[0.8, 1.8, 1.2]} position={[2.8, 1.2, 0]} castShadow>
            <meshStandardMaterial color="#22c55e" />
        </Box>
        <Text position={[3.3, 1.2, 0]} rotation={[0, Math.PI / 2, 0]} fontSize={0.25} color="white">URJA POWERCUBE</Text>
    </group>
);

export const VerticalGardenBuilding = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <Box args={[6, 12, 6]} position={[0, 6, 0]}><meshStandardMaterial color="#f1f5f9" /></Box>
        <Box args={[6.1, 12, 2]} position={[0, 6, 0]}><meshPhysicalMaterial color="#bfdbfe" transmission={0.4} roughness={0} /></Box>
        <group position={[0, 4, 3.2]}>
            <Box args={[1.5, 1, 0.4]}><meshStandardMaterial color="#16a34a" roughness={1} /></Box>
        </group>
        <group position={[0, 8, 3.2]}>
            <Box args={[1.5, 1, 0.4]}><meshStandardMaterial color="#16a34a" roughness={1} /></Box>
        </group>
    </group>
);

// --- Advanced Props ---
export const Bird = ({ position, speed, range }) => {
    const group = useRef();
    const wingLeft = useRef();
    const wingRight = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (group.current) {
            group.current.position.x = position[0] + Math.sin(t * speed) * range;
            group.current.position.z = position[2] + Math.cos(t * speed) * range;
            group.current.rotation.y = -t * speed;
        }
        if (wingLeft.current && wingRight.current) {
            wingLeft.current.rotation.z = Math.sin(t * 15) * 0.5;
            wingRight.current.rotation.z = -Math.sin(t * 15) * 0.5;
        }
    });

    return (
        <group ref={group} position={position}>
            <Cone args={[0.1, 0.3, 4]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#333" /></Cone>
            <group ref={wingLeft} position={[0.1, 0, 0]}>
                <Box args={[0.4, 0.05, 0.15]} position={[0.2, 0, 0]}><meshStandardMaterial color="#333" /></Box>
            </group>
            <group ref={wingRight} position={[-0.1, 0, 0]}>
                <Box args={[0.4, 0.05, 0.15]} position={[-0.2, 0, 0]}><meshStandardMaterial color="#333" /></Box>
            </group>
        </group>
    )
};

export const Forest = ({ count = 40 }) => {
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

            dummy.position.set(position[0], 1 * scale, position[2]);
            dummy.scale.set(scale, scale, scale);
            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            trunkRef.current.setMatrixAt(i, dummy.matrix);

            dummy.position.set(position[0], 2.2 * scale, position[2]);
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            foliage1Ref.current.setMatrixAt(i, dummy.matrix);

            dummy.position.set(position[0], 3.0 * scale, position[2]);
            dummy.scale.set(scale * 0.8, scale * 0.8, scale * 0.8);
            dummy.updateMatrix();
            foliage2Ref.current.setMatrixAt(i, dummy.matrix);
        });
        trunkRef.current.instanceMatrix.needsUpdate = true;
        foliage1Ref.current.instanceMatrix.needsUpdate = true;
        foliage2Ref.current.instanceMatrix.needsUpdate = true;
    }, [treeData, dummy]);

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
};

export const RockField = ({ count = 30 }) => {
    const ref = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const rockData = useMemo(() => {
        return Array.from({ length: count }).map(() => {
            const x = (Math.random() - 0.5) * 200;
            const z = -Math.random() * 100;
            if (Math.abs(x) < 30) return null;
            return { position: [x, 0.3, z], scale: 0.3 + Math.random() * 0.5 };
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
    }, [rockData, dummy]);

    return (
        <instancedMesh ref={ref} args={[null, null, rockData.length]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#57534e" roughness={0.9} />
        </instancedMesh>
    )
};