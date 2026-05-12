"use client";

import { SpotifyArtistAlbum } from "@/src/types/spotify";
import { useQuery } from "@tanstack/react-query";

async function fetchSpotifyArtistAlbums(): Promise<SpotifyArtistAlbum[]> {
  const res = await fetch("/api/spotify/artist/albums");
  if (!res.ok) throw new Error("아티스트 앨범 로드 실패");
  return res.json();
}

export function useSpotifyArtistAlbums() {
  return useQuery({
    queryKey: ["spotify-artist-albums"],
    queryFn: fetchSpotifyArtistAlbums,
    staleTime: 1000 * 60 * 60,
  });
}
