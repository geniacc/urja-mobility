import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import Globe from 'react-globe.gl';

const useResponsive = () => {
  const [state, setState] = useState({
    isMobile: false,
    mobileLite: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDevice = () => {
      const isMobile = window.innerWidth <= 768;
      const mobileLite = isMobile || (navigator.connection && navigator.connection.saveData);
      setState({ isMobile, mobileLite });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return state;
};

const DEFAULT_MARKERS = [
  { id: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090, type: 'service', region: 'North', status: 'active', services: ['Install', 'Maintenance'], website: 'https://delhi.gov.in' },
  { id: 'bhopal', name: 'Bhopal', lat: 23.2599, lng: 77.4126, type: 'manufacturing', region: 'Central', status: 'active', services: ['Manufacturing'], website: 'https://mp.gov.in' },
  { id: 'hyderabad', name: 'Hyderabad', lat: 17.3850, lng: 78.4867, type: 'service_distribution', region: 'South', status: 'planning', services: ['Distribution', 'Support'], website: 'https://telangana.gov.in' },
  { id: 'guwahati', name: 'Guwahati', lat: 26.1445, lng: 91.7362, type: 'service', region: 'East', status: 'active', services: ['Install'], website: 'https://assam.gov.in' },
  { id: 'kolkata', name: 'Kolkata', lat: 22.5726, lng: 88.3639, type: 'service_distribution', region: 'East', status: 'active', services: ['Distribution', 'Service'], website: 'https://wb.gov.in' },
  { id: 'chennai', name: 'Chennai', lat: 13.0827, lng: 80.2707, type: 'service', region: 'South', status: 'active', services: ['Install', 'Maintenance'], website: 'https://tn.gov.in' },
];

const STORAGE_KEY = 'india-3d-map-settings';

const India3DMap = () => {
  const { isMobile, mobileLite } = useResponsive();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [markers] = useState(DEFAULT_MARKERS);
  const [selected, setSelected] = useState(null);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ service: true, manufacturing: true, service_distribution: true });
  const [showRoutes, setShowRoutes] = useState(true);
  const [showBoundary, setShowBoundary] = useState(true);

  const [indiaPolygon, setIndiaPolygon] = useState([]);
  const [statePolygons, setStatePolygons] = useState([]);
  const [worldCountries, setWorldCountries] = useState([]);
  const [hoveredStateKey, setHoveredStateKey] = useState(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [dataReady, setDataReady] = useState({ world: false, states: false });

  const [size, setSize] = useState({ w: 800, h: 600 });

  const globeRef = useRef(null);
  const globeContainerRef = useRef(null);
  const altitudeRef = useRef(2.3);

  useEffect(() => {
    const update = () => {
      if (globeContainerRef.current) {
        const rect = globeContainerRef.current.getBoundingClientRect();
        setSize({
          w: Math.max(300, Math.floor(rect.width)),
          h: Math.max(300, Math.floor(rect.height))
        });
      } else {
        setSize({
          w: typeof window !== 'undefined' ? window.innerWidth : 800,
          h: typeof window !== 'undefined' ? window.innerHeight : 600
        });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const loadJsonWithFallbacks = async (urls = []) => {
    for (const url of urls) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        console.warn(`Failed loading ${url}`, err);
        continue;
      }
    }
    return null;
  };

  useEffect(() => {
    loadJsonWithFallbacks([
      'https://raw.githubusercontent.com/vasturiano/three-globe/master/example/globe-data/world-countries.json'
    ]).then(data => {
      if (data?.features) {
        setWorldCountries(data.features);
        setDataReady(prev => ({ ...prev, world: true }));
      }
    });
  }, []);

  useEffect(() => {
    loadJsonWithFallbacks([
      'https://gist.githubusercontent.com/jbrobst/56c13bbbf9d97d187fea01ca62ea5112/raw/e388c4cae20aa53cb5090210a42ebb9b765c0a36/india_states.geojson'
    ]).then(data => {
      if (data?.features) {
        setStatePolygons(data.features);
        setIndiaPolygon(data.features);
        setDataReady(prev => ({ ...prev, states: true }));
      }
    });
  }, []);

  const polygonData = useMemo(() => {
    const base = worldCountries || [];
    const overlay = showBoundary ? (statePolygons.length ? statePolygons : indiaPolygon) : [];
    return [...base, ...overlay];
  }, [worldCountries, statePolygons, indiaPolygon, showBoundary]);

  const filtered = useMemo(() => {
    const enabledTypes = Object.entries(filters).filter(([, enabled]) => enabled).map(([type]) => type);
    const q = searchQuery.trim().toLowerCase();
    return markers.filter(m => enabledTypes.includes(m.type) && (!q || m.name.toLowerCase().includes(q)));
  }, [markers, filters, searchQuery]);

  const countsAll = useMemo(() => ({
    service: markers.filter(m => m.type === 'service').length,
    manufacturing: markers.filter(m => m.type === 'manufacturing').length,
    service_distribution: markers.filter(m => m.type === 'service_distribution').length,
  }), [markers]);

  const focusCity = (cityName) => {
    const q = (cityName || '').trim().toLowerCase();
    const target = markers.find(m => m.name.toLowerCase().includes(q));
    if (!target) return;
    setSelected(target);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: target.lat, lng: target.lng, altitude: 2.1 }, 1000);
    }
  };
  const zoomIn = () => {
    if (!globeRef.current) return;
    const cur = globeRef.current.pointOfView();
    globeRef.current.pointOfView({ ...cur, altitude: Math.max(0.25, cur.altitude * 0.7) }, 400);
  };

  const zoomOut = () => {
    if (!globeRef.current) return;
    const cur = globeRef.current.pointOfView();
    globeRef.current.pointOfView({ ...cur, altitude: Math.min(4.0, cur.altitude * 1.3) }, 400);
  };

  const resetView = () => {
    setSelected(null);
    setTourPlaying(false);
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 21.0, lng: 78.0, altitude: 1.8 }, 1200);
    }
  };

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 21.0, lng: 78.0, altitude: 1.8 }, 1000);
      const ctrls = globeRef.current.controls();
      ctrls.enableZoom = true;
      ctrls.autoRotate = false;
      ctrls.enablePan = isMobile;
    }
  }, [isMobile]);

  const getContinent = (feat) => feat?.properties?.CONTINENT || 'Asia';

  const CONTINENT_COLORS = {
    Africa: '#f59e0b', Asia: '#22c55e', Europe: '#60a5fa',
    'North America': '#38bdf8', 'South America': '#84cc16',
    Oceania: '#a78bfa', Antarctica: '#e5e7eb'
  };

  const isIndiaState = (feat) => feat?.properties?.ST_NM || feat?.properties?.NAME_1;

  const FiltersPanel = () => (
    <div style={{ position: 'absolute', top: 16, left: 16, width: isMobile ? 'calc(100% - 32px)' : 320, background: '#111827', border: '1px solid #374151', color: '#e5e7eb', padding: 16, borderRadius: 12, zIndex: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontWeight: 600 }}>Filters</div>
        {isMobile && <button onClick={() => setFiltersOpen(false)} style={{ background:'#374151', border:'none', color:'white', borderRadius:4, padding:'2px 8px'}}>X</button>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 13, marginBottom: 12 }}>
        {Object.keys(filters).map(key => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            <input type="checkbox" checked={filters[key]} onChange={(e) => setFilters(f => ({ ...f, [key]: e.target.checked }))} />
            {key.replace('_', ' ')}
          </label>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          placeholder="Search City..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, background: '#0b1220', border: '1px solid #374151', color: 'white', borderRadius: 6, padding: '6px 10px' }}
        />
        <button onClick={() => focusCity(searchQuery)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '0 12px' }}>Go</button>
      </div>
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#0b1220', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      <div style={{ flex: isMobile ? '0 0 auto' : '0 0 35%', padding: isMobile ? 20 : 40, color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'none', zIndex: 5 }}>
        <h1 style={{ fontSize: isMobile ? 32 : 56, margin: 0, fontWeight: 800, lineHeight: 1.1 }}>Expanding<br/>As We Evolve</h1>
        <h2 style={{ fontSize: 24, color: '#22c55e', marginTop: 10 }}>India Operations</h2>
        <p style={{ color: '#94a3b8', maxWidth: 400, marginTop: 20 }}>
          Interactive visualization of our manufacturing and service hubs across the subcontinent.
        </p>
      </div>
      <div ref={globeContainerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {!filtersOpen && (
          <button onClick={() => setFiltersOpen(true)} style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}>
            Filters
          </button>
        )}
        {filtersOpen && <FiltersPanel />}
        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 8, zIndex: 10 }}>
           <button onClick={resetView} style={{ background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: 8, cursor: 'pointer' }}>Reset</button>
           <button onClick={zoomIn} style={{ background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: 8, cursor: 'pointer' }}>+</button>
           <button onClick={zoomOut} style={{ background: '#1f2937', color: 'white', border: '1px solid #374151', padding: '8px', borderRadius: 8, cursor: 'pointer' }}>-</button>
        </div>
        <Globe
          ref={globeRef}
          width={size.w}
          height={size.h}
          backgroundColor="#0b1220"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          polygonsData={polygonData}
          polygonGeoJsonGeometry={(feat) => feat.geometry}
          polygonCapColor={(feat) => {
             if (isIndiaState(feat)) return 'rgba(56, 189, 248, 0.2)';
             const cont = getContinent(feat);
             return hexToRgba(CONTINENT_COLORS[cont] || '#555', 0.8);
          }}
          polygonSideColor={() => 'rgba(0,0,0,0.15)'}
          polygonStrokeColor={(feat) => isIndiaState(feat) ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0)'}
          polygonAltitude={(feat) => isIndiaState(feat) ? 0.005 : 0.001}
          onPolygonHover={setHoveredStateKey}
          polygonsTransitionDuration={300}
          pointsData={filtered}
          pointLat="lat"
          pointLng="lng"
          pointColor={d => d.status === 'active' ? '#22c55e' : '#f59e0b'}
          pointAltitude={0.05}
          pointRadius={0.5}
          pointResolution={24}
          onPointClick={setSelected}
          onPointHover={setHoveredPoint}
          labelsData={filtered}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={1.5}
          labelDotRadius={0.5}
          labelColor={() => 'white'}
          labelAltitude={0.06}
        />
        {hoveredPoint && (
          <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px 12px', borderRadius: 6, pointerEvents: 'none' }}>
            <b>{hoveredPoint.name}</b><br/>
            <span style={{ fontSize: 12, color: '#aaa' }}>{hoveredPoint.type}</span>
          </div>
        )}
        {selected && (
           <div style={{ position: 'absolute', bottom: 40, right: '50%', transform: 'translateX(50%)', width: 300, background: '#1e293b', border: '1px solid #475569', borderRadius: 12, padding: 16, color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <h3 style={{ margin: '0 0 8px 0', color: '#22c55e' }}>{selected.name}</h3>
                 <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>Close</button>
              </div>
              <div style={{ fontSize: 14, color: '#cbd5e1' }}>
                 <p><b>Status:</b> {selected.status}</p>
                 <p><b>Region:</b> {selected.region}</p>
                 <p><b>Services:</b> {selected.services.join(', ')}</p>
                 <a href={selected.website} target="_blank" rel="noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>Visit Website &rarr;</a>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default India3DMap;
