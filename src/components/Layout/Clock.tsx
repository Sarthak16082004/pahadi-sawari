import { useEffect, useState } from "react";

function formatNow(): string {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ap}`;
}

export default function Clock() {
  const [now, setNow] = useState(formatNow());

  useEffect(() => {
    const id = setInterval(() => setNow(formatNow()), 15000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono text-xs sm:text-sm text-cream/85 tracking-wide">{now}</span>;
}
