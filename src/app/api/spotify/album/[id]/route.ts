import { getSpotifyAlbum } from "@/src/lib/spotify";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "앨범 ID가 없습니다." }, { status: 400 });
  }

  try {
    const album = await getSpotifyAlbum(id);
    return Response.json({
      id: album.id,
      name: album.name,
      releaseDate: album.release_date,
      images: album.images,
      spotifyUrl: album.external_urls.spotify,
      artists: album.artists.map((a) => a.name),
      tracks: album.tracks.items.map((t) => ({
        id: t.id,
        number: t.track_number,
        name: t.name,
        previewUrl: t.preview_url,
        spotifyUrl: t.external_urls.spotify,
      })),
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "[api/spotify/album/[id]] 앨범 정보를 가져오지 못했습니다." },
      { status: 500 },
    );
  }
}
