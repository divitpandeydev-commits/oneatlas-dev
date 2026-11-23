import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MODELS,
  averageScore,
  formatContext,
  formatDate,
  formatPrice,
  getModel,
  getProvider,
  modelsForProvider,
} from "@/lib/data";

interface DetailProps {
  // In Next.js 16, route params are a Promise in server components.
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MODELS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: DetailProps): Promise<Metadata> {
  const { id } = await params;
  const model = getModel(id);
  if (!model) return { title: "Model not found — OneAtlas.dev" };
  return {
    title: `${model.name} — OneAtlas.dev`,
    description: `${model.name} by ${model.provider}: ${model.description}`,
  };
}

function BenchmarkBar({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-bold">{value === null ? "—" : `${value.toFixed(1)} / 100`}</span>
      </div>
      <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-indigo-600"
          style={{ width: `${value ?? 0}%` }}
        />
      </div>
    </div>
  );
}

export default async function ModelDetail({ params }: DetailProps) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) notFound();

  const provider = getProvider(model.provider);
  const avg = averageScore(model);
  const siblings = modelsForProvider(model.provider).filter((m) => m.id !== model.id);
  const similar = MODELS.filter(
    (m) => m.id !== model.id && m.type === model.type,
  )
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <div>
      <Link href="/" className="text-sm font-medium text-indigo-600 hover:underline">
        ← Back to discovery
      </Link>

      <header className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {model.name}
          </h1>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-800">
            {model.type}
          </span>
        </div>
        <p className="mt-2 max-w-3xl text-slate-600">{model.description}</p>
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Specs + pricing */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold">Specs &amp; pricing</h2>
          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { label: "Provider", value: model.provider },
              { label: "Context window", value: `${formatContext(model.contextWindow)} tokens` },
              { label: "Input price / 1M", value: formatPrice(model.inputPrice) },
              { label: "Output price / 1M", value: formatPrice(model.outputPrice) },
              { label: "Release date", value: formatDate(model.releaseDate) },
              {
                label: "Avg. benchmark",
                value: avg === null ? "—" : `${avg.toFixed(1)} / 100`,
              },
            ].map((row) => (
              <div key={row.label} className="rounded-lg bg-slate-50 p-3">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm font-bold">{row.value}</dd>
              </div>
            ))}
          </dl>

          <h3 className="mt-8 text-lg font-bold">Capabilities</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {model.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {cap}
              </span>
            ))}
          </div>

          <h3 className="mt-8 text-lg font-bold">
            Benchmarks <span className="text-sm font-normal text-slate-500">(sample data)</span>
          </h3>
          <div className="mt-3 space-y-4">
            <BenchmarkBar label="MMLU — general knowledge" value={model.benchmarks.mmlu} />
            <BenchmarkBar label="HumanEval — coding" value={model.benchmarks.humaneval} />
            <BenchmarkBar label="GSM8K — maths" value={model.benchmarks.gsm8k} />
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Benchmark figures are illustrative sample data, not measured results.
          </p>
        </section>

        {/* Provider info */}
        <aside className="space-y-6">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Provider</h2>
            {provider ? (
              <>
                <p className="mt-2 text-xl font-bold">{provider.name}</p>
                <p className="mt-1 text-sm text-slate-600">{provider.description}</p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Headquarters</dt>
                    <dd className="font-medium">{provider.headquarters}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Founded</dt>
                    <dd className="font-medium">{provider.founded}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Website</dt>
                    <dd className="font-medium">{provider.website}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Models listed</dt>
                    <dd className="font-medium">{siblings.length + 1}</dd>
                  </div>
                </dl>
                <Link
                  href="/providers"
                  className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline"
                >
                  View all providers →
                </Link>
              </>
            ) : (
              <p className="mt-2 text-sm text-slate-500">No provider info available.</p>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold">Compare this model</h2>
            <p className="mt-1 text-sm text-slate-500">
              Pick two more models from discovery, or compare with a similar{" "}
              {model.type} model:
            </p>
            <div className="mt-3 space-y-2">
              {similar.map((s) => (
                <Link
                  key={s.id}
                  href={`/compare?ids=${model.id},${s.id}`}
                  className="block rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium hover:border-indigo-400 hover:text-indigo-600"
                >
                  {model.name} vs {s.name} →
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* More from this provider */}
      {siblings.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold">More from {model.provider}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s) => (
              <Link
                key={s.id}
                href={`/models/${s.id}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-indigo-400"
              >
                <p className="font-bold">{s.name}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {formatContext(s.contextWindow)} context ·{" "}
                  {formatPrice(s.inputPrice)} in / {formatPrice(s.outputPrice)} out
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
