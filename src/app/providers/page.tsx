import type { Metadata } from "next";
import Link from "next/link";
import { PROVIDERS, formatPrice, modelsForProvider } from "@/lib/data";

export const metadata: Metadata = {
  title: "Providers — OneAtlas.dev",
  description: "Browse AI model providers and the models each one offers.",
};

export default function Providers() {
  return (
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight">Providers</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        {PROVIDERS.length} providers in the catalogue. Open a provider to see
        every model it offers, with pricing and context windows.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {PROVIDERS.map((provider) => {
          const models = modelsForProvider(provider.name);
          const cheapest = models.length
            ? Math.min(...models.map((m) => m.inputPrice))
            : null;
          return (
            <article
              key={provider.id}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold">{provider.name}</h2>
                <span className="shrink-0 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-800">
                  {models.length} model{models.length === 1 ? "" : "s"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{provider.description}</p>
              <dl className="mt-4 space-y-1 text-sm">
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
                  <dt className="text-slate-500">Cheapest input price</dt>
                  <dd className="font-medium">
                    {cheapest === null ? "—" : `${formatPrice(cheapest)} / 1M tokens`}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {models.map((m) => (
                  <Link
                    key={m.id}
                    href={`/models/${m.id}`}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-indigo-100 hover:text-indigo-700"
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
