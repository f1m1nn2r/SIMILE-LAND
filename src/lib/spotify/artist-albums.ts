import { SpotifyArtistAlbum } from "@/src/types/spotify";
import { getAccessToken } from "./_client";

export async function getSpotifyArtistAlbums(
  artistId: string,
): Promise<SpotifyArtistAlbum[]> {
  const token = await getAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/albums`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `Spotify 아티스트 앨범 조회 실패: ${res.status} — ${errorText}`,
    );
  }

  const data = await res.json();
  return data.items;
}
