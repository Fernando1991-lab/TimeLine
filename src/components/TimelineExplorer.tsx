"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { TimelineSnapshot } from "@/lib/timeline";
import { nearestSnapshotIndex } from "@/lib/timeline";
import TimelineSlider from "@/components/TimelineSlider";
import TerritorySearch from "@/components/TerritorySearch";
import { translateTerritoryName } from "@/lib/curatedTerritories";
import { summaryFor } from "@/lib/territorySummaries";
import { colonialSummary } from "@/lib/colonialClaims";
import { knownGapNote } from "@/lib/knownGapPeoples";
import { deepDiveForTerritory } from "@/lib/empireDeepDives";
import type { TerritoryIndexEntry, TerritorySearchResult } from "@/lib/territorySearch";
import type { FlyToRequest } from "@/components/EmpireMap";

const EmpireMap = dynamic(() => import("@/components/EmpireMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-zinc-400">
      Carregando mapa…
    </div>
  ),
});

export default function TimelineExplorer() {
  const [snapshots, setSnapshots] = useState<TimelineSnapshot[] | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [territoryIndex, setTerritoryIndex] = useState<TerritoryIndexEntry[]>([]);
  const [flyTo, setFlyTo] = useState<FlyToRequest | null>(null);

  useEffect(() => {
    fetch("/data/historical-basemaps/manifest.json")
      .then((response) => response.json())
      .then((data: TimelineSnapshot[]) => {
        setSnapshots(data);
        // Start around a well-known peak (Alexander's empire) when available.
        const start = data.findIndex((snapshot) => snapshot.year === -323);
        setIndex(start >= 0 ? start : Math.floor(data.length / 2));
      });
    fetch("/data/historical-basemaps/territory-index.json")
      .then((response) => response.json())
      .then((data: TerritoryIndexEntry[]) => setTerritoryIndex(data));
  }, []);

  function handleSearchSelect(result: TerritorySearchResult) {
    if (snapshots) {
      setIndex(nearestSnapshotIndex(snapshots, result.year));
    }
    setSelected(result.name);
    setFlyTo((prev) => ({ lng: result.lng, lat: result.lat, zoom: 4, nonce: (prev?.nonce ?? 0) + 1 }));
  }

  const currentYear = snapshots?.[index]?.year;
  // Colonial-overlay claims and "known gap" markers each have their own
  // curated summary; otherwise fall back to the era-aware territory
  // summary. All three are static (no network call, works offline).
  const gapText = selected != null ? knownGapNote(selected) : null;
  const panelText =
    (selected != null ? colonialSummary(selected) : null) ??
    (selected != null && currentYear != null ? summaryFor(selected, currentYear) : null) ??
    gapText ??
    "Ainda não há um resumo para este território neste período.";
  const deepDive = selected != null ? deepDiveForTerritory(selected, currentYear) : null;

  if (!snapshots) {
    return (
      <div className="flex h-full w-full items-center justify-center text-zinc-400">
        Carregando linha do tempo…
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <EmpireMap snapshot={snapshots[index]} onSelectTerritory={setSelected} flyTo={flyTo} />

      <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-2">
        <div className="pointer-events-auto">
          <TerritorySearch index={territoryIndex} onSelect={handleSearchSelect} />
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-16 max-w-[16rem] space-y-1 rounded-lg bg-white/85 px-3 py-2 text-xs leading-snug text-zinc-600 shadow-sm backdrop-blur dark:bg-zinc-900/85 dark:text-zinc-300">
        <p>
          <span className="mr-1 inline-block h-2.5 w-2.5 translate-y-px rounded-sm bg-[#8a8a7d]/45 align-middle" />
          Áreas acinzentadas (<em>sem dados</em>): a fonte histórica não registra
          um povo ou estado definido ali naquele período.
        </p>
        <p>
          <span className="mr-1 inline-block h-2 w-3.5 translate-y-px border-b-2 border-dashed border-zinc-500 align-middle" />
          Contornos tracejados: reivindicações coloniais europeias
          (curadas por nós, aproximadas e esquemáticas).
        </p>
        <p>
          <span className="mr-1 inline-block h-2 w-3.5 translate-y-px border-b-2 border-dotted border-violet-600 align-middle" />
          Marcadores roxos com <em>?</em>: povos/estados que sabemos existir
          numa área &quot;sem dados&quot;, mas sem fronteiras no nosso dataset principal.
        </p>
        <p>
          <span className="mr-1 inline-block h-2.5 w-2.5 translate-y-px rounded-sm border border-dotted border-violet-600 bg-violet-600/10 align-middle" />
          Contorno pontilhado roxo: mesma coisa, mas para Estados/reinos
          organizados cuja extensão aproximada já é bem documentada.
        </p>
      </div>

      {selected && (
        <div className="absolute right-4 top-4 w-72 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur dark:bg-zinc-900/95">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {translateTerritoryName(selected)}
              </h2>
              {snapshots[index] && (
                <p className="text-xs text-zinc-400 dark:text-zinc-500">
                  {snapshots[index].label}
                </p>
              )}
              {panelText === gapText && gapText != null && (
                <p className="mt-1 text-[11px] italic text-violet-600 dark:text-violet-400">
                  Não faz parte do nosso dataset principal — nota curada por nós a
                  partir de conhecimento histórico geral.
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
          <p className="mt-2 max-h-64 overflow-y-auto text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {panelText}
          </p>
          {deepDive && (
            <Link
              href={`/imperio/${deepDive.slug}`}
              className="mt-3 inline-flex items-center gap-1 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              📖 Linha do tempo detalhada e quiz
            </Link>
          )}
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
