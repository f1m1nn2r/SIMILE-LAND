export type SpotifyArtistAlbum = {
  total_tracks: number;
  id: string;
  name: string;
  release_date: string;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
};

export type SpotifyAlbumTrack = {
  id: string;
  name: string;
  track_number: number;
  preview_url: string | null;
  external_urls: { spotify: string };
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  release_date: string;
  images: { url: string; width: number; height: number }[];
  external_urls: { spotify: string };
  artists: { id: string; name: string }[];
  tracks: { items: SpotifyAlbumTrack[] };
};

export type SpotifyAlbumData = {
  id: string;
  name: string;
  releaseDate: string;
  images: { url: string; width: number; height: number }[];
  spotifyUrl: string;
  artists: string[];
  tracks: {
    id: string;
    number: number;
    name: string;
    previewUrl: string | null;
    spotifyUrl: string;
  }[];
};

export type SpotifyTrack = {
  id: string;
  name: string;
  preview_url: string | null;
  external_urls: { spotify: string };
};
