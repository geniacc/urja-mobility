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
  const [selectedRole, setSelectedRole] = useState("Customer");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth <= 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "1120px",
          display: isMobile ? "flex" : "grid",
          flexDirection: isMobile ? "column-reverse" : undefined,
          gridTemplateColumns: isMobile ? undefined : "minmax(0, 1.1fr) minmax(0, 0.9fr)",
          gap: isMobile ? "1.75rem" : "3rem",
          alignItems: "stretch",
          padding: isMobile ? "1.5rem 1.25rem 2.5rem" : "2rem"
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#e5e7eb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.5rem 1.25rem 1.5rem 0"
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.35rem 0.9rem",
              borderRadius: "999px",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(148, 163, 184, 0.4)",
              marginBottom: "1rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#a5b4fc",
              gap: "0.5rem"
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "999px",
                background: "radial-gradient(circle at 30% 30%, #4ade80, #16a34a)"
              }}
            />
            Secure Partner Access
          </div>
          <h1
            style={{
              fontSize: "2.4rem",
              lineHeight: 1.1,
              fontWeight: 800,
              marginBottom: "0.75rem"
            }}
          >
            Powering every{" "}
            <span style={{ color: "#4ade80" }}>battery</span> movement you make.
          </h1>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "0.98rem",
              maxWidth: "32rem",
              marginBottom: "1.5rem"
            }}
          >
            Monitor deployments, track performance, and manage your Battery-as-a-Service
            operations from one intelligent control room.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.85rem",
              marginBottom: "1.5rem"
            }}
          >
            {[
              { label: "Real-time Fleet Health", accent: "#4ade80" },
              { label: "Energy Analytics", accent: "#38bdf8" },
              { label: "Intelligent Alerts", accent: "#f97316" },
              { label: "Multi-city Rollouts", accent: "#a855f7" }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.45rem 0.7rem",
                  borderRadius: "0.75rem",
                  background: "rgba(15, 23, 42, 0.85)",
                  border: "1px solid rgba(148, 163, 184, 0.35)"
                }}
              >
                <div
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "999px",
                    background: item.accent,
                    boxShadow: `0 0 12px ${item.accent}55`
                  }}
                />
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "#e5e7eb",
                    fontWeight: 500
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              color: "#9ca3af",
              fontSize: "0.9rem"
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#e5e7eb"
                }}
              >
                10,000+
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}
              >
                Batteries Deployed
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#e5e7eb"
                }}
              >
                24/7
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }}
              >
                Iot Real-Time Monitoring
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "1.8rem",
              display: "flex",
              gap: "1.25rem",
              alignItems: "stretch"
            }}
          >
            <div
              style={{
                flex: "1 1 0",
                borderRadius: "1.1rem",
                padding: "1rem",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.75))",
                border: "1px solid rgba(148,163,184,0.4)",
                boxShadow: "0 18px 40px -24px rgba(0,0,0,0.9)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem"
                }}
              >
                <span
                  style={{
                    fontSize: "0.78rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#9ca3af",
                    fontWeight: 600
                  }}
                >
                  Live Pack Status
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#22c55e",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem"
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "999px",
                      background: "#22c55e",
                      boxShadow: "0 0 10px #22c55e88"
                    }}
                  />
                  Stable
                </span>
              </div>
              {[
                { label: "Online packs", value: "96%", color: "#4ade80" },
                { label: "Charging nodes", value: "84%", color: "#38bdf8" },
                { label: "Field tickets", value: "7 open", color: "#f97316" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: idx === 2 ? 0 : "0.55rem",
                    gap: "0.6rem"
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 36,
                      borderRadius: 999,
                      background:
                        idx === 2
                          ? "linear-gradient(to top,#f97316,#fed7aa)"
                          : `linear-gradient(to top,${item.color},#bbf7d0)`
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.78rem",
                        color: "#e5e7eb"
                      }}
                    >
                      <span>{item.label}</span>
                      <span style={{ color: item.color }}>{item.value}</span>
                    </div>
                    <div
                      style={{
                        marginTop: "0.25rem",
                        height: 4,
                        borderRadius: 999,
                        background: "rgba(31,41,55,1)",
                        overflow: "hidden"
                      }}
                    >
                      <div
                        style={{
                          width:
                            idx === 0 ? "96%" : idx === 1 ? "84%" : "45%",
                          height: "100%",
                          background: `linear-gradient(90deg,${item.color},#22c55e)`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                width: "10.5rem",
                borderRadius: "1.1rem",
                padding: "0.9rem 0.85rem",
                background:
                  "radial-gradient(circle at 0% 0%, rgba(56,189,248,0.25), rgba(15,23,42,0.95))",
                border: "1px solid rgba(148,163,184,0.4)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 18px 40px -24px rgba(0,0,0,0.9)"
              }}
            >
              <div
                style={{
                  fontSize: "0.78rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "#e5e7eb",
                  marginBottom: "0.4rem",
                  fontWeight: 600
                }}
              >
                Load Curve
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.25rem",
                  marginBottom: "0.6rem"
                }}
              >
                {[38, 52, 70, 60, 82, 64, 48].map((h, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: 64,
                      borderRadius: 999,
                      background:
                        "linear-gradient(to top,rgba(59,130,246,0.1),rgba(15,23,42,0.9))",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "flex-end"
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: `${h}%`,
                        background:
                          "linear-gradient(to top,#38bdf8,#4ade80)"
                      }}
                    />
                  </div>
                ))}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#9ca3af",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <span>Off-peak</span>
                <span>Peak</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            width: "100%",
            maxWidth: "420px",
            justifySelf: "center",
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
              <img src={import.meta.env.BASE_URL + "assets/logo.png"} alt="Logo" style={{ width: "32px", filter: "brightness(0) invert(1)" }} />
            </motion.div>
            <div
              style={{
                display: "inline-flex",
                padding: "0.25rem",
                borderRadius: "999px",
                background: "rgba(15,23,42,0.9)",
                border: "1px solid rgba(148,163,184,0.35)",
                marginBottom: "1.25rem"
              }}
            >
              {["Customer", "Partner", "Internal"].map((role) => {
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    style={{
                      padding: "0.3rem 0.9rem",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: active ? "linear-gradient(90deg,#4ade80,#22c55e)" : "transparent",
                      color: active ? "#020617" : "#9ca3af",
                      boxShadow: active ? "0 0 0 1px rgba(22,163,74,0.5)" : "none",
                      transition: "all 0.2s ease",
                      minWidth: "5.2rem"
                    }}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem", color: "#fff" }}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p style={{ color: "#94a3b8" }}>
              {isLogin
                ? selectedRole === "Internal"
                  ? "Sign in to manage operations and internal tools."
                  : selectedRole === "Partner"
                    ? "Access deployments, billing, and partner insights."
                    : "Enter your credentials to access your dashboard."
                : "Join the energy revolution today."}
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
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />

            <InputField
              icon={Lock}
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
