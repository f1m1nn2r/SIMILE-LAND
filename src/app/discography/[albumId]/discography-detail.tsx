"use client";

import Image from "next/image";
import style from "./discography-detail.module.scss";
import { Typography } from "@/src/components/common/typography";
import { useSpotifyAlbum } from "@/src/features/discography/hooks/use-spotify-album";
import { usePreviewPlayer } from "@/src/features/discography/hooks/use-preview-player";
import { useRef } from "react";
import { useAlbumCoverEffect } from "@/src/features/discography/hooks/use-album-cover-effect";
import { DiscographyDetailProps } from "@/src/features/discography/types";
import { DiscographyTrack } from "./discography-track";

export const DiscographyDetail = ({
  album,
  spotifyAlbumId,
}: DiscographyDetailProps) => {
  const { imageRef, handleMouseMove, handleMouseLeave } = useAlbumCoverEffect();
  const { play, isPlaying, currentUrl } = usePreviewPlayer();
  const { data: spotifyAlbum } = useSpotifyAlbum(spotifyAlbumId);

  const titleRef = useRef<HTMLSpanElement>(null);

  return (
    <section className={style["discography-detail"]}>
      <div
        className={style["discography-detail__banner"]}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={imageRef}
          className={style["discography-detail__banner-inner"]}
        >
          <Image
            src={spotifyAlbum?.images[0]?.url ?? album.image}
            alt={`${album.title} 앨범 이미지`}
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <div className={style["discography-detail__content"]}>
        <div className={style["discography-detail__credits-section"]}>
          {album.credits.map((credits, credit) => (
            <div
              key={credit}
              className={style["discography-detail__credits-group"]}
            >
              {credits.map((line, li) => (
                <Typography
                  key={li}
                  size="body"
                  className={style["discography-detail__credits-line"]}
                >
                  {line}
                </Typography>
              ))}
            </div>
          ))}
        </div>

        <div className={style["discography-detail__album-section"]}>
          <div className={style["discography-detail__album-art"]}>
            <Image
              src="/assets/images/record.png"
              alt=""
              width={300}
              height={300}
              className={style["discography-detail__record"]}
            />
            <Image
              src={spotifyAlbum?.images[0]?.url ?? album.image}
              alt={`${spotifyAlbum?.name ?? album.title} 앨범 커버`}
              width={350}
              height={350}
              className={style["discography-detail__album-image"]}
            />
          </div>

          <div className={style["discography-detail__track-list"]}>
            {spotifyAlbum?.tracks.map((track) => (
              <DiscographyTrack
                key={track.id}
                track={track}
                isCurrentlyPlaying={
                  isPlaying &&
                  !!track.previewUrl &&
                  currentUrl === track.previewUrl
                }
                onPlay={play}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={style["discography-detail__title-section"]}>
        <span ref={titleRef} className={style["discography-detail__big-title"]}>
          {album.title}
        </span>
      </div>
    </section>
  );
};
