import type { YouTubePlayerState } from "../../hooks/useYouTubePlayer";
import Artwork from "./Artwork";
import ProgressBar from "./ProgressBar";

interface MusicPlayerProps {
  playerState: YouTubePlayerState;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (t: number) => void;
  onToggleShuffle: () => void;
  accentColor?: string;
}

export default function MusicPlayer({
  playerState,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
  onToggleShuffle,
  accentColor = "#efa85c",
}: MusicPlayerProps) {
  const isPlaying = playerState.status === "playing";
  const isLoading = playerState.status === "loading";
  const hasError = playerState.status === "error";

  const trackLabel = isLoading
    ? "बदल रहा है…"
    : hasError
      ? "अगला गीत लोड हो रहा है…"
      : playerState.videoTitle || "—";

  const artistLabel = isLoading || hasError ? "" : playerState.channelTitle;

  /* ── Icon helpers ─────────────────────────────────────── */
  const ShuffleIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"></polyline>
      <line x1="4" y1="20" x2="21" y2="3"></line>
      <polyline points="21 16 21 21 16 21"></polyline>
      <line x1="15" y1="15" x2="21" y2="21"></line>
      <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
  );
  const PrevIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="19 20 9 12 19 4 19 20"></polygon>
      <line x1="5" y1="19" x2="5" y2="5"></line>
    </svg>
  );
  const NextIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4"></polygon>
      <line x1="19" y1="5" x2="19" y2="19"></line>
    </svg>
  );
  const PlayIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 2 }}>
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
    </svg>
  );
  const PauseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1"></rect>
      <rect x="14" y="4" width="4" height="16" rx="1"></rect>
    </svg>
  );

  /* ── Shared button style factories ───────────────────── */
  const iconBtn = (color = "rgba(243,239,229,0.55)"): React.CSSProperties => ({
    background: "none",
    border: "none",
    color,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: "50%",
    transition: "color 200ms, transform 120ms",
    flexShrink: 0,
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 640,
        background: "rgba(8, 12, 14, 0.72)",
        backdropFilter: "blur(24px) saturate(150%)",
        WebkitBackdropFilter: "blur(24px) saturate(150%)",
        border: `1px solid rgba(243,239,229,0.10)`,
        borderRadius: 24,
        padding: "8px 16px 8px 8px",
        boxShadow: `0 8px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)`,
        transition: "border-color 700ms",
      }}
    >
      {/* ── Main row ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>

        {/* Artwork — smaller circle */}
        <div
          style={{
            flexShrink: 0,
            width: 40,
            height: 40,
            borderRadius: 8,
            overflow: "hidden",
            boxShadow: `0 0 0 2px ${accentColor}55`,
            transition: "box-shadow 700ms",
          }}
        >
          <Artwork videoId={playerState.videoId} className="h-full w-full object-cover" />
        </div>

        {/* Track info — grows to fill */}
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden", paddingRight: 8 }}>
          <p
            className="font-display font-bold truncate"
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.2,
              color: "#f3efe5",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {trackLabel}
          </p>
          {artistLabel ? (
            <p
              className="truncate"
              style={{
                fontSize: "0.7rem",
                color: "rgba(243,239,229,0.45)",
                marginTop: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {artistLabel}
            </p>
          ) : null}
        </div>

        {/* Controls row */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>

          {/* Shuffle */}
          <button
            aria-label="Shuffle"
            aria-pressed={playerState.isShuffled}
            onClick={onToggleShuffle}
            style={{
              ...iconBtn(playerState.isShuffled ? accentColor : "rgba(243,239,229,0.45)"),
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = playerState.isShuffled ? accentColor : "#f3efe5";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = playerState.isShuffled ? accentColor : "rgba(243,239,229,0.45)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <ShuffleIcon />
          </button>

          {/* Previous */}
          <button
            aria-label="Previous track"
            onClick={onPrevious}
            style={iconBtn("rgba(243,239,229,0.65)")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#f3efe5";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(243,239,229,0.65)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.9)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
          >
            <PrevIcon />
          </button>

          {/* Play / Pause — outline styled */}
          <button
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={onTogglePlay}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: `1.5px solid ${accentColor}`,
              background: "transparent",
              color: accentColor,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 0 10px ${accentColor}33`,
              transition: "background 300ms, box-shadow 300ms, transform 120ms, color 300ms, border-color 300ms",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 15px ${accentColor}88`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px ${accentColor}33`;
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.95)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.05)"; }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          {/* Next */}
          <button
            aria-label="Next track"
            onClick={onNext}
            style={iconBtn("rgba(243,239,229,0.65)")}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#f3efe5";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(243,239,229,0.65)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.9)"; }}
            onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.1)"; }}
          >
            <NextIcon />
          </button>
        </div>
      </div>

      {/* ── Progress bar ── sits below the row */}
      <div style={{ marginTop: 8, paddingLeft: 54, paddingRight: 4 }}>
        <ProgressBar
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          onSeek={onSeek}
          accentColor={accentColor}
        />
      </div>
    </div>
  );
}
