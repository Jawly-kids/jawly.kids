"use client";

import MaskRemovalSequence, { type MaskSequenceConfig, type SequenceSize } from "@/components/marketing/MaskRemovalSequence";

export const bravoMaskSequence: MaskSequenceConfig = {
  frameCount: 110,
  firstFrame: 0,
  lastFrame: 109,
  sequenceEnd: 0.92,
  mobileBreakpoint: 700,
  dimensions: { "720": 720, "1080": 1080 },
  path: (size: SequenceSize, frame: number) =>
    `/heroes/bravo-mask/${size}/bravo-mask-${String(frame).padStart(3, "0")}.webp`,
};

export default function BravoMaskSequence({ progress }: { progress: number }) {
  return <MaskRemovalSequence progress={progress} config={bravoMaskSequence} />;
}
