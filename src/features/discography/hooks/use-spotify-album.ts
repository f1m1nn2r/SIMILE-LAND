"use client";

import { SpotifyAlbumData } from "@/src/types/spotify";
import { useQuery } from "@tanstack/react-query";

async function fetchSpotifyAlbum(albumId: string): Promise<SpotifyAlbumData> {
  const res = await fetch(`/api/spotify/album/${albumId}`);
  if (!res.ok) throw new Error("앨범 정보 로드 실패");
  return res.json();
}

export function useSpotifyAlbum(albumId: string | undefined) {
  return useQuery({
    queryKey: ["spotify-album", albumId],
    queryFn: () => fetchSpotifyAlbum(albumId!),
    enabled: !!albumId,
    staleTime: 1000 * 60 * 60,
  });
}
