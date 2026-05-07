"use client";

import gsap from "gsap";
import SplitType from "split-type";
import style from "./hero.module.scss";
import Image from "next/image";
import { Typography } from "@/src/components/common/typography";
import { Happy } from "@/src/components/common/happy";
import { useEffect, useRef } from "react";

export const HeroSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const lines =
      titleRef.current.querySelectorAll<HTMLElement>("[data-hero-title]");
    const split = new SplitType(Array.from(lines), { types: "chars" });

    gsap.from(split.chars, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="hero-section">
      <Happy />
      <div className={style["hero-section__inner"]}>
        <div className={style["hero-section__image"]}>
          <Image
            src="/assets/images/band-hero.png"
            alt="SIMILE LAND image"
            fill
            priority
            sizes="39vw"
          />
        </div>

        <div ref={titleRef}>
          <Typography
            weight="bold"
            size="heading-1"
            className={style["hero-section__title"]}
          >
            <span data-hero-title className={style["hero-section__title-line"]}>
              We wanna
            </span>
            <span data-hero-title className={style["hero-section__title-line"]}>
              make you
            </span>
            <span data-hero-title className={style["hero-section__title-line"]}>
              smile !!
            </span>
          </Typography>
        </div>
      </div>
      <Happy />
    </section>
  );
};
