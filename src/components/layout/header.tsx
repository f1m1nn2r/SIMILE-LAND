"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "../common/button";
import { useAudio } from "../providers/audio-provider";
import { NavMenu } from "./nav-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";

const W = 40;
const H = 12;
const NUM_POINTS = 40;

export const Header = () => {
  const { isPlaying, musicToggle, analyserRef, dataArrayRef } = useAudio();
  const pathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const intensityRef = useRef(0);
  const targetIntensityRef = useRef(0);
  const offsetRef = useRef(0);
  const isPlayingRef = useRef(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const drawWave = () => {
      const analyser = analyserRef.current;
      const dataArray = dataArrayRef.current;
      const path = pathRef.current;
      if (!analyser || !dataArray || !path) {
        rafRef.current = requestAnimationFrame(drawWave);
        return;
      }

      analyser.getByteFrequencyData(dataArray);

      const sum = dataArray.reduce((a, b) => a + b, 0);
      const average = sum / dataArray.length;

      targetIntensityRef.current = 1.5 + (average / 255) * (H / 1.2);
      intensityRef.current +=
        (targetIntensityRef.current - intensityRef.current) * 0.2;
      offsetRef.current += isPlayingRef.current ? 0.15 : 0.01;

      const points = [];
      for (let i = 0; i <= NUM_POINTS; i++) {
        const x = (i / NUM_POINTS) * W;
        const angle = (i / NUM_POINTS) * Math.PI * 1.5;
        const y =
          H / 2 + Math.sin(angle + offsetRef.current) * intensityRef.current;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }

      path.setAttribute("d", `M ${points.join(" L ")}`);
      rafRef.current = requestAnimationFrame(drawWave);
    };

    rafRef.current = requestAnimationFrame(drawWave);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, analyserRef, dataArrayRef]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <Link href="/" className="site-header__logo">
        <Image src="/assets/logo.svg" alt="SIMILE LAND" fill priority />
      </Link>

      <nav ref={navRef} className="site-header__nav">
        <ul className="site-header__menu">
          <li className="site-header__menu-item">
            <Button
              className="site-header__button site-header__button--music"
              variant="emoji"
              bgColor="lavender"
              onClick={musicToggle}
              textWeight="semibold"
              textSize="body"
            >
              {isPlaying ? "Pause" : "Play"}

              {isPlaying && (
                <span className="site-header__visualizer">
                  <svg
                    className="site-header__visualizer-svg"
                    width={W}
                    height={H}
                    viewBox={`0 0 ${W} ${H}`}
                    fill="none"
                  >
                    <path
                      ref={pathRef}
                      className="site-header__visualizer-path"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </Button>
          </li>

          <li className="site-header__menu-item">
            <Button
              className="site-header__button site-header__button--mypage"
              variant="emoji"
              bgColor="yellow"
              textWeight="semibold"
              textSize="body"
              onClick={() => router.push("/mypage")}
            >
              My Page
            </Button>
          </li>

          <li className="site-header__menu-item">
            <Button
              className="site-header__button site-header__button--menu"
              variant="emoji"
              bgColor="teal"
              textWeight="semibold"
              textSize="body"
              aria-expanded={isMenuOpen}
              aria-controls="site-nav-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              Menu
            </Button>
          </li>
        </ul>

        <div id="site-nav-menu">
          <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </div>
      </nav>
    </header>
  );
};
