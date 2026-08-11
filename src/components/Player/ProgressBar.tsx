function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  accentColor?: string;
}

export default function ProgressBar({
  currentTime,
  duration,
  onSeek,
  accentColor = "#efa85c",
}: ProgressBarProps) {
  const pct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div>
      {/* Thin track */}
      <div style={{ position: "relative", height: 16, display: "flex", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 3,
            borderRadius: 99,
            background: "rgba(243,239,229,0.14)",
          }}
        >
          {/* Fill */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              borderRadius: 99,
              background: accentColor,
              transition: "background 700ms ease-out",
            }}
          />
          {/* Knob */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: `${pct}%`,
              transform: "translate(-50%, -50%)",
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#f3efe5",
              boxShadow: `0 0 6px ${accentColor}aa`,
              transition: "box-shadow 700ms ease-out",
              pointerEvents: "none",
            }}
          />
        </div>
        {/* Invisible range for interaction */}
        <input
          type="range"
          aria-label="Seek"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
          }}
        />
      </div>

      {/* Timestamps */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: "0.62rem", color: "rgba(243,239,229,0.38)" }}
        >
          {formatTime(currentTime)}
        </span>
        <span
          className="font-mono tabular-nums"
          style={{ fontSize: "0.62rem", color: "rgba(243,239,229,0.38)" }}
        >
          {formatTime(duration)}
        </span>
      </div>
    </div>
  );
}
