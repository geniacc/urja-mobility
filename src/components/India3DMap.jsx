import React, { useState, useMemo, useRef, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Card, Typography, Button, Badge, Input, ConfigProvider, Segmented, Drawer, Divider } from 'antd';
import {
  EnvironmentFilled,
  SearchOutlined,
  CloseCircleOutlined,
  FilterFilled,
  MenuOutlined
} from '@ant-design/icons';
import 'maplibre-gl/dist/maplibre-gl.css';

const { Text, Title } = Typography;

// --- KEEP YOUR EXISTING DATA AND HELPER FUNCTIONS EXACTLY AS THEY ARE ---
const CITY_COORDS = {
  "Agra": { lat: 27.1767, lng: 78.0081, state: "Uttar Pradesh" },
  "Araria": { lat: 26.1300, lng: 87.4700, state: "Bihar" },
  "Assam": { lat: 26.1445, lng: 91.7362, state: "Assam" },
  "Ayodhya": { lat: 26.7922, lng: 82.1998, state: "Uttar Pradesh" },
  "Badaun": { lat: 28.0381, lng: 79.1260, state: "Uttar Pradesh" },
  "Baghpat": { lat: 28.9445, lng: 77.2187, state: "Uttar Pradesh" },
  "Banda": { lat: 25.4833, lng: 80.3333, state: "Uttar Pradesh" },
  "Bareilly": { lat: 28.3670, lng: 79.4304, state: "Uttar Pradesh" },
  "Bhagalpur": { lat: 25.2425, lng: 86.9746, state: "Bihar" },
  "Bihar": { lat: 25.5941, lng: 85.1376, state: "Bihar" },
  "Bijnor": { lat: 29.3724, lng: 78.1358, state: "Uttar Pradesh" },
  "Chandauli": { lat: 25.2616, lng: 83.2630, state: "Uttar Pradesh" },
  "Champaran": { lat: 26.6573, lng: 84.9166, state: "Bihar" },
  "Ghaziabad": { lat: 28.6692, lng: 77.4538, state: "Uttar Pradesh" },
  "Gonda": { lat: 27.1330, lng: 81.9619, state: "Uttar Pradesh" },
  "Hyderabad": { lat: 17.3850, lng: 78.4867, state: "Telangana" },
  "Indore": { lat: 22.7196, lng: 75.8577, state: "Madhya Pradesh" },
  "Kamrup": { lat: 26.1445, lng: 91.7362, state: "Assam" },
  "Kannauj": { lat: 27.0544, lng: 79.9188, state: "Uttar Pradesh" },
  "Lucknow": { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },
  "Loni": { lat: 28.7515, lng: 77.2872, state: "Uttar Pradesh" },
  "Meerut": { lat: 28.9845, lng: 77.7064, state: "Uttar Pradesh" },
  "Nadia": { lat: 23.4058, lng: 88.4907, state: "West Bengal" },
  "Prayagraj": { lat: 25.4358, lng: 81.8463, state: "Uttar Pradesh" },
  "Saharanpur": { lat: 29.9679, lng: 77.5452, state: "Uttar Pradesh" },
  "Saran": { lat: 25.7806, lng: 84.7420, state: "Bihar" },
  "Shahjahanpur": { lat: 27.8800, lng: 79.9100, state: "Uttar Pradesh" },
  "Siliguri": { lat: 26.7271, lng: 88.3953, state: "West Bengal" },
  "Sitamarhi": { lat: 26.5937, lng: 85.4906, state: "Bihar" },
  "Sitapur": { lat: 27.5619, lng: 80.6827, state: "Uttar Pradesh" },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" }
};

const normalizeStatus = (status) => {
  const s = String(status || "").toLowerCase().replace(/\s+/g, "");
  if (s.includes("not") || s.includes("in-active") || s.includes("inactive")) return "inactive";
  if (s.includes("active")) return "active";
  return "inactive";
};

const normalizeState = (raw) => {
  const s = String(raw || "").trim();
  if (!s) return "";
  if (s.toLowerCase() === "up") return "Uttar Pradesh";
  if (s.toLowerCase() === "mp") return "Madhya Pradesh";
  if (s.toLowerCase() === "wb") return "West Bengal";
  return s;
};

