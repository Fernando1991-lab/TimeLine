"use client";

import { useEffect, useRef } from "react";
import type { TimelineSnapshot } from "@/lib/timeline";

type Props = {
  snapshots: TimelineSnapshot[];
  index: number;
  onChange: (index: number) => void;
  playing: boolean;
  onTogglePlay: () => void;
};

export default function TimelineSlider({
  snapshots,
  index,
  onChange,
  playing,
  onTogglePlay,
}: Props) {
  const indexRef = useRef(index);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      const next = indexRef.current + 1;
      if (next >= snapshots.length) {
        onChange(0);
      } else {
        onChange(next);
      }
    }, 900);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, snapshots.length]);

  const current = snapshots[index];

  return (
    <div className="flex w-full flex-col gap-2 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur dark:bg-zinc-900/90">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onTogglePlay}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
          aria-label={playing ? "Pausar" : "Reproduzir"}
        >
          {playing ? "❚❚" : "▶"}
        </button>
        <span className="text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
          {current?.label}
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={snapshots.length - 1}
        step={1}
        value={index}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-zinc-900 dark:accent-zinc-100"
      />
      <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>{snapshots[0]?.label}</span>
        <span>{snapshots[snapshots.length - 1]?.label}</span>
      </div>
    </div>
  );
}
