"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";

export function useAlbumCoverEffect(tiltMax = 12) {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    return () => {
      gsap.killTweensOf(el);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = imageRef.current;
    if (!image) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    gsap.to(image, {
      rotateY: x * tiltMax * 1.2,
      rotateX: -y * tiltMax * 1.2,
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

  return { imageRef, handleMouseMove, handleMouseLeave };
}
