import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { EMPIRE_DEEP_DIVES, deepDiveBySlug } from "@/lib/empireDeepDives";
import EmpireQuiz from "@/components/EmpireQuiz";

export async function generateStaticParams() {
  return EMPIRE_DEEP_DIVES.map((dive) => ({ slug: dive.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dive = deepDiveBySlug(slug);
  if (!dive) return {};
  return {
    title: `${dive.ptName} — linha do tempo e quiz | Mapa dos Impérios`,
    description: dive.intro,
  };
}

export default async function EmpireDeepDivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dive = deepDiveBySlug(slug);
  if (!dive) notFound();

  const relatedDives = (dive.relatedSlugs ?? [])
    .map((relatedSlug) => deepDiveBySlug(relatedSlug))
    .filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        ← Voltar ao mapa
      </Link>

      <h1 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {dive.ptName}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
        {dive.intro}
      </p>

      {relatedDives.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-zinc-500 dark:text-zinc-400">Ver também:</span>
          {relatedDives.map((related) => (
            <Link
              key={related.slug}
              href={`/imperio/${related.slug}`}
              className="rounded-full border border-zinc-300 px-3 py-1 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
            >
              {related.ptName} →
            </Link>
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Linha do tempo
        </h2>
        <ol className="mt-4 space-y-5 border-l-2 border-zinc-200 pl-5 dark:border-zinc-700">
          {dive.milestones.map((milestone) => (
            <li key={`${milestone.year}-${milestone.title}`} className="relative">
              <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                {milestone.label}
              </p>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {milestone.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {milestone.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Pessoas importantes
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {dive.keyFigures.map((figure) => (
            <div
              key={figure.name}
              className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {figure.name}
              </p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{figure.years}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {figure.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 mb-8">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Quiz — 20 perguntas para fixar
        </h2>
        <div className="mt-4">
          <EmpireQuiz questions={dive.quiz} />
        </div>
      </section>
    </div>
  );
}
