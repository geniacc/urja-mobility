import React, { useRef, useMemo, useLayoutEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Box, Text } from "@react-three/drei";
import { mainRoadCurve } from "../../../utils/cityPath";

// Architecture Imports
import { ZuiceBuilding } from "../Architecture/ZuiceBuilding";
import { UrjaBuilding } from "../Architecture/UrjaBuilding";
import { ChargingStation } from "../Architecture/ChargingStation";

// Vehicles Import
import { TrafficVehicle } from "../Vehicles/TrafficVehicle";

// City Props Imports (Make sure all of these are in your CityProps.jsx!)
import {
    StreetLamp, RoadsideTree, TownBuilding, SmallHouse, VerticalGardenBuilding,
    TrashCan, Bench, FireHydrant, Manhole, HolographicInfo,
    RecyclingStation, BikeRack, Billboard, BusStop, TrafficSign, Pedestrian, TrafficLight, RockField
} from "./CityProps";

const GrassTufts = () => {
    const ref = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const positions = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 60; i++) {
            const t = i / 60;
            const point = mainRoadCurve.getPointAt(t);
            const tangent = mainRoadCurve.getTangentAt(t);
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
            for (let j = 0; j < 3; j++) {
                const side = j % 2 === 0 ? 1 : -1;
                const offset = 18 + Math.random() * 15;
                const pos = point.clone().add(normal.multiplyScalar(side * offset));
                pts.push([pos.x + (Math.random() - 0.5) * 4, 0.02, pos.z + (Math.random() - 0.5) * 4, Math.random() * 0.8 + 0.5]);
            }
        }
        return pts;
    }, []);

    useLayoutEffect(() => {
        if (!ref.current) return;
        positions.forEach((p, i) => {
            dummy.position.set(p[0], p[1], p[2]);
            dummy.scale.set(p[3], p[3], p[3]);
            dummy.rotation.set(Math.random() * 0.2, Math.random() * Math.PI, Math.random() * 0.2);
            dummy.updateMatrix();
            ref.current.setMatrixAt(i, dummy.matrix);
        });
        ref.current.instanceMatrix.needsUpdate = true;
    }, [positions, dummy]);

    return (
        <instancedMesh ref={ref} args={[null, null, positions.length]}>
            <coneGeometry args={[0.2, 0.4, 5]} />
            <meshStandardMaterial color="#166534" roughness={1} />
        </instancedMesh>
    );
};

const DataStream = ({ curve, offsetSide, color }) => {
    const streamRef = useRef();

    useFrame((state) => {
        if (streamRef.current) {
            const time = (state.clock.elapsedTime * 0.1) % 1;
            const point = curve.getPointAt(time);
            const tangent = curve.getTangentAt(time);
            const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

            streamRef.current.position.copy(point.clone().add(normal.multiplyScalar(offsetSide)));
            streamRef.current.lookAt(point.clone().add(tangent).add(normal.multiplyScalar(offsetSide)));

            // Stretch the cylinder based on speed
            streamRef.current.scale.z = 20 + Math.sin(state.clock.elapsedTime * 5) * 10;
        }
    });

    return (
        <mesh ref={streamRef}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} />
        </mesh>
    );
};

