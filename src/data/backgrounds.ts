import type { Background } from "../types/music";

/** Only the 2 original mountain backgrounds. */
export const backgrounds: Background[] = [
  {
    id: "sunset-road",
    file: "/assets/backgrounds/mountain-sunset-road.jpg",
    mood: "sunset",
    accentColor: "#efa85c",
    titleColor: "#f3efe5",
    subColor: "rgba(243,239,229,0.80)",
  },
  {
    id: "mist-flags",
    file: "/assets/backgrounds/mountain-mist-flags.jpg",
    mood: "mist",
    accentColor: "#7cc17f",
    titleColor: "#f3efe5",
    subColor: "rgba(243,239,229,0.80)",
  },
];

/** Pick by an integer index — caller controls when it increments (on next/prev click). */
export function pickBackgroundByIndex(index: number): Background {
  return backgrounds[((index % backgrounds.length) + backgrounds.length) % backgrounds.length];
}
