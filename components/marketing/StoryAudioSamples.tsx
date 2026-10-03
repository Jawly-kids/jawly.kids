"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/app/heroes/heroes.module.css";

type TrackKey = "voice" | "song";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
};

export default function StoryAudioSamples({ character, narrationSrc, songSrc, songTitle }: {
  character: string;
  narrationSrc: string;
  songSrc: string;
  songTitle: string;
}) {
  const tracks = {
    voice: { label: "Voice", title: `Hear ${character} talk`, detail: "Character voice", src: narrationSrc },
    song: { label: "Theme song", title: songTitle, detail: "Original music", src: songSrc },
  } as const;
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>("voice");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef(0);
  const lastDrawRef = useRef(0);
  const visibleRef = useRef(true);
  const active = tracks[selectedTrack];

  const drawIdleWave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const envelope = Math.sin((x / width) * Math.PI);
      const y = height / 2 + Math.sin(x * 0.055) * height * 0.12 * envelope;
      if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
    }
    context.lineWidth = Math.max(2, ratio * 1.25);
    context.strokeStyle = getComputedStyle(canvas).color;
    context.globalAlpha = 0.34;
    context.stroke();
    context.globalAlpha = 1;
  }, []);

  const stopDrawing = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
  }, []);

  const drawLiveWave = useCallback((timestamp = 0) => {
    if (!visibleRef.current) return;
    const analyser = analyserRef.current;
    const canvas = canvasRef.current;
    if (!analyser || !canvas) return;
    if (timestamp - lastDrawRef.current < 33) {
      animationRef.current = requestAnimationFrame(drawLiveWave);
      return;
    }
    lastDrawRef.current = timestamp;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(bounds.width * ratio));
    const height = Math.max(1, Math.round(bounds.height * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(data);
    const context = canvas.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    data.forEach((value, index) => {
      const x = index * width / (data.length - 1);
      const y = value / 255 * height;
      if (index === 0) context.moveTo(x, y); else context.lineTo(x, y);
    });
    context.lineWidth = Math.max(2, ratio * 1.35);
    context.strokeStyle = getComputedStyle(canvas).color;
    context.stroke();
    animationRef.current = requestAnimationFrame(drawLiveWave);
  }, []);

  const ensureAudioGraph = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!contextRef.current) contextRef.current = new AudioContext();
    if (!sourceRef.current) {
      sourceRef.current = contextRef.current.createMediaElementSource(audio);
      analyserRef.current = contextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.smoothingTimeConstant = 0.76;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(contextRef.current.destination);
    }
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      ensureAudioGraph();
      await contextRef.current?.resume();
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    stopDrawing();
    drawIdleWave();
  }, [drawIdleWave, selectedTrack, stopDrawing]);

  useEffect(() => {
    const redraw = () => { if (!isPlaying) drawIdleWave(); };
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [drawIdleWave, isPlaying]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (!entry.isIntersecting) stopDrawing();
      else if (audioRef.current && !audioRef.current.paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationRef.current = requestAnimationFrame(drawLiveWave);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawLiveWave, stopDrawing]);

  useEffect(() => () => {
    stopDrawing();
    void contextRef.current?.close();
  }, [stopDrawing]);

  return (
    <div ref={containerRef} className={styles.storyAudio} aria-label={`${character} audio samples`}>
      <div className={styles.audioTrackTabs} aria-label="Choose an audio sample">
        {(Object.keys(tracks) as TrackKey[]).map((key) => (
          <button key={key} type="button" className={selectedTrack === key ? styles.audioTrackTabActive : ""} onClick={() => setSelectedTrack(key)} aria-pressed={selectedTrack === key}>
            {tracks[key].label}
          </button>
        ))}
      </div>
      <div className={styles.audioSelectedTrack}>
        <span><small>{active.detail}</small><strong>{active.title}</strong></span>
        <span className={styles.audioTime}>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
      <div className={styles.audioTransport}>
        <button type="button" className={styles.audioPlayButton} onClick={() => void togglePlayback()} aria-label={`${isPlaying ? "Pause" : "Play"} ${active.title}`}>
          {isPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}
        </button>
        <canvas ref={canvasRef} className={styles.audioWaveform} aria-hidden="true" />
      </div>
      <audio
        ref={audioRef}
        src={active.src}
        preload="none"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => {
          setIsPlaying(true);
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawIdleWave();
          else if (visibleRef.current) animationRef.current = requestAnimationFrame(drawLiveWave);
        }}
        onPause={() => { setIsPlaying(false); stopDrawing(); drawIdleWave(); }}
        onEnded={() => { setIsPlaying(false); setCurrentTime(0); stopDrawing(); drawIdleWave(); }}
      />
    </div>
  );
}
