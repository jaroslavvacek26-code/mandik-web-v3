import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Phone, Mail, User, Globe, ChevronLeft, X } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import {
  salesContacts,
  countryCodeToRegion,
  divisionColors,
  RegionId,
  SalesContact,
} from '../salesContactData';
import CzechRegionMap from './CzechRegionMap';
import { Language } from '../types';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Czech Republic ISO numeric code in world-atlas
const CZ_CODE = '203';

const getCountryFill = (geoId: string): string => {
  if (geoId === CZ_CODE) return divisionColors.czech;
  const region = countryCodeToRegion[geoId];
  if (!region) return divisionColors.southeast;
  const contact = salesContacts.find((c) => c.id === region);
  return contact ? divisionColors[contact.division] : divisionColors.southeast;
};

const label = (cz: string, en: string, de: string, lang: Language) =>
  lang === 'de' ? de : lang === 'en' ? en : cz;

const SalesMap: React.FC = () => {
  const { language } = useLanguage();
  const [selectedContact, setSelectedContact] = useState<SalesContact | null>(null);
  const [showCzechMap, setShowCzechMap] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>([15, 54]);

  const handleCountryClick = (geoId: string) => {
    if (geoId === CZ_CODE) {
      setShowCzechMap(true);
      setSelectedContact(null);
      return;
    }
    const region: RegionId = countryCodeToRegion[geoId] ?? 'southeast';
    const contact = salesContacts.find((c) => c.id === region)
      ?? salesContacts.find((c) => c.id === 'southeast')!;
    setSelectedContact(contact);
  };

  const handleCzechRegionClick = (region: 'bohemia' | 'moravia') => {
    setSelectedContact(salesContacts.find((c) => c.id === region)!);
  };

  const handleBack = () => {
    setShowCzechMap(false);
    setSelectedContact(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-mandikDark text-white px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {showCzechMap && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              {label('Zpět', 'Back', 'Zurück', language)}
            </button>
          )}
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe size={22} />
            {showCzechMap
              ? label('Česká republika', 'Czech Republic', 'Tschechische Republik', language)
              : label('Obchodní zastoupení', 'Sales Representatives', 'Handelsvertretung', language)}
          </h2>
        </div>

        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4 text-xs flex-shrink-0">
          {([
            ['czech',     label('Český obchod',        'Czech Trade',    'Tschech. Handel', language)],
            ['german',    label('Německý obchod',       'German Trade',   'Dt. Handel', language)],
            ['southeast', label('Jihovýchodní obchod',  'Southeast Trade','Südosthandel', language)],
          ] as [keyof typeof divisionColors, string][]).map(([key, name]) => (
            <span key={key} className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                style={{ background: divisionColors[key] }} />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Map */}
        <div className="flex-1 bg-gray-50 relative" style={{ height: '480px' }}>
          {showCzechMap ? (
            <CzechRegionMap
              onRegionClick={handleCzechRegionClick}
              selectedRegion={
                selectedContact && (selectedContact.id === 'bohemia' || selectedContact.id === 'moravia')
                  ? selectedContact.id
                  : undefined
              }
              language={language}
            />
          ) : (
            <>
            <ComposableMap
              projectionConfig={{ scale: 480 }}
              style={{ width: '100%', height: '480px' }}
            >
              <ZoomableGroup
                zoom={zoom}
                center={center}
                onMoveEnd={({ zoom: z, coordinates }) => {
                  setZoom(z);
                  setCenter(coordinates as [number, number]);
                }}
                minZoom={1}
                maxZoom={8}
              >
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getCountryFill(String(geo.id))}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        onClick={() => handleCountryClick(String(geo.id))}
                        style={{
                          default: { outline: 'none' },
                          hover: { fill: '#005f8f', outline: 'none', cursor: 'pointer' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Zoom controls */}
            <div className="absolute bottom-12 right-3 flex flex-col gap-1">
              <button
                onClick={() => setZoom((z) => Math.min(z * 1.5, 8))}
                className="w-8 h-8 bg-white rounded shadow text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center text-lg leading-none"
              >+</button>
              <button
                onClick={() => setZoom((z) => Math.max(z / 1.5, 1))}
                className="w-8 h-8 bg-white rounded shadow text-gray-700 font-bold hover:bg-gray-100 flex items-center justify-center text-lg leading-none"
              >−</button>
              <button
                onClick={() => { setZoom(1); setCenter([15, 54]); }}
                className="w-8 h-8 bg-white rounded shadow text-gray-500 hover:bg-gray-100 flex items-center justify-center text-xs"
                title="Reset"
              >⌂</button>
            </div>
            </>
          )}

          {!selectedContact && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
              <span className="bg-white/90 text-gray-500 text-sm px-4 py-2 rounded-full shadow">
                {label(
                  'Klikněte na zemi pro zobrazení kontaktu',
                  'Click on a country to see contact info',
                  'Klicken Sie auf ein Land',
                  language
                )}
              </span>
            </div>
          )}
        </div>

        {/* Contact panel */}
        {selectedContact && (
          <div className="lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-6 flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
                  {selectedContact.divisionName[language]}
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedContact.regionName[language]}
                </h3>
              </div>
              <div
                className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                style={{ background: divisionColors[selectedContact.division] }}
              />
            </div>

            <div className="w-12 h-1 mb-6" style={{ background: divisionColors[selectedContact.division] }} />

            <div className="space-y-4 flex-1">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-full flex-shrink-0">
                  <User size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{selectedContact.representative}</p>
                  <p className="text-sm text-gray-500">{selectedContact.title[language]}</p>
                </div>
              </div>

              <a
                href={`tel:${selectedContact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-3 group"
              >
                <div className="bg-gray-100 p-2 rounded-full flex-shrink-0 group-hover:bg-mandikBlue/10 transition-colors">
                  <Phone size={18} className="text-gray-600 group-hover:text-mandikBlue transition-colors" />
                </div>
                <span className="text-gray-700 group-hover:text-mandikBlue transition-colors">
                  {selectedContact.phone}
                </span>
              </a>

              <a
                href={`mailto:${selectedContact.email}`}
                className="flex items-center gap-3 group"
              >
                <div className="bg-gray-100 p-2 rounded-full flex-shrink-0 group-hover:bg-mandikBlue/10 transition-colors">
                  <Mail size={18} className="text-gray-600 group-hover:text-mandikBlue transition-colors" />
                </div>
                <span className="text-gray-700 group-hover:text-mandikBlue transition-colors break-all">
                  {selectedContact.email}
                </span>
              </a>
            </div>

            <button
              onClick={() => setSelectedContact(null)}
              className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1 self-start"
            >
              <X size={14} />
              {label('Zavřít', 'Close', 'Schließen', language)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesMap;
