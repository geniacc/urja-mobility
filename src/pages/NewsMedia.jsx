import React, { useState } from "react";
import { motion } from "framer-motion";
import { YoutubeFilled, InstagramFilled, ReadOutlined, PlayCircleFilled, FacebookFilled, PlayCircleOutlined } from "@ant-design/icons";
import { ExternalLink, ChevronRight, Twitter, Facebook } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Anagh Ojha: Engineering a Sustainable Future",
    publication: "Audience Reports",
    date: "Featured Article",
    image: "/assets/Anagh-Ojha.png",
    link: "https://audiencereports.in/anagh-ojha-engineering-a-sustainable-future-wit/",
    description: "Profile of Urja Mobility’s Co-founder and CTO, spotlighting purpose-led leadership and the Battery-as-a-Service model enabling accessible EV adoption through battery swapping. A story of resilience and impact, focused on democratizing clean mobility across India."
  },
  {
    id: 2,
    title: "Transforming EV Infrastructure",
    publication: "The Industry Outlook",
    date: "Editor's Choice",
    image: "/assets/9nsm7450x308-2.jpg",
    link: "https://www.theindustryoutlook.com/startups/editor-choice/urja-mobility-transforming-ev-infrastructure-through-advanced-power-and-energy-storage-solutions-nwid-10628.html",
    description: "Deep dive into Urja Mobility’s battery leasing across B2B/B2C, lifecycle approach from design to deployment, and performance enhancements for electric three-wheelers and ESS—expanding across North/East India and major cities like Bengaluru, Hyderabad, and Pune."
  },
  {
    id: 3,
    title: "Eastman and Urja Mobility sign MoU",
    publication: "Manufacturing Today India",
    date: "Partnership",
    image: "/assets/eastman-urja-mobility-1536x864.jpg",
    link: "https://www.manufacturingtodayindia.com/eastman-urja-mobility-sign-mou",
    description: "Strategic partnership to accelerate EV adoption: supply of 20,000+ lithium-ion batteries for electric three-wheelers and integration of Urja Mobility’s IoT/software for remote monitoring and analytics—advancing accessible, reliable, and sustainable electric mobility nationwide."
  },
  {
    id: 4,
    title: "B2C Battery Leasing for E‑Rickshaw Drivers",
    publication: "Energetica India",
    date: "Program Update",
    image: "/assets/OrYifTRjraMAnvfrqoa8ONFzyitu779nUfInwrUM5Vzo2gUe8QdLej.jpg",
    link: "https://www.energetica-india.net/news/urja-mobility-introduces-b2c-battery-leasing-program-for-e-rickshaw-drivers",
    description: "Urja Mobility launches B2C battery leasing across 10 cities with monthly plans, option to own in 12–24 months, AI-enabled BMS for health and safety, and service centers to ensure 26+ uptime days/month. Target: onboard 50,000 drivers and accelerate India’s clean mobility goals."
  }
];

const videos = [
  {
    id: 3,
    title: "Urja Mobility Podcast",
    platform: "youtube",
    youtubeId: "NXm7ppf8yAA",
    embedUrl: "https://www.youtube.com/embed/NXm7ppf8yAA",
    link: "https://www.youtube.com/watch?v=NXm7ppf8yAA",
    thumb: "https://img.youtube.com/vi/NXm7ppf8yAA/hqdefault.jpg"
  },
  {
    id: 4,
    title: "Urja Mobility Shorts",
    platform: "youtube",
    youtubeId: "K8WbAQL68jk",
    embedUrl: "https://www.youtube.com/embed/K8WbAQL68jk",
    link: "https://www.youtube.com/watch?v=K8WbAQL68jk",
    thumb: "https://img.youtube.com/vi/K8WbAQL68jk/hqdefault.jpg"
  },
  {
    id: 5,
    title: "Urja Mobility Raises ₹100 Cr | CNBC TV18",
    platform: "youtube",
    youtubeId: "LEYXBblfOYM",
    embedUrl: "https://www.youtube.com/embed/LEYXBblfOYM",
    link: "https://www.youtube.com/watch?v=LEYXBblfOYM",
    thumb: "https://img.youtube.com/vi/LEYXBblfOYM/hqdefault.jpg"
  },
  {
    id: 6,
    title: "Urjamobility Bags ₹100 Crore | Startup Central",
    platform: "youtube",
    youtubeId: "sevkWqvT_kg",
    embedUrl: "https://www.youtube.com/embed/sevkWqvT_kg",
    link: "https://www.youtube.com/watch?v=sevkWqvT_kg",
    thumb: "https://img.youtube.com/vi/sevkWqvT_kg/hqdefault.jpg"
  },
  {
    id: 7,
    title: "Urja Global Limited Electric Battery Launch",
    platform: "facebook",
    embedUrl:
      "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Furjagloballimited%2Fvideos%2F-urja-global-limited-successfully-launched-the-new-urja-electric-vehicle-battery%2F1183946327068800%2F&show_text=false",
    link: "https://www.facebook.com/urjagloballimited/videos/-urja-global-limited-successfully-launched-the-new-urja-electric-vehicle-battery/1183946327068800/",
    thumb: null
  }
];

