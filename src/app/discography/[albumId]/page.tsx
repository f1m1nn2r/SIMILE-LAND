import { notFound } from "next/navigation";
import { discographyData } from "@/src/features/discography/constants";
import { getSpotifyAlbum } from "@/src/lib/spotify";
import { DiscographyDetail } from "./discography-detail";

type Props = {
  params: Promise<{ albumId: string }>;
};

export default async function DiscographyDetailPage({ params }: Props) {
  const { albumId } = await params;

  let album = discographyData.find((item) => item.albumId === albumId);

  if (!album) {
    try {
      const spotifyAlbum = await getSpotifyAlbum(albumId);
      album = discographyData.find(
        (item) => item.title.toLowerCase() === spotifyAlbum.name.toLowerCase(),
      );
    } catch {
      // Spotify 조회 실패
    }
  }

  if (!album) notFound();

  return <DiscographyDetail album={album} spotifyAlbumId={albumId} />;
}
