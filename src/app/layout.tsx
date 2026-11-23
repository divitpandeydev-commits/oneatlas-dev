import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneAtlas.dev — Discover AI Models",
  description:
    "OneAtlas.dev — discover, compare and rank AI models by provider, capability, price and benchmarks. Demo with sample data.",
};

const NAV = [
  { href: "/", label: "Discover" },
  { href: "/compare", label: "Compare" },
  { href: "/providers", label: "Providers" },
  { href: "/rankings", label: "Rankings" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                OneAtlas
              </span>
              <span className="text-xl font-extrabold tracking-tight text-indigo-600">
                .dev
              </span>
            </Link>
            <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">
            <p className="font-semibold text-slate-700">OneAtlas.dev — demo</p>
            <p className="mt-1">
              All models, prices and benchmark scores shown here are{" "}
              <strong>sample data for demonstration only</strong> — not live
              provider pricing or real benchmark results. Built with Next.js,
              TypeScript and Tailwind CSS.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
