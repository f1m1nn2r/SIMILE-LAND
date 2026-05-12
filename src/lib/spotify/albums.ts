import { SpotifyAlbum } from "@/src/types/spotify";
import { getAccessToken } from "./_client";

export async function getSpotifyAlbum(albumId: string): Promise<SpotifyAlbum> {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  const errorText = await res.text();

  if (!res.ok)
    throw new Error(`Spotify 앨범 조회 실패: ${res.status} - ${errorText}`);
  return res.json();
}
