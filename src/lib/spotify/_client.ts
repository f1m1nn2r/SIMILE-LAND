import { ApiError } from "../errors/api-error";

let cachedToken: string | null = null;
let tokenExpiresAt = 0;
let tokenPromise: Promise<string> | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new ApiError(
        0,
        "Spotify 환경변수가 설정되지 않았습니다.",
        "MISSING_ENV",
      );
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64",
    );

    let res: Response;

    try {
      res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
    } catch {
      throw new ApiError(
        0,
        "Spotify 요청 중 네트워크 오류가 발생했습니다.",
        "NETWORK_ERROR",
      );
    }

    if (!res.ok) {
      throw new ApiError(
        res.status,
        `Spotify 아티스트 앨범 조회 실패: ${res.status}`,
        "SPOTIFY_ALBUM_FETCH_FAILED",
      );
    }

    const data: {
      access_token: string;
      expires_in: number;
    } = await res.json();

    cachedToken = data.access_token;
    tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;

    return cachedToken;
  })();

  try {
    return await tokenPromise;
  } finally {
    tokenPromise = null;
  }
}
