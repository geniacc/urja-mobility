import React, { useMemo, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Sparkles, AdaptiveDpr, AdaptiveEvents, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { motion } from "framer-motion";

// Modular Imports
import { Road } from "./3d/Environment/Road";
import { Rikshaw } from "./3d/Vehicles/Rikshaw";
import { Bird, WindTurbine, Forest, RockField } from "./3d/Environment/CityProps";
import { HeroEffects } from "./3d/HeroEffects"; // Based on your first screenshot showing this is in the 3d folder

const Scene = () => {
    const scroll = useScroll();

    return (
        <>
            {/* RICH, BEAUTIFUL LIGHTING WITH FIXED HORIZON */}
            <color attach="background" args={['#050810']} />
            <fog attach="fog" args={['#050810', 30, 130]} />

            <ambientLight intensity={0.15} color="#e0f2fe" />
            <hemisphereLight skyColor="#bae6fd" groundColor="#0f172a" intensity={0.3} />

            <directionalLight
                position={[40, 60, -40]}
                intensity={2.5}
                color="#fefce8"
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-camera-left={-50}
                shadow-camera-right={50}
                shadow-camera-top={50}
                shadow-camera-bottom={-50}
            />

            <Environment preset="city" />

            <group>
                <Stars radius={300} depth={120} count={3200} factor={3} saturation={0} fade speed={0.12} />
                <Stars radius={120} depth={60} count={1200} factor={2} saturation={0.15} fade speed={0.07} />
            </group>

            {/* Core Infrastructure */}
            <Road />
            <Rikshaw scroll={scroll} />

            {/* Background Environment Props */}
            <group>
                <Forest count={80} />
                <RockField count={35} />
                <WindTurbine position={[-80, 0, -150]} rotation={[0, 0.5, 0]} />
                <WindTurbine position={[80, 0, -150]} rotation={[0, -0.5, 0]} />
                <Bird position={[0, 25, -50]} speed={0.5} range={30} />
                <Bird position={[10, 28, -60]} speed={0.6} range={35} />
                <Bird position={[-10, 22, -40]} speed={0.4} range={25} />
            </group>

            <Sparkles count={20} scale={[160, 40, 160]} size={6} speed={0.35} opacity={0.6} color="#fef08a" position={[0, 20, -100]} />
            <HeroEffects />
        </>
    );
};

export default function Hero({ categories }) {
    const navigate = useNavigate();

    const palette = useMemo(() => {
        const cols = (categories || []).map(c => c.color).filter(Boolean);
        return cols.length ? cols : ['#22c55e', '#3b82f6', '#f59e0b'];
    }, [categories]);

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'var(--bg)' }}>
            <Canvas
                dpr={[0.8, 1.2]}
                shadows
                camera={{ position: [5, 5, 10], fov: 45 }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
                <AdaptiveDpr />
                <AdaptiveEvents />

                {/* 5 Pages: 1.Hero, 2.About, 3.Products, 4.Contact, 5.Transition Curtain */}
                <ScrollControls pages={5} damping={0.3}>
                    {/* Crucial Suspense Wrapper to prevent crashes while 3D models load */}
                    <Suspense fallback={null}>
                        <Scene />
                    </Suspense>

                    <Scroll html style={{ width: '100%', height: '100%' }}>

                        {/* Page 1: Hero Header */}
                        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                                animate={{ opacity: 1, y: [0, -2, 0], scale: 1 }}
                                transition={{ duration: 0.7, y: { repeat: Infinity, duration: 8, ease: "easeInOut" } }}
                                className="hero-copy"
                                style={{ position: 'relative', textAlign: 'center' }}
                            >
                                <motion.div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, ${palette[0]}60 0%, transparent 70%)`, filter: 'blur(12px)', zIndex: -1 }} animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 4, repeat: Infinity }} />
                                <motion.div style={{ position: 'absolute', top: '10%', left: '20%', width: '50%', height: '40%', borderRadius: '50%', background: `radial-gradient(circle, ${palette[1]}60 0%, transparent 70%)`, filter: 'blur(12px)', zIndex: -1 }} animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity }} />
                                <motion.div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '45%', height: '55%', borderRadius: '50%', background: `radial-gradient(circle, ${palette[2 % palette.length]}60 0%, transparent 70%)`, filter: 'blur(12px)', zIndex: -1 }} animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 6, repeat: Infinity }} />

                                <motion.h1
                                    className="hero-headline"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', lineHeight: 1.1, marginBottom: '1rem', color: '#fff', letterSpacing: '-1.2px', textShadow: '0 24px 48px rgba(0,0,0,0.55)', WebkitTextStroke: '0.6px rgba(0,0,0,0.25)' }}
                                >
                                    {"Drive the Future".split(" ").map((word, i) => (
                                        <motion.span key={i} initial={{ opacity: 0, y: 50, rotate: 5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: i * 0.12 + 0.1, type: "spring", stiffness: 100, damping: 20 }} style={{ display: 'inline-block', marginRight: '0.3em' }}>{word}</motion.span>
                                    ))}
                                </motion.h1>

                                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: [1, 0.9, 1] }} transition={{ duration: 0.8, delay: 0.3, repeat: Infinity, repeatDelay: 2 }} style={{ height: '4px', width: '60%', transformOrigin: 'left', background: `linear-gradient(90deg, ${palette[0]}, ${palette[1]}, ${palette[2 % palette.length]})`, boxShadow: '0 10px 30px rgba(0,0,0,0.25)', borderRadius: '99px', margin: '0 auto 1rem auto' }} />

                                <motion.p
                                    className="hero-sub"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8, background: `linear-gradient(90deg, ${palette[0]}, ${palette[1]}, ${palette[2 % palette.length]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 10px 32px rgba(0,0,0,0.6)' }}
                                >
                                    Explore Urja’s world of fun, clean energy.
                                </motion.p>

                                <motion.div className="hero-chips" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: [0, -2, 0] }} transition={{ duration: 0.5, delay: 0.35 }} style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                                    {["EV", "Home", "Industrial"].map((label, i) => (
                                        <motion.span key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: [0, -2, 0] }} transition={{ delay: 0.45 + i * 0.1, duration: 2, repeat: Infinity }} whileHover={{ scale: 1.08, rotate: 1 }} style={{ padding: '0.4rem 0.8rem', borderRadius: '999px', fontWeight: 600, color: '#fff', background: palette[i % palette.length], boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>{label}</motion.span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Page 2: About Us */}
                        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw' }}>
                            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="hero-about">
                                <motion.div className="hero-title" style={{ fontSize: '3rem', fontWeight: 800, background: `linear-gradient(90deg, ${palette[0]}, ${palette[1 % palette.length]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px', textShadow: '0 18px 48px rgba(0,0,0,0.6)' }}>
                                    {"About Us".split(" ").map((w, i) => (<motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>))}
                                </motion.div>
                                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ height: '3px', width: '40%', transformOrigin: 'left', background: `linear-gradient(90deg, ${palette[0]}, ${palette[1 % palette.length]})`, borderRadius: '99px', margin: '0.5rem 0' }} />
                                <div className="hero-sub" style={{ fontSize: '1.2rem', color: '#cbd5e1' }}>We build safe, reliable batteries<br />for mobility, homes, and industry.</div>
                            </motion.div>
                        </div>

                        {/* Page 3: Products */}
                        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw' }}>
                            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="hero-products" style={{ textAlign: 'right' }}>
                                <motion.div className="hero-title" style={{ fontSize: '3rem', fontWeight: 800, background: `linear-gradient(90deg, ${palette[1 % palette.length]}, ${palette[2 % palette.length]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px', textShadow: '0 18px 48px rgba(0,0,0,0.6)' }}>
                                    {"Products".split(" ").map((w, i) => (<motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>))}
                                </motion.div>
                                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ height: '3px', width: '40%', transformOrigin: 'right', marginLeft: 'auto', background: `linear-gradient(90deg, ${palette[1 % palette.length]}, ${palette[2 % palette.length]})`, borderRadius: '99px', margin: '0.5rem 0' }} />
                                <div className="hero-sub" style={{ fontSize: '1.2rem', color: '#cbd5e1', marginBottom: '1.5rem' }}>Explore packs and systems engineered<br />for performance and safety.</div>
                                <motion.button onClick={() => navigate('/products')} className="hero-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer', pointerEvents: 'auto', background: `linear-gradient(90deg, ${palette[1 % palette.length]}, ${palette[2 % palette.length]})`, color: '#fff' }}>See Catalog</motion.button>
                            </motion.div>
                        </div>

                        {/* Page 4: Contact */}
                        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="hero-contact" style={{ textAlign: 'center' }}>
                                <motion.div className="hero-title center" style={{ fontSize: '3rem', fontWeight: 800, background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                                    {"Say Hello".split(" ").map((w, i) => (<motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>))}
                                </motion.div>
                                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ height: '3px', width: '40%', transformOrigin: 'center', background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, borderRadius: '99px', margin: '0.5rem auto' }} />
                                <div className="hero-sub center" style={{ fontSize: '1.2rem', margin: '2rem auto', color: '#cbd5e1' }}>Partner with us to power a cleaner future.</div>
                                <motion.button onClick={() => navigate('/contact')} className="hero-btn large" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', pointerEvents: 'auto', background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, color: '#fff' }}>Contact Us</motion.button>
                            </motion.div>
                        </div>

                        {/* Page 5: The Interactive Transition Curtain */}
                        <div style={{
                            height: '100vh',
                            width: '100%',
                            background: '#0f172a',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 -20px 50px rgba(0,0,0,0.8)',
                            overflow: 'hidden',
                            pointerEvents: 'auto'
                        }}>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(14,165,233,1) 0%, transparent 60%)', borderRadius: '50%', top: '-20%', left: '-10%', filter: 'blur(60px)', zIndex: 0 }}
                            />
                            <motion.div
                                animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                style={{ position: 'absolute', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(74,222,128,1) 0%, transparent 60%)', borderRadius: '50%', bottom: '-20%', right: '-10%', filter: 'blur(60px)', zIndex: 0 }}
                            />

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                style={{ textAlign: 'center', color: 'white', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1rem' }}>
                                    The Journey <span style={{ color: '#0ea5e9' }}>Continues</span>
                                </h2>

                                <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '500px', lineHeight: 1.6, marginBottom: '3rem' }}>
                                    You've seen the vision. Now explore the high-performance battery packs powering the mobility ecosystem.
                                </p>

                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                                    onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
                                >
                                    <div style={{ width: '26px', height: '42px', border: '2px solid #cbd5e1', borderRadius: '15px', display: 'flex', justifyContent: 'center', padding: '5px' }}>
                                        <motion.div
                                            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "circInOut" }}
                                            style={{ width: '4px', height: '8px', background: '#4ade80', borderRadius: '2px' }}
                                        />
                                    </div>
                                    <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                                        Scroll to Catalog
                                    </span>
                                </motion.div>
                            </motion.div>
                        </div>
                    </Scroll>
                </ScrollControls>
            </Canvas>
        </div>
    );
}