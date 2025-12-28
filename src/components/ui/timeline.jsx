"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="timeline-root"
      ref={containerRef}
      style={{
        width: "100%",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            color: "var(--text)",
            fontWeight: 800,
          }}
        >
          Changelog from our journey
        </h2>
        <p style={{ color: "var(--text-muted)", maxWidth: "520px" }}>
          A timeline of highlights across our recent milestones.
        </p>
      </div>

      <div
        ref={ref}
        style={{
          position: "relative",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "4rem",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "300px 1fr",
              gap: "2rem",
              paddingTop: index === 0 ? "1rem" : "3rem",
              alignItems: "start",
            }}
          >
            <motion.div
              style={{
                position: "sticky",
                top: "100px",
                alignSelf: "start",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                zIndex: 2,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              animate={{ y: [0, -3, 0] }}
            >
              <div
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--bg-2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    background: "var(--bg-3)",
                    border: "1px solid var(--border)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--text-muted)",
                }}
              >
                {item.title}
              </h3>
            </motion.div>

            <div style={{ width: "100%" }}>{item.content}</div>
          </div>
        ))}

        <div
          style={{
            position: "absolute",
            left: "20px",
            top: 0,
            width: "2px",
            overflow: "hidden",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 99%)",
            height: height + "px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="timeline-gradient-fill"
          />
        </div>
      </div>
    </div>
  );
}
