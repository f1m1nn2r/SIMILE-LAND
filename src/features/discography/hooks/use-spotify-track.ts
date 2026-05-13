"use client";

import { useQuery } from "@tanstack/react-query";

type SpotifyTrackResult = {
  preview_url: string | null;
  external_urls: { spotify: string };
};

async function fetchSpotifyTrack(trackId: string): Promise<SpotifyTrackResult> {
  const res = await fetch(`/api/spotify/track/${trackId}`);
  if (!res.ok) throw new Error("트랙 정보 로드 실패");
  return res.json();
}

export function useSpotifyTrack(trackId: string | undefined) {
  return useQuery({
    queryKey: ["spotify-track", trackId],
    queryFn: () => fetchSpotifyTrack(trackId!),
    enabled: !!trackId,
    staleTime: 1000 * 60 * 60,
  });
}
