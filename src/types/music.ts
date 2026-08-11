export type Language = "Kumaoni" | "Garhwali";
export type Era = "Old" | "New";

export type CategoryId =
  | "all"
  | "kumaoni"
  | "garhwali"
  | "old"
  | "new"
  | "folk"
  | "road-mode";

export interface Category {
  id: CategoryId;
  label: string; // Devanagari label shown in the pill
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  language: Language;
  era: Era;
  categories: CategoryId[]; // a song can belong to several pills, e.g. ["kumaoni","folk","road-mode"]
  artwork: string; // path under /assets/covers
  background?: string; // path under /assets/backgrounds — optional, falls back to a language-matched default
  duration?: number; // seconds, if known ahead of playback
}

export interface Background {
  id: string;
  file: string; // path under /assets/backgrounds
  mood: "day" | "golden" | "sunset" | "mist" | "night";
  /** CSS hex color for accent highlights matching this background */
  accentColor?: string;
  /** CSS hex color for the big title text */
  titleColor?: string;
  /** CSS hex color for subtitle/description text */
  subColor?: string;
}

/** Player status independent of the YouTube SDK, so UI never depends on it directly. */
export type PlaybackStatus = "idle" | "loading" | "playing" | "paused" | "error";

export interface PlayerState {
  activeSongId: string | null;
  status: PlaybackStatus;
  currentTime: number;
  duration: number;
  volume: number; // 0–100
  isMuted: boolean;
  isShuffled: boolean;
  isRepeating: boolean;
}
