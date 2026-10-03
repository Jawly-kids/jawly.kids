"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/app/heroes/heroes.module.css";

type TrackKey = "voice" | "song";
type Track = { label: string; title: string; src: string };

export default function StoryAudioSamples({ character, narrationSrc, songSrc, songTitle }: {
  character: string;
  narrationSrc: string;
  songSrc: string;
  songTitle: string;
}) {
  const tracks: Record<TrackKey, Track> = {
    voice: { label: "Character voice", title: `Hear ${character} talk`, src: narrationSrc },
    song: { label: "Original music", title: songTitle, src: songSrc },
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRefs = useRef<Record<TrackKey, HTMLCanvasElement | null>>({ voice: null, song: null });
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef(0);
  const lastDrawRef = useRef(0);
  const visibleRef = useRef(true);
  const activeTrackRef = useRef<TrackKey>("voice");
  const [activeTrack, setActiveTrack] = useState<TrackKey>("voice");
  const [isPlaying, setIsPlaying] = useState(false);

  const drawIdleWave = useCallback((key: TrackKey) => {
    const canvas = canvasRefs.current[key];
    if (!canvas) return;
    const bounds = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) return;
    const { width, height } = canvas;
    context.clearRect(0, 0, width, height);
    context.beginPath();
    for (let x = 0; x <= width; x += 2) {
      const envelope = Math.sin((x / width) * Math.PI);
      const y = height / 2 + Math.sin(x * (key === "voice" ? 0.052 : 0.07)) * height * (key === "voice" ? 0.1 : 0.15) * envelope;
      if (x === 0) context.moveTo(x, y); else context.lineTo(x, y);
    }
    context.lineWidth = Math.max(2, ratio * 1.2);
    context.strokeStyle = getComputedStyle(canvas).color;
    context.globalAlpha = 0.28;
    context.stroke();
    context.globalAlpha = 1;
  }, []);

  const drawBothIdleWaves = useCallback(() => {
    drawIdleWave("voice");
    drawIdleWave("song");
  }, [drawIdleWave]);

  const stopDrawing = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = 0;
  }, []);

  const drawLiveWave = useCallback((timestamp = 0) => {
    if (!visibleRef.current) return;
    const analyser = analyserRef.current;
    const canvas = canvasRefs.current[activeTrackRef.current];
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
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
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

  const toggleTrack = async (key: TrackKey) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (key === activeTrackRef.current && !audio.paused) {
      audio.pause();
      return;
    }
    if (key !== activeTrackRef.current) {
      audio.pause();
      activeTrackRef.current = key;
      setActiveTrack(key);
      audio.src = tracks[key].src;
      audio.load();
      drawBothIdleWaves();
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
    if (audio) audio.src = tracks.voice.src;
    drawBothIdleWaves();
  }, [drawBothIdleWaves, narrationSrc]);

  useEffect(() => {
    const redraw = () => { if (!isPlaying) drawBothIdleWaves(); };
    window.addEventListener("resize", redraw);
    return () => window.removeEventListener("resize", redraw);
  }, [drawBothIdleWaves, isPlaying]);

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
      <div className={styles.audioStack}>
        {(Object.keys(tracks) as TrackKey[]).map((key) => {
          const track = tracks[key];
          const playing = activeTrack === key && isPlaying;
          return (
            <div className={styles.audioRow} key={key}>
              <button type="button" className={styles.audioPlayButton} onClick={() => void toggleTrack(key)} aria-label={`${playing ? "Pause" : "Play"} ${track.title}`}>
                {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
              </button>
              <span className={styles.audioRowLabel}><small>{track.label}</small><strong>{track.title}</strong></span>
              <canvas ref={(element) => { canvasRefs.current[key] = element; }} className={styles.audioWaveform} aria-hidden="true" />
            </div>
          );
        })}
      </div>
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => {
          setIsPlaying(true);
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawBothIdleWaves();
          else if (visibleRef.current) animationRef.current = requestAnimationFrame(drawLiveWave);
        }}
        onPause={() => { setIsPlaying(false); stopDrawing(); drawBothIdleWaves(); }}
        onEnded={() => { setIsPlaying(false); stopDrawing(); drawBothIdleWaves(); }}
      />
    </div>
  );
}
