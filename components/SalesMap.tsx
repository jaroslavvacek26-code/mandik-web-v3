import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from 'react-simple-maps';
import { Phone, Mail, User, ChevronLeft, X, Globe2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import {
  salesContacts,
  countryCodeToRegion,
  divisionColors,
  DivisionId,
  RegionId,
  SalesContact,
} from '../salesContactData';
import CzechRegionMap from './CzechRegionMap';
import EuroRegionMap from './EuroRegionMap';
import { Language } from '../types';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// ISO numeric codes that trigger a sub-map
const CZ_CODE = '203';
const DE_CODE = '276';
const AT_CODES = new Set(['40', '040']);

// Company HQ – Dobříšská 550, Hostomice (Central Bohemia)
const HQ: [number, number] = [14.043, 49.795];

// Dark theme palette
const C = {
  bg:        '#06111e',
  country:   '#0c1e31',   // base country fill – slightly above bg so shapes are visible
  southeast: '#0f3460',
  czech:     '#00AEEF',
  german:    '#0077b6',
  hover:     '#00c8ff',
  border:    '#112233',   // slightly lighter stroke for 50m crispness
};

const divColor: Record<DivisionId, string> = {
  czech:     C.czech,
  german:    C.german,
  southeast: C.southeast,
};

const getCountryFill = (id: string): string => {
  if (id === CZ_CODE) return C.czech;
  const region = countryCodeToRegion[id];
  if (!region) return C.southeast;
  const contact = salesContacts.find(c => c.id === region);
  return contact ? divColor[contact.division] : C.southeast;
};

const lbl = (cz: string, en: string, de: string, l: Language) =>
  l === 'de' ? de : l === 'en' ? en : cz;

type ActiveCountry = null | 'CZ' | 'DE' | 'AT';

const SalesMap: React.FC = () => {
  const { language } = useLanguage();
  const [selected,      setSelected]      = useState<SalesContact | null>(null);
  const [activeCountry, setActiveCountry] = useState<ActiveCountry>(null);
  const [zoom,          setZoom]          = useState(4.0);
  const [center,        setCenter]        = useState<[number, number]>([13, 50]);

  const handleCountry = (id: string) => {
    if (id === CZ_CODE)          { setActiveCountry('CZ'); setSelected(null); return; }
    if (id === DE_CODE)          { setActiveCountry('DE'); setSelected(null); return; }
    if (AT_CODES.has(id))        { setActiveCountry('AT'); setSelected(null); return; }
    const region: RegionId = countryCodeToRegion[id] ?? 'southeast';
    const c = salesContacts.find(x => x.id === region)
           ?? salesContacts.find(x => x.id === 'southeast')!;
    setSelected(c);
  };

  const handleBack = () => { setActiveCountry(null); setSelected(null); };

  const subTitle = (): string => {
    if (activeCountry === 'CZ') return lbl('Česká republika', 'Czech Republic',       'Tschechische Republik', language);
    if (activeCountry === 'DE') return lbl('Německo',          'Germany',              'Deutschland',           language);
    if (activeCountry === 'AT') return lbl('Rakousko',         'Austria',              'Österreich',            language);
    return lbl('Obchodní zastoupení', 'Sales Representatives', 'Handelsvertretung', language);
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-2xl" style={{ background: C.bg }}>

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-3"
           style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(0,174,239,0.15)' }}>
        <div className="flex items-center gap-3">
          {activeCountry !== null && (
            <button onClick={handleBack}
              className="flex items-center gap-1 text-sm transition-colors"
              style={{ color: 'rgba(255,255,255,0.5)' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.czech)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
              <ChevronLeft size={16} />
              {lbl('Zpět', 'Back', 'Zurück', language)}
            </button>
          )}
          <span className="flex items-center gap-2 font-semibold text-white text-base">
            <Globe2 size={18} style={{ color: C.czech }} />
            {subTitle()}
          </span>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {([['czech',     lbl('Český',       'Czech',    'Tschech.', language)],
             ['german',    lbl('Německý',     'German',   'Deutsch',  language)],
             ['southeast', lbl('Jihovýchodní','Southeast','Südost',   language)],
          ] as [DivisionId, string][]).map(([key, name]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: divColor[key] }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: '460px' }}>

        {/* Map area */}
        <div className="flex-1 relative" style={{ background: C.bg }}>

          {/* ── Czech sub-map ── */}
          {activeCountry === 'CZ' ? (
            <CzechRegionMap
              onRegionClick={(r) => setSelected(salesContacts.find(c => c.id === r)!)}
              selectedRegion={
                selected?.id === 'bohemia' || selected?.id === 'moravia'
                  ? selected.id as 'bohemia' | 'moravia' : undefined}
              language={language}
              dark
            />

          /* ── German sub-map ── */
          ) : activeCountry === 'DE' ? (
            <EuroRegionMap
              countryCode="DE"
              contactId="germany"
              center={[10.4, 51.2]}
              scale={1700}
              height={360}
              divColor={C.german}
              onRegionClick={(id) => setSelected(salesContacts.find(c => c.id === id)!)}
              language={language}
              dark
            />

          /* ── Austrian sub-map ── */
          ) : activeCountry === 'AT' ? (
            <EuroRegionMap
              countryCode="AT"
              contactId="austria"
              center={[13.3, 47.7]}
              scale={3700}
              height={240}
              divColor={C.german}
              onRegionClick={(id) => setSelected(salesContacts.find(c => c.id === id)!)}
              language={language}
              dark
            />

          /* ── World map ── */
          ) : (
            <>
              <ComposableMap
                projectionConfig={{ scale: 480 }}
                style={{ width: '100%', height: '460px', background: C.bg }}
              >
                <ZoomableGroup zoom={zoom} center={center} minZoom={1} maxZoom={8}
                  onMoveEnd={({ zoom: z, coordinates }) => {
                    setZoom(z);
                    setCenter(coordinates as [number, number]);
                  }}>

                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map(geo => (
                        <Geography key={geo.rsmKey} geography={geo}
                          fill={getCountryFill(String(geo.id))}
                          stroke={C.border}
                          strokeWidth={0.5}
                          onClick={() => handleCountry(String(geo.id))}
                          style={{
                            default: { outline: 'none' },
                            hover:   { fill: C.hover, outline: 'none', cursor: 'pointer' },
                            pressed: { outline: 'none' },
                          }}
                        />
                      ))
                    }
                  </Geographies>

                  {/* HQ marker – Dobříšská 550, Hostomice */}
                  <Marker coordinates={HQ}>
                    <circle r={3.5} fill="none" stroke="white" strokeWidth={1} opacity={0.85} />
                    <circle r={1.5} fill="white" />
                    <text
                      textAnchor="middle" y={-6}
                      fontSize={3.2} fontWeight={700} letterSpacing={0.3}
                      fill="white" style={{ pointerEvents: 'none', userSelect: 'none' }}>
                      MANDÍK a.s.
                    </text>
                  </Marker>

                </ZoomableGroup>
              </ComposableMap>

              {/* Zoom buttons */}
              <div className="absolute bottom-14 right-3 flex flex-col gap-1">
                {[
                  ['+', () => setZoom(z => Math.min(z * 1.5, 8))],
                  ['−', () => setZoom(z => Math.max(z / 1.5, 1))],
                  ['⌂', () => { setZoom(4.0); setCenter([13, 50]); }],
                ].map(([icon, fn], i) => (
                  <button key={i} onClick={fn as () => void}
                    className="w-7 h-7 rounded flex items-center justify-center font-bold text-sm transition-colors"
                    style={{ background: 'rgba(0,174,239,0.15)', color: C.czech, border: `1px solid rgba(0,174,239,0.3)` }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,174,239,0.3)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,174,239,0.15)')}>
                    {icon as string}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Hint */}
          {!selected && activeCountry === null && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-xs px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}>
                {lbl('Klikněte na zemi', 'Click on a country', 'Land auswählen', language)}
              </span>
            </div>
          )}
        </div>

        {/* ── Contact panel ── */}
        {selected && (
          <div className="lg:w-72 flex flex-col p-6 gap-4"
            style={{
              background: 'rgba(0,0,0,0.45)',
              borderLeft: '1px solid rgba(0,174,239,0.12)',
              backdropFilter: 'blur(8px)',
            }}>

            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-1"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                {selected.divisionName[language]}
              </p>
              <h3 className="text-2xl font-bold text-white leading-tight">
                {selected.regionName[language]}
              </h3>
              <div className="mt-2 h-0.5 w-10 rounded"
                style={{ background: divColor[selected.division] }} />
            </div>

            <div className="flex flex-col gap-4 flex-1">
              {/* Rep */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,174,239,0.12)', border: '1px solid rgba(0,174,239,0.2)' }}>
                  <User size={15} style={{ color: C.czech }} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{selected.representative}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {selected.title[language]}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <a href={`tel:${selected.phone.replace(/\s/g,'')}`}
                className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: 'rgba(0,174,239,0.08)', border: '1px solid rgba(0,174,239,0.15)' }}>
                  <Phone size={14} style={{ color: C.czech }} />
                </div>
                <span className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.czech)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                  {selected.phone}
                </span>
              </a>

              {/* Email */}
              <a href={`mailto:${selected.email}`}
                className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,174,239,0.08)', border: '1px solid rgba(0,174,239,0.15)' }}>
                  <Mail size={14} style={{ color: C.czech }} />
                </div>
                <span className="text-sm break-all transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.czech)}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}>
                  {selected.email}
                </span>
              </a>
            </div>

            <button onClick={() => setSelected(null)}
              className="flex items-center gap-1 text-xs transition-colors self-start mt-2"
              style={{ color: 'rgba(255,255,255,0.25)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
              <X size={12} /> {lbl('Zavřít', 'Close', 'Schließen', language)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesMap;
