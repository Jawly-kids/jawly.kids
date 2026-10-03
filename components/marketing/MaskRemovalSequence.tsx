"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "@/app/heroes/heroes.module.css";

export type SequenceSize = "720" | "1080";

export type MaskSequenceConfig = {
  frameCount: number;
  firstFrame: number;
  lastFrame: number;
  sequenceEnd: number;
  mobileBreakpoint: number;
  dimensions: Record<SequenceSize, number>;
  path: (size: SequenceSize, frame: number) => string;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

export default function MaskRemovalSequence({ progress, config }: { progress: number; config: MaskSequenceConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<Array<HTMLImageElement | undefined>>([]);
  const frameRequestsRef = useRef<Array<Promise<void> | undefined>>([]);
  const loadFrameRef = useRef<((frame: number) => Promise<void>) | null>(null);
  const desiredFrameRef = useRef(config.firstFrame);
  const [size, setSize] = useState<SequenceSize | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasEnteredPreloadRange, setHasEnteredPreloadRange] = useState(false);

  const sequenceProgress = clamp(progress / config.sequenceEnd);
  const desiredFrame = reducedMotion
    ? config.lastFrame
    : Math.round(config.firstFrame + sequenceProgress * (config.lastFrame - config.firstFrame));
  desiredFrameRef.current = desiredFrame;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || hasEnteredPreloadRange) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setHasEnteredPreloadRange(true);
        observer.disconnect();
      }
    }, { rootMargin: "100% 0px" });
    observer.observe(container);
    return () => observer.disconnect();
  }, [hasEnteredPreloadRange]);

  const drawBestAvailableFrame = useCallback((requestedFrame: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !size) return;

    let image = framesRef.current[requestedFrame];
    if (!image) {
      for (let distance = 1; distance < config.frameCount; distance += 1) {
        image = framesRef.current[requestedFrame - distance] ?? framesRef.current[requestedFrame + distance];
        if (image) break;
      }
    }
    if (!image) return;

    const bounds = container.getBoundingClientRect();
    const sourceSize = config.dimensions[size];
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
  }, [config, size]);

  useEffect(() => {
    const sizeQuery = window.matchMedia(`(max-width: ${config.mobileBreakpoint}px)`);
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
  }, [config.mobileBreakpoint]);

  useEffect(() => {
    if (!size) return;
    let cancelled = false;
    let idleHandle = 0;
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined;
    let nextFrame = config.firstFrame + 1;
    framesRef.current = Array(config.frameCount);
    frameRequestsRef.current = Array(config.frameCount);

    const loadFrame = (frame: number) => {
      if (frame < config.firstFrame || frame > config.lastFrame) return Promise.resolve();
      if (framesRef.current[frame]) return Promise.resolve();
      if (frameRequestsRef.current[frame]) return frameRequestsRef.current[frame];

      const request = new Promise<void>((resolve) => {
        const image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) {
            framesRef.current[frame] = image;
            if (frame === desiredFrameRef.current || frame === config.firstFrame) {
              requestAnimationFrame(() => drawBestAvailableFrame(desiredFrameRef.current));
            }
          }
          resolve();
        };
        image.onerror = () => resolve();
        image.src = config.path(size, frame);
      });
      frameRequestsRef.current[frame] = request;
      return request;
    };
    loadFrameRef.current = loadFrame;

    const preloadBatch = () => {
      if (cancelled || reducedMotion || !hasEnteredPreloadRange || nextFrame > config.lastFrame) return;
      const batch = Array.from({ length: 4 }, () => nextFrame++).filter((frame) => frame <= config.lastFrame);
      void Promise.all(batch.map(loadFrame)).finally(scheduleBatch);
    };
    const scheduleBatch = () => {
      if (cancelled || reducedMotion || !hasEnteredPreloadRange || nextFrame > config.lastFrame) return;
      if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(preloadBatch, { timeout: 600 });
      else timeoutHandle = setTimeout(preloadBatch, 50);
    };

    void loadFrame(config.firstFrame).then(() => {
      if (reducedMotion) void loadFrame(config.lastFrame);
      else if (hasEnteredPreloadRange) scheduleBatch();
    });

    return () => {
      cancelled = true;
      loadFrameRef.current = null;
      if (idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle);
      if (timeoutHandle) clearTimeout(timeoutHandle);
    };
  }, [config, drawBestAvailableFrame, hasEnteredPreloadRange, reducedMotion, size]);

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

  return (
    <div ref={containerRef} className={styles.maskSequence}>
      <picture>
        <source media={`(max-width: ${config.mobileBreakpoint}px)`} srcSet={config.path("720", config.firstFrame)} />
        <img className={styles.sequenceLayer} src={config.path("1080", config.firstFrame)} alt="" fetchPriority="high" decoding="sync" />
      </picture>
      <canvas ref={canvasRef} className={styles.sequenceLayer} aria-hidden="true" />
    </div>
  );
}
