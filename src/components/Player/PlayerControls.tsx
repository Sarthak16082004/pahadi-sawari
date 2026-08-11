interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onToggleShuffle: () => void;
  accentColor?: string;
}

export default function PlayerControls({
  isPlaying,
  isShuffled,
  onTogglePlay,
  onNext,
  onPrevious,
  onToggleShuffle,
  accentColor = "#efa85c",
}: PlayerControlsProps) {
  const dimColor = "rgba(243,239,229,0.40)";
  const hoverColor = "rgba(243,239,229,0.90)";

  return (
    <div className="flex items-center justify-between w-full">

      {/* ── Shuffle ── */}
      <button
        aria-label="Shuffle"
        aria-pressed={isShuffled}
        onClick={onToggleShuffle}
        title="Shuffle"
        style={{
          color: isShuffled ? accentColor : dimColor,
          background: isShuffled ? `${accentColor}18` : "transparent",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "color 300ms, background 300ms, transform 150ms",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!isShuffled) (e.currentTarget as HTMLElement).style.color = hoverColor;
          (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
        }}
        onMouseLeave={(e) => {
          if (!isShuffled) (e.currentTarget as HTMLElement).style.color = dimColor;
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17zm4.76-.83 3.65 3.83-3.65 3.83V14h-1.29L10 10.83l1.71-1.66H13V7l-5 5 5 5v-2h1.29L19 11l-3.83-3.83L14 6V7h.35z" />
          <path d="M3.41 6 2 7.41l5.17 5.17 1.41-1.41zM15 7l.35 1.17L17 6.83 15 5v2zm-2.83 5.59L10 14.17l1.41 1.41L14 13l-1.83-1.83z" />
        </svg>
        {/* Active dot indicator */}
        {isShuffled && (
          <span
            style={{
              position: "absolute",
              bottom: 5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: accentColor,
            }}
          />
        )}
      </button>

      {/* ── Previous ── */}
      <button
        aria-label="Previous track"
        onClick={onPrevious}
        title="Previous"
        style={{
          color: "rgba(243,239,229,0.75)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 200ms, color 200ms, transform 150ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLElement).style.color = "#f3efe5";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.color = "rgba(243,239,229,0.75)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.94)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
        </svg>
      </button>

      {/* ── Play / Pause ── */}
      <button
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={onTogglePlay}
        title={isPlaying ? "Pause" : "Play"}
        style={{
          background: accentColor,
          color: "#0a0e10",
          border: "none",
          borderRadius: "50%",
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: `0 4px 28px ${accentColor}70, 0 2px 8px rgba(0,0,0,0.4)`,
          transition: "background 700ms, box-shadow 700ms, transform 150ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.filter = "brightness(1.15)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.93)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
            <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" style={{ marginLeft: 3 }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* ── Next ── */}
      <button
        aria-label="Next track"
        onClick={onNext}
        title="Next"
        style={{
          color: "rgba(243,239,229,0.75)",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50%",
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 200ms, color 200ms, transform 150ms",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
          (e.currentTarget as HTMLElement).style.color = "#f3efe5";
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.color = "rgba(243,239,229,0.75)";
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
        onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(0.94)"; }}
        onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.08)"; }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M16 6h2v12h-2zm-9.5 6L15 6v12z" />
        </svg>
      </button>

      {/* ── Playlist link (opens YT Music) ── spacer replacement ── */}
      <div style={{ width: 40, height: 40 }} aria-hidden="true" />
    </div>
  );
}