const social = [
  {
    id: 5,
    title: "Watch on Instagram",
    subtitle: "Urja Mobility Reel",
    link: "https://www.instagram.com/reel/DAa3QYpvXT_/",
    platform: "instagram",
    bg: "linear-gradient(135deg, #581c87 0%, #831843 100%)"
  },
  {
    id: 6,
    title: "Follow on X",
    subtitle: "@MobilityUrja",
    link: "https://x.com/MobilityUrja/with_replies",
    platform: "x",
    bg: "linear-gradient(135deg, #0b1220 0%, #111827 100%)"
  },
  {
    id: 7,
    title: "Follow on Facebook",
    subtitle: "Urja Mobility",
    link: "https://www.facebook.com/share/1Ba3soCdek/",
    platform: "facebook",
    bg: "linear-gradient(135deg, #0a3a8a 0%, #05234f 100%)"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 16 }
  }
};

const initiativeItemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" }
  })
};

const initiatives = [
  {
    id: "b2c",
    title: "B2C Battery Leasing Program",
    lines: [
      "Monthly leasing for high‑performance lithium‑ion batteries with optional ownership after 12–24 months reduces upfront costs for e‑rickshaw drivers.",
      "AI‑enabled BMS and analytics monitor health, predict issues, and optimize thermal performance. Dedicated service centers support installation and maintenance to achieve 26+ uptime days per month."
    ]
  },
  {
    id: "manufacturing",
    title: "Supply Chain & Manufacturing Scale‑up",
    lines: [
      "Strengthen manufacturing partnerships and local assembly for faster deployment and reliable quality.",
      "Expand certified QC pipelines, inbound logistics, and after‑sales spares coverage across key regions."
    ]
  },
  {
    id: "intelligence",
    title: "Battery Intelligence Platform",
    lines: [
      "Telemetry‑driven insights for SoH/SoC, thermal profiles, and predictive maintenance to maximize lifecycle value.",
      "Fleet dashboards enable real‑time visibility, alerts, and optimization across operating conditions."
    ]
  },
  {
    id: "charging",
    title: "Charging & Swapping Infrastructure",
    lines: [
      "Deploy modular swap stations and rapid charging pilots optimized for commercial three‑wheelers.",
      "Standardized interfaces, safe operations, and uptime‑first processes for dependable daily routes."
    ]
  },
  {
    id: "esg",
    title: "ESG & Community Impact",
    lines: [
      "Onboard and train drivers, improve earnings stability, and enable financial inclusion via affordable plans.",
      "Focus on safety, data transparency, and community programs aligned with clean‑mobility goals."
    ]
  }
];

const gallery = [
  { src: "/assets/eastman-urja-mobility-1536x864.jpg", title: "Partnership" },
  { src: "/assets/OrYifTRjraMAnvfrqoa8ONFzyitu779nUfInwrUM5Vzo2gUe8QdLej.jpg", title: "B2C Leasing" },
  { src: "/assets/9nsm7450x308-2.jpg", title: "EV Infrastructure" },
  { src: "/assets/Anagh-Ojha.png", title: "Leadership" }
];

