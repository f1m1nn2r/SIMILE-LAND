"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./discography.module.scss";
import { useState } from "react";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { extractEdgeColors } from "@/src/features/discography/utils/extractColor";
import { SectionTitle } from "@/src/components/common/section-title";
import { discographyData } from "../constants";
import { useAlbumCoverEffect } from "../hooks/use-album-cover-effect";
import { useSpotifyArtistAlbums } from "../hooks/use-spotify-artist-albums";
import { DiscographyCardProps } from "../types";

export const DiscographyCard = ({
  albumId,
  image,
  title,
  date,
  description,
}: DiscographyCardProps) => {
  const [gradient, setGradient] = useState<string | null>(null);
  const { imageRef, handleMouseMove, handleMouseLeave } = useAlbumCoverEffect();
  const { data: spotifyArtistsAlbums } = useSpotifyArtistAlbums();

  const artistsAlbum = spotifyArtistsAlbums?.find((s) => s.id === albumId);
  const spotifyAlbumImage = artistsAlbum?.images[0]?.url ?? image;
  const href = `/discography/${artistsAlbum?.id ?? albumId}`;
  const trackNumber = artistsAlbum?.total_tracks;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      const [left, right] = extractEdgeColors(e.currentTarget);
      setGradient(`linear-gradient(to right, ${left}, ${right})`);
    } catch {
      // 캔버스 추출 실패 시 gradient 미적용
    }
  };

  return (
    <Link href={href} className={style["discography__card"]}>
      <div
        className={style["discography__image"]}
        style={gradient ? { background: gradient } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={imageRef} className={style["discography__image-inner"]}>
          <Image
            src={spotifyAlbumImage}
            alt={`${title} 앨범 이미지`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            onLoad={handleLoad}
          />
        </div>
      </div>
      <div className={style["discography__info"]}>
        <Typography
          size="heading-5"
          weight="bold"
          className={style["discography__title"]}
        >
          {artistsAlbum?.name ?? title} {trackNumber}
        </Typography>
        <Typography size="body" className={style["discography__date"]}>
          {artistsAlbum?.release_date ?? date}
        </Typography>
        <Typography size="body" className={style["discography__desc"]}>
          {description}
        </Typography>
      </div>
    </Link>
  );
};

export const Discography = () => {
  return (
    <section className={style.discography}>
      <SectionTitle>DISCOGRAPHY</SectionTitle>

      <div className={style["discography__grid"]}>
        {discographyData.slice(0, 4).map((album) => (
          <DiscographyCard
            key={album.id}
            albumId={album.albumId}
            image={album.image}
            title={album.title}
            date={album.date}
            description={album.description}
          />
        ))}
      </div>

      <div className={style["discography__cta"]}>
        <Button
          variant="emoji"
          bgColor="teal"
          className={style["discography__cta-btn"]}
          textSize="body"
          textWeight="semibold"
          href="/discography"
        >
          SEE ALL DISCOGRAPHY
        </Button>
      </div>
    </section>
  );
};