const deriveCityState = (location) => {
  const parts = String(location || "").split(",").map((p) => p.trim()).filter(Boolean);
  const clean = parts.filter((p) => p.toLowerCase() !== "india");
  const first = clean[0] || "";
  const last = clean[clean.length - 1] || "";
  const state = normalizeState(last.length <= 3 ? last.toUpperCase() : last);
  const city = first || state || "India";
  return { city, state };
};

const getCoords = (location) => {
  const { city, state } = deriveCityState(location);
  const byCity = CITY_COORDS[city];
  if (byCity) return { city, state: byCity.state || state || "", lat: byCity.lat, lng: byCity.lng };
  const byState = CITY_COORDS[state];
  if (byState) return { city, state: byState.state || state || "", lat: byState.lat, lng: byState.lng };
  return { city, state: state || "", lat: 22.5937, lng: 78.9629 };
};

const PARTNER_DATA = [
  { id: 1, company: "Tista", status: "Active", location: "Siliguri, India" },
  { id: 2, company: "Suresh Service Center", status: "Active", location: "Banda, India" },
  { id: 3, company: "Bango Batteries", status: "Active", location: "Lucknow, Uttar Pradesh, India" },
  { id: 4, company: "Speed Battery house", status: "Active", location: "Agra, Uttar Pradesh, India" },
  { id: 5, company: "Prajjawal Battery HUB", status: "Active", location: "Prayagraj, Uttar Pradesh, India" },
  { id: 6, company: "Infytel Corporation Pvt Ltd", status: "Active", location: "Nadia, West Bengal, India" },
  { id: 7, company: "RD Automobile", status: "Active", location: "Bihar, India" },
  { id: 8, company: "Adula Motors", status: "In-active", location: "Uttar Pradesh, India" },
  { id: 9, company: "Kailash Enterprises", status: "In-active", location: "Uttar Pradesh, India" },
  { id: 10, company: "Saini Distributorship", status: "In-active", location: "Uttar Pradesh, India" },
  { id: 11, company: "Sanyam Enterprises", status: "In-active", location: "Uttar Pradesh, India" },
  { id: 12, company: "Sarnab Battery House", status: "Active", location: "Siliguri, India" },
  { id: 13, company: "ISH Synergies Pvt Ltd", status: "Active", location: "Siliguri, India" },
  { id: 14, company: "Battery Pool", status: "Active", location: "Indore, India" },
  { id: 15, company: "Pointo", status: "In-active", location: "Hyderabad, India" },
  { id: 16, company: "Diov Auto", status: "In-active", location: "Bareilly, India" },
  { id: 17, company: "Baba Motors", status: "In-active", location: "Ayodhya, India" },
  { id: 18, company: "Vande Bharat Enterprises", status: "Active", location: "Bhagalpur, India" },
  { id: 19, company: "Suraj Enterprises", status: "Active", location: "Bhagalpur, India" },
  { id: 20, company: "H.L ENTERPRISE", status: "Active", location: "Assam, India" },
  { id: 21, company: "New Bharat EV motors", status: "Active", location: "Meerut, UP, India" },
  { id: 22, company: "Lithox Energy", status: "Active", location: "Bihar, India" },
  { id: 23, company: "RJ Enterprises", status: "Active", location: "Assam, India" },
  { id: 24, company: "New A N Motors", status: "Active", location: "Kannauj, UP, India" },
  { id: 25, company: "Jai Maa Laxmi Traders", status: "Not-Active", location: "Badaun, UP, India" },
  { id: 26, company: "Asad Traders-Salman Ahmad", status: "Not-Active", location: "Shahjahanpur, UP, India" },
  { id: 27, company: "SHREE SHYAM AUTOMOTIVE", status: "Active", location: "Baghpat, UP, India" },
  { id: 28, company: "Sanskar Auto Sales- Pawan Kumar", status: "Active", location: "Loni, Ghaziabad, India" },
  { id: 29, company: "Rajesh Enterprises", status: "Not-Active", location: "Chandauli, UP, India" },
  { id: 30, company: "Great Partner E-Vehicles", status: "Active", location: "Meerut, UP, India" },
  { id: 31, company: "New Bharat EV Motors", status: "Active", location: "Meerut, UP, India" },
  { id: 32, company: "Maa Tara Enterprises", status: "Active", location: "Sitamarhi, Bihar, India" },
  { id: 33, company: "Shri Balaji Enterprises", status: "Not-Active", location: "Lucknow, India" },
  { id: 34, company: "SAUMYA AUTO SALES(GONDA)", status: "Not-Active", location: "Gonda, UP, India" },
  { id: 35, company: "Ayan Enterprises", status: "Not-Active", location: "Kannauj, UP, India" },
  { id: 36, company: "Baba Auto Sales and Services", status: "Active", location: "Ayodhya, India" },
  { id: 37, company: "Varahi Enterprises Gonda", status: "Not-Active", location: "Gonda, UP, India" },
  { id: 38, company: "Hindustan Traders", status: "Active", location: "Bijnor, UP, India" },
  { id: 39, company: "Maa enterprises", status: "Active", location: "Kamrup, Assam, India" },
  { id: 40, company: "Purvanchal Automobile", status: "Active", location: "Sitapur, Bihar, India" },
  { id: 41, company: "Kalpana Enterprises", status: "Active", location: "Ratanganj, Araria, Bihar, India" },
  { id: 42, company: "Khushboo Enterprises", status: "Active", location: "Bihar, India" },
  { id: 43, company: "Barnwal & Sons", status: "Active", location: "Siwan, Bihar, India" },
  { id: 44, company: "Ayansh enterprises", status: "Active", location: "Bihar, India" },
  { id: 45, company: "Yash Automobile", status: "Active", location: "Champaran, Bihar, India" },
  { id: 46, company: "M N Motors", status: "Active", location: "Saharanpur, India" },
  { id: 47, company: "Mayank Auto Garaz", status: "Active", location: "Saran, Bihar, India" }
].map((p) => {
  const coords = getCoords(p.location);
  return {
    id: p.id,
    name: p.company,
    company: p.company,
    city: coords.city,
    state: coords.state,
    lat: coords.lat,
    lng: coords.lng,
    status: normalizeStatus(p.status),
    statusLabel: p.status,
    type: "partner",
    address: p.location,
    website: "https://urjamobility.in"
  };
});