export const Road = () => {
    return (
        <>
            {/* Ground Plane */}
            <mesh position={[0, -0.1, -50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[500, 500]} />
                <meshStandardMaterial color="#14532d" roughness={1} />
            </mesh>
            <GrassTufts />

            {/* The Main Wide Road */}
            <mesh position={[0, -0.7, 0]} scale={[1, 0.05, 1]} receiveShadow>
                <tubeGeometry args={[mainRoadCurve, 100, 14, 16, false]} />
                <meshStandardMaterial color="#475569" roughness={0.8} />
            </mesh>

            {/* Dashed White Center Line */}
            {Array.from({ length: 80 }).map((_, i) => {
                const t = i / 80;
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const rotation = Math.atan2(tangent.x, tangent.z);
                return (
                    <mesh key={`dash-${i}`} position={[point.x, 0.02, point.z]} rotation={[-Math.PI / 2, 0, rotation]}>
                        <planeGeometry args={[0.3, 2.5]} />
                        <meshBasicMaterial color="#ffffff" opacity={0.7} transparent />
                    </mesh>
                );
            })}

            {/* Glowing Data/Energy Lines (2026 upgrade) */}
            <DataStream curve={mainRoadCurve} offsetSide={13.5} color="#0ea5e9" />
            <DataStream curve={mainRoadCurve} offsetSide={-13.5} color="#4ade80" />

            {/* 1. Street Lamps */}
            {Array.from({ length: 12 }).map((_, i) => {
                const t = i / 12;
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
                const side = i % 2 === 0 ? 1 : -1;
                const pos = point.clone().add(normal.multiplyScalar(side * 13));
                const rotation = Math.atan2(tangent.x, tangent.z);
                return <StreetLamp key={`lamp-${i}`} position={pos} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
            })}

            {/* 2. Billboards / Hoardings */}
            {[0.12, 0.38, 0.62, 0.88].map((t, i) => {
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const rotation = Math.atan2(tangent.x, tangent.z);
                const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
                const side = i % 2 === 0 ? 1 : -1;
                const pos = point.clone().add(normal.multiplyScalar(side * 15));

                // THE FINAL FIX: 
                // Right side (-90 deg), Left side (+90 deg). They now face the street!
                const faceRoadRotation = rotation + (side === 1 ? -Math.PI / 2 : Math.PI / 2);

                return <Billboard key={`bb-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, faceRoadRotation, 0]} />
            })}

            {/* 3. Street Furniture (Benches, Trash Cans, Hydrants) */}
            {Array.from({ length: 15 }).map((_, i) => {
                const t = 0.05 + (i / 15) * 0.9;
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const rotation = Math.atan2(tangent.x, tangent.z);
                const side = i % 2 === 0 ? 1 : -1;
                const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
                const pos = point.clone().add(normal.multiplyScalar(side * 12.5)); // Right on the edge of the road

                const type = Math.random();
                if (type > 0.8) return <BikeRack key={`bike-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
                if (type > 0.6) return <RecyclingStation key={`recycle-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
                if (type > 0.4) return <Bench key={`bench-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
                if (type > 0.2) return <TrashCan key={`trash-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation, 0]} />
                return <FireHydrant key={`hydrant-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation, 0]} />
            })}

            {/* 4. Bus Stops */}
            {[0.25, 0.75].map((t, i) => {
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const rotation = Math.atan2(tangent.x, tangent.z);
                const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
                const side = i % 2 === 0 ? 1 : -1;
                const pos = point.clone().add(normal.multiplyScalar(side * 14));
                return <BusStop key={`bus-${i}`} position={[pos.x, 0, pos.z]} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
            })}

            {/* 5. Pedestrians (People walking) */}
            {Array.from({ length: 6 }).map((_, i) => {
                const side = i % 2 === 0 ? 1 : -1;
                const startOffset = Math.random();
                const color = Math.random() > 0.5 ? "#ef4444" : "#3b82f6";
                // They walk along the edge of the road
                return <Pedestrian key={`ped-${i}`} curve={mainRoadCurve} startOffset={startOffset} side={side} color={color} />
            })}

            {/* Traffic Vehicles */}
            {Array.from({ length: 5 }).map((_, i) => {
                const isLeft = i % 2 === 0;
                const laneOffset = isLeft ? -6 : 6;
                const type = Math.random() > 0.8 ? 'bus' : Math.random() > 0.5 ? 'truck' : 'sedan';
                const speed = 0.015 * (isLeft ? 1 : -1);
                const startOffset = (i / 10) + (Math.random() * 0.05);
                const color = ["#ef4444", "#3b82f6", "#eab308", "#ffffff", "#000000"][Math.floor(Math.random() * 5)];
                return <TrafficVehicle key={`car-${i}`} curve={mainRoadCurve} startOffset={startOffset} speed={speed} color={color} laneOffset={laneOffset} type={type} />
            })}

            {/* --- GUARANTEED BRANDING & RANDOMIZED SCENERY LOOP (Line ~185) --- */}
            {Array.from({ length: 45 }).map((_, i) => {
                const seed = (index) => {
                    const x = Math.sin(index) * 10000;
                    return x - Math.floor(x);
                };

                const s1 = seed(i);
                const s2 = seed(i + 100);
                const s3 = seed(i + 200);

                const t = 0.02 + (i / 45) * 0.96;
                const point = mainRoadCurve.getPointAt(t);
                const tangent = mainRoadCurve.getTangentAt(t);
                const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
                const rotation = Math.atan2(tangent.x, tangent.z);
                const side = i % 2 === 0 ? 1 : -1;

                // 1. HERO ZONE LOGIC (t < 0.25): Force the main buildings to appear first!
                const isHeroZone = t < 0.25;

                // Set distance closer to the road for hero buildings so they are huge in the frame
                const distance = isHeroZone ? 20 : (24 + s2 * 15);
                const pos = point.clone().add(normal.multiplyScalar(side * distance));

                // --- HERO ZONE: Guaranteed Placements ---
                if (isHeroZone) {
                    // Force Urja at the very start (left side)
                    if (i === 1) return <UrjaBuilding key="hero-urja" position={pos} rotation={[0, rotation + Math.PI / 2, 0]} />;

                    // Force Zuice shortly after (right side)
                    if (i === 4) return <ZuiceBuilding key="hero-zuice" position={pos} rotation={[0, rotation - Math.PI / 2, 0]} />;

                    // Force a Large Office Building (TownBuilding) to show up immediately
                    if (i === 7) return <TownBuilding key="hero-office" position={pos} rotation={[0, rotation + Math.PI / 2, 0]} />;

                    // Skip everything else in the Hero Zone to keep the view "clean" and open
                    return null;
                }

                // --- REGULAR ZONE: Randomized Scenery (t >= 0.25) ---
                const shouldSpawnBuilding = s1 > 0.6; // 40% building density

                if (!shouldSpawnBuilding) {
                    return (
                        <group key={`nature-${i}`}>
                            <RoadsideTree position={pos} />
                            {s3 > 0.92 && <RockField count={1} position={pos.clone().add(new THREE.Vector3(5, 0, 5))} />}
                        </group>
                    );
                }

                // INCREASED OFFICE CHANCE: Houses (40%), Offices (40%), Charging (20%)
                return (
                    <group key={`arch-${i}`}>
                        {s3 < 0.4 ? (
                            <SmallHouse position={pos} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
                        ) : s3 < 0.8 ? (
                            // OFFICE BUILDINGS now appear much more frequently
                            <TownBuilding position={pos} rotation={[0, rotation + (side === 1 ? Math.PI / 2 : -Math.PI / 2), 0]} />
                        ) : (
                            <ChargingStation position={pos} rotation={[0, rotation + (side === 1 ? -Math.PI / 2 : Math.PI / 2), 0]} />
                        )}

                        {/* Only 1 backyard tree to prevent hiding the architecture */}
                        <RoadsideTree position={pos.clone().add(new THREE.Vector3(12 * -side, 0, 0))} />
                    </group>
                );
            })}
            {/* --- NEW: THE ORIGIN GATEWAY (STARTING POINT) --- */}
            {/* Placed at Z: 50, where the mainRoadCurve begins */}
            <group position={[0, 0, 50]}>

                {/* 1. Extend the road backward so the camera doesn't see a cutoff */}
                <mesh position={[0, -0.69, 15]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[14, 30]} />
                    <meshStandardMaterial color="#475569" roughness={0.8} />
                </mesh>

                {/* 2. The Glowing Launch Pad */}
                <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[10, 32]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.67, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[9, 10, 64]} />
                    <meshBasicMaterial color="#0ea5e9" toneMapped={false} transparent opacity={0.8} />
                </mesh>

                {/* 3. The Smart District Archway */}
                <group position={[0, 0, 6]}>
                    {/* Left Pillar */}
                    <Box args={[1.5, 8, 2]} position={[-8, 3.3, 0]}>
                        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.2} />
                    </Box>
                    <Box args={[0.2, 6, 2.1]} position={[-7.3, 3.3, 0]}>
                        <meshBasicMaterial color="#0ea5e9" toneMapped={false} transparent opacity={0.6} />
                    </Box>

                    {/* Right Pillar */}
                    <Box args={[1.5, 8, 2]} position={[8, 3.3, 0]}>
                        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.2} />
                    </Box>
                    <Box args={[0.2, 6, 2.1]} position={[7.3, 3.3, 0]}>
                        <meshBasicMaterial color="#0ea5e9" toneMapped={false} transparent opacity={0.6} />
                    </Box>

                    {/* Top Beam */}
                    <Box args={[17.5, 1.5, 2]} position={[0, 8, 0]}>
                        <meshStandardMaterial color="#0f172a" />
                    </Box>
                    <Box args={[17.6, 0.2, 2.1]} position={[0, 8, 0]}>
                        <meshBasicMaterial color="#4ade80" toneMapped={false} />
                    </Box>

                    {/* Welcome Text facing the camera */}
                    <Text
                        position={[0, 8, 1.1]}
                        fontSize={1.2}
                        color="#ffffff"
                        outlineWidth={0.04}
                        outlineColor="#0ea5e9"
                        anchorX="center"
                        anchorY="middle"
                    >
                        ENTERING URJA DISTRICT
                    </Text>
                </group>
            </group>
            {/* --- NEW: THE GRAND FINALE DESTINATION --- */}
            {/* Placed precisely where the mainRoadCurve ends (-250 on the Z axis) */}
            <group position={[0, 0, -255]}>
                {/* Glowing Terminal Plaza */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                    <circleGeometry args={[35, 64]} />
                    <meshStandardMaterial color="#0f172a" roughness={0.1} />
                </mesh>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
                    <ringGeometry args={[33, 34, 128]} />
                    <meshBasicMaterial color="#4ade80" toneMapped={false} transparent opacity={0.6} />
                </mesh>

                {/* Scaled-up Ultimate Urja HQ */}
                <UrjaBuilding position={[0, 0, -10]} scale={[2.5, 2.5, 2.5]} />

                {/* Welcome Hologram */}
                <group position={[0, 20, 10]}>
                    <HolographicInfo text="DESTINATION REACHED" />
                </group>
            </group>
        </>
    );
};