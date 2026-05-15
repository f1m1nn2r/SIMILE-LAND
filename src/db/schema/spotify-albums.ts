import { pgTable, serial, text, timestamp, json } from "drizzle-orm/pg-core";

export const spotifyAlbums = pgTable("spotify_albums", {
  id: serial("id").primaryKey(),
  spotifyId: text("spotify_id").notNull().unique(),
  name: text("name").notNull(),
  releaseDate: text("release_date"),
  imageUrl: text("image_url"),
  spotifyUrl: text("spotify_url"),
  artists: json("artists").$type<string[]>(),
  tracks: json("tracks").$type<
    {
      id: string;
      number: number;
      name: string;
      previewUrl: string | null;
      spotifyUrl: string;
    }[]
  >(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
