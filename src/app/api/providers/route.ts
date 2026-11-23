// OneAtlas.dev — provider directory API: GET /api/providers
// Each provider carries its model count and cheapest input price,
// computed server-side from the same seed store as /api/models.
// Sample data only — not live provider pricing or real benchmarks.

import { PROVIDERS, formatPrice, modelsForProvider } from "@/lib/data";

export async function GET() {
  const providers = PROVIDERS.map((provider) => {
    const models = modelsForProvider(provider.name);
    const cheapest = models.reduce(
      (min, m) => Math.min(min, m.inputPrice),
      Number.POSITIVE_INFINITY,
    );
    return {
      ...provider,
      modelCount: models.length,
      cheapestInputPrice:
        models.length > 0 ? cheapest : null,
      cheapestInputPriceFormatted:
        models.length > 0 ? formatPrice(cheapest) : null,
    };
  });
  return Response.json({ providers });
}
