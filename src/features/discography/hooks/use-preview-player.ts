"use client";

import { useRef, useState, useEffect } from "react";

export function usePreviewPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  const init = () => {
    if (audioRef.current) return;

    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.volume = 0.8;
    audioRef.current = audio;

    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!;
    audioCtxRef.current = new AudioContextClass();

    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    const source = audioCtxRef.current.createMediaElementSource(audio);
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);

    dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentUrl(null);
    });
  };

  const play = async (url: string) => {
    init();
    const audio = audioRef.current!;

    // 같은 트랙 → 토글
    if (currentUrl === url && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    if (audioCtxRef.current?.state === "suspended") {
      await audioCtxRef.current.resume();
    }

    audio.src = url;
    audio.currentTime = 0;

    try {
      await audio.play();
      setCurrentUrl(url);
      setIsPlaying(true);
    } catch (e) {
      console.error("미리듣기 재생 실패:", e);
    }
  };

  const stop = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setCurrentUrl(null);
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioCtxRef.current?.close();
    };
  }, []);

  return { play, stop, isPlaying, currentUrl, analyserRef, dataArrayRef };
}