const styles = {
  container: {
    minHeight: "100vh",
    padding: "80px 20px 40px",
    background: "var(--bg)",
    color: "var(--text)",
    fontFamily: "var(--font-sans)"
  },
  header: {
    textAlign: "center",
    marginBottom: "60px"
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 4rem)",
    fontWeight: "bold",
    background: "var(--gradient-main)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "1rem"
  },
  titleAccent: {
    width: 120,
    height: 6,
    margin: "0 auto",
    borderRadius: 9999,
    background: "var(--gradient-main)"
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "1.2rem",
    maxWidth: "600px",
    margin: "0 auto"
  },
  section: {
    marginBottom: "80px",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto"
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "30px"
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "var(--text)",
    margin: 0
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px"
  },
  card: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    display: "block",
    position: "relative",
    transition: "all 0.3s ease"
  },
  imageWrapper: {
    width: "100%",
    aspectRatio: "16/9",
    overflow: "hidden",
    position: "relative"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease"
  },
  shimmer: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 40%, rgba(255,255,255,0) 80%)",
    mixBlendMode: "overlay",
    pointerEvents: "none"
  },
  content: {
    padding: "24px"
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px"
  },
  tag: {
    background: "rgba(34, 197, 94, 0.1)",
    color: "var(--secondary)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: 600,
    border: "1px solid rgba(34, 197, 94, 0.2)"
  },
  date: {
    color: "var(--text-muted)",
    fontSize: "0.9rem"
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
    lineHeight: 1.3
  },
  description: {
    color: "var(--text-muted)",
    lineHeight: 1.6,
    marginBottom: "16px",
    display: "-webkit-box",
    WebkitLineClamp: 4,
    WebkitBoxOrient: "vertical",
    overflow: "hidden"
  },
  linkText: {
    color: "var(--secondary)",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  textCard: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "24px",
    color: "var(--text)",
    lineHeight: 1.8
  },
  layout: {
    display: "flex",
    flexWrap: "wrap",
    gap: "30px"
  },
  watchGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24
  },
  mainCol: {
    flex: "1 1 600px",
    minWidth: "300px"
  },
  sideCol: {
    flex: "1 1 600px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px"
  },
  videoContainer: {
    background: "var(--bg-2)",
    borderRadius: "var(--radius)",
    border: "1px solid var(--border)",
    overflow: "hidden"
  },
  initiativeCard: {
    background: "var(--bg-2)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius)",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "var(--shadow)"
  },
  initiativeAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundImage: "linear-gradient(90deg, rgba(59,130,246,0.6), rgba(34,197,94,0.6), rgba(244,114,182,0.6))",
    backgroundSize: "200% 100%"
  },
  initiativeGlow: {
    position: "absolute",
    inset: -2,
    borderRadius: "var(--radius)",
    pointerEvents: "none",
    background: "radial-gradient(40% 40% at 20% 20%, rgba(59,130,246,0.12), transparent 60%), radial-gradient(40% 40% at 80% 20%, rgba(34,197,94,0.10), transparent 60%)"
  },
  initiativeBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1,
    padding: "6px 10px",
    borderRadius: 9999,
    color: "#031432",
    background: "var(--secondary)",
    border: "1px solid rgba(255,255,255,0.2)"
  },
  videoHeader: {
    padding: "20px",
    borderBottom: "1px solid var(--border)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardAccent: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    backgroundImage: "linear-gradient(90deg, rgba(59,130,246,0.7), rgba(34,197,94,0.7), rgba(244,114,182,0.7))",
    backgroundSize: "200% 100%"
  },
  iframeWide: {
    width: "100%",
    aspectRatio: "16/9",
    background: "#000",
    border: "none"
  },
  iframeTall: {
    width: "100%",
    aspectRatio: "9/16",
    background: "#000",
    border: "none",
    borderRadius: "var(--radius)"
  },
  socialCard: {
    borderRadius: "var(--radius)",
    padding: "24px",
    color: "white",
    position: "relative",
    overflow: "hidden",
    textDecoration: "none",
    display: "block",
    transition: "transform 0.3s ease",
    background: "linear-gradient(135deg, #581c87 0%, #831843 100%)"
  },
  socialIconBg: {
    background: "rgba(255,255,255,0.1)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    backdropFilter: "blur(5px)"
  },
  orb: {
    position: "fixed",
    width: 300,
    height: 300,
    borderRadius: "50%",
    filter: "blur(60px)",
    opacity: 0.25,
    zIndex: 0,
    pointerEvents: "none",
    background: "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.5), transparent 60%)"
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 18
  },
  galleryCard: {
    position: "relative",
    borderRadius: "var(--radius)",
    overflow: "hidden",
    border: "1px solid var(--border)",
    background: "var(--bg-2)"
  },
  galleryThumb: {
    width: "100%",
    aspectRatio: "16/10",
    objectFit: "cover"
  },
  galleryCaption: {
    position: "absolute",
    left: 12,
    bottom: 12,
    padding: "6px 10px",
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 700,
    backdropFilter: "blur(6px)",
    background: "rgba(2,6,23,0.45)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.12)"
  }
};

