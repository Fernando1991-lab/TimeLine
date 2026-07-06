"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { TimelineSnapshot } from "@/lib/timeline";
import { colorForTerritory } from "@/lib/territoryColor";
import {
  computeLabelCandidates,
  labelLimitForZoom,
  selectVisibleLabels,
  type ViewportBounds,
} from "@/lib/territoryLabels";

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

type LabelCandidates = ReturnType<typeof computeLabelCandidates>;

type SnapshotData = {
  geojson: GeoJSON.FeatureCollection;
  labelCandidates: LabelCandidates;
};

const snapshotCache = new Map<string, SnapshotData>();

async function loadSnapshot(file: string): Promise<SnapshotData> {
  const cached = snapshotCache.get(file);
  if (cached) return cached;
  const response = await fetch(`/data/historical-basemaps/${file}`);
  const geojson = (await response.json()) as GeoJSON.FeatureCollection;
  geojson.features.forEach((feature) => {
    const name = (feature.properties?.NAME ?? feature.properties?.SUBJECTO) as
      | string
      | null;
    feature.properties = {
      ...feature.properties,
      __color: colorForTerritory(name),
    };
  });
  const data: SnapshotData = { geojson, labelCandidates: computeLabelCandidates(geojson) };
  snapshotCache.set(file, data);
  return data;
}

function createLabelElement(name: string, color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.textContent = name;
  el.style.pointerEvents = "none";
  el.style.whiteSpace = "nowrap";
  el.style.fontSize = "12px";
  el.style.fontWeight = "600";
  el.style.color = "#1a1a1a";
  el.style.textShadow =
    "0 1px 2px rgba(255,255,255,0.9), 0 -1px 2px rgba(255,255,255,0.9), 1px 0 2px rgba(255,255,255,0.9), -1px 0 2px rgba(255,255,255,0.9)";
  el.style.borderBottom = `2px solid ${color}`;
  el.style.padding = "0 1px";
  return el;
}

function boundsWithPadding(map: MapLibreMap, paddingRatio: number): ViewportBounds {
  const bounds = map.getBounds();
  const west = bounds.getWest();
  const east = bounds.getEast();
  const south = bounds.getSouth();
  const north = bounds.getNorth();
  const padX = (east - west) * paddingRatio;
  const padY = (north - south) * paddingRatio;
  return { west: west - padX, east: east + padX, south: south - padY, north: north + padY };
}

export default function EmpireMap({ snapshot, onSelectTerritory }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const labelMarkersRef = useRef<maplibregl.Marker[]>([]);
  const labelCandidatesRef = useRef<LabelCandidates>([]);
  const refreshLabelsRef = useRef<() => void>(() => {});
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

    refreshLabelsRef.current = () => {
      labelMarkersRef.current.forEach((marker) => marker.remove());
      const limit = labelLimitForZoom(map.getZoom());
      const bounds = boundsWithPadding(map, 0.15);
      labelMarkersRef.current = selectVisibleLabels(labelCandidatesRef.current, {
        limit,
        bounds,
      }).map((label) =>
        new maplibregl.Marker({
          element: createLabelElement(label.name, label.color),
          anchor: "center",
        })
          .setLngLat([label.lng, label.lat])
          .addTo(map)
      );
    };

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

      map.on("moveend", () => refreshLabelsRef.current());

      setReady(true);
    });

    mapRef.current = map;
    return () => {
      labelMarkersRef.current.forEach((marker) => marker.remove());
      labelMarkersRef.current = [];
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

    loadSnapshot(snapshot.file).then(({ geojson, labelCandidates }) => {
      if (cancelled) return;
      const source = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined;
      source?.setData(geojson);
      labelCandidatesRef.current = labelCandidates;
      refreshLabelsRef.current();
    });

    return () => {
      cancelled = true;
    };
  }, [ready, snapshot]);

  return <div ref={containerRef} className="h-full w-full" />;
}
