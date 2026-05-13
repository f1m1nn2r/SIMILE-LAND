import { discographyData } from "@/src/features/discography/constants";
import { getSpotifyAlbum } from "@/src/lib/spotify";
import { DiscographyDetail } from "./discography-detail";
import { Empty } from "@/src/components/common/empty";
import { FetchError } from "@/src/components/common/fetch-error";

type DiscographyDetailPageProps = {
  params: Promise<{ albumId: string }>;
};

export default async function DiscographyDetailPage({
  params,
}: DiscographyDetailPageProps) {
  const { albumId } = await params;

  let album = discographyData.find((item) => item.albumId === albumId);

  if (!album) {
    try {
      const spotifyAlbum = await getSpotifyAlbum(albumId);
      album = discographyData.find(
        (item) => item.title.toLowerCase() === spotifyAlbum.name.toLowerCase(),
      );
    } catch {
      return <FetchError>앨범을 불러오는데 실패했어요.</FetchError>;
    }
  }

  if (!album) return <Empty>앨범 정보가 없어요.</Empty>;

  return <DiscographyDetail album={album} spotifyAlbumId={albumId} />;
}
