"use client";

import style from "./discography-detail.module.scss";
import { Typography } from "@/src/components/common/typography";
import { DiscographyTrackItemProps } from "@/src/features/discography/types";
import { Button } from "@/src/components/common/button";

export const DiscographyTrack = ({
  track,
  isCurrentlyPlaying,
  onPlay,
}: DiscographyTrackItemProps) => {
  const btnProps = track.preview_url
    ? { onClick: () => onPlay(track.preview_url!) }
    : track.external_urls?.spotify
      ? { href: track.external_urls.spotify }
      : { onClick: () => alert("재생할 수 없어요!") };

  return (
    <div className={style["discography-detail__track-item"]}>
      <Typography
        size="subtitle"
        weight="medium"
        className={style["discography-detail__track-title"]}
      >
        TRACK {track.track_number}. {track.name}
      </Typography>
      <Button
        variant="emoji"
        bgColor="graylighter"
        textSize="body"
        textWeight="semibold"
        className={style["discography-detail__track-listen"]}
        {...btnProps}
      >
        {isCurrentlyPlaying ? "PAUSE" : "LISTEN"}
      </Button>
    </div>
  );
};
