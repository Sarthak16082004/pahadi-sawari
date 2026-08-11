import Clock from "./Clock";

interface TopBarProps {
  playlistUrl: string;
  listenerCount: number;
}

export default function TopBar({ playlistUrl, listenerCount }: TopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 pt-5 shrink-0">
      <div className="rounded-full bg-charcoal/45 border border-cream/15 px-3 py-1.5">
        <Clock />
      </div>

      <div className="flex items-center gap-2 rounded-full bg-charcoal/45 border border-cream/15 px-3 py-1.5 font-mono text-xs sm:text-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
        <span className="font-semibold text-cream">{listenerCount}</span>
        <span className="text-cream/60">सवारी साथ में</span>
      </div>

      <a
        href={playlistUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open this playlist on YouTube Music"
        className="h-9 w-9 flex items-center justify-center rounded-full bg-charcoal/45 border border-cream/15 text-cream/80 hover:bg-charcoal/65 transition-colors"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2 14.5v-9l7 4.5-7 4.5z" />
        </svg>
      </a>
    </header>
  );
}
