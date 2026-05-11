"use client";

import Image from "next/image";
import style from "./profile.module.scss";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Typography } from "@/src/components/common/typography";
import { profileData } from "./mock-constants";
import { SectionTitle } from "@/src/components/common/section-title";

gsap.registerPlugin(ScrollTrigger);

export const Profile = () => {
  const profileRef = useRef<HTMLElement>(null);
  const profileCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const profile = profileRef.current;
    const profileCards = profileCardsRef.current.filter(
      (c): c is HTMLDivElement => c !== null,
    );

    if (!profile || profileCards.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: profile,
          start: "top top",
          end: `+=${(profileData.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (profileData.length - 1));
            setActiveIndex(index);
          },
        },
      });

      profileCards.slice(1).forEach((card, i) => {
        tl.fromTo(
          card,
          { y: "100%" },
          { y: "0%", ease: "none", duration: 1 },
          i,
        );
      });
    }, profile);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={profileRef} className={style.profile}>
      <SectionTitle>PROFILE</SectionTitle>

      <div className={style["profile__cards"]}>
        {/* TODO: 데코 요소 애니메이션 추가
        <div ref={deco1Ref} className={style["profile__deco-1"]} />
        <div ref={deco2Ref} className={style["profile__deco-2"]} /> */}
        {profileData.map((member, index) => (
          <div
            key={`member-${index}`}
            ref={(el) => {
              profileCardsRef.current[index] = el;
            }}
            className={style["profile__card"]}
            style={{
              zIndex: index + 1,
              transform: index > 0 ? "translateY(100%)" : undefined,
            }}
          >
            <div className={style["profile__image"]}>
              <Image
                src={member.image}
                alt={`${member.name} 프로필 이미지`}
                fill
                preload={index === 0}
                sizes="52vw"
              />
            </div>
          </div>
        ))}
      </div>
      <div className={style["profile__info"]}>
        <Typography size="body" weight="medium">
          <span>{profileData[activeIndex].position}</span>
        </Typography>

        <Typography size="heading-4" weight="bold">
          <span>{profileData[activeIndex].name}</span>
        </Typography>
      </div>
    </section>
  );
};
