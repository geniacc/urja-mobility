import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip as ReactTooltip } from "react-tooltip";
import India3DMap from "./India3DMap";

const DEFAULT_MARKERS = [
  { id: "delhi", name: "Delhi", lat: 28.6139, lng: 77.209, cx: 220, cy: 90, type: "service", region: "North", status: "active", services: ["Install", "Maintenance"], website: "https://delhi.gov.in" },
  { id: "bhopal", name: "Bhopal", lat: 23.2599, lng: 77.4126, cx: 200, cy: 180, type: "manufacturing", region: "Central", status: "active", services: ["Manufacturing"], website: "https://mp.gov.in" },
  { id: "hyderabad", name: "Hyderabad", lat: 17.385, lng: 78.4867, cx: 240, cy: 280, type: "service_distribution", region: "South", status: "planning", services: ["Distribution", "Support"], website: "https://telangana.gov.in" },
  { id: "guwahati", name: "Guwahati", lat: 26.1445, lng: 91.7362, cx: 345, cy: 110, type: "service", region: "East", status: "active", services: ["Install"], website: "https://assam.gov.in" },
  { id: "kolkata", name: "Kolkata", lat: 22.5726, lng: 88.3639, cx: 320, cy: 185, type: "service_distribution", region: "East", status: "active", services: ["Distribution", "Service"], website: "https://wb.gov.in" },
  { id: "chennai", name: "Chennai", lat: 13.0827, lng: 80.2707, cx: 240, cy: 380, type: "service", region: "South", status: "active", services: ["Install", "Maintenance"], website: "https://tn.gov.in" }
];

 

 

const INDIA_TOPO_JSON = "https://cdn.jsdelivr.net/gh/deldersveld/topojson@master/countries/india/india-states.json";

 


const MobileAwareFilters = ({ open, setOpen, filters, setFilters, searchQuery, setSearchQuery }) => {
  if (!open) return <button onClick={() => setOpen(true)} style={{ position: "absolute", top: 10, left: 10, zIndex: 5 }}>Filters</button>;
  return (
    <div style={{ position: "absolute", top: 10, left: 10, background: "#111827", color: "white", padding: 20, borderRadius: 8, zIndex: 10 }}>
      <h3>Filters</h3>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={filters.service} onChange={(e) => setFilters((f) => ({ ...f, service: e.target.checked }))} />
          Service
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={filters.manufacturing} onChange={(e) => setFilters((f) => ({ ...f, manufacturing: e.target.checked }))} />
          Manufacturing
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input type="checkbox" checked={filters.service_distribution} onChange={(e) => setFilters((f) => ({ ...f, service_distribution: e.target.checked }))} />
          Distribution
        </label>
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search city"
          style={{ width: 160, padding: "6px 8px", borderRadius: 6, border: "1px solid #374151", background: "#0f172a", color: "white" }}
        />
      </div>
      <button onClick={() => setOpen(false)} style={{ marginTop: 12, padding: "6px 10px", borderRadius: 6, background: "#1f2937", color: "white", border: "1px solid #374151" }}>Close</button>
    </div>
  );
};

const IndiaMap = () => {
  const [markers] = useState(DEFAULT_MARKERS);
  const [selected, setSelected] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({ service: true, manufacturing: true, service_distribution: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [geographyData, setGeographyData] = useState(null);

  const filtered = useMemo(() => {
    const enabledTypes = Object.entries(filters).filter(([, e]) => e).map(([t]) => t);
    const q = searchQuery.trim().toLowerCase();
    return markers.filter((m) => enabledTypes.includes(m.type) && (!q || m.name.toLowerCase().includes(q)));
  }, [markers, filters, searchQuery]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const sources = [
        "https://cdn.jsdelivr.net/gh/deldersveld/topojson@master/countries/india/india-states.json",
        "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json",
        "https://cdn.jsdelivr.net/gh/deldersveld/topojson/countries/india/india-states.json",
        "https://raw.githubusercontent.com/harishvc/India-States-GeoJSON/master/india_states.geojson"
      ];
      for (const url of sources) {
        try {
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) continue;
          const json = await res.json();
          if (!cancelled && json) {
            setGeographyData(json);
            break;
          }
        } catch (_) {}
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "relative", background: "#0b1220", minHeight: "600px", borderRadius: 12, overflow: "hidden" }}>
      <MobileAwareFilters open={filtersOpen} setOpen={setFiltersOpen} filters={filters} setFilters={setFilters} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div style={{ width: "100%", height: "100%", maxWidth: 600, maxHeight: 700 }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 1200,
            center: [78.9629, 22.5937]
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geographyData || INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: { fill: "#1e293b", outline: "none", stroke: "#334155", strokeWidth: 0.5 },
                    hover: { fill: "#334155", outline: "none" },
                    pressed: { fill: "#0f172a", outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
          {filtered.map((m) => (
            <Marker key={m.id} coordinates={[m.lng, m.lat]}>
              <circle
                r={6}
                fill={m.status === "active" ? "#22c55e" : "#f59e0b"}
                stroke="#fff"
                strokeWidth={2}
                style={{ cursor: "pointer", transition: "all 0.3s" }}
                onClick={() => setSelected(m)}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={m.name}
              />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fill: "#fff", fontSize: "10px", fontWeight: "bold", textShadow: "0px 1px 4px #000", pointerEvents: "none" }}
              >
                {m.name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
        <ReactTooltip id="my-tooltip" />
      </div>
      {selected && (
        <div style={{ position: "absolute", bottom: 20, right: 20, background: "rgba(15, 23, 42, 0.9)", padding: "15px", borderRadius: "8px", border: "1px solid #334155", color: "white", maxWidth: "200px", backdropFilter: "blur(4px)" }}>
          <h4 style={{ margin: "0 0 5px 0", color: "#22c55e" }}>{selected.name}</h4>
          <div style={{ fontSize: "12px", color: "#cbd5e1" }}>
            <p style={{ margin: "2px 0" }}>Type: {selected.type}</p>
            <p style={{ margin: "2px 0" }}>Region: {selected.region}</p>
            <button onClick={() => setSelected(null)} style={{ marginTop: "8px", padding: "4px 8px", border: "none", background: "#334155", color: "white", borderRadius: "4px", cursor: "pointer", fontSize: "10px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export { India3DMap };
export default India3DMap;
