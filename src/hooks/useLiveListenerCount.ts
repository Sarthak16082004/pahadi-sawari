import { useEffect, useState } from "react";

const CHANNEL_NAME = "pahadi-sawari-presence";
const PING_INTERVAL = 4000;
const STALE_AFTER = 10000;

/**
 * IMPORTANT — this is NOT a real cross-visitor live count. There's no
 * backend yet (spec Phase 8 is optional and not built). This only counts
 * tabs open in the *same browser* via BroadcastChannel, so it always shows
 * at least 1 (you) and updates live if you open more tabs of this site.
 *
 * To make this a genuine "how many people right now" counter across
 * different visitors/devices, we'd need a small WebSocket server — happy
 * to build that as its own phase if it's wanted. Shipping a fake-looking
 * "42 online" number with no backend would be misleading, so this is
 * intentionally honest about what it actually measures.
 */
export function useLiveListenerCount(): number {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return; // older browsers: stays at 1

    const id = Math.random().toString(36).slice(2);
    const channel = new BroadcastChannel(CHANNEL_NAME);
    const seen = new Map<string, number>();
    seen.set(id, Date.now());

    function recompute() {
      const now = Date.now();
      for (const [key, ts] of seen) {
        if (now - ts > STALE_AFTER) seen.delete(key);
      }
      setCount(seen.size);
    }

    channel.onmessage = (e) => {
      if (e.data?.type === "ping" && e.data.id) {
        seen.set(e.data.id, Date.now());
        recompute();
      }
    };

    const ping = () => channel.postMessage({ type: "ping", id });
    ping();
    const interval = setInterval(() => {
      ping();
      recompute();
    }, PING_INTERVAL);

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, []);

  return count;
}
