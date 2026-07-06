import TimelineExplorer from "@/components/TimelineExplorer";

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Mapa dos Impérios
        </h1>
        <p className="hidden text-sm text-zinc-500 sm:block dark:text-zinc-400">
          Arraste o slider para ver as fronteiras mudarem através do tempo
        </p>
      </header>
      <main className="relative flex-1">
        <TimelineExplorer />
      </main>
    </div>
  );
}
