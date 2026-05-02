"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { Typography } from "../common/typography";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "PROFILE", href: "/profile" },
  { label: "DISCOGRAPHY", href: "/discography" },
  { label: "SCHEDULE", href: "/schedule" },
  { label: "MERCH", href: "/product" },
];

type NavMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);
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

    if (isOpen) {
      tlRef.current = gsap
        .timeline()
        .fromTo(
          panel,
          { autoAlpha: 0, scale: 1 },
          { autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        )
        .fromTo(
          panel.querySelector(".nav-menu__list"),
          { autoAlpha: 0, rotateY: 30, transformPerspective: 600 },
          { autoAlpha: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.3",
        )
        .fromTo(
          panel.querySelectorAll(".nav-menu__item"),
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
          panel.querySelector(".nav-menu__instagram"),
          { autoAlpha: 0, rotateY: -30, transformPerspective: 600 },
          { autoAlpha: 1, rotateY: 0, duration: 0.6, ease: "back.out(1.7)" },
          "<",
        );
    } else {
      tlRef.current = gsap
        .timeline()
        .to(panel.querySelector(".nav-menu__list"), {
          rotateY: 30,
          transformPerspective: 600,
          duration: 0.5,
          ease: "power3.inOut",
        })
        .to(
          panel.querySelectorAll(".nav-menu__item"),
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
          panel.querySelector(".nav-menu__instagram"),
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
    <div ref={panelRef} className="nav-menu" style={{ visibility: "hidden" }}>
      <ul className="nav-menu__list">
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={href} className="nav-menu__item">
            <Link
              href={href}
              onClick={onClose}
              className={`nav-menu__link ${pathname === href ? "active" : ""}`}
            >
              <Typography weight="bold" size="subtitle">
                {label}
              </Typography>
              {pathname === href && <span className="nav-menu__dot" />}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="https://www.instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="nav-menu__instagram"
      >
        <span className="nav-menu__instagram-icon">
          <Image
            src="/assets/happy.svg"
            alt="Instagram"
            width={22}
            height={22}
          />
        </span>
        <Typography weight="bold" size="subtitle">
          INSTAGRAM
        </Typography>
      </Link>
    </div>
  );
};
