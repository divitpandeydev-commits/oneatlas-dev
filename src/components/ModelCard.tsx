import Link from "next/link";
import {
  formatContext,
  formatDate,
  formatPrice,
  type Model,
} from "@/lib/data";

const TYPE_STYLES: Record<string, string> = {
  chat: "bg-sky-100 text-sky-800",
  reasoning: "bg-violet-100 text-violet-800",
  multimodal: "bg-emerald-100 text-emerald-800",
  code: "bg-amber-100 text-amber-800",
  embeddings: "bg-rose-100 text-rose-800",
};

interface ModelCardProps {
  model: Model;
  compareSelected: boolean;
  compareDisabled: boolean;
  onToggleCompare: (id: string) => void;
}

/** One model card on the discovery page. */
export default function ModelCard({
  model,
  compareSelected,
  compareDisabled,
  onToggleCompare,
}: ModelCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold leading-tight">
            <Link
              href={`/models/${model.id}`}
              className="hover:text-indigo-600 hover:underline"
            >
              {model.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-slate-500">{model.provider}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${TYPE_STYLES[model.type] ?? "bg-slate-100 text-slate-700"}`}
        >
          {model.type}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-600">
        {model.description}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-slate-50 px-1 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Context
          </dt>
          <dd className="mt-0.5 text-sm font-bold">
            {formatContext(model.contextWindow)}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-1 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Input / 1M
          </dt>
          <dd className="mt-0.5 text-sm font-bold">
            {formatPrice(model.inputPrice)}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 px-1 py-2">
          <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            Output / 1M
          </dt>
          <dd className="mt-0.5 text-sm font-bold">
            {formatPrice(model.outputPrice)}
          </dd>
        </div>
      </dl>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {model.capabilities.slice(0, 4).map((cap) => (
          <span
            key={cap}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
          >
            {cap}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
        <span className="text-xs text-slate-500">
          Released {formatDate(model.releaseDate)}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleCompare(model.id)}
            disabled={compareDisabled}
            aria-pressed={compareSelected}
            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
              compareSelected
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
            }`}
          >
            {compareSelected ? "✓ Compared" : "Compare"}
          </button>
          <Link
            href={`/models/${model.id}`}
            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
