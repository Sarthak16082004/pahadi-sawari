import { useBackgroundTransition } from "../../hooks/useBackgroundTransition";

interface BackgroundSceneProps {
  file: string;
}

export default function BackgroundScene({ file }: BackgroundSceneProps) {
  const layers = useBackgroundTransition(file, 1200);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-pine-deep">
      {layers.map((layer) => (
        <div
          key={layer.key}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${layer.file})`,
            opacity: layer.visible ? 1 : 0,
            transform: layer.visible ? "scale(1.04)" : "scale(1)",
            transition: "opacity 1200ms ease-out, transform 1200ms ease-out",
          }}
        />
      ))}

      {/* Gradient scrim — heavier at top and bottom for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,16,14,0.45) 0%, rgba(10,16,14,0.10) 35%, rgba(10,16,14,0.10) 55%, rgba(10,16,14,0.72) 85%, rgba(10,16,14,0.92) 100%)",
        }}
      />

      {/* Subtle film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
