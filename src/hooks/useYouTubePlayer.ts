import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export type YouTubeStatus = "loading" | "cued" | "playing" | "paused" | "ended" | "error";

export interface YouTubePlayerState {
  status: YouTubeStatus;
  currentTime: number;
  duration: number;
  videoId: string | null;
  videoTitle: string;
  channelTitle: string;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
}

let apiPromise: Promise<void> | null = null;
function loadYouTubeIframeAPI(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

/**
 * Wraps the YouTube IFrame Player API behind our own controls. Components
 * never touch `window.YT` directly — they call play/pause/next/etc. and read
 * `state`. The iframe itself is rendered at 0x0 and never shown; our own
 * MusicPlayer UI is the only thing the person sees (spec section 8).
 */
export function useYouTubePlayer(playlistId: string) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const pollRef = useRef<number | null>(null);

  const [state, setState] = useState<YouTubePlayerState>({
    status: "loading",
    currentTime: 0,
    duration: 0,
    videoId: null,
    videoTitle: "",
    channelTitle: "",
    volume: 70,
    isMuted: false,
    isShuffled: false,
  });

  const readMeta = useCallback(() => {
    const p = playerRef.current;
    if (!p?.getVideoData) return;
    const data = p.getVideoData();
    setState((s) => ({
      ...s,
      videoId: data.video_id || null,
      videoTitle: data.title || "",
      channelTitle: data.author || "",
      duration: p.getDuration?.() || 0,
    }));
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeAPI().then(() => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "0",
        width: "0",
        playerVars: {
          listType: "playlist",
          list: playlistId,
          playsinline: 1,
          autoplay: 0, // user presses play — avoids browser autoplay-with-sound blocking
        },
        events: {
          onReady: () => {
            readMeta();
            setState((s) => ({ ...s, status: "cued" }));
          },
          onStateChange: (e: any) => {
            const YTS = window.YT.PlayerState;
            if (e.data === YTS.PLAYING) {
              setState((s) => ({ ...s, status: "playing" }));
              readMeta();
            } else if (e.data === YTS.PAUSED) {
              setState((s) => ({ ...s, status: "paused" }));
            } else if (e.data === YTS.ENDED) {
              // Auto-advance to next track and keep playing
              setState((s) => ({ ...s, status: "loading", videoTitle: "", channelTitle: "", currentTime: 0, duration: 0 }));
              setTimeout(() => {
                playerRef.current?.nextVideo?.();
                setTimeout(() => playerRef.current?.playVideo?.(), 300);
              }, 100);
            } else if (e.data === YTS.CUED) {
              readMeta();
            }
          },
          onError: () => {
            // spec section 24: never let the player break — skip the broken video
            setState((s) => ({ ...s, status: "error" }));
            setTimeout(() => playerRef.current?.nextVideo?.(), 1200);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
      playerRef.current?.destroy?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistId]);

  // YouTube doesn't push time updates — poll while mounted
  useEffect(() => {
    pollRef.current = window.setInterval(() => {
      const p = playerRef.current;
      if (!p?.getCurrentTime) return;
      setState((s) => ({
        ...s,
        currentTime: p.getCurrentTime() || 0,
        duration: p.getDuration?.() || s.duration,
      }));
    }, 500);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p?.getPlayerState) return;
    if (p.getPlayerState() === window.YT.PlayerState.PLAYING) p.pauseVideo();
    else p.playVideo();
  }, []);

  const next = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    // Clear stale metadata immediately for instant UI response
    setState((s) => ({
      ...s,
      status: "loading",
      videoTitle: "",
      channelTitle: "",
      currentTime: 0,
      duration: 0,
    }));
    p.nextVideo?.();
    // Force play after YouTube processes the switch (works even if was paused)
    setTimeout(() => p.playVideo?.(), 400);
  }, []);

  const previous = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    setState((s) => ({
      ...s,
      status: "loading",
      videoTitle: "",
      channelTitle: "",
      currentTime: 0,
      duration: 0,
    }));
    p.previousVideo?.();
    setTimeout(() => p.playVideo?.(), 400);
  }, []);
  const seekTo = useCallback((t: number) => playerRef.current?.seekTo?.(t, true), []);

  const toggleShuffle = useCallback(() => {
    const p = playerRef.current;
    if (!p?.setShuffle) return;
    setState((s) => {
      const next = !s.isShuffled;
      p.setShuffle(next);
      return { ...s, isShuffled: next };
    });
  }, []);

  const setVolume = useCallback((v: number) => {
    playerRef.current?.setVolume?.(v);
    if (v > 0) playerRef.current?.unMute?.();
    setState((s) => ({ ...s, volume: v, isMuted: v === 0 }));
  }, []);

  const toggleMute = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (p.isMuted?.()) {
      p.unMute();
      setState((s) => ({ ...s, isMuted: false }));
    } else {
      p.mute();
      setState((s) => ({ ...s, isMuted: true }));
    }
  }, []);

  return { containerRef, state, togglePlay, next, previous, seekTo, toggleShuffle, setVolume, toggleMute };
}
