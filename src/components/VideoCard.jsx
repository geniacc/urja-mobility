import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

// 1. Added 'poster' to the props
export default function VideoCard({ src, title, onOpen, isHero, poster }) {
  const ref = useRef(null);
  const wrapRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [thumb, setThumb] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inited, setInited] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          setVisible(e.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (hovered && visible) {
      v.muted = true;
      v.play().catch(() => { });
    } else {
      v.pause();
      v.currentTime = 0;
    }
  }, [hovered, visible]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // If a custom poster is provided, we don't need to generate a canvas thumbnail
    if (!visible || inited || poster) return;

    const handleLoaded = () => {
      try {
        v.currentTime = 0.01;
      } catch { }
    };
    const handleSeeked = () => {
      try {
        const w = v.videoWidth || 1280;
        const h = v.videoHeight || 720;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(v, 0, 0, w, h);
          const url = canvas.toDataURL("image/jpeg", 0.85);
          setThumb(url);
        }
        v.pause();
        v.currentTime = 0;
        setInited(true);
      } catch { }
    };
    v.addEventListener("loadeddata", handleLoaded);
    v.addEventListener("seeked", handleSeeked);
    return () => {
      v.removeEventListener("loadeddata", handleLoaded);
      v.removeEventListener("seeked", handleSeeked);
    };
  }, [visible, inited, poster]);

  const glow = hovered ? "0 12px 30px rgba(34,197,94,0.25), 0 10px 30px rgba(0,0,0,0.35)" : "0 10px 30px rgba(0,0,0,0.35)";

  return (
    <motion.div
      ref={wrapRef}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      style={{
        background: "var(--bg-2)",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: glow
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: isHero ? "16 / 9" : "16 / 9",
          background: "black"
        }}
      >
        <video
          ref={ref}
          src={visible ? encodeURI(src) : ""}
          preload={visible ? "metadata" : "none"}
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block"
          }}
        />

        {/* 2. Logic updated: Show the custom poster first. If no poster, show the canvas thumb */}
        {!hovered && (poster || thumb) && (
          <img
            src={poster || thumb}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain", // Use cover if you want it to fill the black bars!
              display: "block"
            }}
          />
        )}
        <button
          type="button"
          onClick={() => onOpen({ src, title, poster, subtitle: src.replace('.mp4', '.vtt') })} // Passes poster/subs to modal
          style={{
            position: "absolute",
            inset: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered ? "linear-gradient(to bottom, rgba(2,6,23,0.25), rgba(2,6,23,0.6))" : "linear-gradient(to bottom, rgba(2,6,23,0.15), rgba(2,6,23,0.45))",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
          aria-label={`Play ${title}`}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: isMobile ? (isHero ? 56 : 48) : (isHero ? 68 : 56),
              height: isMobile ? (isHero ? 56 : 48) : (isHero ? 68 : 56),
              borderRadius: "999px",
              backdropFilter: "blur(10px)",
              background: "rgba(15,23,42,0.55)",
              border: "1px solid rgba(148,163,184,0.5)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.45)"
            }}
          >
            <Play size={isMobile ? (isHero ? 22 : 20) : (isHero ? 26 : 22)} />
          </span>
        </button>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: isMobile ? "0.5rem 0.75rem" : "0.6rem 0.9rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(10px)",
            background: "rgba(15,23,42,0.45)",
            borderTop: "1px solid rgba(148,163,184,0.2)"
          }}
        >
          <div style={{ fontWeight: 600, color: "var(--text)" }}>{title}</div>
        </div>
      </div>
    </motion.div>
  );
}