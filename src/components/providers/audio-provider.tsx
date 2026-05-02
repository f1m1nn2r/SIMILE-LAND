"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

interface AudioContextValue {
  isPlaying: boolean;
  musicToggle: () => Promise<void>;
  analyserRef: RefObject<AnalyserNode | null>;
  dataArrayRef: RefObject<Uint8Array<ArrayBuffer> | null>;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const isPlayingRef = useRef(false);

  const musicToggle = async () => {
    audioRef.current = new Audio("/audio/quit-smoking.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    audioCtxRef.current = new AudioContextClass();
    analyserRef.current = audioCtxRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    const source = audioCtxRef.current.createMediaElementSource(
      audioRef.current,
    );
    source.connect(analyserRef.current);
    analyserRef.current.connect(audioCtxRef.current.destination);

    dataArrayRef.current = new Uint8Array(
      analyserRef.current.frequencyBinCount,
    );

    if (isPlayingRef.current) {
      audioRef.current?.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      audioRef.current?.play();
      isPlayingRef.current = true;
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <AudioCtx.Provider
      value={{ isPlaying, musicToggle, analyserRef, dataArrayRef }}
    >
      {children}
    </AudioCtx.Provider>
  );
};

export const useAudio = () => {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
};
