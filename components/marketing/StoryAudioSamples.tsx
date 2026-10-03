"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import styles from "@/app/heroes/heroes.module.css";

type Track = {
  key: "voice" | "song";
  label: string;
  detail: string;
  src: string;
};

export default function StoryAudioSamples({ character, narrationSrc, songSrc, songTitle }: {
  character: string;
  narrationSrc: string;
  songSrc: string;
  songTitle: string;
}) {
  const tracks: Track[] = [
    { key: "voice", label: `Hear ${character} talk`, detail: "Character voice", src: narrationSrc },
    { key: "song", label: "Play the theme song", detail: songTitle, src: songSrc },
  ];
  const audioRefs = useRef<Record<Track["key"], HTMLAudioElement | null>>({ voice: null, song: null });
  const [activeTrack, setActiveTrack] = useState<Track["key"] | null>(null);
  const [progress, setProgress] = useState<Record<Track["key"], number>>({ voice: 0, song: 0 });

  const toggleTrack = async (key: Track["key"]) => {
    const selected = audioRefs.current[key];
    if (!selected) return;
    for (const [otherKey, audio] of Object.entries(audioRefs.current)) {
      if (otherKey !== key) audio?.pause();
    }
    if (!selected.paused) {
      selected.pause();
      setActiveTrack(null);
      return;
    }
    try {
      await selected.play();
      setActiveTrack(key);
    } catch {
      setActiveTrack(null);
    }
  };

  return (
    <div className={styles.storyAudio} aria-label={`${character} audio samples`}>
      <img className={styles.soundMark} src="/heroes/sound-music-reference.png" alt="" />
      <div className={styles.audioTrackList}>
        {tracks.map((track) => {
          const isPlaying = activeTrack === track.key;
          return (
            <div className={styles.audioTrack} key={track.key}>
              <button type="button" className={styles.audioTrackButton} onClick={() => void toggleTrack(track.key)} aria-label={`${isPlaying ? "Pause" : "Play"} ${track.label}`}>
                <span className={styles.audioPlayIcon} aria-hidden="true">
                  {isPlaying ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
                </span>
                <span className={styles.audioTrackLabel}>
                  <strong>{track.label}</strong>
                  <small>{track.detail}</small>
                </span>
                <span className={styles.audioProgress} aria-hidden="true"><i style={{ width: `${progress[track.key] * 100}%` }} /></span>
              </button>
              <audio
                ref={(element) => { audioRefs.current[track.key] = element; }}
                src={track.src}
                preload="none"
                onPause={() => setActiveTrack((current) => current === track.key ? null : current)}
                onPlay={() => setActiveTrack(track.key)}
                onEnded={() => { setActiveTrack(null); setProgress((current) => ({ ...current, [track.key]: 0 })); }}
                onTimeUpdate={(event) => {
                  const audio = event.currentTarget;
                  setProgress((current) => ({ ...current, [track.key]: audio.duration ? audio.currentTime / audio.duration : 0 }));
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
