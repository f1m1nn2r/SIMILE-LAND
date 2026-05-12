import { SpotifyTrack } from "@/src/types/spotify";
import { getAccessToken } from "./_client";

export async function getSpotifyTrack(trackId: string): Promise<SpotifyTrack> {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Spotify 트랙 조회 실패: ${res.status} - ${errorText}`);
  }
  return res.json();
}
