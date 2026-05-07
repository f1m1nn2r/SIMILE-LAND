"use client";

import gsap from "gsap";
import Image from "next/image";
import style from "./discography.module.scss";
import { useState, useRef } from "react";
import { Typography } from "@/src/components/common/typography";
import { Button } from "@/src/components/common/button";
import { extractEdgeColors } from "@/src/features/discography/utils/extractColor";
import { SectionTitle } from "@/src/components/common/section-title";
import { discographyData } from "../constants";

type CardProps = (typeof discographyData)[number];

const DiscographyCard = ({ image, title, date, description }: CardProps) => {
  const [gradient, setGradient] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const TILT_MAX = 12;

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    try {
      const [left, right] = extractEdgeColors(e.currentTarget);
      setGradient(`linear-gradient(to right, ${left}, ${right})`);
    } catch {
      // 캔버스 추출 실패 시 gradient 미적용
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = imageRef.current;
    if (!image) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(image, {
      rotateY: x * TILT_MAX * 1.2,
      rotateX: -y * TILT_MAX * 1.2,
      scale: 1.05,
      duration: 0.7,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <div className={style["discography__card"]}>
      <div
        className={style["discography__image"]}
        style={gradient ? { background: gradient } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={imageRef} className={style["discography__image-inner"]}>
          <Image
            src={image}
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
          {title}
        </Typography>
        <Typography size="body" className={style["discography__date"]}>
          {date}
        </Typography>
        <Typography size="body" className={style["discography__desc"]}>
          {description}
        </Typography>
      </div>
    </div>
  );
};

export const Discography = () => {
  return (
    <section className={style.discography}>
      <SectionTitle>DISCOGRAPHY</SectionTitle>

      <div className={style["discography__grid"]}>
        {discographyData.slice(0, 4).map((album, index) => (
          <DiscographyCard key={index} {...album} />
        ))}
      </div>

      <div className={style["discography__cta"]}>
        <Button
          variant="emoji"
          bgColor="teal"
          className={style["discography__cta-btn"]}
          textSize="body"
          textWeight="semibold"
        >
          SEE ALL DISCOGRAPHY
        </Button>
      </div>
    </section>
  );
};
