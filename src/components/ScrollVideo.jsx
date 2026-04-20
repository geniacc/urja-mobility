import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VolumeX, Volume2 } from "lucide-react";

export default function ScrollVideo({ src, title, aspect = "16 / 9" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [muted, setMuted] = useState(true);
  const [thumb, setThumb] = useState(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const isVis = e.isIntersecting;
          setVisible(isVis);
          if (isVis) {
            v.muted = true;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const handleLoaded = () => {
      try {
        v.currentTime = 0.01;
      } catch {}
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
      } catch {}
    };
    v.addEventListener("loadeddata", handleLoaded);
    v.addEventListener("seeked", handleSeeked);
    return () => {
      v.removeEventListener("loadeddata", handleLoaded);
      v.removeEventListener("seeked", handleSeeked);
    };
  }, []);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onUnmute = (e) => {
      const id = e.detail?.id;
      if (id && id !== src) {
        v.muted = true;
        setMuted(true);
      }
    };
    window.addEventListener("urja-video-unmute", onUnmute);
    return () => window.removeEventListener("urja-video-unmute", onUnmute);
  }, [src]);
  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    v.muted = next;
    if (!next) {
      window.dispatchEvent(new CustomEvent("urja-video-unmute", { detail: { id: src } }));
      v.play().catch(() => {});
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        background: "var(--bg-2)",
        borderRadius: "16px",
        border: "1px solid var(--border)",
        overflow: "hidden",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
      }}
    >
      <div style={{ position: "relative", aspectRatio: aspect, background: "black" }}>
        <video
          ref={ref}
          src={encodeURI(src)}
          preload="metadata"
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
        />
        {!visible && thumb && (
          <img
            src={thumb}
            alt={title}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", display: "block" }}
          />
        )}
        <button
          type="button"
          onClick={toggleMute}
          style={{
            position: "absolute",
            right: 12,
            bottom: 12,
            width: 44,
            height: 44,
            borderRadius: "999px",
            backdropFilter: "blur(10px)",
            background: "rgba(15,23,42,0.55)",
            border: "1px solid rgba(148,163,184,0.5)",
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 25px rgba(0,0,0,0.45)"
          }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
      <div style={{ padding: "0.8rem 1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{title}</div>
      </div>
    </motion.div>
  );
}
