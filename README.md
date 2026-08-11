# Pahadi Sawari

पहाड़ के रास्ते, गीतों के साथ — a single-page Uttarakhand road-trip stereo,
now playing your actual YouTube Music playlist through the real IFrame API.

## Status

Real playback wired up. This is intentionally minimal per spec: one playlist,
no song browsing/selection, no categories, no queue. Top-left is a live clock,
top-right links out to the exact playlist on YouTube Music.

## Run locally

```bash
npm install
npm run dev
```

## How playback works

`src/hooks/useYouTubePlayer.ts` loads the YouTube IFrame API, creates a
hidden (0x0) player cued to the playlist below, and exposes
play/pause/next/previous/seek/volume to our own UI. The iframe itself is
never visible — everything on screen is our own component.

```
PLAYLIST_ID = "PL-o00TTjhluzzKDk6KpUevW-aEYBg3SIw"
```

defined in `src/components/Layout/AppShell.tsx`.

Autoplay is intentionally off (`autoplay: 0`) — browsers block autoplay with
sound until the person interacts with the page, so the first play always
requires a tap on the play button. This is standard behavior, not a bug.

Album artwork uses the real YouTube thumbnail
(`https://i.ytimg.com/vi/{videoId}/hqdefault.jpg`) for whatever video is
currently playing, with a gradient fallback if a thumbnail fails to load.

## What's intentionally removed from Phase 1

Category filtering, the song queue/browsing UI, and the static local song
catalogue (`songs.ts`, `categories.ts`) were removed — the brief for this
version is one fixed playlist with no selection UI. That code is gone, not
hidden, so there's nothing stale sitting in the repo.

## If music doesn't play

1. Click the play button once — autoplay-with-sound is blocked by every
   modern browser until you interact with the page.
2. Open the browser console (F12) — if the YouTube IFrame API is blocked by
   an ad blocker or a very strict browser privacy setting, you'll see a
   network error there.
3. Confirm the playlist is public or unlisted (not private) — private
   playlists can't be embedded.
