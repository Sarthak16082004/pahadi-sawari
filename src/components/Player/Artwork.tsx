import { useState } from "react";
import ArtworkPlaceholder from "./ArtworkPlaceholder";

interface ArtworkProps {
  videoId: string | null;
  className?: string;
}

export default function Artwork({ videoId, className = "" }: ArtworkProps) {
  const [failed, setFailed] = useState(false);

  if (!videoId || failed) {
    return <ArtworkPlaceholder seed={videoId ?? "loading"} className={className} />;
  }

  return (
    <img
      src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
      alt=""
      className={`object-cover rounded-xl ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
