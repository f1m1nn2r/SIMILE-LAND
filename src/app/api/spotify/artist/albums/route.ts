import { getSpotifyArtistAlbums } from "@/src/lib/spotify";

export async function GET() {
  const artistId = process.env.SPOTIFY_ARTIST_ID;

  if (!artistId) {
    return Response.json(
      { error: "SPOTIFY_ARTIST_ID 환경변수가 없습니다." },
      { status: 500 },
    );
  }

  try {
    const albums = await getSpotifyArtistAlbums(artistId);
    return Response.json(
      albums.map((album) => ({
        total_tracks: album.total_tracks,
        id: album.id,
        name: album.name,
        release_date: album.release_date,
        images: album.images,
        external_urls: album.external_urls,
      })),
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "[api/spotify/artist/albums] 앨범 목록을 가져오지 못했습니다." },
      { status: 500 },
    );
  }
}
