import { getSpotifyTrack } from "@/src/lib/spotify";
import type { NextRequest } from "next/server";

export const revalidate = 3600;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "트랙 ID가 없습니다." }, { status: 400 });
  }

  try {
    const track = await getSpotifyTrack(id);
    return Response.json({
      preview_url: track.preview_url,
      external_urls: track.external_urls,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "[api/spotify/track/[id]] 트랙 정보를 가져오지 못했습니다." },
      { status: 500 },
    );
  }
}
