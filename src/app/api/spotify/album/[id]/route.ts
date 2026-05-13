import { getSpotifyAlbum } from "@/src/lib/spotify";
import type { NextRequest } from "next/server";

export const revalidate = 3600;

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
      release_date: album.release_date,
      images: album.images,
      external_urls: album.external_urls,
      artists: album.artists,
      tracks: album.tracks.items.map((t) => ({
        id: t.id,
        track_number: t.track_number,
        name: t.name,
        preview_url: t.preview_url,
        external_urls: t.external_urls,
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
