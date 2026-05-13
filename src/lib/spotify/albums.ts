import { SpotifyAlbum } from "@/src/types/spotify";
import { getAccessToken } from "./_client";
import { ApiError } from "../errors/api-error";

export async function getSpotifyAlbum(albumId: string): Promise<SpotifyAlbum> {
  const token = await getAccessToken();

  let res: Response;

  try {
    res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });
  } catch {
    throw new ApiError(
      0,
      "Spotify 요청 중 네트워크 오류가 발생했습니다.",
      "NETWORK_ERROR",
    );
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new ApiError(res.status, `Spotify 앨범 조회 실패: ${errorText}`);
  }

  return res.json();
}
