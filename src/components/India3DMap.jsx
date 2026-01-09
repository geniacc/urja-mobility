import React, { useState, useMemo, useRef, useEffect } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import { Card, Typography, Button, Badge, Input, ConfigProvider, Segmented } from 'antd';
import { 
  EnvironmentFilled, 
  SearchOutlined, 
  CloseCircleOutlined, 
  FilterFilled,
  ThunderboltFilled 
} from '@ant-design/icons';
import 'maplibre-gl/dist/maplibre-gl.css';

const { Text, Title } = Typography;

// --- 1. GEOCODED DATA FROM YOUR TEXT LIST ---
const DEALER_DATA = [
  { id: 1, name: 'Siliguri (Sevoke Rd)', city: 'Siliguri', state: 'West Bengal', lat: 26.7271, lng: 88.3953, type: 'dealer', address: 'SHIRISH ROY, SEVOKE ROAD, BHAKTINAGAR, 734006', website: 'https://urjamobility.in' },
  { id: 2, name: 'Banda', city: 'Banda', state: 'Uttar Pradesh', lat: 25.4833, lng: 80.3333, type: 'dealer', address: 'Swaraj Colony Gali no 3 Jail Road Banda 210001', website: 'https://urjamobility.in' },
  { id: 3, name: 'Kanpur', city: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319, type: 'dealer', address: '31/17 Block -4 Govind Nagar Kanpur', website: 'https://urjamobility.in' },
  { id: 4, name: 'Agra', city: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081, type: 'dealer', address: '5E, 10, Ashok Vihar, Azam Para, Shahganj', website: 'https://urjamobility.in' },
  { id: 5, name: 'Gorakhpur (Sahjanwa)', city: 'Gorakhpur', state: 'Uttar Pradesh', lat: 26.7606, lng: 83.3732, type: 'dealer', address: 'Bharwal bharsad sahjanwa gorakhpur', website: 'https://urjamobility.in' },
  { id: 6, name: 'Kolkata', city: 'Kolkata', state: 'West Bengal', lat: 22.6542, lng: 88.4384, type: 'dealer', address: '5, Italgacha Road, Flat B1 2ND Floor, 700074', website: 'https://urjamobility.in' },
  { id: 7, name: 'Bhojpur', city: 'Bhojpur', state: 'Bihar', lat: 25.5560, lng: 84.6603, type: 'dealer', address: 'KHANANI KHURD KHANANI KALA BHOJPUR', website: 'https://urjamobility.in' },
  { id: 8, name: 'Lucknow', city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, type: 'dealer', address: 'Ashok Vihar, Rajaji Puram, Lucknow 226017', website: 'https://urjamobility.in' },
  { id: 9, name: 'Bareilly', city: 'Bareilly', state: 'Uttar Pradesh', lat: 28.3670, lng: 79.4304, type: 'dealer', address: 'Park Math And Trilok Vihar Colony, CB Ganj Bypass', website: 'https://urjamobility.in' },
  { id: 10, name: 'Allahabad (Kalyani Devi)', city: 'Allahabad', state: 'Uttar Pradesh', lat: 25.4358, lng: 81.8463, type: 'dealer', address: '1123/A, KALYANI DEVI, ALLAHABAD', website: 'https://urjamobility.in' },
  { id: 11, name: 'Prayagraj (Naini)', city: 'Prayagraj', state: 'Uttar Pradesh', lat: 25.3976, lng: 81.8672, type: 'dealer', address: 'PURA FATEH MOHAMMAD, Naini, Prayagraj 211008', website: 'https://urjamobility.in' },
  { id: 12, name: 'Siliguri (Darjeeling)', city: 'Darjeeling', state: 'West Bengal', lat: 26.7139, lng: 88.3756, type: 'dealer', address: 'Sishudangi, Tomba, Matigara Darjeeling', website: 'https://urjamobility.in' },
  { id: 13, name: 'Siwan', city: 'Siwan', state: 'Bihar', lat: 26.2196, lng: 84.3567, type: 'dealer', address: 'Korari Kala Daraundha, Siwan Bihar', website: 'https://urjamobility.in' },
  { id: 14, name: 'Indore', city: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577, type: 'dealer', address: 'Indore City Center', website: 'https://urjamobility.in' },
  { id: 15, name: 'Barrackpore', city: 'Barrackpore', state: 'West Bengal', lat: 22.7630, lng: 88.3670, type: 'dealer', address: '53(15) Anima Rise, Port blair Line', website: 'https://urjamobility.in' },
  { id: 16, name: 'Birbhum (Mayureswar)', city: 'Birbhum', state: 'West Bengal', lat: 23.9577, lng: 87.5255, type: 'dealer', address: 'Plot No. 745, J.L.No. 138 Mayureswar', website: 'https://urjamobility.in' },
  { id: 17, name: 'Bhagalpur', city: 'Bhagalpur', state: 'Bihar', lat: 25.2425, lng: 86.9746, type: 'dealer', address: 'Ishachak Nilkanth Nagar, Bhikhanpur', website: 'https://urjamobility.in' },
  { id: 18, name: 'Kahalgaon', city: 'Kahalgaon', state: 'Bihar', lat: 25.2638, lng: 87.2343, type: 'dealer', address: 'Ramzanipur Chauhadi, Kahalgaon Bhagalpur', website: 'https://urjamobility.in' },
];

