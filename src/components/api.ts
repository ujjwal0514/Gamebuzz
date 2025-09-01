import axios from "axios";

// Define types for Post
export interface Post {
  id?: any;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  user_game: null | any; // You might want to define a more specific type if 'user_game' can have a value
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  platforms: PlatformElement[];
  parent_platforms: ParentPlatform[];
  genres: Genre[];
  stores: StoreElement[];
  clip: null;
  tags: Tag[];
  esrb_rating: EsrbRating;
  short_screenshots: ShortScreenshot[];
  createdAt: number; // Optional field for local use
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

export interface PlatformElement {
  platform: PlatformPlatform;
  released_at: string;
  requirements_en: null | Requirements;
  requirements_ru: null | Requirements;
}

export interface PlatformPlatform {
  id: number;
  name: string;
  slug: string;
  image: null | string;
  year_end: null | number;
  year_start: null | number;
  games_count: number;
  image_background: string;
}

export interface Requirements {
  minimum?: string;
  recommended?: string;
}

export interface ParentPlatform {
  platform: ParentPlatformPlatform;
}

export interface ParentPlatformPlatform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface StoreElement {
  id: number;
  store: StoreStore;
}

export interface StoreStore {
  id: number;
  name: string;
  slug: string;
  domain: string;
  games_count: number;
  image_background: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface ShortScreenshot {
  id: number;
  image: string;
}
