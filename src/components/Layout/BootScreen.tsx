interface BootScreenProps {
  visible: boolean;
}

/**
 * hornokplease.xyz doesn't reveal its player instantly — it shows
 * "Loading the cassette…" with 0:00/0:00 while the YouTube iframe boots.
 * We mirror that same honest loading beat instead of faking an instant app.
 * In Phase 1 this is timed; in Phase 3 it'll resolve on the real YT API
 * "ready" event instead of a fixed delay.
 */
export default function BootScreen({ visible }: BootScreenProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-pine-deep transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="h-10 w-10 rounded-full border-2 border-cream/20 border-t-ember-bright animate-spin" />
      <p className="font-mono text-xs tracking-wide text-cream/60">टेप लग रहा है… <span className="text-cream/35">loading the cassette</span></p>
      <p className="font-mono text-[11px] text-cream/30 tabular-nums">0:00 / 0:00</p>
    </div>
  );
}
