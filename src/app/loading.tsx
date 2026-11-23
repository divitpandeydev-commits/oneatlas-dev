export default function Loading() {
  return (
    <div aria-label="Loading page" className="space-y-4">
      <div className="h-9 w-64 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    </div>
  );
}
