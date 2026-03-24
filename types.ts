export type Language = 'cz' | 'en' | 'de';

export interface GalleryItem {
  url: string;
  name: string;
  mime_type: string;
  description?: string | null;
  index?: number;
  link?: string | null;
}

export interface Download {
  type: string;
  name: string;
  link: string;
  mime_type: string;
  slug?: string;
  index?: number;
}

export interface CharacteristicItem {
  level: number;
  characteristic: string;
}

export type Characteristic = string | CharacteristicItem;

export interface Icon {
  url: string;
  name: string;
  description?: string | null;
  mime_type: string;
  index?: number;
  link?: string | null;
}

export interface Product {
  public_id: string;
  name: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  characteristics?: Characteristic[];
  specification?: string | null;
  gallery: GalleryItem[];
  downloads: Download[];
  icons?: Icon[];
  index?: number;
}

export interface Subcategory {
  public_id: string;
  name: string;
  slug: string;
  description?: string | null;
  groups: Product[];
  gallery?: GalleryItem[];
  index?: number;
}

export interface Category {
  public_id: string;
  name: string;
  slug: string;
  description: string;
  gallery: GalleryItem[];
  subcategories: Subcategory[];
  groups: Product[]; // Direct products in category
  icons?: Icon[];
  index?: number;
}