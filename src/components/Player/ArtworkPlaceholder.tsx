interface ArtworkPlaceholderProps {
  seed: string;
  className?: string;
}

/**
 * Phase 1 has no real cover-art files yet, so artwork is a deterministic
 * gradient derived from the song id — same song always renders the same
 * "artwork" instead of a random placeholder on every render.
 */
export default function ArtworkPlaceholder({ seed, className = "" }: ArtworkPlaceholderProps) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = hash % 360;

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        background: `conic-gradient(from 180deg, hsl(${hue} 55% 45%), hsl(${(hue + 40) % 360} 60% 55%), hsl(${(hue + 200) % 360} 35% 30%), hsl(${hue} 55% 45%))`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-[28%] rounded-full bg-charcoal/80 border-2 border-cream/40" />
    </div>
  );
}
