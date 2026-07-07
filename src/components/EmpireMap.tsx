"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { type Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Geometry, Position } from "geojson";
import type { TimelineSnapshot } from "@/lib/timeline";
import { colorForTerritory } from "@/lib/territoryColor";
import {
  computeLabelCandidates,
  labelLimitForZoom,
  selectVisibleLabels,
  type TerritoryLabel,
  type ViewportBounds,
} from "@/lib/territoryLabels";
import { colonialFeatureCollection } from "@/lib/colonialClaims";

const SOURCE_ID = "territories";
const FILL_LAYER_ID = "territories-fill";
const LINE_LAYER_ID = "territories-line";

const COLONIAL_SOURCE = "colonial";
const COLONIAL_FILL_LAYER = "colonial-fill";
const COLONIAL_LINE_LAYER = "colonial-line";
const HATCH_IMAGE = "colonial-hatch";

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
      __hasName: Boolean(name),
    };
  });
  const data: SnapshotData = { geojson, labelCandidates: computeLabelCandidates(geojson) };
  snapshotCache.set(file, data);
  return data;
}

function createLabelElement(label: TerritoryLabel): HTMLDivElement {
  const el = document.createElement("div");
  el.textContent = label.name;
  el.style.pointerEvents = "none";
  el.style.whiteSpace = "nowrap";
  el.style.textShadow =
    "0 1px 2px rgba(255,255,255,0.9), 0 -1px 2px rgba(255,255,255,0.9), 1px 0 2px rgba(255,255,255,0.9), -1px 0 2px rgba(255,255,255,0.9)";
  el.style.padding = "0 1px";
  if (label.unmapped) {
    // "sem dados" reads as a quiet meta-note, not a place: smaller,
    // italic, gray, no colored underline.
    el.style.fontSize = "11px";
    el.style.fontStyle = "italic";
    el.style.fontWeight = "500";
    el.style.color = "#6b6b6b";
  } else {
    el.style.fontSize = "12px";
    el.style.fontWeight = "600";
    el.style.color = "#1a1a1a";
    el.style.borderBottom = `2px solid ${label.color}`;
  }
  return el;
}

// A colonial-claim label reads as a "claim" note: dashed underline in
// the power color, slightly lighter weight than a real territory.
function createColonialLabelElement(name: string, color: string): HTMLDivElement {
  const el = document.createElement("div");
  el.textContent = name;
  el.style.pointerEvents = "none";
  el.style.whiteSpace = "nowrap";
  el.style.fontSize = "11px";
  el.style.fontWeight = "600";
  el.style.color = "#1a1a1a";
  el.style.textShadow =
    "0 1px 2px rgba(255,255,255,0.95), 0 -1px 2px rgba(255,255,255,0.95), 1px 0 2px rgba(255,255,255,0.95), -1px 0 2px rgba(255,255,255,0.95)";
  el.style.borderBottom = `2px dashed ${color}`;
  el.style.padding = "0 1px";
  return el;
}

// Diagonal-line tile used as the colonial fill pattern, so the base
// territory colors show through between the hatch lines — the visual
// convention for "claimed/overlaid region" rather than solid control.
function makeHatchImage(): { width: number; height: number; data: Uint8Array } {
  const size = 8;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(30,30,30,0.55)";
  ctx.lineWidth = 1.1;
  // Two strokes so the diagonal tiles seamlessly.
  ctx.beginPath();
  ctx.moveTo(0, size);
  ctx.lineTo(size, 0);
  ctx.moveTo(-size, size);
  ctx.lineTo(size, -size);
  ctx.moveTo(0, 2 * size);
  ctx.lineTo(2 * size, 0);
  ctx.stroke();
  const img = ctx.getImageData(0, 0, size, size);
  return { width: size, height: size, data: new Uint8Array(img.data.buffer) };
}

// Mean of all vertices — robust and always in-range (turf's
// centerOfMass can return out-of-bounds garbage for some concave rings,
// which then crashes Marker.setLngLat).
function colonialLabelPosition(geometry: Geometry): [number, number] | null {
  const positions: Position[] = [];
  const collect = (coords: unknown): void => {
    if (!Array.isArray(coords)) return;
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      positions.push(coords as Position);
    } else {
      coords.forEach(collect);
    }
  };
  if ("coordinates" in geometry) collect(geometry.coordinates);
  if (positions.length === 0) return null;
  let sumLng = 0;
  let sumLat = 0;
  for (const [lng, lat] of positions) {
    sumLng += lng;
    sumLat += lat;
  }
  const lng = sumLng / positions.length;
  const lat = sumLat / positions.length;
  if (!isFinite(lng) || !isFinite(lat) || lat < -90 || lat > 90) return null;
  return [lng, lat];
}

