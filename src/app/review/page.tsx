"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnsweredQuestion, ReviewResult } from "@/lib/types";
import {
  loadAnswers,
  saveReview,
  loadReview,
  clearSession,
} from "@/lib/session-storage";
import LoadingSpinner from "@/components/LoadingSpinner";
import ScoreSummary from "@/components/ScoreSummary";
import ReviewCard from "@/components/ReviewCard";

const loadingMessages = [
  "Analyzing your answers...",
  "Comparing against reference answers...",
  "Evaluating your Java knowledge...",
  "Preparing detailed feedback...",
  "Almost done...",
];

export default function ReviewPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<AnsweredQuestion[] | null>(null);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);

  useEffect(() => {
    const savedAnswers = loadAnswers();
    if (!savedAnswers) {
      router.push("/");
      return;
    }
    setAnswers(savedAnswers);

    // Check if review already exists (e.g. user navigated back)
    const savedReview = loadReview();
    if (savedReview) {
      setReview(savedReview);
      setLoading(false);
      return;
    }

    // Cycle loading messages
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex = (msgIndex + 1) % loadingMessages.length;
      setLoadingMsg(loadingMessages[msgIndex]);
    }, 4000);

    // Fetch review from API
    fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answeredQuestions: savedAnswers }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Review failed");
        return res.json();
      })
      .then((data: ReviewResult) => {
        saveReview(data);
        setReview(data);
      })
      .catch(() => {
        setError("Failed to get AI review. Please try again.");
      })
      .finally(() => {
        clearInterval(interval);
        setLoading(false);
      });

    return () => clearInterval(interval);
  }, [router]);

  if (!answers) return null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner message={loadingMsg} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!review) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Interview Review
      </h1>

      <ScoreSummary review={review} />

      <h2 className="mb-4 mt-8 text-lg font-semibold text-gray-900">
        Question-by-Question Review
      </h2>

      <div className="space-y-3">
        {review.questionReviews.map((qr, i) => (
          <ReviewCard
            key={qr.questionId}
            review={qr}
            answeredQuestion={answers[i]}
            index={i}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => router.push("/discussion")}
          className="flex-1 rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          Discuss with AI Coach
        </button>
        <button
          onClick={() => {
            clearSession();
            router.push("/");
          }}
          className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Start New Interview
        </button>
      </div>
    </div>
  );
}
