"use client";

import MaskRemovalSequence, { type MaskSequenceConfig, type SequenceSize } from "@/components/marketing/MaskRemovalSequence";

export const orlaMaskSequence: MaskSequenceConfig = {
  frameCount: 118,
  firstFrame: 0,
  lastFrame: 117,
  sequenceEnd: 0.92,
  mobileBreakpoint: 700,
  dimensions: { "720": 720, "1080": 1080 },
  path: (size: SequenceSize, frame: number) =>
    `/cosmos/orla-mask/${size}/orla-mask-${String(frame).padStart(3, "0")}.webp`,
};

export default function OrlaMaskSequence({ progress }: { progress: number }) {
  return <MaskRemovalSequence progress={progress} config={orlaMaskSequence} />;
}
