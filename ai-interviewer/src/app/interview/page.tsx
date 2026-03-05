"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Question, AnsweredQuestion } from "@/lib/types";
import { loadQuestions, saveAnswers } from "@/lib/session-storage";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

export default function InterviewPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loaded = loadQuestions();
    if (!loaded || loaded.length === 0) {
      router.push("/");
      return;
    }
    setQuestions(loaded);
    setAnswers(new Array(loaded.length).fill(""));
  }, [router]);

  if (questions.length === 0) return null;

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = answer;
      return next;
    });
  };

  const handleSubmit = () => {
    const answered: AnsweredQuestion[] = questions.map((q, i) => ({
      question: q,
      userAnswer: answers[i],
    }));
    saveAnswers(answered);
    router.push("/review");
  };

  const isLast = currentIndex === questions.length - 1;
  const answeredCount = answers.filter((a) => a.trim().length > 0).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          Java Interview
        </h1>
        <ProgressBar current={currentIndex} total={questions.length} />
      </div>

      <QuestionCard
        question={questions[currentIndex]}
        answer={answers[currentIndex]}
        onAnswerChange={handleAnswerChange}
      />

      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex((i) => i - 1)}
          disabled={currentIndex === 0}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          {answeredCount} of {questions.length} answered
        </span>

        {isLast ? (
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Submit All Answers
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
