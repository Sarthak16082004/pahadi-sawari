import { useEffect, useState } from "react";

export function useLiveListenerCount(): number {
  // Simulate a realistic number of listeners (e.g., 18-24) to make the site feel alive
  const [count, setCount] = useState(() => 18 + Math.floor(Math.random() * 6));

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        // Randomly drift up or down by 1, staying within bounds
        const drift = Math.random() > 0.5 ? 1 : -1;
        const next = prev + drift;
        if (next < 14) return prev + 1;
        if (next > 28) return prev - 1;
        return next;
      });
    }, 6000); // update every 6 seconds for realism

    return () => clearInterval(interval);
  }, []);

  return count;
}

