import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Language } from '../types';
import type { RegionId } from '../salesContactData';

// NUTS2 for Germany (38 Regierungsbezirke) and Austria (9 Bundesländer)
const NUTS2_URL =
  'https://gisco-services.ec.europa.eu/distribution/v2/nuts/geojson/NUTS_RG_03M_2021_4326_LEVL_2.geojson';

export interface EuroRegionConfig {
  countryCode: 'DE' | 'AT';
  contactId: RegionId;
  center: [number, number];
  scale: number;
  height?: number;
  divColor: string;    // base fill colour for regions
}

interface EuroRegionMapProps extends EuroRegionConfig {
  onRegionClick: (id: RegionId) => void;
  language: Language;
  dark?: boolean;
}

const EuroRegionMap: React.FC<EuroRegionMapProps> = ({
  countryCode,
  contactId,
  center,
  scale,
  height = 300,
  divColor,
  onRegionClick,
  language,
  dark,
}) => {
  const stroke = '#bfdbfe';
  const fill        = `${divColor}88`;
  const fillHover   = `${divColor}cc`;

  return (
    <div
      className="w-full flex flex-col items-center justify-center"
      style={{ minHeight: `${height + 80}px` }}
    >
      <div className="w-full" style={{ maxWidth: '600px' }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale, center }}
          width={600}
          height={height}
          style={{ width: '100%', height: 'auto', background: 'transparent' }}
        >
          <Geographies geography={NUTS2_URL}>
            {({ geographies }) =>
              geographies
                .filter((geo) => geo.properties.CNTR_CODE === countryCode)
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={0.7}
                    onClick={() => onRegionClick(contactId)}
                    style={{
                      default: { outline: 'none' },
                      hover: {
                        fill: fillHover,
                        outline: 'none',
                        cursor: 'pointer',
                        filter: `drop-shadow(0 0 4px ${divColor})`,
                      },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
            }
          </Geographies>
        </ComposableMap>
      </div>

      <p
        className="text-xs mt-1"
        style={{ color: '#94a3b8' }}
      >
        {language === 'de'
          ? 'Region anklicken'
          : language === 'en'
          ? 'Click a region'
          : 'Klikněte na region'}
      </p>
    </div>
  );
};

export default EuroRegionMap;
