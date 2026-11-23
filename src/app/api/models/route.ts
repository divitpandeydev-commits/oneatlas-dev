// OneAtlas.dev — read-only API for the seed catalogue.
//
// The seed data lives in a single server-side store (`src/lib/data.ts`)
// and is served through these Next.js API Routes, so the Discover page
// fetches it over HTTP instead of bundling the data file into the client.
// Sample data only — not live provider pricing or real benchmarks.

import {
  ALL_CAPABILITIES,
  ALL_TYPES,
  MODELS,
  PROVIDERS,
} from "@/lib/data";

export async function GET() {
  return Response.json({
    models: MODELS,
    providers: PROVIDERS,
    capabilities: ALL_CAPABILITIES,
    types: ALL_TYPES,
  });
}
