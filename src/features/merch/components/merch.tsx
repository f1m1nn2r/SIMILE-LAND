"use client";

import Image from "next/image";
import style from "./merch.module.scss";
import { useState } from "react";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { SectionTitle } from "@/src/components/common/section-title";
import { merchData } from "../constants";

type CardProps = (typeof merchData)[number];

const MerchCard = ({ frontImage, backImage, title, price }: CardProps) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isFlipped = hovered && !!backImage;

  return (
    <div className={style["merch__card"]}>
      <div
        className={style["merch__image"]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image
          src={frontImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`${style["merch__img"]} ${isFlipped ? style["merch__img--hidden"] : ""}`}
        />
        {backImage && (
          <Image
            src={backImage}
            alt={`${title} back`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`${style["merch__img"]} ${isFlipped ? "" : style["merch__img--hidden"]}`}
          />
        )}
        {/* TODO 좋아요 기능 작업 */}
        <button
          type="button"
          className={style["merch__like"]}
          onClick={() => setLiked((prev) => !prev)}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <Image
            src={
              liked
                ? "/assets/icons/happy.svg"
                : "/assets/icons/happy-black.svg"
            }
            alt=""
            width={28}
            height={28}
            className={liked ? undefined : style["merch__like-icon--inactive"]}
          />
        </button>
      </div>
      <div className={style["merch__info"]}>
        <Typography size="body" className={style["merch__title"]}>
          {title}
        </Typography>
        <Typography size="body" weight="bold" className={style["merch__price"]}>
          {price}
        </Typography>
      </div>
    </div>
  );
};

export const Merch = () => {
  return (
    <section className={style.merch}>
      <SectionTitle>MERCH</SectionTitle>
      <div className={style["merch__grid"]}>
        {merchData.map((item, index) => (
          <MerchCard key={index} {...item} />
        ))}
      </div>
      <div className={style["merch__cta"]}>
        <Button
          variant="emoji"
          bgColor="teal"
          textSize="body"
          textWeight="semibold"
          href="/product"
        >
          SEE ALL MERCH
        </Button>
      </div>
    </section>
  );
};
