import React, { useEffect, useMemo, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Environment, Stars, Sparkles, AdaptiveDpr, AdaptiveEvents, ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { motion } from "framer-motion";

// Modular Imports
import { Road } from "./3d/Environment/Road";
import { Rikshaw } from "./3d/Vehicles/Rikshaw";
import { Bird, WindTurbine, Forest, RockField } from "./3d/Environment/CityProps";
import { HeroEffects } from "./3d/HeroEffects";

const Scene = ({ isMobile }) => {
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
                <Stars radius={300} depth={120} count={isMobile ? 1200 : 3200} factor={3} saturation={0} fade speed={0.12} />
                <Stars radius={120} depth={60} count={isMobile ? 450 : 1200} factor={2} saturation={0.15} fade speed={0.07} />
            </group>

            {/* Core Infrastructure */}
            <Road />
            <Rikshaw scroll={scroll} />

            {/* Background Environment Props */}
            <group>
                <Forest count={isMobile ? 34 : 80} />
                <RockField count={isMobile ? 14 : 35} />
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
    const [isMobile, setIsMobile] = useState(false);

    const palette = useMemo(() => {
        const cols = (categories || []).map(c => c.color).filter(Boolean);
        return cols.length ? cols : ['#22c55e', '#3b82f6', '#f59e0b'];
    }, [categories]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return (
        <div className="home-hero" style={{ width: '100vw', height: '100vh', background: 'var(--bg)' }}>
            <Canvas
                dpr={isMobile ? [0.6, 0.9] : [0.8, 1.2]}
                shadows={!isMobile}
                camera={{ position: [5, 5, 10], fov: 45 }}
                gl={{ antialias: !isMobile, powerPreference: isMobile ? 'default' : 'high-performance' }}
            >
                <AdaptiveDpr />
                <AdaptiveEvents />

                {/* 5 Pages: 1.Hero, 2.About, 3.Products, 4.Contact, 5.Transition Curtain */}
                <ScrollControls pages={5} damping={0.3}>
                    <Suspense fallback={null}>
                        <Scene isMobile={isMobile} />
                    </Suspense>

                    <Scroll html style={{ width: '100%', height: '100%' }}>

                        {/* Page 1: Hero Header */}
                        <div className="hero-scroll-panel hero-scroll-center" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="hero-copy"
                                style={{
                                    position: 'relative',
                                    textAlign: 'center',
                                    background: 'radial-gradient(ellipse at center, rgba(5, 8, 16, 0.7) 0%, rgba(5, 8, 16, 0) 80%)',
                                    padding: '4rem 3rem',
                                    borderRadius: '50%',
                                    zIndex: 100
                                }}
                            >
                                {/* Background Glowing Orbs */}
                                <motion.div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '30%', height: '50%', borderRadius: '50%', background: `radial-gradient(circle, ${palette[0]}50 0%, transparent 70%)`, filter: 'blur(25px)', zIndex: -1 }} animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }} transition={{ duration: 4, repeat: Infinity }} />
                                <motion.div style={{ position: 'absolute', top: '10%', right: '-5%', width: '40%', height: '40%', borderRadius: '50%', background: `radial-gradient(circle, ${palette[1]}50 0%, transparent 70%)`, filter: 'blur(25px)', zIndex: -1 }} animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }} transition={{ duration: 5, repeat: Infinity }} />

                                <h1
                                    style={{
                                        fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
                                        fontWeight: 900,
                                        lineHeight: 1.1,
                                        marginBottom: '1.2rem',
                                        color: '#ffffff',
                                        letterSpacing: '-2px',
                                        display: 'block'
                                    }}
                                >
                                    {"Drive the Future".split(" ").map((word, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 35, scale: 0.85 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{
                                                delay: i * 0.12 + 0.15,
                                                duration: 0.6,
                                                type: "spring",
                                                stiffness: 140,
                                                damping: 14
                                            }}
                                            style={{
                                                display: 'inline-block',
                                                marginRight: '0.3em',
                                                color: '#ffffff',
                                                textShadow: `0px 4px 12px rgba(0,0,0,0.95), 0px 12px 36px rgba(0,0,0,0.8), 0px 0px 40px ${palette[1]}30`
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    ))}
                                </h1>

                                <motion.div
                                    initial={{ scaleX: 0, opacity: 0 }}
                                    animate={{ scaleX: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6, ease: "circOut" }}
                                    style={{
                                        height: '4px',
                                        width: '45%',
                                        background: `linear-gradient(90deg, transparent, ${palette[0]}, ${palette[1]}, transparent)`,
                                        borderRadius: '99px',
                                        margin: '0 auto 1.5rem auto',
                                        boxShadow: `0 0 20px ${palette[1]}80`
                                    }}
                                />

                                <motion.p
                                    className="hero-sub"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
                                    style={{
                                        fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                                        fontWeight: 600,
                                        maxWidth: '700px',
                                        margin: '0 auto',
                                        lineHeight: 1.6,
                                        color: '#f8fafc',
                                        letterSpacing: '0.5px',
                                        textShadow: '0px 3px 12px rgba(0,0,0,0.95), 0px 6px 24px rgba(0,0,0,0.7)'
                                    }}
                                >
                                    Powering clean journeys with smart energy solutions for the future of mobility
                                </motion.p>

                                <motion.div
                                    className="hero-chips"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.9 }}
                                    style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}
                                >
                                    {["EV", "Home", "Industrial"].map((label, i) => (
                                        <motion.span
                                            key={label}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
                                            whileHover={{ scale: 1.1, y: -3, boxShadow: `0 10px 25px ${palette[i % palette.length]}60` }}
                                            style={{
                                                padding: '0.5rem 1.4rem',
                                                borderRadius: '999px',
                                                fontWeight: 700,
                                                fontSize: '0.9rem',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                color: '#fff',
                                                background: palette[i % palette.length],
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {label}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Page 2: About Us (Clean Floating Styles) */}
                        <div className="hero-scroll-panel hero-scroll-left" style={{ height: '100vh', display: 'flex', alignItems: 'center', paddingLeft: '10vw' }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.08 } }
                                }}
                                className="hero-about"
                                style={{
                                    maxWidth: '650px',
                                    zIndex: 10
                                }}
                            >
                                <h2 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px', display: 'block' }}>
                                    {"About Us".split(" ").map((w, i) => (
                                        <motion.span
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, y: 20, scale: 0.95 },
                                                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 12 } }
                                            }}
                                            style={{
                                                display: 'inline-block',
                                                marginRight: '0.3em',
                                                color: '#ffffff',
                                                // High-intensity typography glow mapping directly to theme color
                                                textShadow: `0 0 8px #ffffff, 0 0 20px ${palette[0]}, 0 0 40px ${palette[0]}, 0px 4px 10px rgba(0,0,0,0.9)`
                                            }}
                                        >
                                            {w}
                                        </motion.span>
                                    ))}
                                </h2>
                                <motion.div
                                    variants={{
                                        hidden: { scaleX: 0, opacity: 0 },
                                        visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "circOut" } }
                                    }}
                                    style={{ height: '4px', width: '180px', transformOrigin: 'left', background: palette[0], borderRadius: '99px', margin: '0.75rem 0 1.5rem 0', boxShadow: `0 0 25px ${palette[0]}` }}
                                />
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                    }}
                                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.4rem)', fontWeight: 700, color: '#ffffff', lineHeight: 1.7, textShadow: '0px 3px 12px rgba(0,0,0,0.95), 0px 6px 20px rgba(0,0,0,0.65)' }}
                                >
                                    We build safe, reliable batteries<br />for mobility, homes, and industry.
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* Page 3: Products (Clean Floating Styles) */}
                        <div className="hero-scroll-panel hero-scroll-right" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10vw' }}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={{
                                    hidden: { opacity: 0, x: 30 },
                                    visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.08 } }
                                }}
                                className="hero-products"
                                style={{
                                    textAlign: 'right',
                                    maxWidth: '650px',
                                    zIndex: 10
                                }}
                            >
                                <h2 style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-1px', display: 'block' }}>
                                    {"Products".split(" ").map((w, i) => (
                                        <motion.span
                                            key={i}
                                            variants={{
                                                hidden: { opacity: 0, y: 20, scale: 0.95 },
                                                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 12 } }
                                            }}
                                            style={{
                                                display: 'inline-block',
                                                marginLeft: '0.3em',
                                                color: '#ffffff',
                                                // High-intensity typography glow mapping directly to theme color
                                                textShadow: `0 0 8px #ffffff, 0 0 20px ${palette[1 % palette.length]}, 0 0 40px ${palette[1 % palette.length]}, 0px 4px 10px rgba(0,0,0,0.9)`
                                            }}
                                        >
                                            {w}
                                        </motion.span>
                                    ))}
                                </h2>
                                <motion.div
                                    variants={{
                                        hidden: { scaleX: 0, opacity: 0 },
                                        visible: { scaleX: 1, opacity: 1, transition: { duration: 0.6, ease: "circOut" } }
                                    }}
                                    style={{ height: '4px', width: '180px', transformOrigin: 'right', marginLeft: 'auto', background: palette[1 % palette.length], borderRadius: '99px', margin: '0.75rem 0 1.5rem 0', boxShadow: `0 0 25px ${palette[1 % palette.length]}` }}
                                />
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 15 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                    }}
                                    style={{ fontSize: 'clamp(1.2rem, 2vw, 1.4rem)', fontWeight: 700, color: '#ffffff', marginBottom: '2.5rem', lineHeight: 1.7, textShadow: '0px 3px 12px rgba(0,0,0,0.95), 0px 6px 20px rgba(0,0,0,0.65)' }}
                                >
                                    Explore packs and systems engineered<br />for performance and safety.
                                </motion.p>
                                <motion.button
                                    onClick={() => navigate('/products')}
                                    className="hero-btn"
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.85, y: 15 },
                                        visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 110, delay: 0.15 } }
                                    }}
                                    whileHover={{ scale: 1.05, y: -2, boxShadow: `0 12px 30px ${palette[1]}80` }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: '1rem 2.2rem',
                                        borderRadius: '8px',
                                        border: 'none',
                                        fontWeight: 'bold',
                                        fontSize: '1.05rem',
                                        cursor: 'pointer',
                                        pointerEvents: 'auto',
                                        background: `linear-gradient(90deg, ${palette[1 % palette.length]}, ${palette[2 % palette.length]})`,
                                        color: '#fff',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.6)'
                                    }}
                                >
                                    See Catalog
                                </motion.button>
                            </motion.div>
                        </div>

                        {/* Page 4: Contact */}
                        <div className="hero-scroll-panel hero-scroll-center" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="hero-contact" style={{ textAlign: 'center', background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)', padding: '3rem' }}>
                                <motion.div className="hero-title center" style={{ fontSize: '3rem', fontWeight: 800, background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.5px' }}>
                                    {"Say Hello".split(" ").map((w, i) => (<motion.span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }}>{w}</motion.span>))}
                                </motion.div>
                                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ height: '3px', width: '40%', transformOrigin: 'center', background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, borderRadius: '99px', margin: '0.5rem auto' }} />
                                <div className="hero-sub" style={{ fontSize: '1.2rem', margin: '2rem auto', color: '#f8fafc', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Partner with us to power a cleaner future.</div>
                                <motion.button onClick={() => navigate('/contact')} className="hero-btn large" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }} style={{ padding: '1rem 2rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', pointerEvents: 'auto', background: `linear-gradient(90deg, ${palette[2 % palette.length]}, ${palette[0]})`, color: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>Contact Us</motion.button>
                            </motion.div>
                        </div>

                        {/* Page 5: Interactive Transition Curtain */}
                        <div className="hero-scroll-panel hero-scroll-center" style={{
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

                                <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '500px', lineHeight: 1.6, marginBottom: '3rem' }}>
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