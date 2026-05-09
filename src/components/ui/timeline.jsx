"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, isMobile, data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Helper function to automatically fix asset paths
  const fixAssetPath = (path) => {
    if (!path) return path;

    // Already fixed
    if (path.includes(import.meta.env.BASE_URL)) return path;

    // Fix absolute asset paths
    if (path.startsWith("/assets/")) {
      return `${import.meta.env.BASE_URL}assets/${path.replace("/assets/", "")}`;
    }

    return path;
  };

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
          padding: isMobile ? "2rem 1rem" : "4rem 1rem",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "1.5rem" : "2rem",
            marginBottom: "1rem",
            color: "var(--text)",
            fontWeight: 800,
          }}
        >
          A timeline of highlights across our recent milestones.
        </h2>
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
        {data.map((item, index) => {
          // Automatically fix image paths if present
          const image =
            item.image ||
            item.img ||
            item.previewSrc ||
            item.thumbnail;

          const fixedImage = fixAssetPath(image);

          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
                gap: isMobile ? "1rem" : "2rem",
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
                    fontSize: isMobile ? "1.5rem" : "2.5rem",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.title}
                </h3>
              </motion.div>

              <div
                style={{
                  width: "100%",
                  paddingLeft: isMobile ? "3.5rem" : "0",
                }}
              >
                {/* Timeline Image */}
                {fixedImage && (
                  <motion.img
                    src={fixedImage}
                    alt={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{
                      width: "100%",
                      maxWidth: "700px",
                      borderRadius: "20px",
                      marginBottom: "1.5rem",
                      objectFit: "cover",
                      border: "1px solid var(--border)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                    }}
                  />
                )}

                {/* Timeline Content */}
                {item.content}
              </div>
            </div>
          );
        })}

        {/* Vertical Progress Line */}
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
              width: "100%",
              background:
                "linear-gradient(to bottom, #ff8c00, #ff5e00, #ff8c00)",
              borderRadius: "999px",
              boxShadow: "0 0 20px rgba(255,140,0,0.7)",
            }}
          />
        </div>
      </div>
    </div>
  );
};