const BRAND_GREEN = '#52c41a';
const BRAND_ORANGE = '#ff7a45';
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
const VOYAGER_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";
const POSITRON_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const STREETS_STYLE = "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL"; // Example, sticking to free carto for now to avoid keys
// Using Carto's Dark Matter, Voyager (Colorful), and Positron (Light)
// Let's add a custom colorful one if possible, or just refine colors.
// Actually, let's just make the markers pop more.

const STATE_COLORS = {
  'West Bengal': '#10b981', // Emerald Green
  'Uttar Pradesh': '#3b82f6', // Bright Blue
  'Bihar': '#ef4444', // Red
  'Madhya Pradesh': '#d946ef' // Fuchsia
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [showList, setShowList] = useState(false);
  const [mapStyleUrl, setMapStyleUrl] = useState(MAP_STYLE);
  const [showLabels, setShowLabels] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  // Filters Logic
  const [filters, setFilters] = useState({ 
    dealer: true, 
    partner: false, // kept structure for future
    service_centre: false 
  });

  // Filter Data
  const filteredMarkers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DEALER_DATA.filter(m => {
      const matchesType = filters[m.type];
      const matchesSearch = !q || 
        m.name.toLowerCase().includes(q) || 
        m.city.toLowerCase().includes(q) ||
        m.state.toLowerCase().includes(q);
      return matchesType && matchesSearch;
    });
  }, [filters, searchQuery]);
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
        zoom: 12, // Zoom in closer for street addresses
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
      }}
    >
      <div className="marker-pin">
        <EnvironmentFilled 
           style={{ 
             fontSize: isMobile ? '32px' : '28px', 
             color: STATE_COLORS[dealer.state] || BRAND_ORANGE, 
             filter: 'drop-shadow(0px 5px 5px rgba(0,0,0,0.5))' 
           }} 
        />
        <div 
          className="pulse-ring" 
          style={{ 
            background: hexToRgba(STATE_COLORS[dealer.state] || BRAND_ORANGE, 0.4),
            ['--pulse-color-strong']: hexToRgba(STATE_COLORS[dealer.state] || BRAND_ORANGE, 0.7),
            ['--pulse-color-transparent']: hexToRgba(STATE_COLORS[dealer.state] || BRAND_ORANGE, 0)
          }} 
        />
        {showLabels && (
          <div 
            className="marker-label" 
            style={{ 
              borderColor: STATE_COLORS[dealer.state] || BRAND_ORANGE,
              background: hexToRgba(STATE_COLORS[dealer.state] || BRAND_ORANGE, 0.15)
            }}
          >
            {dealer.city}
          </div>
        )}
      </div>
    </Marker>
  )), [filteredMarkers, isMobile]);

  return (
    <ConfigProvider theme={{ token: { colorPrimary: BRAND_GREEN, colorBgContainer: '#1f1f1f', colorText: '#fff' } }}>
      <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'linear-gradient(180deg, #0b1220 0%, #0a1120 60%, #091120 100%)', overflow: 'hidden' }}>
        
        {/* Top Center Heading */}
        <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', zIndex: 12, textAlign: 'center' }}>
          <div style={{ padding: '8px 16px', borderRadius: 999, background: 'rgba(15, 23, 42, 0.65)', border: '1px solid #1f2a44', backdropFilter: 'blur(6px)' }}>
            <Text style={{ fontWeight: 600, letterSpacing: 0.6, color: '#c9d7ff' }}>India Presence</Text>
            <div style={{ fontSize: 12, color: '#9fb3ff' }}>Urja Mobility Dealer Network</div>
          </div>
        </div>
        
        {/* --- LEFT SIDEBAR / OVERLAY --- */}
        <div style={{ 
            position: 'absolute', top: 20, left: 20, zIndex: 10, 
            display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '320px' 
        }}>
          {/* Title Card */}
          <Card bordered={false} size="small" style={{ background: 'linear-gradient(135deg, rgba(27, 38, 59, 0.9) 0%, rgba(17, 24, 39, 0.95) 100%)', backdropFilter: 'blur(8px)', border: '1px solid #203049' }}>
            <Title level={4} style={{ margin: 0, color: '#e6f0ff', letterSpacing: 0.5 }}>Urja Mobility</Title>
            <Text style={{ color: '#9fb3ff' }}>Nationwide Dealer Network</Text>
          </Card>

          {/* Toggle Filter Panel */}
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
          {isMobile && (
            <Button onClick={() => setShowList(v => !v)} type={showList ? 'primary' : 'default'} style={{ borderRadius: 999 }}>
              {showList ? 'Hide List' : 'Show List'}
            </Button>
          )}
          <Button onClick={() => setShowLabels(v => !v)} type={showLabels ? 'primary' : 'default'} style={{ borderRadius: 999 }}>
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </Button>

          {/* Filter & Search Panel */}
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
                   type={filters.dealer ? 'primary' : 'default'} 
                   onClick={() => setFilters(f => ({ ...f, dealer: !f.dealer }))}
                   style={{ borderRadius: 999 }}
                 >
                   Dealers ({DEALER_DATA.length})
                 </Button>
                 <Button 
                   type={filters.service_centre ? 'primary' : 'default'} 
                   onClick={() => setFilters(f => ({ ...f, service_centre: !f.service_centre }))}
                   style={{ borderRadius: 999 }}
                 >
                   Service Centres
                 </Button>
                 <Button 
                   type={filters.partner ? 'primary' : 'default'} 
                   onClick={() => setFilters(f => ({ ...f, partner: !f.partner }))}
                   style={{ borderRadius: 999 }}
                 >
                   Partners
                 </Button>
               </div>
               
               <Button type="link" size="small" onClick={resetView} style={{ paddingLeft: 0, marginTop: 10 }}>
                 Reset Map View
               </Button>
             </Card>
          )}
        </div>

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
            [65.0, 6.0],  // SW Limit
            [98.0, 38.0]  // NE Limit
          ]}
          style={{ width: '100%', height: '100%' }}
          mapStyle={mapStyleUrl}
          dragRotate={!isMobile}
          cooperativeGestures={true}
        >
          <NavigationControl position="bottom-right" visualizePitch={true} />

          {/* Render Markers */}
          {markers}

          {/* Popup Card */}
          {selected && (
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
                    {selected.address}<br/>
                    {selected.state}
                  </Text>
                </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
                  <Button size="small" onClick={() => navigator.clipboard && navigator.clipboard.writeText(`${selected.lat}, ${selected.lng}`)}>
                    Copy Coords
                  </Button>
                </div>
              </Card>
            </Popup>
          )}
        </Map>
        <div style={{ position: 'absolute', right: 20, top: 20, zIndex: 10, maxWidth: 280 }}>
          <Card bordered={false} size="small" style={{ background: 'rgba(23,32,50,0.9)', border: '1px solid #223556', backdropFilter: 'blur(8px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              {Object.entries(stateStats).map(([state, count]) => (
                <div key={state} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span 
                      style={{ 
                        width: 10, height: 10, borderRadius: 2, 
                        background: STATE_COLORS[state] || BRAND_ORANGE 
                      }} 
                    />
                    <Text style={{ color: '#e6f0ff', fontWeight: 500 }}>{state}</Text>
                  </div>
                  <Badge count={count} style={{ backgroundColor: STATE_COLORS[state] || BRAND_ORANGE }} />
                </div>
              ))}
            </div>
          </Card>
        </div>
        {isMobile && showList && (
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 10 }}>
            <Card bordered={false} size="small" style={{ background: 'rgba(31,31,31,0.9)', backdropFilter: 'blur(8px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {filteredMarkers.slice(0, 8).map(item => (
                  <Button key={item.id} onClick={() => { setSelected(item); mapRef.current && mapRef.current.flyTo({ center: [item.lng, item.lat], zoom: 12, pitch: 50, duration: 2000 }); }} style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Text strong style={{ color: '#fff' }}>{item.city}</Text>
                      <Text style={{ color: '#aaa', fontSize: 12 }}>{item.state}</Text>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        )}

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
        `}</style>
      </div>
    </ConfigProvider>
  );
};

export default India3DMap;
