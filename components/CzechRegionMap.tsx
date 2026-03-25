import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { divisionColors } from '../salesContactData';
import { Language } from '../types';

type CzechRegion = 'bohemia' | 'moravia';

interface CzechRegionMapProps {
  onRegionClick: (region: CzechRegion) => void;
  selectedRegion?: CzechRegion;
  language: Language;
}

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
const CZ_ID = '203';

const regionLabels = {
  bohemia: { cz: 'Čechy', en: 'Bohemia', de: 'Böhmen' },
  moravia: { cz: 'Morava', en: 'Moravia', de: 'Mähren' },
};

const CzechRegionMap: React.FC<CzechRegionMapProps> = ({ onRegionClick, selectedRegion, language }) => {
  const BASE = divisionColors.czech;
  const SELECTED = '#005f8f';

  return (
    <div className="w-full flex flex-col items-center justify-center p-6" style={{ minHeight: '350px' }}>
      {/* Accurate CZ map from world atlas */}
      <div className="w-full" style={{ maxWidth: '480px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 3200, center: [15.5, 49.8] }}
          width={480}
          height={220}
          style={{ width: '100%', height: 'auto' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => String(geo.id) === CZ_ID)
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={BASE}
                    stroke="white"
                    strokeWidth={2}
                    style={{
                      default: { outline: 'none' },
                      hover: { outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* Region selector buttons */}
      <div className="flex gap-4 mt-4">
        {(['bohemia', 'moravia'] as CzechRegion[]).map((region) => (
          <button
            key={region}
            onClick={() => onRegionClick(region)}
            className="px-8 py-3 rounded-lg font-bold text-white text-lg transition-all shadow-md hover:shadow-lg"
            style={{
              background: selectedRegion === region ? SELECTED : BASE,
              transform: selectedRegion === region ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {regionLabels[region][language]}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-3">
        {language === 'de' ? 'Region auswählen' : language === 'en' ? 'Select a region' : 'Vyberte region'}
      </p>
    </div>
  );
};

export default CzechRegionMap;
