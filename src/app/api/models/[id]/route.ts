// OneAtlas.dev — single-model API: GET /api/models/[id]
// Sample data only — not live provider pricing or real benchmarks.

import { getModel } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const model = getModel(id);
  if (!model) {
    return Response.json({ error: "Model not found" }, { status: 404 });
  }
  return Response.json(model);
}
