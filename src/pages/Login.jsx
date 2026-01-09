import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74, 222, 128, ${p.opacity})`;
        ctx.fill();

        // Connect particles
        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(74, 222, 128, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
};

const InputField = ({ icon: Icon, type, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      <div style={{
        position: "absolute",
        left: "1rem",
        top: "50%",
        transform: "translateY(-50%)",
        color: focused ? "#4ade80" : "#64748b",
        transition: "color 0.3s ease"
      }}>
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          padding: "1rem 1rem 1rem 3rem",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${focused ? "#4ade80" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "0.75rem",
          color: "#fff",
          outline: "none",
          fontSize: "1rem",
          transition: "all 0.3s ease",
          boxShadow: focused ? "0 0 0 4px rgba(74, 222, 128, 0.1)" : "none"
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock login logic
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      position: "relative", 
      background: "#020617",
      overflow: "hidden"
    }}>
      <ParticleBackground />
      
      {/* Background Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "10%",
          left: "20%",
          width: "40vw",
          height: "40vw",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "35vw",
          height: "35vw",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "center" }}>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              style={{ 
                width: "60px", 
                height: "60px", 
                background: "linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)", 
                borderRadius: "16px", 
                margin: "0 auto 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
              }}
            >
              <img src="/assets/logo.png" alt="Logo" style={{ width: "32px", filter: "brightness(0) invert(1)" }} />
            </motion.div>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#fff" }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p style={{ color: "#94a3b8" }}>
              {isLogin ? "Enter your credentials to access your dashboard." : "Join the energy revolution today."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <InputField 
                    icon={User} 
                    type="text" 
                    placeholder="Full Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <InputField 
              icon={Mail} 
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <InputField 
              icon={Lock} 
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />

            {isLogin && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1.5rem" }}>
                <a href="#" style={{ fontSize: "0.9rem", color: "#60a5fa", textDecoration: "none" }}>Forgot Password?</a>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              style={{
                width: "100%",
                padding: "1rem",
                background: "linear-gradient(to right, #4ade80, #3b82f6)",
                border: "none",
                borderRadius: "0.75rem",
                color: "#fff",
                fontWeight: "600",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 10px 20px -5px rgba(59, 130, 246, 0.4)"
              }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (isLogin ? "Sign In" : "Sign Up")}
              {!loading && <ArrowRight size={20} />}
            </motion.button>
          </form>

          <div style={{ marginTop: "2rem", textAlign: "center", color: "#94a3b8" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={toggleMode}
              style={{ 
                background: "none", 
                border: "none", 
                color: "#4ade80", 
                fontWeight: "600", 
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "4px"
              }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
