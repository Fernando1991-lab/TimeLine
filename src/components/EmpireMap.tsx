"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TimelineSnapshot } from "@/lib/timeline";
import { colorForTerritory } from "@/lib/territoryColor";

const SOURCE_ID = "territories";
const FILL_LAYER_ID = "territories-fill";
const LINE_LAYER_ID = "territories-line";

// Plain ocean-colored background instead of a hosted basemap style: the
// territory polygons are the whole point of this map, and this keeps the
// app from depending on a third-party tile service's uptime/rate limits.
const BASE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "#a8d2e6" },
    },
  ],
};

type Props = {
  snapshot: TimelineSnapshot;
  onSelectTerritory: (name: string | null) => void;
};

const geojsonCache = new Map<string, GeoJSON.FeatureCollection>();

async function loadSnapshot(file: string): Promise<GeoJSON.FeatureCollection> {
  const cached = geojsonCache.get(file);
  if (cached) return cached;
  const response = await fetch(`/data/historical-basemaps/${file}`);
  const data = (await response.json()) as GeoJSON.FeatureCollection;
  data.features.forEach((feature) => {
    const name = (feature.properties?.NAME ?? feature.properties?.SUBJECTO) as
      | string
      | null;
    feature.properties = {
      ...feature.properties,
      __color: colorForTerritory(name),
    };
  });
  geojsonCache.set(file, data);
  return data;
}

export default function EmpireMap({ snapshot, onSelectTerritory }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASE_STYLE,
      center: [15, 30],
      zoom: 1.6,
      minZoom: 0.8,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource(SOURCE_ID, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: FILL_LAYER_ID,
        type: "fill",
        source: SOURCE_ID,
        paint: {
          "fill-color": ["coalesce", ["get", "__color"], "#c9c9c9"],
          "fill-opacity": 0.65,
        },
      });
      map.addLayer({
        id: LINE_LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": "#2b2b2b",
          "line-width": 0.6,
          "line-opacity": 0.5,
        },
      });

      map.on("click", FILL_LAYER_ID, (event) => {
        const feature = event.features?.[0];
        const name =
          (feature?.properties?.NAME as string | undefined) ||
          (feature?.properties?.SUBJECTO as string | undefined) ||
          null;
        onSelectTerritory(name);
      });
      map.on("mouseenter", FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", FILL_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });

      setReady(true);
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
      setReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready) return;
    const map = mapRef.current;
    if (!map) return;
    let cancelled = false;

    loadSnapshot(snapshot.file).then((data) => {
      if (cancelled) return;
      const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      source?.setData(data);
    });

    return () => {
      cancelled = true;
    };
  }, [ready, snapshot]);

  return <div ref={containerRef} className="h-full w-full" />;
}