const BRAND_GREEN = '#52c41a';
const BRAND_ORANGE = '#ff7a45';
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const VOYAGER_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
const POSITRON_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

const STATE_COLORS = {
  'West Bengal': '#10b981',
  'Uttar Pradesh': '#3b82f6',
  'Bihar': '#ef4444',
  'Madhya Pradesh': '#d946ef',
  'Assam': '#22c55e',
  'Telangana': '#f59e0b'
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const India3DMap = () => {
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); // Mobile specific state
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [mapStyleUrl, setMapStyleUrl] = useState(MAP_STYLE);
  const [showLabels, setShowLabels] = useState(false);

  // Filters Logic
  const [filters, setFilters] = useState({ active: true, inactive: true });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Filter Data
  const filteredMarkers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PARTNER_DATA.filter(m => {
      const matchesType = m.type === 'partner';
      const matchesStatus = filters[m.status];
      const matchesSearch = !q ||
        m.name.toLowerCase().includes(q) ||
        m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q);
      return matchesType && matchesStatus && matchesSearch;
    });
  }, [filters, searchQuery]);

  const statusCounts = useMemo(() => {
    const acc = { active: 0, inactive: 0 };
    for (const m of PARTNER_DATA) acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, []);

  const stateStats = useMemo(() => {
    const acc = {};
    for (const m of filteredMarkers) {
      acc[m.state] = (acc[m.state] || 0) + 1;
    }
    return acc;
  }, [filteredMarkers]);

  // View Control
  const flyToLocation = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 12,
        pitch: 50,
        duration: 2000
      });
    }
  };

  const resetView = () => {
    setSelected(null);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [78.9629, 22.5937],
        zoom: isMobile ? 3.5 : 4,
        pitch: 0,
        duration: 2000
      });
    }
  };

  // Reusable Content for Filters & Stats (Used in Desktop Sidebar AND Mobile Drawer)
  const FilterAndStatsContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search and Status Filters */}
      <div>
        <Text strong style={{ color: '#fff', display: 'block', marginBottom: 8 }}>Search & Filters</Text>
        <Input
          placeholder="Search City or State..."
          prefix={<SearchOutlined style={{ color: '#aaa' }} />}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ marginBottom: 12, borderRadius: 8, background: '#111827', border: '1px solid #374151', color: '#fff' }}
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Button
            type={filters.active ? 'primary' : 'default'}
            onClick={() => setFilters(f => ({ ...f, active: !f.active }))}
            style={{ borderRadius: 999, background: filters.active ? BRAND_GREEN : 'transparent', borderColor: filters.active ? BRAND_GREEN : '#374151', color: '#fff' }}
            size="small"
          >
            Active ({statusCounts.active})
          </Button>
          <Button
            type={filters.inactive ? 'primary' : 'default'}
            onClick={() => setFilters(f => ({ ...f, inactive: !f.inactive }))}
            style={{ borderRadius: 999, background: filters.inactive ? '#64748b' : 'transparent', borderColor: filters.inactive ? '#64748b' : '#374151', color: '#fff' }}
            size="small"
          >
            Inactive ({statusCounts.inactive})
          </Button>
        </div>
      </div>

      <Divider style={{ borderColor: '#374151', margin: '4px 0' }} />

      {/* Map Styles */}
      <div>
        <Text strong style={{ color: '#fff', display: 'block', marginBottom: 8 }}>Map Style</Text>
        <Segmented
          options={[
            { label: 'Dark', value: MAP_STYLE },
            { label: 'Voyager', value: VOYAGER_STYLE },
            { label: 'Light', value: POSITRON_STYLE }
          ]}
          value={mapStyleUrl}
          onChange={v => setMapStyleUrl(v)}
          block
          style={{ background: '#111827', color: '#fff' }}
        />
        <Button onClick={() => setShowLabels(v => !v)} type="dashed" size="small" style={{ marginTop: 12, width: '100%', borderColor: '#374151', color: '#ccc' }}>
          {showLabels ? 'Hide Map Labels' : 'Show Map Labels'}
        </Button>
      </div>

      <Divider style={{ borderColor: '#374151', margin: '4px 0' }} />

      {/* State Statistics */}
      <div>
        <Text strong style={{ color: '#fff', display: 'block', marginBottom: 8 }}>Partner Distribution</Text>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, maxHeight: isMobile ? '200px' : 'none', overflowY: 'auto', paddingRight: 4 }}>
          {Object.entries(stateStats).map(([state, count]) => (
            <div key={state} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: STATE_COLORS[state] || BRAND_ORANGE }} />
                <Text style={{ color: '#e6f0ff', fontSize: 13 }}>{state}</Text>
              </div>
              <Badge count={count} style={{ backgroundColor: STATE_COLORS[state] || BRAND_ORANGE, boxShadow: 'none' }} />
            </div>
          ))}
        </div>
      </div>

      <Button type="primary" danger onClick={resetView} style={{ marginTop: 8, borderRadius: 8 }}>
        Reset Map View
      </Button>
    </div>
  );

  // Markers Rendering
  const markers = useMemo(() => filteredMarkers.map((dealer) => (
    <Marker
      key={dealer.id}
      longitude={dealer.lng}
      latitude={dealer.lat}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setSelected(dealer);
        flyToLocation(dealer.lat, dealer.lng);
        if (isMobile) setMobileDrawerOpen(false); // Close drawer if open so they can see the pin
      }}
    >
      <div className="marker-pin">
        <EnvironmentFilled
          style={{
            fontSize: isMobile ? '32px' : '28px',
            color: dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE),
            filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.5))'
          }}
        />
        <div
          className="pulse-ring"
          style={{
            background: hexToRgba((dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE)), 0.4),
            ['--pulse-color-strong']: hexToRgba((dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE)), 0.7),
            ['--pulse-color-transparent']: hexToRgba((dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE)), 0)
          }}
        />
        {showLabels && (
          <div
            className="marker-label"
            style={{
              borderColor: (dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE)),
              background: hexToRgba((dealer.status === 'inactive' ? '#64748b' : (STATE_COLORS[dealer.state] || BRAND_ORANGE)), 0.15)
            }}
          >
            {dealer.city}
          </div>
        )}
      </div>
    </Marker>
  )), [filteredMarkers, isMobile, showLabels]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: BRAND_GREEN, colorBgContainer: '#1f1f1f', colorText: '#fff' } }}>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'linear-gradient(180deg, #0b1220 0%, #0a1120 60%, #091120 100%)', overflow: 'hidden' }}>

        {/* Top Center Heading (Adaptive Size) */}
        <div style={{ position: 'absolute', top: isMobile ? 12 : 18, left: '50%', transform: 'translateX(-50%)', zIndex: 12, textAlign: 'center', width: 'max-content' }}>
          <div style={{ padding: isMobile ? '6px 12px' : '8px 16px', borderRadius: 999, background: 'rgba(15, 23, 42, 0.75)', border: '1px solid #1f2a44', backdropFilter: 'blur(8px)' }}>
            <Text style={{ fontWeight: 600, letterSpacing: 0.6, color: '#c9d7ff', fontSize: isMobile ? 13 : 14 }}>India Presence</Text>
            {!isMobile && <div style={{ fontSize: 12, color: '#9fb3ff' }}>Urja Mobility Partner Network</div>}
          </div>
        </div>

        {/* =========================================
            DESKTOP ONLY PANELS (Untouched)
            ========================================= */}
        {!isMobile && (
          <>
            {/* Desktop Left Sidebar */}
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '320px' }}>
              <Card bordered={false} size="small" style={{ background: 'linear-gradient(135deg, rgba(27, 38, 59, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)', backdropFilter: 'blur(8px)', border: '1px solid #203049' }}>
                <Title level={4} style={{ margin: 0, color: '#e6f0ff', letterSpacing: 0.5 }}>Urja Mobility</Title>
                <Text style={{ color: '#9fb3ff' }}>Nationwide Partner Network</Text>
              </Card>

              <Button
                icon={<FilterFilled />}
                onClick={() => setFiltersOpen(!filtersOpen)}
                type={filtersOpen ? 'primary' : 'default'}
                style={{ background: filtersOpen ? BRAND_GREEN : 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: 999 }}
              >
                {filtersOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Segmented
                options={[
                  { label: 'Dark', value: MAP_STYLE },
                  { label: 'Voyager', value: VOYAGER_STYLE },
                  { label: 'Light', value: POSITRON_STYLE }
                ]}
                value={mapStyleUrl}
                onChange={v => setMapStyleUrl(v)}
                size="small"
              />
              <Button onClick={() => setShowLabels(v => !v)} type={showLabels ? 'primary' : 'default'} style={{ borderRadius: 999 }}>
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </Button>

              {filtersOpen && (
                <Card bordered={false} size="small" style={{ background: 'rgba(23, 32, 50, 0.95)', border: '1px solid #223556', backdropFilter: 'blur(10px)', borderRadius: 12 }}>
                  <Input
                    placeholder="Search City or State..."
                    prefix={<SearchOutlined />}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{ marginBottom: 12, borderRadius: 999 }}
                  />
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <Button
                      type={filters.active ? 'primary' : 'default'}
                      onClick={() => setFilters(f => ({ ...f, active: !f.active }))}
                      style={{ borderRadius: 999 }}
                    >
                      Active ({statusCounts.active})
                    </Button>
                    <Button
                      type={filters.inactive ? 'primary' : 'default'}
                      onClick={() => setFilters(f => ({ ...f, inactive: !f.inactive }))}
                      style={{ borderRadius: 999 }}
                    >
                      Inactive ({statusCounts.inactive})
                    </Button>
                  </div>
                  <Button type="link" size="small" onClick={resetView} style={{ paddingLeft: 0, marginTop: 10 }}>
                    Reset Map View
                  </Button>
                </Card>
              )}
            </div>

            {/* Desktop Right Stats Panel */}
            <div style={{ position: 'absolute', right: 20, top: 20, zIndex: 10, maxWidth: 280 }}>
              <Card bordered={false} size="small" style={{ background: 'rgba(23,32,50,0.9)', border: '1px solid #223556', backdropFilter: 'blur(8px)' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#22c55e' }} />
                    <Text style={{ color: '#e6f0ff' }}>Active</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 2, background: '#64748b' }} />
                    <Text style={{ color: '#e6f0ff' }}>Inactive</Text>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
                  {Object.entries(stateStats).map(([state, count]) => (
                    <div key={state} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 2, background: STATE_COLORS[state] || BRAND_ORANGE }} />
                        <Text style={{ color: '#e6f0ff', fontWeight: 500 }}>{state}</Text>
                      </div>
                      <Badge count={count} style={{ backgroundColor: STATE_COLORS[state] || BRAND_ORANGE }} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}


        {/* =========================================
            MOBILE ONLY UI CONTROLS
            ========================================= */}
        {isMobile && (
          <>
            {/* Mobile Menu Button - Top Left */}
            <Button
              type="primary"
              icon={<MenuOutlined />}
              onClick={() => setMobileDrawerOpen(true)}
              style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.4)', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid #374151' }}
            >
              Menu & Filters
            </Button>

            {/* Mobile Bottom Drawer for Controls */}
            <Drawer
              title={<span style={{ color: '#fff' }}>Urja Partner Network</span>}
              placement="bottom"
              height="80vh" // Takes up 80% of screen height when opened
              onClose={() => setMobileDrawerOpen(false)}
              open={mobileDrawerOpen}
              style={{ background: '#0f172a', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
              headerStyle={{ background: '#1e293b', borderBottom: '1px solid #374151' }}
              closeIcon={<CloseCircleOutlined style={{ color: '#fff', fontSize: 18 }} />}
            >
              <FilterAndStatsContent />
            </Drawer>

            {/* Mobile Fixed Bottom Card for Selected Marker (Replaces Popup) */}
            {selected && (
              <div style={{
                position: 'absolute', bottom: 30, left: '5%', right: '5%', zIndex: 20,
                background: 'rgba(23, 32, 50, 0.95)', backdropFilter: 'blur(10px)',
                borderRadius: 16, border: '1px solid #374151', boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                padding: 16, animation: 'slideUp 0.3s ease-out'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <Text style={{ color: STATE_COLORS[selected.state] || BRAND_ORANGE, fontSize: 12, fontWeight: 600, textTransform: 'uppercase' }}>
                      {selected.city}
                    </Text>
                    <Title level={5} style={{ margin: 0, color: '#fff' }}>{selected.company}</Title>
                  </div>
                  <Button type="text" icon={<CloseCircleOutlined style={{ color: '#aaa', fontSize: 20 }} />} onClick={() => setSelected(null)} style={{ padding: 0 }} />
                </div>

                <Badge status={selected.status === 'active' ? 'success' : 'default'} text={<span style={{ color: '#ccc' }}>Status: {selected.statusLabel}</span>} style={{ marginBottom: 12, display: 'block' }} />

                <div style={{ padding: 10, background: '#111827', borderRadius: 8, fontSize: 13, color: '#aaa', marginBottom: 12 }}>
                  {selected.address}
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Button type="primary" style={{ flex: 1, borderRadius: 8, background: BRAND_GREEN, borderColor: BRAND_GREEN }} onClick={() => window.open(`https://www.google.com/maps?q=${selected.lat},${selected.lng}`, '_blank')}>
                    Directions
                  </Button>
                  <Button style={{ flex: 1, borderRadius: 8, background: '#1e293b', color: '#fff', borderColor: '#374151' }} onClick={() => navigator.clipboard && navigator.clipboard.writeText(selected.address)}>
                    Copy Details
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* --- MAP COMPONENT --- */}
        <Map
          ref={mapRef}
          mapLib={maplibregl}
          initialViewState={{
            longitude: 78.9629,
            latitude: 22.5937,
            zoom: isMobile ? 3.5 : 4,
            pitch: 0,
            bearing: 0,
          }}
          maxBounds={[
            [65.0, 6.0],
            [98.0, 38.0]
          ]}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyleUrl}
          dragRotate={!isMobile}
          cooperativeGestures={true}
          // Offset center slightly up on mobile so markers aren't hidden by bottom sheet if active
          padding={isMobile && selected ? { bottom: 200 } : {}}
        >
          {/* Navigation controls moved up on mobile so they don't hide behind the detail card */}
          <NavigationControl position={isMobile ? "top-right" : "bottom-right"} visualizePitch={true} />

          {/* Render Markers */}
          {markers}

          {/* Desktop Popup (Disabled on Mobile) */}
          {!isMobile && selected && (
            <Popup
              anchor="top"
              longitude={selected.lng}
              latitude={selected.lat}
              onClose={() => setSelected(null)}
              closeButton={false}
              offset={15}
              className="custom-popup"
              maxWidth="300px"
            >
              <Card
                size="small"
                bordered={false}
                style={{ borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                extra={<CloseCircleOutlined onClick={() => setSelected(null)} />}
                title={<span style={{ color: STATE_COLORS[selected.state] || BRAND_ORANGE }}>{selected.city}</span>}
              >
                <Badge status="processing" color={BRAND_GREEN} text={<Text strong>{selected.name}</Text>} />
                <div style={{ marginTop: 8, padding: 8, background: '#333', borderRadius: 4 }}>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {selected.address}<br />
                    {selected.state}
                  </Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <a href={`https://www.google.com/maps?q=${selected.lat},${selected.lng}`} target="_blank" rel="noreferrer" style={{ color: BRAND_GREEN, fontSize: '12px' }}>
                    Directions →
                  </a>
                  <Button type="link" size="small" onClick={() => navigator.clipboard && navigator.clipboard.writeText(selected.address)} style={{ color: '#fff' }}>
                    Copy Address
                  </Button>
                  <a href={selected.website} target="_blank" rel="noreferrer" style={{ color: '#fff', fontSize: '12px' }}>
                    Website
                  </a>
                </div>
              </Card>
            </Popup>
          )}
        </Map>

        {/* --- CSS STYLES --- */}
        <style>{`
          .marker-pin {
            cursor: pointer;
            transform: translateY(-5px);
            transition: all 0.3s ease;
          }
          .marker-pin:hover {
            transform: scale(1.12) translateY(-6px);
          }
          .pulse-ring {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            width: 10px; height: 10px;
            background: var(--pulse-color-background, rgba(255, 122, 69, 0.4));
            border-radius: 50%;
            animation: pulse 2s infinite;
            z-index: -1;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 var(--pulse-color-strong, rgba(255, 122, 69, 0.7)); }
            70% { box-shadow: 0 0 0 15px var(--pulse-color-transparent, rgba(255, 122, 69, 0)); }
            100% { box-shadow: 0 0 0 0 var(--pulse-color-transparent, rgba(255, 122, 69, 0)); }
          }
          @keyframes slideUp {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          /* Custom Popup Overrides */
          .maplibregl-popup-content {
            background: transparent !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .maplibregl-popup-tip {
            border-bottom-color: #1f1f1f !important;
          }
          .marker-label {
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
            font-size: 11px;
            line-height: 1;
            padding: 4px 6px;
            border: 1px solid;
            border-radius: 6px;
            white-space: nowrap;
            backdrop-filter: blur(4px);
            transition: opacity 0.2s ease, transform 0.2s ease;
          }
          
          /* Custom AntD Drawer styling for dark mode compatibility */
          .ant-drawer-content-wrapper {
            box-shadow: 0 -10px 40px rgba(0,0,0,0.5) !important;
          }
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default India3DMap;