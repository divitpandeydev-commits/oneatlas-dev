// ---------------------------------------------------------------------------
// OneAtlas.dev — seed data
//
// SAMPLE DATA ONLY. These figures are realistic, hand-written examples for
// the demo (inspired by public model listings such as OpenRouter). They are
// NOT live provider pricing or real benchmark results. Do not quote them
// as facts — see the footer disclaimer and README.
// ---------------------------------------------------------------------------

export type ModelType =
  | "chat"
  | "reasoning"
  | "multimodal"
  | "code"
  | "embeddings";

export interface Benchmarks {
  /** MMLU-style general knowledge, 0–100 (null when not applicable). */
  mmlu: number | null;
  /** HumanEval-style coding, 0–100. */
  humaneval: number | null;
  /** GSM8K-style maths, 0–100. */
  gsm8k: number | null;
}

export interface Model {
  id: string;
  name: string;
  provider: string;
  type: ModelType;
  /** Context window in tokens. */
  contextWindow: number;
  /** USD per 1M input tokens. */
  inputPrice: number;
  /** USD per 1M output tokens. */
  outputPrice: number;
  /** ISO release date. */
  releaseDate: string;
  capabilities: string[];
  benchmarks: Benchmarks;
  /** 0–100, relative popularity in this sample. */
  popularity: number;
  description: string;
}

export interface Provider {
  id: string;
  name: string;
  description: string;
  headquarters: string;
  founded: number;
  website: string;
}

export const PROVIDERS: Provider[] = [
  {
    id: "openai",
    name: "OpenAI",
    description:
      "Maker of the GPT family and the o-series reasoning models. Offers frontier chat, reasoning and multimodal models through its API.",
    headquarters: "San Francisco, USA",
    founded: 2015,
    website: "openai.com",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description:
      "Builder of the Claude family, known for long-context handling and careful, steerable assistants for coding and analysis.",
    headquarters: "San Francisco, USA",
    founded: 2021,
    website: "anthropic.com",
  },
  {
    id: "google",
    name: "Google",
    description:
      "Gemini and Gemma models. Gemini is built for very large context windows and multimodal input; Gemma is its open-weight family.",
    headquarters: "Mountain View, USA",
    founded: 1998,
    website: "deepmind.google",
  },
  {
    id: "meta",
    name: "Meta",
    description:
      "Open-weight Llama models. Strong, cheap hosted options for chat and multimodal work, widely used for fine-tuning.",
    headquarters: "Menlo Park, USA",
    founded: 2004,
    website: "llama.com",
  },
  {
    id: "mistral",
    name: "Mistral AI",
    description:
      "European lab behind Mistral Large, Medium and the Codestral/Devstral coding models, with open-weight and hosted options.",
    headquarters: "Paris, France",
    founded: 2023,
    website: "mistral.ai",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description:
      "Low-cost frontier reasoning models. DeepSeek-R1 and its successors are popular for maths, coding and agent workloads.",
    headquarters: "Hangzhou, China",
    founded: 2023,
    website: "deepseek.com",
  },
  {
    id: "cohere",
    name: "Cohere",
    description:
      "Enterprise-focused models: Command for chat/RAG and Embed for search and retrieval, with strong multilingual support.",
    headquarters: "Toronto, Canada",
    founded: 2019,
    website: "cohere.com",
  },
  {
    id: "xai",
    name: "xAI",
    description:
      "Grok models, built for real-time knowledge and reasoning, with very large context windows on the fast variants.",
    headquarters: "San Francisco, USA",
    founded: 2023,
    website: "x.ai",
  },
  {
    id: "alibaba",
    name: "Alibaba (Qwen)",
    description:
      "The Qwen family: open-weight chat, reasoning and coding models that are widely deployed for their price-performance.",
    headquarters: "Hangzhou, China",
    founded: 1999,
    website: "qwen.ai",
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    description:
      "Maker of Kimi, a long-context chat model popular for document work and agentic coding.",
    headquarters: "Beijing, China",
    founded: 2023,
    website: "moonshot.ai",
  },
];