function HighlightLink({ href, label, previewSrc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "relative",
        display: "inline-block",
        fontWeight: 700,
        color: "var(--secondary)",
        background: "var(--gradient-main)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textDecoration: "none"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "calc(100% + 12px)",
            width: 240,
            borderRadius: 12,
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow)",
            background: "var(--bg-2)",
            pointerEvents: "none",
            zIndex: 10
          }}
        >
          <div style={{ width: "100%", aspectRatio: "16/9", background: "#000" }}>
            <img src={previewSrc} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ padding: 10, fontSize: 12, color: "var(--text-muted)" }}>{href}</div>
        </motion.div>
      )}
    </a>
  );
}

function TiltImage({ src, alt }) {
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = -(y - 0.5) * 10;
    const ry = (x - 0.5) * 12;
    setRot({ x: rx, y: ry });
    setPos({ x, y });
  };
  const onLeave = () => {
    setRot({ x: 0, y: 0 });
  };
  return (
    <motion.div
      style={{
        perspective: 900,
        position: "relative",
        width: "100%",
        height: "100%"
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0",
          transformStyle: "preserve-3d"
        }}
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
      >
        <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "0" }} />
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(60% 60% at 30% 30%, rgba(255,255,255,0.06), transparent 60%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
            transform: "translateZ(30px)"
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(2,6,23,0.85), transparent)",
            pointerEvents: "none",
            transform: "translateZ(1px)"
          }}
        />
      </motion.div>
      <motion.div
        style={{
          position: "absolute",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(255,255,255,0.08), transparent)",
          filter: "blur(18px)",
          pointerEvents: "none"
        }}
        animate={{ x: pos.x * 0.7 * 300 - 150, y: pos.y * 0.7 * 160 - 80 }}
        transition={{ type: "tween", duration: 0.2 }}
      />
      <motion.div
        style={styles.orb}
        animate={{ x: [40, 360, 120], y: [60, 200, 40] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  );
}

