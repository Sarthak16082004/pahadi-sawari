import { useEffect, useRef, useState } from "react";

interface Layer {
  file: string;
  visible: boolean;
  key: number;
}

/**
 * Keeps two stacked background layers and crossfades between them whenever
 * `targetFile` changes. Only `opacity` is animated — never position/size — so
 * this can't cause the layout shift or player jump the spec forbids (section 3/10).
 */
export function useBackgroundTransition(targetFile: string, durationMs = 1000) {
  const keyRef = useRef(0);
  const [layers, setLayers] = useState<Layer[]>([
    { file: targetFile, visible: true, key: keyRef.current },
  ]);

  useEffect(() => {
    setLayers((prev) => {
      const current = prev[prev.length - 1];
      if (current && current.file === targetFile) return prev;
      keyRef.current += 1;
      return [
        ...prev.map((l) => ({ ...l, visible: false })),
        { file: targetFile, visible: false, key: keyRef.current },
      ];
    });
  }, [targetFile]);

  useEffect(() => {
    const incoming = layers[layers.length - 1];
    if (!incoming || incoming.visible) return;
    // next frame so the browser registers the initial opacity:0 before transitioning to 1
    const raf = requestAnimationFrame(() => {
      setLayers((prev) =>
        prev.map((l) => (l.key === incoming.key ? { ...l, visible: true } : l))
      );
    });
    return () => cancelAnimationFrame(raf);
  }, [layers]);

  useEffect(() => {
    if (layers.length <= 1) return;
    const timeout = setTimeout(() => {
      setLayers((prev) => prev.slice(-1)); // drop old layers once faded out
    }, durationMs + 100);
    return () => clearTimeout(timeout);
  }, [layers, durationMs]);

  return layers;
}
