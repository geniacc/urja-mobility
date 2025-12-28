import React, { useState } from "react";
import { Timeline } from "./timeline";
import { motion } from "framer-motion";

const Selector = ({ ids, label }) => {
  const images = ids.map((id) => `/assets/${id}.png`);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) setActive((p) => (p + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [paused, images.length]);
  return (
    <div
      className="selector"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <motion.div
        key={active}
        className="selector-main"
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={images[active]}
          alt={`${label} image ${ids[active]}`}
          className="selector-main-img"
        />
        <motion.div
          className="selector-caption"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <div style={{ fontWeight: 700 }}>{label}</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            Frame {ids[active]}
          </div>
        </motion.div>
      </motion.div>
      <div className="selector-thumbs">
        {images.map((src, i) => (
          <motion.button
            key={i}
            className={i === active ? "selector-thumb active" : "selector-thumb"}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src={src} alt={`thumb ${i + 1}`} className="selector-thumb-img" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default function TimelineDemo() {
  const groups = Array.from({ length: 4 }).map((_, gi) => {
    const start = gi * 3 + 1;
    const ids = [start, start + 1, start + 2];
    return {
      title: `2024 - Quarter ${gi + 1}`,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.95rem",
              marginBottom: "1rem",
            }}
          >
            Highlights from Q{gi + 1}: launches, partnerships, and product updates.
          </p>
          <Selector ids={ids} label={`Quarter ${gi + 1}`} />
        </motion.div>
      ),
    };
  });

  return (
    <div style={{ width: "100%" }}>
      <Timeline data={groups} />
    </div>
  );
}
