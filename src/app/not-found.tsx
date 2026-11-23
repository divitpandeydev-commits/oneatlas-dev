import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mx-auto mt-2 max-w-md text-slate-600">
        The page or model you are looking for does not exist in the OneAtlas
        catalogue.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Back to Discover →
      </Link>
    </div>
  );
}
