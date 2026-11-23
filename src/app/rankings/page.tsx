import type { Metadata } from "next";
import Link from "next/link";
import {
  MODELS,
  averageScore,
  formatContext,
  formatPrice,
  valueScore,
  type Model,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Rankings — OneAtlas.dev",
  description:
    "Leaderboards of AI models by popularity, performance and cost-effectiveness.",
};

function Leaderboard({
  title,
  description,
  models,
  score,
}: {
  title: string;
  description: string;
  models: Model[];
  score: (m: Model) => string;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      <ol className="mt-4 space-y-3">
        {models.map((m, i) => (
          <li key={m.id} className="flex items-center gap-3">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                i === 0
                  ? "bg-amber-400 text-amber-950"
                  : i === 1
                    ? "bg-slate-300 text-slate-800"
                    : i === 2
                      ? "bg-orange-300 text-orange-950"
                      : "bg-slate-100 text-slate-600"
              }`}
            >
              {i + 1}
            </span>
            <Link
              href={`/models/${m.id}`}
              className="min-w-0 flex-1 truncate font-semibold hover:text-indigo-600 hover:underline"
            >
              {m.name}
              <span className="ml-2 font-normal text-slate-500">{m.provider}</span>
            </Link>
            <span className="shrink-0 text-sm font-bold">{score(m)}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Rankings() {
  const byPopularity = [...MODELS].sort((a, b) => b.popularity - a.popularity).slice(0, 10);

  const byPerformance = MODELS.map((m) => ({ m, avg: averageScore(m) }))
    .filter((x): x is { m: Model; avg: number } => x.avg !== null)
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 10)
    .map((x) => x.m);

  const byValue = MODELS.map((m) => ({ m, v: valueScore(m) }))
    .filter((x): x is { m: Model; v: number } => x.v !== null)
    .sort((a, b) => b.v - a.v)
    .slice(0, 10)
    .map((x) => x.m);

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Rankings</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Leaderboards computed from the sample catalogue. Scores are
        illustrative — they come from the sample data, not from real
        benchmarks.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Leaderboard
          title="🏆 Most popular"
          description="Ranked by the popularity score in the sample data."
          models={byPopularity}
          score={(m) => `${m.popularity} / 100`}
        />
        <Leaderboard
          title="⚡ Best performance"
          description="Ranked by average benchmark score (MMLU, HumanEval, GSM8K)."
          models={byPerformance}
          score={(m) => `${averageScore(m)!.toFixed(1)} / 100`}
        />
        <Leaderboard
          title="💰 Best value"
          description="Ranked by benchmark score per dollar of combined input + output price."
          models={byValue}
          score={(m) => `${formatPrice(m.inputPrice)} in · ${formatContext(m.contextWindow)}`}
        />
      </div>
    </div>
  );
}
