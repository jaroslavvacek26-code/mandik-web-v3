import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Company HQ – Dobříšská 550, Hostomice (Středočeský kraj, Bohemia)
const HQ: [number, number] = [14.043, 49.795];
import { Language } from '../types';

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

const COLORS = {
  bohemia:         '#00AEEF',
  bohemiaHover:    '#33C4FF',
  bohemiaSelected: '#00AEEF',
  moravia:         '#0077B6',
  moraviaHover:    '#0099E6',
  moraviaSelected: '#0077B6',
  stroke:          '#06111e',
};

const regionLabels = {
  bohemia: { cz: 'Čechy',       en: 'Bohemia', de: 'Böhmen' },
  moravia: { cz: 'Morava + Slezsko', en: 'Moravia + Silesia', de: 'Mähren + Schlesien' },
};

const CzechRegionMap: React.FC<CzechRegionMapProps> = ({ onRegionClick, selectedRegion, language, dark }) => {
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
                const nutsId = geo.properties.NUTS_ID as string;
                const region = getRegion(nutsId);
                const isSelected = selectedRegion === region;
                const base   = region === 'bohemia' ? COLORS.bohemia : COLORS.moravia;
                const hover  = region === 'bohemia' ? COLORS.bohemiaHover : COLORS.moraviaHover;
                const fill   = isSelected
                  ? (dark ? base : base)
                  : (dark ? `${base}99` : `${base}cc`);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={COLORS.stroke}
                    strokeWidth={dark ? 0.8 : 1.2}
                    onClick={() => onRegionClick(region)}
                    style={{
                      default: {
                        outline: 'none',
                        filter: isSelected && dark ? `drop-shadow(0 0 6px ${base})` : 'none',
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
              <circle r={5} fill="none" stroke="white" strokeWidth={1.2} opacity={0.85} />
              <circle r={2.5} fill="white" />
              <text
                textAnchor="middle" y={-9}
                fontSize={6} fontWeight={700} letterSpacing={0.3}
                fill="white" style={{ pointerEvents: 'none', userSelect: 'none' }}>
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
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all"
              style={{
                background: isActive
                  ? (dark ? `${color}33` : `${color}22`)
                  : 'transparent',
                border: `1px solid ${isActive ? color : (dark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)')}`,
                boxShadow: isActive && dark ? `0 0 12px ${color}55` : undefined,
              }}
            >
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
              <span style={{ color: dark ? 'rgba(255,255,255,0.85)' : '#1a1a1a' }}>
                {regionLabels[region][language]}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-xs mt-2" style={{ color: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.4)' }}>
        {language === 'de' ? 'Region auswählen' : language === 'en' ? 'Click a region to select' : 'Klikněte na oblast'}
      </p>
    </div>
  );
};

export default CzechRegionMap;
