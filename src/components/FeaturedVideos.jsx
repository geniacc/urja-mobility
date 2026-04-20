import React, { useMemo } from "react";
import { motion } from "framer-motion";
import VideoCard from "./VideoCard";

export default function FeaturedVideos({ onOpen }) {
  const isWide = useMemo(() => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false), []);
  const videos = [
    { src: "/assets/driver response 1 .mp4", title: "Driver Response 1" },
    { src: "/assets/driver response 2 .mp4", title: "Driver Response 2" },
    { src: "/assets/driver response 3 .mp4", title: "Driver Response 3" },
    { src: "/assets/driver response 4 .mp4", title: "Driver Response 4" },
    { src: "/assets/problem fixing 1 .mp4", title: "Problem Fixing" }
  ];
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="section-title"
            style={{
              background: "linear-gradient(to right, #fff, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Featured Videos
          </h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p className="section-subtitle">Real-world performance and testimonials.</p>
            <a
              href="/news-media"
              style={{
                color: "var(--primary)",
                fontWeight: 600
              }}
            >
              View All Videos →
            </a>
          </div>
        </motion.div>

        {isWide ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.3fr)",
              gap: "1.5rem"
            }}
          >
            <VideoCard src={videos[0].src} title={videos[0].title} onOpen={onOpen} isHero />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "1.5rem"
              }}
            >
              {videos.slice(1).map((v) => (
                <VideoCard key={v.src} src={v.src} title={v.title} onOpen={onOpen} />
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem"
            }}
          >
            {videos.map((v, i) => (
              <VideoCard key={v.src} src={v.src} title={v.title} onOpen={onOpen} isHero={i === 0} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
