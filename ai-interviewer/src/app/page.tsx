"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getRandomQuestions } from "./actions/questions";
import { saveQuestions } from "@/lib/session-storage";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      const questions = await getRandomQuestions();
      saveQuestions(questions);
      router.push("/interview");
    } catch {
      setLoading(false);
      alert("Failed to load questions. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="mb-6 text-6xl">&#9749;</div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Java Interview Practice
        </h1>
        <p className="mb-2 text-lg text-gray-600">
          Test your Java knowledge with 12 randomly selected questions across
          easy, medium, and hard difficulty levels.
        </p>
        <p className="mb-8 text-sm text-gray-500">
          After answering, an AI will review your responses and provide detailed
          feedback. Then you can discuss any topics with an AI coach.
        </p>

        {loading ? (
          <LoadingSpinner message="Preparing your interview..." />
        ) : (
          <button
            onClick={handleStart}
            className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Start Interview
          </button>
        )}

        <div className="mt-10 grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
          <div>
            <p className="text-2xl font-bold text-green-600">5</p>
            <p>Easy</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-600">5</p>
            <p>Medium</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">2</p>
            <p>Hard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
