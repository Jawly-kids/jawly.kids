"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import styles from "./heroes.module.css";

type SequenceSize = "720" | "1080";

export const bravoMaskSequence = {
  frameCount: 110,
  firstFrame: 0,
  lastFrame: 109,
  transitionEnd: 0.07,
  mobileBreakpoint: 700,
  dimensions: { "720": 720, "1080": 1080 },
  path: (size: SequenceSize, frame: number) =>
    `/heroes/bravo-mask/${size}/bravo-mask-${String(frame).padStart(3, "0")}.webp`,
} as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
}

export default function BravoMaskSequence({ progress }: { progress: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const frameRequestsRef = useRef<Array<Promise<void> | undefined>>([]);
  const loadFrameRef = useRef<((frame: number) => Promise<void>) | null>(null);
  const desiredFrameRef = useRef(0);
  const [size, setSize] = useState<SequenceSize | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const transitionProgress = clamp(progress / bravoMaskSequence.transitionEnd);
  const outgoingOpacity = 1 - smoothstep((transitionProgress - 0.12) / 0.76);
  const sequenceProgress = clamp(
    (progress - bravoMaskSequence.transitionEnd) / (1 - bravoMaskSequence.transitionEnd),
  );
  const desiredFrame = reducedMotion
    ? bravoMaskSequence.lastFrame
    : Math.round(sequenceProgress * bravoMaskSequence.lastFrame);
  desiredFrameRef.current = desiredFrame;

  const drawBestAvailableFrame = useCallback((requestedFrame: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !size) return;

    let image = framesRef.current[requestedFrame];
    if (!image) {
      for (let distance = 1; distance < bravoMaskSequence.frameCount; distance += 1) {
        image = framesRef.current[requestedFrame - distance] ?? framesRef.current[requestedFrame + distance];
        if (image) break;
      }
    }
    if (!image) return;

    const bounds = container.getBoundingClientRect();
    const sourceSize = bravoMaskSequence.dimensions[size];
    const renderScale = Math.min(window.devicePixelRatio || 1, sourceSize / Math.max(1, bounds.width));
    const width = Math.max(1, Math.round(bounds.width * renderScale));
    const height = Math.max(1, Math.round(bounds.height * renderScale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    context.clearRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
  }, [size]);

  useEffect(() => {
    const sizeQuery = window.matchMedia(`(max-width: ${bravoMaskSequence.mobileBreakpoint}px)`);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setSize(sizeQuery.matches ? "720" : "1080");
      setReducedMotion(motionQuery.matches);
    };
    updatePreferences();
    sizeQuery.addEventListener("change", updatePreferences);
    motionQuery.addEventListener("change", updatePreferences);
    return () => {
      sizeQuery.removeEventListener("change", updatePreferences);
      motionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  useEffect(() => {
    if (!size) return;
    let cancelled = false;
    let idleHandle = 0;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let nextFrame = 1;
    framesRef.current = Array(bravoMaskSequence.frameCount);
    frameRequestsRef.current = Array(bravoMaskSequence.frameCount);

    const loadFrame = (frame: number) => {
      if (frame < bravoMaskSequence.firstFrame || frame > bravoMaskSequence.lastFrame) {
        return Promise.resolve();
      }
      if (framesRef.current[frame]) return Promise.resolve();
      if (frameRequestsRef.current[frame]) return frameRequestsRef.current[frame];

      const request = new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) {
            framesRef.current[frame] = image;
            if (frame === desiredFrameRef.current || frame === bravoMaskSequence.firstFrame) {
              requestAnimationFrame(() => drawBestAvailableFrame(desiredFrameRef.current));
            }
          }
          resolve();
        };
        image.onerror = () => resolve();
        image.src = bravoMaskSequence.path(size, frame);
      });
      frameRequestsRef.current[frame] = request;
      return request;
    };
    loadFrameRef.current = loadFrame;

    const preloadBatch = () => {
      if (cancelled || reducedMotion || nextFrame > bravoMaskSequence.lastFrame) return;
      const batch = Array.from({ length: 4 }, () => nextFrame++)
        .filter((frame) => frame <= bravoMaskSequence.lastFrame);
      void Promise.all(batch.map(loadFrame)).finally(scheduleBatch);
    };
    const scheduleBatch = () => {
      if (cancelled || reducedMotion || nextFrame > bravoMaskSequence.lastFrame) return;
      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(preloadBatch, { timeout: 600 });
      } else {
        timeoutHandle = setTimeout(preloadBatch, 50);
      }
    };

    void loadFrame(bravoMaskSequence.firstFrame).then(() => {
      if (reducedMotion) {
        void loadFrame(bravoMaskSequence.lastFrame);
      } else {
        scheduleBatch();
      }
    });

    return () => {
      cancelled = true;
      loadFrameRef.current = null;
      if (idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [drawBestAvailableFrame, reducedMotion, size]);

  useEffect(() => {
    drawBestAvailableFrame(desiredFrame);
    const loader = loadFrameRef.current;
    if (!loader || reducedMotion) return;
    void loader(desiredFrame);
    void loader(desiredFrame - 1);
    void loader(desiredFrame + 1);
  }, [desiredFrame, drawBestAvailableFrame, reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => drawBestAvailableFrame(desiredFrameRef.current));
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawBestAvailableFrame]);

  const outgoingStyle = {
    opacity: outgoingOpacity,
    filter: `blur(${(1 - outgoingOpacity) * 2.5}px)`,
  } as CSSProperties;

  return (
    <div ref={containerRef} className={styles.maskSequence}>
      <picture>
        <source
          media={`(max-width: ${bravoMaskSequence.mobileBreakpoint}px)`}
          srcSet={bravoMaskSequence.path("720", bravoMaskSequence.firstFrame)}
        />
        <img
          className={styles.sequenceLayer}
          src={bravoMaskSequence.path("1080", bravoMaskSequence.firstFrame)}
          alt=""
          fetchPriority="high"
          decoding="sync"
        />
      </picture>
      <canvas ref={canvasRef} className={styles.sequenceLayer} aria-hidden="true" />
      <img
        className={`${styles.sequenceLayer} ${styles.sequenceOutgoing}`}
        src="/heroes/bravo-state-1.jpg"
        alt=""
        fetchPriority="high"
        decoding="sync"
        style={reducedMotion ? { opacity: 0 } : outgoingStyle}
      />
    </div>
  );
}
