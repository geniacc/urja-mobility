import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";

const INDIA_TOPO_JSON = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const PROJECTION_CONFIG = {
  scale: 1000,
  center: [78.9629, 22.5937] // Center of India
};

const PresenceMap = () => {
  const [content, setContent] = useState("");

  // States where Urja has presence
  const presenceStates = [
    "Maharashtra", 
    "Karnataka", 
    "Delhi", 
    "Tamil Nadu", 
    "Gujarat", 
    "Telangana",
    "West Bengal",
    "Uttar Pradesh"
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
            <h2 className="section-title">Our Presence in India</h2>
            <p className="section-subtitle">Powering homes and businesses across the nation.</p>
        </motion.div>

        <div className="map-container" style={{ width: "100%", height: "600px", position: "relative", background: "#f8fafc", borderRadius: "20px", overflow: "hidden" }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={PROJECTION_CONFIG}
              width={800}
              height={800}
              style={{ width: "100%", height: "100%" }}
            >
                <ZoomableGroup center={[80, 22]} zoom={1.2}>
                  <Geographies geography={INDIA_TOPO_JSON}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isPresent = presenceStates.includes(geo.properties.NAME_1) || presenceStates.includes(geo.properties.name); // Check both property names just in case
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            onMouseEnter={() => {
                              setContent(`${geo.properties.NAME_1 || geo.properties.name} ${isPresent ? "✅" : ""}`);
                            }}
                            onMouseLeave={() => {
                              setContent("");
                            }}
                            style={{
                              default: {
                                fill: isPresent ? "#22c55e" : "#e2e8f0", // Green for presence, gray for others
                                stroke: "#ffffff",
                                strokeWidth: 0.5,
                                outline: "none",
                                transition: "all 0.3s"
                              },
                              hover: {
                                fill: isPresent ? "#16a34a" : "#cbd5e1",
                                stroke: "#ffffff",
                                strokeWidth: 0.5,
                                outline: "none",
                                cursor: "pointer"
                              },
                              pressed: {
                                fill: "#15803d",
                                outline: "none"
                              }
                            }}
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content={geo.properties.NAME_1 || geo.properties.name}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <Tooltip id="my-tooltip" />
            
            {/* Legend/Info Overlay */}
            <div style={{ position: "absolute", bottom: "20px", left: "20px", background: "rgba(255,255,255,0.9)", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <div style={{ width: "16px", height: "16px", background: "#22c55e", borderRadius: "4px", marginRight: "8px" }}></div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#334155" }}>Operational Hubs</span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: "16px", height: "16px", background: "#e2e8f0", borderRadius: "4px", marginRight: "8px" }}></div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#64748b" }}>Expanding Soon</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PresenceMap;
