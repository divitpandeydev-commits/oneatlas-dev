import type { Metadata } from "next";
import Link from "next/link";
import {
  averageScore,
  formatContext,
  formatDate,
  formatPrice,
  getModel,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Compare Models — OneAtlas.dev",
  description:
    "Compare 2–3 AI models side by side: specs, pricing, capabilities and benchmarks.",
};

interface CompareProps {
  // In Next.js 16, searchParams are a Promise in server components.
  searchParams: Promise<{ ids?: string | string[] }>;
}

/**
 * Compare view (server component). Reads `?ids=a,b` (2–3 model ids) from
 * the URL and renders the side-by-side table on the server, so the
 * comparison is visible without JavaScript and is shareable as a link.
 */
export default async function Compare({ searchParams }: CompareProps) {
  const params = await searchParams;
  const raw = Array.isArray(params.ids) ? params.ids.join(",") : (params.ids ?? "");
  const ids = Array.from(new Set(raw.split(",").map((s) => s.trim()).filter(Boolean)));
  const models = ids
    .map(getModel)
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (ids.length === 0) {
    return (
      <EmptyState
        title="Nothing to compare yet"
        body="Go to Discover, pick 2–3 models with the Compare button, then come back here."
      />
    );
  }

  if (ids.length === 1) {
    return (
      <EmptyState
        title="Pick at least 2 models to compare"
        body={`You have selected ${models[0]?.name ?? ids[0]}. Add at least one more model from Discover.`}
      />
    );
  }

  if (models.length < ids.length) {
    return (
      <EmptyState
        title="One of the selected models could not be found"
        body="Check the link — one of the model ids in the URL does not exist in the catalogue."
      />
    );
  }

  const rows: { label: string; render: (id: string) => React.ReactNode }[] = [
    { label: "Provider", render: (id) => getModel(id)!.provider },
    {
      label: "Type",
      render: (id) => <span className="capitalize">{getModel(id)!.type}</span>,
    },
    {
      label: "Context window",
      render: (id) => `${formatContext(getModel(id)!.contextWindow)} tokens`,
    },
    { label: "Input price / 1M", render: (id) => formatPrice(getModel(id)!.inputPrice) },
    { label: "Output price / 1M", render: (id) => formatPrice(getModel(id)!.outputPrice) },
    { label: "Release date", render: (id) => formatDate(getModel(id)!.releaseDate) },
    {
      label: "Popularity",
      render: (id) => `${getModel(id)!.popularity} / 100`,
    },
    {
      label: "Avg. benchmark",
      render: (id) => {
        const avg = averageScore(getModel(id)!);
        return avg === null ? "—" : `${avg.toFixed(1)} / 100`;
      },
    },
    {
      label: "MMLU",
      render: (id) => {
        const v = getModel(id)!.benchmarks.mmlu;
        return v === null ? "—" : v.toFixed(1);
      },
    },
    {
      label: "HumanEval",
      render: (id) => {
        const v = getModel(id)!.benchmarks.humaneval;
        return v === null ? "—" : v.toFixed(1);
      },
    },
    {
      label: "GSM8K",
      render: (id) => {
        const v = getModel(id)!.benchmarks.gsm8k;
        return v === null ? "—" : v.toFixed(1);
      },
    },
    {
      label: "Capabilities",
      render: (id) => getModel(id)!.capabilities.join(", "),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Compare models</h1>
      <p className="mt-2 text-slate-600">
        Side-by-side specs, pricing and benchmarks for {models.length} models.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-40 p-4 text-left font-semibold text-slate-500">Feature</th>
              {models.map((m) => (
                <th key={m.id} className="p-4 text-left align-top">
                  <Link
                    href={`/models/${m.id}`}
                    className="text-base font-bold text-indigo-600 hover:underline"
                  >
                    {m.name}
                  </Link>
                  <p className="mt-0.5 text-xs font-normal text-slate-500">{m.provider}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                <th className="p-4 text-left font-semibold text-slate-600">{row.label}</th>
                {models.map((m) => (
                  <td key={m.id} className="p-4 align-top">
                    {row.render(m.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          ← Change selection
        </Link>
        <Link
          href="/rankings"
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          See the rankings →
        </Link>
      </div>
    </div>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-extrabold tracking-tight">{title}</h1>
      <p className="mx-auto mt-2 max-w-md text-slate-600">{body}</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Go to Discover →
      </Link>
    </div>
  );
}
