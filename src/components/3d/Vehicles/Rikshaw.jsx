import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Sphere, Text } from "@react-three/drei";
import * as THREE from "three";
import { mainRoadCurve } from "../../../utils/cityPath";

// NOTICE THE 'export const' HERE! This is what fixes the error.
export const Rikshaw = ({ scroll, mini = false }) => {
    const group = useRef();
    const chassis = useRef();
    const wheelsRef = useRef([]);
    const lastOffset = useRef(0);
    const direction = useRef(1);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const camTarget = useRef(new THREE.Vector3());

    const START_OFFSET_BASE = 0.02 + (1 / 60) * 0.96;

    useFrame((state, delta) => {
        const offset = scroll?.offset ?? lastOffset.current;
        const scrollDelta = (scroll?.offset ?? 0) - lastOffset.current;

        if (Math.abs(scrollDelta) > 0.0001) {
            direction.current = scrollDelta > 0 ? 1 : -1;
        }

        lastOffset.current = scroll?.offset ?? lastOffset.current;
        const safeOffset = Math.max(0, Math.min(1, START_OFFSET_BASE + offset));
        const point = mainRoadCurve.getPointAt(safeOffset);

        if (group.current) {
            group.current.position.lerp(point, 0.1);
            const tangent = mainRoadCurve.getTangentAt(safeOffset);
            if (direction.current === -1) tangent.negate();

            dummy.position.copy(group.current.position);
            dummy.lookAt(group.current.position.clone().add(tangent));
            group.current.quaternion.slerp(dummy.quaternion, 0.1);
        }

        if (chassis.current) {
            const tangent = mainRoadCurve.getTangentAt(safeOffset);
            if (direction.current === -1) tangent.negate();
            chassis.current.position.y = Math.sin(state.clock.elapsedTime * 10) * 0.02;
            chassis.current.rotation.z = THREE.MathUtils.lerp(chassis.current.rotation.z, -tangent.x * 0.2, 0.1);
        }

        wheelsRef.current.forEach(wheel => {
            if (wheel) wheel.rotation.x -= 20 * delta * direction.current;
        });

        if (!mini) {
            const pathTangent = mainRoadCurve.getTangentAt(safeOffset);
            const camDir = direction.current === -1 ? pathTangent.clone().negate() : pathTangent.clone();
            const cameraPos = point.clone().sub(camDir.multiplyScalar(12)).add(new THREE.Vector3(0, 7, 0));
            state.camera.position.lerp(cameraPos, 0.06);
            const targetAhead = direction.current === -1 ? pathTangent.clone().negate() : pathTangent.clone();
            camTarget.current.lerp(point.clone().add(targetAhead.multiplyScalar(6)).add(new THREE.Vector3(0, 2, 0)), 0.12);
            state.camera.lookAt(camTarget.current);
        }
    });

    return (
        <group ref={group} scale={0.6}>
            <group ref={chassis}>
                {/* Neon Underglow for the Hero Vehicle */}
                <Box args={[1.6, 0.1, 3.0]} position={[0, 0.1, -0.2]}>
                    <meshBasicMaterial color="#0ea5e9" toneMapped={false} transparent opacity={0.9} />
                </Box>
                <Box args={[1.4, 0.2, 2.8]} position={[0, 0.4, -0.2]} castShadow receiveShadow>
                    <meshStandardMaterial color="#334155" roughness={0.5} />
                </Box>
                <Cylinder args={[0.05, 0.05, 1.4]} rotation={[0, 0, Math.PI / 2]} position={[0, 0.3, 1.2]}>
                    <meshStandardMaterial color="#1e293b" />
                </Cylinder>

                <group position={[0, 1.1, -0.25]}>
                    <Box args={[1.5, 1.2, 2.6]} position={[0, 0, 0]} castShadow receiveShadow>
                        <meshPhysicalMaterial color="#16a34a" roughness={0.2} metalness={0.6} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1} />
                    </Box>
                    <Box args={[1.52, 0.2, 2.62]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#3b82f6" />
                    </Box>
                    <Cylinder args={[0.75, 0.75, 1.2, 32]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, -1.3]}>
                        <meshPhysicalMaterial color="#16a34a" roughness={0.2} metalness={0.6} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={1} />
                    </Cylinder>
                </group>

                <group position={[0, 2.4, -0.2]}>
                    <Box args={[1.6, 0.15, 2.8]} position={[0, 0, 0]}><meshStandardMaterial color="#3b82f6" roughness={0.9} /></Box>
                    <Box args={[1.4, 0.05, 2.6]} position={[0, 0.1, 0]}><meshStandardMaterial color="#b45309" /></Box>
                    <Cylinder args={[0.04, 0.04, 1.4]} position={[0.7, -0.7, 1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                    <Cylinder args={[0.04, 0.04, 1.4]} position={[-0.7, -0.7, 1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                    <Cylinder args={[0.04, 0.04, 1.4]} position={[0.7, -0.7, -1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                    <Cylinder args={[0.04, 0.04, 1.4]} position={[-0.7, -0.7, -1.2]}><meshStandardMaterial color="#1e293b" /></Cylinder>
                </group>

                <group position={[0, 1.8, 1.15]} rotation={[0.15, 0, 0]}>
                    <Box args={[1.5, 1.1, 0.1]}><meshStandardMaterial color="#1e293b" /></Box>
                    <Box args={[1.4, 1, 0.05]} position={[0, 0, 0.03]}>
                        <meshPhysicalMaterial color="#e0f2fe" transmission={1} opacity={1} roughness={0} thickness={0.1} ior={1.5} chromaticAberration={0.06} transparent envMapIntensity={1.5} />
                    </Box>
                    <Box args={[0.02, 0.8, 0.02]} position={[0.3, 0, 0.06]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#111" /></Box>
                    <Box args={[0.02, 0.8, 0.02]} position={[-0.3, 0, 0.06]} rotation={[0, 0, 0.2]}><meshStandardMaterial color="#111" /></Box>
                </group>

                <group position={[0, 0.9, 0.5]}>
                    <Box args={[1.2, 0.2, 0.6]} position={[0, 0, 0]}><meshStandardMaterial color="#1e1e1e" /></Box>
                    <group position={[0, 0.6, 0]}>
                        <Box args={[0.5, 0.7, 0.3]} position={[0, 0, 0]}><meshStandardMaterial color="#fff" /></Box>
                        <Sphere args={[0.25]} position={[0, 0.55, 0]}><meshStandardMaterial color="#fca5a5" /></Sphere>
                        <Cylinder args={[0.26, 0.26, 0.1]} position={[0, 0.65, 0]}><meshStandardMaterial color="#1e3a8a" /></Cylinder>
                        <Box args={[0.3, 0.05, 0.2]} position={[0, 0.6, 0.25]}><meshStandardMaterial color="#1e3a8a" /></Box>
                        <group position={[0, 0.58, 0.18]}>
                            <Box args={[0.1, 0.05, 0.05]} position={[0.08, 0, 0]}><meshStandardMaterial color="black" roughness={0.2} /></Box>
                            <Box args={[0.1, 0.05, 0.05]} position={[-0.08, 0, 0]}><meshStandardMaterial color="black" roughness={0.2} /></Box>
                            <Box args={[0.06, 0.01, 0.05]} position={[0, 0, 0]}><meshStandardMaterial color="black" /></Box>
                        </group>
                        <Box args={[0.1, 0.6, 0.1]} position={[0.25, 0.1, 0.3]} rotation={[1, 0, -0.2]}><meshStandardMaterial color="#fff" /></Box>
                        <Box args={[0.1, 0.6, 0.1]} position={[-0.25, 0.1, 0.3]} rotation={[1, 0, 0.2]}><meshStandardMaterial color="#fff" /></Box>
                    </group>
                </group>

                <group position={[0, 1.4, 0.9]} rotation={[0.4, 0, 0]}>
                    <Cylinder args={[0.04, 0.04, 1.2]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" metalness={0.8} /></Cylinder>
                    <Box args={[0.8, 0.3, 0.2]} position={[0, -0.2, 0.1]}><meshStandardMaterial color="#333" /></Box>
                    <Box args={[0.6, 0.2, 0.01]} position={[0, -0.2, 0.21]}><meshBasicMaterial color="#0ea5e9" /></Box>
                </group>

                <group position={[0, 0.8, 1.35]}>
                    <Cylinder args={[0.18, 0.18, 0.2]} rotation={[Math.PI / 2, 0, 0]}><meshStandardMaterial color="#fefce8" emissive="#fefce8" emissiveIntensity={5} toneMapped={false} /></Cylinder>
                    <Cylinder args={[0.2, 0.2, 0.15]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}><meshStandardMaterial color="#333" /></Cylinder>
                    <Cylinder args={[0.19, 0.19, 0.05]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
                        <meshPhysicalMaterial transmission={1} opacity={0.5} transparent roughness={0} />
                    </Cylinder>
                </group>

                <group position={[0.8, 1.7, 1.2]} rotation={[0, -0.3, 0]}>
                    <Cylinder args={[0.02, 0.02, 0.3]} rotation={[0, 0, 0.5]} />
                    <Box args={[0.2, 0.3, 0.05]} position={[0.1, 0.2, 0]}><meshStandardMaterial color="#333" /></Box>
                    <Box args={[0.18, 0.28, 0.01]} position={[0.1, 0.2, 0.025]}><meshPhysicalMaterial color="#fff" metalness={1} roughness={0} /></Box>
                </group>
                <group position={[-0.8, 1.7, 1.2]} rotation={[0, 0.3, 0]}>
                    <Cylinder args={[0.02, 0.02, 0.3]} rotation={[0, 0, -0.5]} />
                    <Box args={[0.2, 0.3, 0.05]} position={[-0.1, 0.2, 0]}><meshStandardMaterial color="#333" /></Box>
                    <Box args={[0.18, 0.28, 0.01]} position={[-0.1, 0.2, 0.025]}><meshPhysicalMaterial color="#fff" metalness={1} roughness={0} /></Box>
                </group>

                <group position={[0, 0.35, 1.6]} ref={el => wheelsRef.current[0] = el}>
                    <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#111827" roughness={0.9} /></Cylinder>
                    <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} /></Cylinder>
                    <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                    <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                </group>

                <group position={[-0.7, 0.35, -1]} ref={el => wheelsRef.current[1] = el}>
                    <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#111827" roughness={0.9} /></Cylinder>
                    <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} /></Cylinder>
                    <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                    <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                </group>
                <group position={[0.7, 0.35, -1]} ref={el => wheelsRef.current[2] = el}>
                    <Cylinder args={[0.35, 0.35, 0.2, 24]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#111827" roughness={0.9} /></Cylinder>
                    <Cylinder args={[0.2, 0.2, 0.21, 12]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} /></Cylinder>
                    <Box args={[0.05, 0.4, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                    <Box args={[0.4, 0.05, 0.22]} rotation={[0, 0, Math.PI / 2]}><meshStandardMaterial color="#94a3b8" /></Box>
                </group>

                <group position={[0, 0.7, -1.35]}>
                    <Box args={[1.2, 0.5, 0.3]}><meshStandardMaterial color="#22c55e" /></Box>
                    <Box args={[1.1, 0.05, 0.35]} position={[0, 0.1, 0]}><meshStandardMaterial color="#14532d" /></Box>
                    <Box args={[1.1, 0.05, 0.35]} position={[0, -0.1, 0]}><meshStandardMaterial color="#14532d" /></Box>
                    <Box args={[0.3, 0.1, 0.05]} position={[0, 0, 0.16]}>
                        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={3} toneMapped={false} />
                    </Box>
                </group>

                <group position={[0, 0.5, -1.6]}>
                    <Box args={[0.6, 0.15, 0.05]}><meshStandardMaterial color="#fff" /></Box>
                    <Text position={[0, 0, 0.03]} fontSize={0.1} color="black" anchorX="center" anchorY="middle">URJA-EV</Text>
                </group>
            </group>
        </group>
    );
};