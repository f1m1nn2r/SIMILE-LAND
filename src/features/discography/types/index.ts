import { SpotifyAlbumData } from "@/src/types/spotify";

export type DiscographyItem = {
  id: string;
  albumId: string;
  title: string;
  date: string;
  image: string;
  description: string;
  credits: string[][];
};

export type DiscographyCardProps = Omit<DiscographyItem, "credits" | "id">;

export type DiscographyDetailProps = {
  album: DiscographyItem;
  spotifyAlbumId?: string;
};

export type DiscographyTrackItemProps = {
  track: SpotifyAlbumData["tracks"][number];
  isCurrentlyPlaying: boolean;
  onPlay: (url: string) => void;
};