function boundsFromMap(map: MapLibreMap): ViewportBounds {
  const bounds = map.getBounds();
  return {
    west: bounds.getWest(),
    east: bounds.getEast(),
    south: bounds.getSouth(),
    north: bounds.getNorth(),
  };
}

function padBounds(bounds: ViewportBounds, paddingRatio: number): ViewportBounds {
  const padX = (bounds.east - bounds.west) * paddingRatio;
  const padY = (bounds.north - bounds.south) * paddingRatio;
  return {
    west: bounds.west - padX,
    east: bounds.east + padX,
    south: bounds.south - padY,
    north: bounds.north + padY,
  };
}

export default function EmpireMap({ snapshot, onSelectTerritory }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const labelMarkersRef = useRef<maplibregl.Marker[]>([]);
  const colonialMarkersRef = useRef<maplibregl.Marker[]>([]);
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
      const clampBounds = boundsFromMap(map);
      const bounds = padBounds(clampBounds, 0.15);
      const selected = selectVisibleLabels(labelCandidatesRef.current, {
        limit,
        bounds,
        clampBounds,
      });
      labelMarkersRef.current = selected.map((label) =>
        new maplibregl.Marker({
          element: createLabelElement(label),
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
          "fill-color": ["coalesce", ["get", "__color"], "#8a8a7d"],
          // Land with no state/people assigned in the dataset for this
          // period reads as muted, neutral-toned "no data" — dim enough
          // to recede next to real territories, but still clearly land,
          // not blended into the ocean color (that read as "is this sea
          // or land nobody owns?").
          "fill-opacity": ["case", ["get", "__hasName"], 0.65, 0.45],
        },
      });
      map.addLayer({
        id: LINE_LAYER_ID,
        type: "line",
        source: SOURCE_ID,
        paint: {
          "line-color": "#2b2b2b",
          "line-width": 0.6,
          "line-opacity": ["case", ["get", "__hasName"], 0.5, 0.3],
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

      // Curated colonial-claim overlay, drawn above the base territories.
      if (!map.hasImage(HATCH_IMAGE)) {
        map.addImage(HATCH_IMAGE, makeHatchImage(), { pixelRatio: 2 });
      }
      map.addSource(COLONIAL_SOURCE, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });
      map.addLayer({
        id: COLONIAL_FILL_LAYER,
        type: "fill",
        source: COLONIAL_SOURCE,
        paint: { "fill-pattern": HATCH_IMAGE, "fill-opacity": 0.85 },
      });
      map.addLayer({
        id: COLONIAL_LINE_LAYER,
        type: "line",
        source: COLONIAL_SOURCE,
        paint: {
          "line-color": ["coalesce", ["get", "__color"], "#333"],
          "line-width": 1.8,
          "line-dasharray": [3, 2],
        },
      });
      map.on("click", COLONIAL_FILL_LAYER, (event) => {
        const feature = event.features?.[0];
        onSelectTerritory((feature?.properties?.name as string | undefined) ?? null);
      });
      map.on("mouseenter", COLONIAL_FILL_LAYER, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", COLONIAL_FILL_LAYER, () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("moveend", () => refreshLabelsRef.current());

      setReady(true);
    });

    mapRef.current = map;
    return () => {
      labelMarkersRef.current.forEach((marker) => marker.remove());
      labelMarkersRef.current = [];
      colonialMarkersRef.current.forEach((marker) => marker.remove());
      colonialMarkersRef.current = [];
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

    // Curated colonial-claim overlay for this snapshot's year (few
    // features, always labeled — not subject to the zoom label budget).
    const colonial = colonialFeatureCollection(snapshot.year);
    const colonialSource = map.getSource(COLONIAL_SOURCE) as maplibregl.GeoJSONSource | undefined;
    colonialSource?.setData(colonial);
    colonialMarkersRef.current.forEach((marker) => marker.remove());
    colonialMarkersRef.current = colonial.features
      .map((feature) => {
        const pos = feature.geometry ? colonialLabelPosition(feature.geometry) : null;
        if (!pos) return null;
        const name = (feature.properties?.name as string) ?? "";
        const color = (feature.properties?.__color as string) ?? "#333";
        return new maplibregl.Marker({
          element: createColonialLabelElement(name, color),
          anchor: "center",
        })
          .setLngLat(pos)
          .addTo(map);
      })
      .filter((m): m is maplibregl.Marker => m !== null);

    return () => {
      cancelled = true;
    };
  }, [ready, snapshot]);

  return <div ref={containerRef} className="h-full w-full" />;
}
