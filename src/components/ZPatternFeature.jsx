import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";

export default function ZPatternFeature({ title, description, videoSrc, videoTitle, reverse = false, onOpenModal }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== "undefined" && window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <section style={{ padding: "6rem 0", overflow: "hidden" }}>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem"
        }}
      >
        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", width: "100%" }}>
            {reverse ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <VideoCard src={videoSrc} title={videoTitle} onOpen={onOpenModal} isHero />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>{title}</h2>
                  <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7 }}>{description}</p>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>{title}</h2>
                  <p style={{ fontSize: "1rem", color: "var(--muted)", lineHeight: 1.7 }}>{description}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <VideoCard src={videoSrc} title={videoTitle} onOpen={onOpenModal} isHero />
                </motion.div>
              </>
            )}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: reverse ? "row-reverse" : "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "4rem",
              width: "100%"
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: reverse ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              style={{ flex: "1 1 400px" }}
            >
              <h2 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>{title}</h2>
              <p style={{ fontSize: "1.125rem", color: "var(--muted)", lineHeight: 1.6 }}>{description}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: reverse ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ flex: "1 1 500px", maxWidth: "600px", width: "100%" }}
            >
              <VideoCard src={videoSrc} title={videoTitle} onOpen={onOpenModal} isHero />
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
