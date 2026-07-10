"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/lib/empireDeepDives";

export default function EmpireQuiz({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleSelect(optionIndex: number) {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setScore((value) => value + 1);
    }
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent((value) => value + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  if (questions.length === 0) return null;

  if (finished) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Você acertou {score} de {questions.length}
        </h3>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {score === questions.length
            ? "Perfeito! Você domina esse assunto."
            : score >= questions.length * 0.7
              ? "Muito bom! Só faltou afinar alguns detalhes."
              : "Vale revisar a linha do tempo acima e tentar de novo."}
        </p>
        <button
          type="button"
          onClick={handleRestart}
          className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Refazer o quiz
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span>
          Pergunta {current + 1} de {questions.length}
        </span>
        <span>
          Acertos: {score}/{current + (selected !== null ? 1 : 0)}
        </span>
      </div>
      <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {question.question}
      </h3>
      <div className="mt-4 flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctIndex;
          const isSelected = optionIndex === selected;
          let stateClasses =
            "border-zinc-200 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-500";
          if (selected !== null) {
            if (isCorrect) {
              stateClasses =
                "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 dark:border-emerald-600";
            } else if (isSelected) {
              stateClasses = "border-red-500 bg-red-50 dark:bg-red-950/40 dark:border-red-600";
            }
          }
          return (
            <button
              key={optionIndex}
              type="button"
              disabled={selected !== null}
              onClick={() => handleSelect(optionIndex)}
              className={`rounded-lg border px-4 py-2 text-left text-sm text-zinc-800 transition disabled:cursor-default dark:text-zinc-200 ${stateClasses}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-4">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            {question.explanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {current + 1 < questions.length ? "Próxima pergunta" : "Ver resultado"}
          </button>
        </div>
      )}
    </div>
  );
}
