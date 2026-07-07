"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { searchTerritories, type TerritoryIndexEntry, type TerritorySearchResult } from "@/lib/territorySearch";

type Props = {
  index: TerritoryIndexEntry[];
  onSelect: (result: TerritorySearchResult) => void;
};

export default function TerritorySearch({ index, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => searchTerritories(index, query), [index, query]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function choose(result: TerritorySearchResult) {
    onSelect(result);
    setQuery(result.displayName);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      choose(results[activeIndex]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="pointer-events-auto relative w-64">
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder="Buscar território ou império…"
        className="w-full rounded-lg border border-zinc-300 bg-white/95 px-3 py-2 text-sm text-zinc-900 shadow-sm backdrop-blur placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/95 dark:text-zinc-100"
      />
      {open && results.length > 0 && (
        <ul className="absolute left-0 right-0 top-full mt-1 max-h-72 overflow-y-auto rounded-lg border border-zinc-200 bg-white/95 py-1 shadow-lg backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/95">
          {results.map((result, i) => (
            <li key={`${result.name}-${result.year}`}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(result)}
                className={`block w-full px-3 py-1.5 text-left text-sm ${
                  i === activeIndex
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-700 dark:text-zinc-300"
                }`}
              >
                {result.displayName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
