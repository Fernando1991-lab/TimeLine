"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { TimelineSnapshot } from "@/lib/timeline";
import TimelineSlider from "@/components/TimelineSlider";

const EmpireMap = dynamic(() => import("@/components/EmpireMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-zinc-400">
      Carregando mapa…
    </div>
  ),
});

type EmpireDetails = {
  name: string;
  description: string | null;
  startYear: number | null;
  endYear: number | null;
};

export default function TimelineExplorer() {
  const [snapshots, setSnapshots] = useState<TimelineSnapshot[] | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState<EmpireDetails | null>(null);

  useEffect(() => {
    fetch("/data/historical-basemaps/manifest.json")
      .then((response) => response.json())
      .then((data: TimelineSnapshot[]) => {
        setSnapshots(data);
        // Start around a well-known peak (Alexander's empire) when available.
        const start = data.findIndex((snapshot) => snapshot.year === -323);
        setIndex(start >= 0 ? start : Math.floor(data.length / 2));
      });
  }, []);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    fetch(`/api/empires?name=${encodeURIComponent(selected)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled) setDetails(data);
      })
      .catch(() => {
        if (!cancelled) setDetails(null);
      });
    return () => {
      cancelled = true;
    };
  }, [selected]);

  // Only trust `details` while it matches the currently selected
  // territory — avoids a separate effect-based reset when `selected`
  // changes (and the flicker of clearing then refetching).
  const activeDetails = details?.name === selected ? details : null;

  if (!snapshots) {
    return (
      <div className="flex h-full w-full items-center justify-center text-zinc-400">
        Carregando linha do tempo…
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <EmpireMap snapshot={snapshots[index]} onSelectTerritory={setSelected} />

      {selected && (
        <div className="absolute right-4 top-4 w-72 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur dark:bg-zinc-900/95">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {selected}
            </h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
            {activeDetails?.description ??
              "Ainda não há um resumo curado para este território. Adicione um em prisma/seed.ts."}
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-4">
        <div className="pointer-events-auto w-full max-w-2xl">
          <TimelineSlider
            snapshots={snapshots}
            index={index}
            onChange={setIndex}
            playing={playing}
            onTogglePlay={() => setPlaying((value) => !value)}
          />
        </div>
      </div>
    </div>
  );
}
