import { useCallback, useEffect, useMemo, useState } from "react";
import { useYouTubePlayer } from "../../hooks/useYouTubePlayer";
import { useLiveListenerCount } from "../../hooks/useLiveListenerCount";
import { pickBackgroundByIndex } from "../../data/backgrounds";
import BackgroundScene from "../Background/BackgroundScene";
import BootScreen from "./BootScreen";
import TopBar from "./TopBar";
import MusicPlayer from "../Player/MusicPlayer";

const PLAYLIST_ID = "PL-o00TTjhluzzKDk6KpUevW-aEYBg3SIw";
const PLAYLIST_URL =
  "https://music.youtube.com/playlist?list=PL-o00TTjhluzzKDk6KpUevW-aEYBg3SIw&si=7U5juU2XodCJMlN2";

const ROAD_PHRASES = [
  "पहाड़ की सड़क, पहाड़ का गीत",
  "जय भूमियाल — रस्ता मंगलमय हो",
  "सफर सुहाना, नज़र से बचाना",
  "पहाड़ पुकारे, दिल मचले",
];

export default function AppShell() {
  const [booting, setBooting] = useState(true);

  // ─── Background index — increments instantly on next/prev click ───
  const [bgIndex, setBgIndex] = useState(0);

  const { containerRef, state, togglePlay, next, previous, seekTo, toggleShuffle } =
    useYouTubePlayer(PLAYLIST_ID);
  const listenerCount = useLiveListenerCount();

  const roadPhrase = useMemo(
    () => ROAD_PHRASES[Math.floor(Math.random() * ROAD_PHRASES.length)],
    []
  );

  useEffect(() => {
    if (state.status !== "loading") setBooting(false);
  }, [state.status]);

  // Background switches IMMEDIATELY on button click, not waiting for YouTube
  const handleNext = useCallback(() => {
    next();
    setBgIndex((i) => i + 1);
  }, [next]);

  const handlePrevious = useCallback(() => {
    previous();
    setBgIndex((i) => i - 1);
  }, [previous]);

  const background = pickBackgroundByIndex(bgIndex);
  const accentColor = background.accentColor ?? "#efa85c";
  const titleColor = background.titleColor ?? "#f3efe5";
  const subColor = background.subColor ?? "rgba(243,239,229,0.75)";

  return (
    <div className="relative h-svh overflow-hidden flex flex-col">
      <BackgroundScene file={background.file} />
      <BootScreen visible={booting} />

      {/* hidden YouTube iframe target */}
      <div
        ref={containerRef}
        style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />

      <TopBar playlistUrl={PLAYLIST_URL} listenerCount={listenerCount} />

      <main className="flex-1 min-h-0 flex flex-col items-center justify-between px-4">
        {/* ─── Hero Title ─── */}
        <div className="w-full flex flex-col items-center text-center pt-8 sm:pt-14 md:pt-20 px-2">
          <h1
            className="font-display font-extrabold leading-[0.95] tracking-tight select-none"
            style={{
              fontSize: "clamp(3.8rem, 14vw, 9rem)",
              color: titleColor,
              textShadow: `0 4px 40px rgba(0,0,0,0.55), 0 0 80px ${accentColor}44`,
              filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.4))",
              transition: "color 700ms ease-out, text-shadow 700ms ease-out",
            }}
          >
            पहाड़ी{" "}
            <span
              style={{
                color: accentColor,
                transition: "color 700ms ease-out",
              }}
            >
              सवारी
            </span>
          </h1>

          <p
            className="mt-4 sm:mt-6 font-display font-semibold"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 2rem)",
              color: subColor,
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              transition: "color 700ms ease-out",
            }}
          >
            पहाड़ के रास्ते, गीतों के साथ
          </p>

          <p
            className="mt-2 sm:mt-3 font-mono font-medium tracking-wider uppercase"
            style={{
              fontSize: "clamp(0.65rem, 1.8vw, 0.9rem)",
              color: accentColor,
              textShadow: `0 0 20px ${accentColor}88`,
              letterSpacing: "0.18em",
              transition: "color 700ms ease-out",
            }}
          >
            — {roadPhrase} —
          </p>
        </div>

        {/* ─── Music Player ─── centered at bottom */}
        <div className="w-full flex justify-center px-4 pb-8 sm:pb-14">
          <MusicPlayer
            playerState={state}
            onTogglePlay={togglePlay}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSeek={seekTo}
            onToggleShuffle={toggleShuffle}
            accentColor={accentColor}
          />
        </div>
      </main>
    </div>
  );
}
