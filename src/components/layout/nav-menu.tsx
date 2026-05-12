"use client";

import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import style from "./layout.module.scss";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Typography } from "../common/typography";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "PROFILE", href: "/profile" },
  { label: "DISCOGRAPHY", href: "/discography" },
  { label: "SCHEDULE", href: "/schedule" },
  { label: "MERCH", href: "/product" },
];

const ICON_SIZE = "clamp(22px, 1.1458vw, 44px)";

const isActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

type NavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);
  const instagramRef = useRef<HTMLAnchorElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isFirstRender.current) {
      gsap.set(panel, { autoAlpha: 0 });
      isFirstRender.current = false;
      return;
    }

    tlRef.current?.kill();

    const list = listRef.current;
    const items = itemsRef.current;
    const instagram = instagramRef.current;

    if (isOpen) {
      tlRef.current = gsap
        .timeline()
        .fromTo(
          panel,
          { autoAlpha: 0, scale: 1 },
          { autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        )
        .fromTo(
          list,
          { autoAlpha: 0, rotateY: 30, transformPerspective: 600 },
          { autoAlpha: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        )
        .fromTo(
          items,
          { autoAlpha: 0, x: -12 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.35,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.45",
        )
        .fromTo(
          instagram,
          { autoAlpha: 0, rotateY: -30, transformPerspective: 600 },
          { autoAlpha: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.7)" },
          "<",
        );
    } else {
      tlRef.current = gsap
        .timeline()
        .to(list, {
          rotateY: 30,
          transformPerspective: 600,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .to(
          items,
          {
            autoAlpha: 0,
            x: -12,
            duration: 0.3,
            stagger: 0.07,
            ease: "power2.in",
          },
          "-=0.45",
        )
        .to(
          instagram,
          {
            rotateY: -30,
            transformPerspective: 600,
            duration: 0.5,
            ease: "power3.inOut",
          },
          "<",
        )
        .to(panel, { autoAlpha: 0, duration: 0.5, ease: "power3.inOut" }, "<");
    }
  }, [isOpen]);

  return (
    <div
      ref={panelRef}
      className={style["nav-menu"]}
      style={{ visibility: "hidden" }}
    >
      <ul ref={listRef} className={style["nav-menu__list"]}>
        {NAV_ITEMS.map(({ label, href }, i) => (
          <li
            key={href}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            className={style["nav-menu__item"]}
          >
            <Link
              href={href}
              onClick={onClose}
              className={`${style["nav-menu__link"]} ${isActive(pathname, href) ? style["nav-menu__link--active"] : ""}`}
            >
              <Typography weight="bold" size="subtitle">
                {label}
              </Typography>
              {isActive(pathname, href) && (
                <span className={style["nav-menu__dot"]} />
              )}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        ref={instagramRef}
        href="https://www.instagram.com/simile_land/"
        target="_blank"
        rel="noopener noreferrer"
        className={style["nav-menu__instagram"]}
      >
        <span
          className={style["nav-menu__instagram-icon"]}
          style={{ width: ICON_SIZE }}
        >
          <Image
            src="/assets/icons/happy.svg"
            alt="Instagram"
            width={22}
            height={22}
            style={{ width: "100%", height: "auto" }}
          />
        </span>
        <Typography weight="bold" size="subtitle">
          INSTAGRAM
        </Typography>
      </Link>
    </div>
  );
};
