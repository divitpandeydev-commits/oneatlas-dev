"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ModelCard from "@/components/ModelCard";
import type { Model, ModelType, Provider } from "@/lib/data";

// Shape of GET /api/models — the Discover page fetches the catalogue
// from this API route instead of importing the seed data file directly,
// so the data is served by the server, not bundled into the client.
interface Catalogue {
  models: Model[];
  providers: Provider[];
  capabilities: string[];
  types: ModelType[];
}

type SortKey = "popularity" | "price-asc" | "price-desc" | "context-desc" | "newest";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popularity", label: "Most popular" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "context-desc", label: "Largest context window" },
  { value: "newest", label: "Newest first" },
];

function sortModels(models: Model[], sort: SortKey): Model[] {
  const copy = [...models];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.inputPrice + a.outputPrice - (b.inputPrice + b.outputPrice));
    case "price-desc":
      return copy.sort((a, b) => b.inputPrice + b.outputPrice - (a.inputPrice + a.outputPrice));
    case "context-desc":
      return copy.sort((a, b) => b.contextWindow - a.contextWindow);
    case "newest":
      return copy.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
    case "popularity":
    default:
      return copy.sort((a, b) => b.popularity - a.popularity);
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("All");
  const [type, setType] = useState<"All" | ModelType>("All");
  const [capability, setCapability] = useState("All");
  const [sort, setSort] = useState<SortKey>("popularity");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoadError(null);
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        const data: Catalogue = await res.json();
        if (!cancelled) setCatalogue(data);
      } catch {
        if (!cancelled)
          setLoadError("Could not load the model catalogue. Check your connection and try again.");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [reload]);

  const models = catalogue?.models ?? [];
  const providers = catalogue?.providers ?? [];
  const allCapabilities = catalogue?.capabilities ?? [];
  const allTypes = catalogue?.types ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = models.filter((m) => {
      if (provider !== "All" && m.provider !== provider) return false;
      if (type !== "All" && m.type !== type) return false;
      if (capability !== "All" && !m.capabilities.includes(capability)) return false;
      if (
        q &&
        !`${m.name} ${m.provider} ${m.description}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
    return sortModels(list, sort);
  }, [query, provider, type, capability, sort, models]);

  function toggleCompare(id: string) {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 3
          ? prev
          : [...prev, id],
    );
  }

  function resetFilters() {
    setQuery("");
    setProvider("All");
    setType("All");
    setCapability("All");
    setSort("popularity");
  }

  const selectClass =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none";

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Discover AI models
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Browse {catalogue ? catalogue.models.length : "…"} models from{" "}
          {catalogue ? catalogue.providers.length : "…"} providers.
          Search, filter by provider, type and capability, sort by price,
          context or release date — then compare up to 3 side by side.
        </p>
      </section>

      {/* Search + filters */}
      <section
        aria-label="Search and filter models"
        className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models, providers… e.g. Claude, coding"
            aria-label="Search models"
            className="w-full flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none"
          />
          <div className="flex flex-wrap gap-2">
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              aria-label="Filter by provider"
              className={selectClass}
            >
              <option value="All">All providers</option>
              {providers.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "All" | ModelType)}
              aria-label="Filter by model type"
              className={selectClass}
            >
              <option value="All">All types</option>
              {allTypes.map((t) => (
                <option key={t} value={t} className="capitalize">
                  {t}
                </option>
              ))}
            </select>
            <select
              value={capability}
              onChange={(e) => setCapability(e.target.value)}
              aria-label="Filter by capability"
              className={selectClass}
            >
              <option value="All">All capabilities</option>
              {allCapabilities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort models"
              className={selectClass}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-500" aria-live="polite">
          {`${filtered.length} of ${models.length} models shown`}
        </p>
      </section>

      {/* Results */}
      {loadError ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">Couldn&apos;t load the models</p>
          <p className="mt-1 text-sm text-slate-500">{loadError}</p>
          <button
            type="button"
            onClick={() => setReload((n) => n + 1)}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Try again
          </button>
        </div>
      ) : !catalogue ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">Loading models…</p>
          <p className="mt-1 text-sm text-slate-500">
            Fetching the catalogue from the API.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-semibold">No models match your filters</p>
          <p className="mt-1 text-sm text-slate-500">
            Try a different search term or clear the filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              compareSelected={compareIds.includes(model.id)}
              compareDisabled={!compareIds.includes(model.id) && compareIds.length >= 3}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      )}

      {/* Compare bar */}
      {compareIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm font-medium">
              {compareIds.length} model{compareIds.length > 1 ? "s" : ""} selected
              for comparison{" "}
              <span className="text-slate-500">(max 3)</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                Clear
              </button>
              <Link
                href={`/compare?ids=${compareIds.join(",")}`}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white ${
                  compareIds.length >= 2
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "cursor-not-allowed bg-slate-400"
                }`}
                aria-disabled={compareIds.length < 2}
                onClick={(e) => {
                  if (compareIds.length < 2) e.preventDefault();
                }}
              >
                Compare {compareIds.length >= 2 ? `(${compareIds.length})` : "— pick at least 2"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
