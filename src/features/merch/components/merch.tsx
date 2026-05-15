"use client";

import Image from "next/image";
import Link from "next/link";
import style from "./merch.module.scss";
import { useState } from "react";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { SectionTitle } from "@/src/components/common/section-title";
import { merchData } from "../constants";

type MerchCardProps = (typeof merchData)[number] & { href?: string };

export const MerchCard = ({
  images,
  title,
  price,
  originalPrice,
  discountRate,
  href,
}: MerchCardProps) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const frontImage = images[0];
  const backImage = images[1] ?? null;
  const isFlipped = hovered && !!backImage;

  const imageArea = (
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
        onClick={(e) => {
          e.preventDefault();
          setLiked((prev) => !prev);
        }}
        aria-label={liked ? "좋아요 취소" : "좋아요"}
      >
        <Image
          src={
            liked ? "/assets/icons/happy.svg" : "/assets/icons/happy-black.svg"
          }
          alt=""
          width={28}
          height={28}
          className={liked ? undefined : style["merch__like-icon--inactive"]}
        />
      </button>
    </div>
  );

  return (
    <div className={style["merch__card"]}>
      {href ? <Link href={href}>{imageArea}</Link> : imageArea}
      <div className={style["merch__info"]}>
        <Typography size="body" className={style["merch__title"]}>
          {title}
        </Typography>
        {originalPrice && discountRate && (
          <Typography size="caption" className={style["merch__original-price"]}>
            <span className={style["merch__original-price-text"]}>
              {originalPrice}
            </span>
          </Typography>
        )}
        <Typography size="body" weight="bold" className={style["merch__price"]}>
          {discountRate && (
            <span className={style["merch__discount-rate"]}>
              {discountRate}%{" "}
            </span>
          )}
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