export const MODELS: Model[] = [
  {
    id: "gpt-5-2",
    name: "GPT-5.2",
    provider: "OpenAI",
    type: "reasoning",
    contextWindow: 400000,
    inputPrice: 1.75,
    outputPrice: 14.0,
    releaseDate: "2025-12-11",
    capabilities: ["Reasoning", "Code generation", "Tool use", "Vision", "Structured output"],
    benchmarks: { mmlu: 91.5, humaneval: 96.0, gsm8k: 97.0 },
    popularity: 98,
    description:
      "OpenAI's flagship reasoning model. Strong across coding, maths and long agentic tasks, with vision and tool use built in.",
  },
  {
    id: "gpt-5-1",
    name: "GPT-5.1",
    provider: "OpenAI",
    type: "reasoning",
    contextWindow: 400000,
    inputPrice: 1.25,
    outputPrice: 10.0,
    releaseDate: "2025-11-12",
    capabilities: ["Reasoning", "Code generation", "Tool use", "Vision"],
    benchmarks: { mmlu: 90.2, humaneval: 94.0, gsm8k: 96.0 },
    popularity: 90,
    description:
      "The previous GPT-5 generation — a step below 5.2 on benchmarks, at a lower price, still strong for reasoning work.",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "multimodal",
    contextWindow: 128000,
    inputPrice: 2.5,
    outputPrice: 10.0,
    releaseDate: "2024-05-13",
    capabilities: ["Vision", "Function calling", "Multilingual", "Structured output"],
    benchmarks: { mmlu: 88.7, humaneval: 90.0, gsm8k: 92.0 },
    popularity: 88,
    description:
      "The classic multimodal workhorse: text, images and audio in one model, with reliable function calling.",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o-mini",
    provider: "OpenAI",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 0.15,
    outputPrice: 0.6,
    releaseDate: "2024-07-18",
    capabilities: ["Function calling", "Multilingual", "Structured output"],
    benchmarks: { mmlu: 82.0, humaneval: 87.0, gsm8k: 88.0 },
    popularity: 92,
    description:
      "A small, fast and very cheap chat model for high-volume tasks where top-end reasoning is not needed.",
  },
  {
    id: "o4-mini",
    name: "o4-mini",
    provider: "OpenAI",
    type: "reasoning",
    contextWindow: 200000,
    inputPrice: 1.1,
    outputPrice: 4.4,
    releaseDate: "2025-04-16",
    capabilities: ["Reasoning", "Code generation", "Tool use", "Vision"],
    benchmarks: { mmlu: 86.5, humaneval: 92.0, gsm8k: 95.0 },
    popularity: 74,
    description:
      "A compact reasoning model that trades a little accuracy for much lower cost on maths and coding tasks.",
  },
  {
    id: "claude-opus-4-5",
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    type: "reasoning",
    contextWindow: 200000,
    inputPrice: 5.0,
    outputPrice: 25.0,
    releaseDate: "2025-11-24",
    capabilities: ["Reasoning", "Code generation", "Tool use", "Long context", "Vision"],
    benchmarks: { mmlu: 91.0, humaneval: 95.0, gsm8k: 96.5 },
    popularity: 85,
    description:
      "Anthropic's most capable model — best suited to long, careful coding and research work where quality matters most.",
  },
  {
    id: "claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    type: "chat",
    contextWindow: 200000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    releaseDate: "2025-09-29",
    capabilities: ["Code generation", "Tool use", "Long context", "Vision", "Structured output"],
    benchmarks: { mmlu: 89.0, humaneval: 93.0, gsm8k: 94.0 },
    popularity: 93,
    description:
      "The balanced Claude: strong coding and long-context work at a mid-range price. A popular default for agents.",
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "Anthropic",
    type: "chat",
    contextWindow: 200000,
    inputPrice: 1.0,
    outputPrice: 5.0,
    releaseDate: "2025-10-15",
    capabilities: ["Code generation", "Tool use", "Long context"],
    benchmarks: { mmlu: 85.0, humaneval: 88.0, gsm8k: 91.0 },
    popularity: 78,
    description:
      "The fast, cheap Claude. Good for summarising, classification and everyday chat at high volume.",
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    provider: "Google",
    type: "multimodal",
    contextWindow: 1000000,
    inputPrice: 2.0,
    outputPrice: 12.0,
    releaseDate: "2025-11-18",
    capabilities: ["Vision", "Reasoning", "Code generation", "Long context", "Tool use"],
    benchmarks: { mmlu: 91.8, humaneval: 95.0, gsm8k: 97.0 },
    popularity: 89,
    description:
      "Google's flagship multimodal model with a 1M-token context window — built for video, documents and deep reasoning.",
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    type: "multimodal",
    contextWindow: 1000000,
    inputPrice: 1.25,
    outputPrice: 10.0,
    releaseDate: "2025-06-17",
    capabilities: ["Vision", "Reasoning", "Code generation", "Long context"],
    benchmarks: { mmlu: 88.0, humaneval: 92.0, gsm8k: 94.0 },
    popularity: 86,
    description:
      "The previous Gemini Pro generation — still a strong all-rounder with a huge context window.",
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    type: "chat",
    contextWindow: 1000000,
    inputPrice: 0.3,
    outputPrice: 2.5,
    releaseDate: "2025-06-17",
    capabilities: ["Vision", "Function calling", "Long context", "Multilingual"],
    benchmarks: { mmlu: 84.0, humaneval: 87.0, gsm8k: 90.0 },
    popularity: 87,
    description:
      "Fast and cheap with a 1M context window — a good default for search, summarising and RAG pipelines.",
  },
  {
    id: "gemma-3-27b",
    name: "Gemma 3 27B",
    provider: "Google",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 0.1,
    outputPrice: 0.2,
    releaseDate: "2025-03-12",
    capabilities: ["Vision", "Multilingual", "Structured output"],
    benchmarks: { mmlu: 78.0, humaneval: 72.0, gsm8k: 84.0 },
    popularity: 61,
    description:
      "Google's open-weight model — small, cheap to host, and surprisingly capable for its size.",
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    provider: "Meta",
    type: "multimodal",
    contextWindow: 1000000,
    inputPrice: 0.2,
    outputPrice: 0.6,
    releaseDate: "2025-04-05",
    capabilities: ["Vision", "Code generation", "Long context", "Multilingual"],
    benchmarks: { mmlu: 85.0, humaneval: 86.0, gsm8k: 90.0 },
    popularity: 82,
    description:
      "Meta's open-weight multimodal flagship — near-frontier quality at a fraction of the price.",
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    provider: "Meta",
    type: "chat",
    contextWindow: 10000000,
    inputPrice: 0.1,
    outputPrice: 0.3,
    releaseDate: "2025-04-05",
    capabilities: ["Vision", "Long context", "Multilingual"],
    benchmarks: { mmlu: 80.0, humaneval: 80.0, gsm8k: 86.0 },
    popularity: 70,
    description:
      "A 10M-token context window makes Scout the go-to open model for very long documents.",
  },
  {
    id: "llama-3-3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 0.35,
    outputPrice: 0.4,
    releaseDate: "2024-12-06",
    capabilities: ["Function calling", "Multilingual", "Structured output"],
    benchmarks: { mmlu: 82.0, humaneval: 83.0, gsm8k: 89.0 },
    popularity: 76,
    description:
      "An older but dependable open-weight chat model, still widely hosted for everyday tasks.",
  },
  {
    id: "mistral-large-3",
    name: "Mistral Large 3",
    provider: "Mistral AI",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 2.0,
    outputPrice: 6.0,
    releaseDate: "2025-11-19",
    capabilities: ["Function calling", "Multilingual", "Code generation", "Structured output"],
    benchmarks: { mmlu: 88.0, humaneval: 89.0, gsm8k: 91.0 },
    popularity: 68,
    description:
      "Mistral's flagship — strong multilingual chat and function calling, hosted in Europe.",
  },
  {
    id: "mistral-medium-3",
    name: "Mistral Medium 3",
    provider: "Mistral AI",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 0.4,
    outputPrice: 2.0,
    releaseDate: "2025-05-07",
    capabilities: ["Function calling", "Multilingual", "Vision"],
    benchmarks: { mmlu: 83.0, humaneval: 84.0, gsm8k: 88.0 },
    popularity: 64,
    description:
      "A mid-size Mistral model that balances cost and quality for production chat workloads.",
  },
  {
    id: "codestral-2501",
    name: "Codestral 25.01",
    provider: "Mistral AI",
    type: "code",
    contextWindow: 256000,
    inputPrice: 0.3,
    outputPrice: 0.9,
    releaseDate: "2025-01-13",
    capabilities: ["Code generation", "Function calling"],
    benchmarks: { mmlu: null, humaneval: 85.0, gsm8k: null },
    popularity: 58,
    description:
      "A code-specialist model for fill-in-the-middle completion and code generation across 80+ languages.",
  },
  {
    id: "devstral-2",
    name: "Devstral 2",
    provider: "Mistral AI",
    type: "code",
    contextWindow: 256000,
    inputPrice: 0.4,
    outputPrice: 2.0,
    releaseDate: "2025-05-14",
    capabilities: ["Code generation", "Tool use", "Reasoning"],
    benchmarks: { mmlu: null, humaneval: 88.0, gsm8k: 82.0 },
    popularity: 52,
    description:
      "An agentic coding model built for software-engineering tasks in real codebases.",
  },
  {
    id: "deepseek-v3-2",
    name: "DeepSeek V3.2",
    provider: "DeepSeek",
    type: "reasoning",
    contextWindow: 128000,
    inputPrice: 0.28,
    outputPrice: 1.1,
    releaseDate: "2025-12-01",
    capabilities: ["Reasoning", "Code generation", "Tool use", "Long context"],
    benchmarks: { mmlu: 88.5, humaneval: 93.0, gsm8k: 95.0 },
    popularity: 84,
    description:
      "Frontier-level reasoning at a budget price — the value pick for maths and coding agents.",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    type: "reasoning",
    contextWindow: 64000,
    inputPrice: 0.55,
    outputPrice: 2.19,
    releaseDate: "2025-01-20",
    capabilities: ["Reasoning", "Code generation"],
    benchmarks: { mmlu: 84.0, humaneval: 89.0, gsm8k: 94.0 },
    popularity: 81,
    description:
      "The open-weight reasoning model that reset price expectations for the whole industry.",
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    type: "chat",
    contextWindow: 128000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    releaseDate: "2024-04-04",
    capabilities: ["Function calling", "Multilingual", "Tool use", "Structured output"],
    benchmarks: { mmlu: 83.0, humaneval: 82.0, gsm8k: 86.0 },
    popularity: 55,
    description:
      "Built for RAG and enterprise search, with strong tool use and citations.",
  },
  {
    id: "embed-v4",
    name: "Embed v4",
    provider: "Cohere",
    type: "embeddings",
    contextWindow: 128000,
    inputPrice: 0.12,
    outputPrice: 0,
    releaseDate: "2025-03-10",
    capabilities: ["Multilingual", "Structured output"],
    benchmarks: { mmlu: null, humaneval: null, gsm8k: null },
    popularity: 49,
    description:
      "A multilingual embedding model for search and retrieval — turns text into vectors for RAG pipelines.",
  },
  {
    id: "grok-4-1",
    name: "Grok 4.1",
    provider: "xAI",
    type: "reasoning",
    contextWindow: 256000,
    inputPrice: 3.0,
    outputPrice: 15.0,
    releaseDate: "2025-11-20",
    capabilities: ["Reasoning", "Vision", "Tool use", "Web search"],
    benchmarks: { mmlu: 90.0, humaneval: 93.0, gsm8k: 95.0 },
    popularity: 72,
    description:
      "xAI's flagship reasoning model, with live web search and strong multimodal skills.",
  },
  {
    id: "grok-4-fast",
    name: "Grok 4 Fast",
    provider: "xAI",
    type: "chat",
    contextWindow: 2000000,
    inputPrice: 0.2,
    outputPrice: 0.5,
    releaseDate: "2025-09-17",
    capabilities: ["Vision", "Tool use", "Web search", "Long context"],
    benchmarks: { mmlu: 85.0, humaneval: 88.0, gsm8k: 90.0 },
    popularity: 66,
    description:
      "A fast, cheap Grok with a 2M context window — built for high-volume, always-on assistants.",
  },
  {
    id: "qwen3-235b",
    name: "Qwen3 235B",
    provider: "Alibaba (Qwen)",
    type: "reasoning",
    contextWindow: 256000,
    inputPrice: 0.2,
    outputPrice: 0.8,
    releaseDate: "2025-04-28",
    capabilities: ["Reasoning", "Code generation", "Multilingual", "Tool use"],
    benchmarks: { mmlu: 87.0, humaneval: 90.0, gsm8k: 93.0 },
    popularity: 79,
    description:
      "A large open-weight reasoning model — strong multilingual performance at a very low hosted price.",
  },
  {
    id: "qwen3-coder",
    name: "Qwen3 Coder",
    provider: "Alibaba (Qwen)",
    type: "code",
    contextWindow: 256000,
    inputPrice: 0.3,
    outputPrice: 1.2,
    releaseDate: "2025-07-23",
    capabilities: ["Code generation", "Tool use", "Reasoning"],
    benchmarks: { mmlu: null, humaneval: 91.0, gsm8k: 88.0 },
    popularity: 71,
    description:
      "A coding specialist from the Qwen family, tuned for agentic software development.",
  },
  {
    id: "kimi-k2",
    name: "Kimi K2",
    provider: "Moonshot AI",
    type: "chat",
    contextWindow: 256000,
    inputPrice: 0.6,
    outputPrice: 2.5,
    releaseDate: "2025-07-11",
    capabilities: ["Tool use", "Code generation", "Long context", "Multilingual"],
    benchmarks: { mmlu: 85.0, humaneval: 89.0, gsm8k: 90.0 },
    popularity: 63,
    description:
      "A long-context agentic model from Moonshot AI, popular for tool-heavy workflows.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const ALL_CAPABILITIES: string[] = Array.from(
  new Set(MODELS.flatMap((m) => m.capabilities)),
).sort();

export const ALL_TYPES: ModelType[] = [
  "chat",
  "reasoning",
  "multimodal",
  "code",
  "embeddings",
];

export function getModel(id: string): Model | undefined {
  return MODELS.find((m) => m.id === id);
}

export function getProvider(name: string): Provider | undefined {
  return PROVIDERS.find((p) => p.name === name);
}

export function modelsForProvider(providerName: string): Model[] {
  return MODELS.filter((m) => m.provider === providerName);
}

/** Average of the model's available benchmark scores (null if none). */
export function averageScore(model: Model): number | null {
  const scores = [model.benchmarks.mmlu, model.benchmarks.humaneval, model.benchmarks.gsm8k].filter(
    (s): s is number => s !== null,
  );
  if (scores.length === 0) return null;
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

/** Cost-effectiveness: average benchmark score per dollar of combined price. */
export function valueScore(model: Model): number | null {
  const avg = averageScore(model);
  if (avg === null) return null;
  return avg / (model.inputPrice + model.outputPrice + 0.1);
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatContext(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1000000).toFixed(tokens % 1000000 === 0 ? 0 : 1)}M`;
  return `${Math.round(tokens / 1000)}K`;
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
