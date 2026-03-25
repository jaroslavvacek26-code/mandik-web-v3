export type DivisionId = 'czech' | 'german' | 'southeast';
export type RegionId = 'bohemia' | 'moravia' | 'slovakia' | 'germany' | 'austria' | 'switzerland' | 'southeast';

export interface SalesContact {
  id: RegionId;
  division: DivisionId;
  regionName: { cz: string; en: string; de: string };
  divisionName: { cz: string; en: string; de: string };
  representative: string;
  title: { cz: string; en: string; de: string };
  phone: string;
  email: string;
}

export const divisionColors: Record<DivisionId, string> = {
  czech: '#00AEEF',
  german: '#0077B6',
  southeast: '#48CAE4',
};

// ISO 3166-1 numeric codes → region (handles both "40" and "040" for Austria)
export const countryCodeToRegion: Record<string, RegionId> = {
  '703': 'slovakia',
  '276': 'germany',
  '40':  'austria',
  '040': 'austria',
  '756': 'switzerland',
};

export const salesContacts: SalesContact[] = [
  {
    id: 'bohemia',
    division: 'czech',
    regionName: { cz: 'Čechy', en: 'Bohemia', de: 'Böhmen' },
    divisionName: { cz: 'Český obchod', en: 'Czech Trade', de: 'Tschechischer Handel' },
    representative: 'Ing. Karel Veselý',
    title: {
      cz: 'Obchodní manažer – Čechy',
      en: 'Sales Manager – Bohemia',
      de: 'Vertriebsleiter – Böhmen',
    },
    phone: '+420 311 706 710',
    email: 'vesely@mandik.cz',
  },
  {
    id: 'moravia',
    division: 'czech',
    regionName: { cz: 'Morava', en: 'Moravia', de: 'Mähren' },
    divisionName: { cz: 'Český obchod', en: 'Czech Trade', de: 'Tschechischer Handel' },
    representative: 'Ing. Milan Byčan',
    title: {
      cz: 'Obchodní manažer – Morava',
      en: 'Sales Manager – Moravia',
      de: 'Vertriebsleiter – Mähren',
    },
    phone: '+420 311 706 711',
    email: 'bycan@mandik.cz',
  },
  {
    id: 'slovakia',
    division: 'czech',
    regionName: { cz: 'Slovensko', en: 'Slovakia', de: 'Slowakei' },
    divisionName: { cz: 'Český obchod', en: 'Czech Trade', de: 'Tschechischer Handel' },
    representative: 'Ing. Milan Byčan',
    title: {
      cz: 'Obchodní manažer – Slovensko',
      en: 'Sales Manager – Slovakia',
      de: 'Vertriebsleiter – Slowakei',
    },
    phone: '+421 2 123 45 678',
    email: 'bycan@mandik.cz',
  },
  {
    id: 'germany',
    division: 'german',
    regionName: { cz: 'Německo', en: 'Germany', de: 'Deutschland' },
    divisionName: { cz: 'Německý obchod', en: 'German Trade', de: 'Deutscher Handel' },
    representative: 'Dipl.-Ing. Klaus Weber',
    title: {
      cz: 'Vedoucí prodeje – Německo',
      en: 'Sales Director – Germany',
      de: 'Vertriebsleiter – Deutschland',
    },
    phone: '+49 89 123 456 78',
    email: 'k.weber@mandik.cz',
  },
  {
    id: 'austria',
    division: 'german',
    regionName: { cz: 'Rakousko', en: 'Austria', de: 'Österreich' },
    divisionName: { cz: 'Německý obchod', en: 'German Trade', de: 'Deutscher Handel' },
    representative: 'Dipl.-Ing. Hans Müller',
    title: {
      cz: 'Vedoucí prodeje – Rakousko',
      en: 'Sales Director – Austria',
      de: 'Vertriebsleiter – Österreich',
    },
    phone: '+43 1 234 567 89',
    email: 'h.muller@mandik.cz',
  },
  {
    id: 'switzerland',
    division: 'german',
    regionName: { cz: 'Švýcarsko', en: 'Switzerland', de: 'Schweiz' },
    divisionName: { cz: 'Německý obchod', en: 'German Trade', de: 'Deutscher Handel' },
    representative: 'Dipl.-Ing. Thomas Bauer',
    title: {
      cz: 'Vedoucí prodeje – Švýcarsko',
      en: 'Sales Director – Switzerland',
      de: 'Vertriebsleiter – Schweiz',
    },
    phone: '+41 44 123 456 7',
    email: 't.bauer@mandik.cz',
  },
  {
    id: 'southeast',
    division: 'southeast',
    regionName: { cz: 'Zbytek světa', en: 'Rest of World', de: 'Rest der Welt' },
    divisionName: { cz: 'Jihovýchodní obchod', en: 'Southeast Trade', de: 'Südosthandel' },
    representative: 'Ing. Jan Šimsa',
    title: {
      cz: 'Export manažer',
      en: 'Export Manager',
      de: 'Export Manager',
    },
    phone: '+420 311 706 720',
    email: 'simsa@mandik.cz',
  },
];
