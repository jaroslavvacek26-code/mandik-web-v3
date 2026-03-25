import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { Language } from '../types';

// Company HQ – Dobříšská 550, Hostomice (Středočeský kraj, Bohemia)
const HQ: [number, number] = [14.043, 49.795];

type CzechRegion = 'bohemia' | 'moravia';

interface CzechRegionMapProps {
  onRegionClick: (region: CzechRegion) => void;
  selectedRegion?: CzechRegion;
  language: Language;
  dark?: boolean;
}

// Eurostat GISCO NUTS3 data (all EU regions, filtered to CZ below)
const GEO_URL = 'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_03M_2021_4326_LEVL_3.geojson';

// Map NUTS_ID → macro-region
const MORAVIA_IDS = new Set(['CZ064', 'CZ071', 'CZ072', 'CZ080']);
const getRegion = (nutsId: string): CzechRegion =>
  MORAVIA_IDS.has(nutsId) ? 'moravia' : 'bohemia';

// Light-theme colours (blues kept, darks inverted)
const COLORS = {
  bohemia:      '#00AEEF',
  bohemiaHover: '#0ea5e9',
  moravia:      '#0077B6',
  moraviaHover: '#0369a1',
  stroke:       '#bfdbfe',   // blue-200 – light border
};

const regionLabels = {
  bohemia: { cz: 'Čechy',            en: 'Bohemia',           de: 'Böhmen'            },
  moravia: { cz: 'Morava + Slezsko', en: 'Moravia + Silesia', de: 'Mähren + Schlesien' },
};

const CzechRegionMap: React.FC<CzechRegionMapProps> = ({ onRegionClick, selectedRegion, language }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center" style={{ minHeight: '380px' }}>
      <div className="w-full" style={{ maxWidth: '560px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3400, center: [15.5, 49.75] }}
          width={560}
          height={280}
          style={{ width: '100%', height: 'auto', background: 'transparent' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => (geo.properties.CNTR_CODE as string) === 'CZ')
                .map((geo) => {
                  const nutsId   = geo.properties.NUTS_ID as string;
                  const region   = getRegion(nutsId);
                  const isSelected = selectedRegion === region;
                  const base     = region === 'bohemia' ? COLORS.bohemia   : COLORS.moravia;
                  const hover    = region === 'bohemia' ? COLORS.bohemiaHover : COLORS.moraviaHover;
                  const fill     = isSelected ? base : `${base}aa`;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fill}
                      stroke={COLORS.stroke}
                      strokeWidth={0.8}
                      onClick={() => onRegionClick(region)}
                      style={{
                        default: {
                          outline: 'none',
                          filter: isSelected ? `drop-shadow(0 2px 6px ${base}66)` : 'none',
                        },
                        hover:   { fill: hover, outline: 'none', cursor: 'pointer' },
                        pressed: { outline: 'none' },
                      }}
                    />
                  );
                })
            }
          </Geographies>

          {/* HQ marker – Hostomice */}
          <Marker coordinates={HQ}>
            <circle r={5} fill="none" stroke={COLORS.moravia} strokeWidth={1.3} />
            <circle r={2.5} fill={COLORS.moravia} />
            <text
              textAnchor="middle" y={-9}
              fontSize={6} fontWeight={700} letterSpacing={0.3}
              fill="#0f172a" style={{ pointerEvents: 'none', userSelect: 'none' }}>
              MANDÍK a.s.
            </text>
          </Marker>
        </ComposableMap>
      </div>

      {/* Legend */}
      <div className="flex gap-3 mt-1">
        {(['bohemia', 'moravia'] as CzechRegion[]).map((region) => {
          const color    = region === 'bohemia' ? COLORS.bohemia : COLORS.moravia;
          const isActive = selectedRegion === region;
          return (
            <button
              key={region}
              onClick={() => onRegionClick(region)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: isActive ? `${color}18` : 'transparent',
                border: `1px solid ${isActive ? color : '#e2e8f0'}`,
                boxShadow: isActive ? `0 1px 4px ${color}33` : undefined,
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span style={{ color: '#0f172a' }}>
                {regionLabels[region][language]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs mt-2" style={{ color: '#94a3b8' }}>
        {language === 'de' ? 'Region auswählen' : language === 'en' ? 'Click a region to select' : 'Klikněte na oblast'}
      </p>
    </div>
  );
};

export default CzechRegionMap;