export default function NewsMedia() {
  const [openVideo, setOpenVideo] = useState(null);
  return (
    <div style={styles.container}>
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(60rem 60rem at 10% 10%, rgba(59,130,246,0.06), transparent 40%), radial-gradient(50rem 50rem at 90% 20%, rgba(34,197,94,0.06), transparent 40%)"
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage:
            "repeating-linear-gradient(120deg, rgba(59,130,246,0.04) 0px, rgba(59,130,246,0.04) 1px, transparent 1px, transparent 8px)"
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={styles.header}>
        <motion.h1
          style={styles.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          News & Media
        </motion.h1>
        <motion.div
          style={styles.titleAccent}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
        <p style={styles.subtitle}>Latest updates, features, and stories from Urja Mobility.</p>
      </motion.div>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={styles.section}>
        <div style={{ maxWidth: 900, margin: "0 auto 40px", color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem" }}>
          <h2 style={{ ...styles.sectionTitle, marginBottom: 12 }}>About This Page</h2>
          <p>
            This News & Media page curates verified features, announcements, and multimedia about Urja Mobility—covering our Battery-as-a-Service innovation, EV ecosystem partnerships, and progress in energy storage and charging infrastructure.
          </p>
          <p>
            Explore in-depth articles, press coverage, podcasts and shorts, and follow social highlights for timely updates on our mission to make clean mobility accessible, reliable, and data-driven across India.
          </p>
          <div style={{ marginTop: 12 }}>
            <span style={{ color: "var(--text)" }}>Featured: </span>
            <HighlightLink
              href="https://audiencereports.in/anagh-ojha-engineering-a-sustainable-future-wit/"
              label="Audience Reports"
              previewSrc="/assets/Anagh-Ojha.png"
            />
            <span style={{ color: "var(--text-muted)" }}> · </span>
            <HighlightLink
              href="https://www.theindustryoutlook.com/startups/editor-choice/urja-mobility-transforming-ev-infrastructure-through-advanced-power-and-energy-storage-solutions-nwid-10628.html"
              label="The Industry Outlook"
              previewSrc="/assets/9nsm7450x308-2.jpg"
            />
            <span style={{ color: "var(--text-muted)" }}> · </span>
            <HighlightLink
              href="https://www.energetica-india.net/news/urja-mobility-introduces-b2c-battery-leasing-program-for-e-rickshaw-drivers"
              label="Energetica India"
              previewSrc="/assets/OrYifTRjraMAnvfrqoa8ONFzyitu779nUfInwrUM5Vzo2gUe8QdLej.jpg"
            />
            <span style={{ color: "var(--text-muted)" }}> · </span>
            <HighlightLink
              href="https://www.manufacturingtodayindia.com/eastman-urja-mobility-sign-mou"
              label="Manufacturing Today India"
              previewSrc="/assets/eastman-urja-mobility-1536x864.jpg"
            />
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <PlayCircleFilled style={{ color: "#3b82f6", fontSize: 20 }} />
            <h3 style={{ margin: 0, fontSize: "1.1rem", color: "var(--text)" }}>Trending Now</h3>
          </div>
          <div style={styles.watchGrid}>
            {articles.slice(1, 4).map((t) => (
              <motion.a
                key={t.id}
                href={t.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.card}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div style={styles.imageWrapper}>
                  <img src={t.image} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: 14, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: "var(--text-muted)", border: "1px solid var(--border)", borderRadius: 9999, padding: "4px 8px" }}>ARTICLE</span>
                  <span style={{ fontWeight: 600, color: "white" }}>{t.title}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
        <div style={styles.sectionHeader}>
          <ReadOutlined style={{ color: "var(--secondary)", fontSize: 24 }} />
          <h2 style={styles.sectionTitle}>Featured Stories</h2>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={styles.grid}>
          {articles.map((article) => (
            <motion.a
              key={article.id}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              style={styles.card}
              whileHover={{ y: -4, scale: 1.01, boxShadow: "var(--shadow)" }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div style={styles.imageWrapper}>
                <TiltImage src={article.image || "/assets/logo.png"} alt={article.title} />
              </div>
              <div style={styles.content}>
                <div style={styles.meta}>
                  <span style={styles.tag}>{article.publication}</span>
                  <span style={styles.date}>{article.date}</span>
                </div>
                <h3 style={styles.cardTitle}>{article.title}</h3>
                <p style={styles.description}>{article.description}</p>
                <div style={styles.linkText}>
                  Read Article <ExternalLink size={16} />
                </div>
              </div>
              <motion.div
                style={styles.cardAccent}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={styles.section}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <ReadOutlined style={{ color: "var(--secondary)", fontSize: 24 }} />
          <h2 style={styles.sectionTitle}>Gallery Highlights</h2>
        </div>
        <div style={styles.galleryGrid}>
          {gallery.map((g, i) => (
            <motion.div
              key={i}
              style={styles.galleryCard}
              whileHover={{ scale: 1.03 }}
              animate={{ y: [-2, 2] }}
              transition={{ duration: 4 + i * 0.3, repeat: Infinity, repeatType: "reverse" }}
            >
              <img src={g.src} alt={g.title} style={styles.galleryThumb} />
              <span style={styles.galleryCaption}>{g.title}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={styles.section}>
        <div style={styles.sectionHeader}>
          <ReadOutlined style={{ color: "var(--secondary)", fontSize: 24 }} />
          <h2 style={styles.sectionTitle}>Key Initiatives</h2>
        </div>
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {initiatives.map((it, idx) => (
            <motion.div
              key={it.id}
              custom={idx}
              variants={initiativeItemVariants}
              style={{
                ...styles.initiativeCard,
                background: "linear-gradient(160deg, var(--bg-2) 0%, rgba(15, 23, 42, 1) 100%)",
                border: "1px solid rgba(255,255,255,0.05)"
              }}
              whileHover={{ 
                scale: 1.04, 
                y: -8, 
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.4), 0 0 20px rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)"
              }}
            >
              <motion.div 
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: "var(--gradient-main)",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 2px 10px rgba(59, 130, 246, 0.5)"
                }}
                animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              />

              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle at top right, rgba(59,130,246,0.1), transparent 70%)", pointerEvents: "none" }} />

              <span style={{ ...styles.initiativeBadge, background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
                INITIATIVE
              </span>

              <div style={{ marginTop: 20, marginBottom: 16 }}>
                 <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "white", display: "inline", position: "relative", zIndex: 1 }}>
                    {it.title}
                    <motion.span 
                        style={{ 
                            position: "absolute", 
                            bottom: 2, 
                            left: -4, 
                            right: -4, 
                            height: "0.4em", 
                            background: "rgba(59, 130, 246, 0.3)", 
                            zIndex: -1,
                            borderRadius: 4
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, type: "spring" }}
                    />
                 </h3>
              </div>
              
              {it.lines.map((ln, i) => (
                <p key={i} style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "1rem" }}>{ln}</p>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <div style={{ ...styles.section, ...styles.layout }}>
        <div style={styles.mainCol}>
          <div style={styles.sectionHeader}>
            <PlayCircleFilled style={{ color: "#3b82f6", fontSize: 24 }} />
            <h2 style={styles.sectionTitle}>Watch & Listen</h2>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.005 }} viewport={{ once: true }} style={styles.videoContainer}>
            <div style={styles.videoHeader}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <YoutubeFilled style={{ color: "#ef4444", fontSize: 28 }} />
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "white", margin: 0 }}>Urja Mobility Podcast</h3>
                  <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.9rem" }}>Latest Episode</p>
                </div>
              </div>
              <a href={videos[0].link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>
                <ExternalLink size={20} />
              </a>
            </div>
            <iframe src={videos[0].embedUrl} title={videos[0].title} style={styles.iframeWide} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </motion.div>
        </div>
        <div style={styles.sideCol}>
          {videos.slice(1).map((v) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.01 }}
              viewport={{ once: true }}
              style={{ background: "var(--bg-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden" }}
            >
              <div
                onClick={() => setOpenVideo(v)}
                style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#0b1220", cursor: "pointer" }}
              >
                {v.platform === "youtube" && v.thumb ? (
                  <img src={v.thumb} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
                    <FacebookFilled style={{ color: "#1877f2", fontSize: 48 }} />
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.5)", color: "white", padding: "10px 14px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.15)" }}>
                    <PlayCircleOutlined style={{ fontSize: 18 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>PLAY</span>
                  </div>
                </div>
              </div>
              <div style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  {v.platform === "youtube" ? <YoutubeFilled style={{ color: "#ef4444" }} /> : <FacebookFilled style={{ color: "#1877f2" }} />}
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 1 }}>{v.platform.toUpperCase()}</span>
                </div>
                <h4 style={{ fontWeight: "bold", color: "white", margin: 0 }}>{v.title}</h4>
              </div>
            </motion.div>
          ))}
          {social.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ ...styles.socialCard, background: item.bg }}
              whileHover={{ scale: 1.02 }}
              animate={{ y: [-2, 2] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            >
              <div style={styles.socialIconBg}>
                {item.platform === "instagram" ? (
                  <InstagramFilled style={{ color: "white", fontSize: 28 }} />
                ) : item.platform === "facebook" ? (
                  <Facebook size={26} color="white" />
                ) : (
                  <Twitter size={26} color="white" />
                )}
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: 4 }}>{item.title}</h3>
              <p style={{ opacity: 0.9, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8 }}>
                {item.subtitle} <ChevronRight size={16} />
              </p>
            </motion.a>
          ))}
        </div>
      </div>
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={styles.section}>
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 24, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h3 style={{ margin: 0, color: "white", fontSize: "1.3rem", fontWeight: 800 }}>Stay in the loop</h3>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>Get updates on features, partnerships, and programs.</p>
          </div>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--secondary)", color: "#031432", fontWeight: 800, padding: "10px 16px", borderRadius: 9999, textDecoration: "none" }}>
            Contact Us <ChevronRight size={16} />
          </a>
        </div>
      </motion.section>
      {openVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setOpenVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            style={{ width: "min(1000px, 96vw)", background: "var(--bg-2)", borderRadius: "var(--radius)", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "var(--shadow)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: "100%", aspectRatio: "16/9", background: "#000" }}>
              <iframe
                src={openVideo.embedUrl}
                title={openVideo.title}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h4 style={{ fontWeight: 700, color: "white", margin: 0 }}>{openVideo.title}</h4>
              <a href={openVideo.link} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <ExternalLink size={18} />
                <span style={{ fontSize: 14 }}>Open</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
