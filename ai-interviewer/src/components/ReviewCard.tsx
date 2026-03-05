"use client";

import { useState } from "react";
import { QuestionReview, AnsweredQuestion } from "@/lib/types";
import DifficultyBadge from "./DifficultyBadge";

interface ReviewCardProps {
  review: QuestionReview;
  answeredQuestion: AnsweredQuestion;
  index: number;
}

export default function ReviewCard({
  review,
  answeredQuestion,
  index,
}: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);

  const scoreColor =
    review.score >= 7
      ? "text-green-600"
      : review.score >= 4
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
            {index + 1}
          </span>
          <span className="text-sm font-medium text-gray-900 line-clamp-1">
            {answeredQuestion.question.text}
          </span>
          <DifficultyBadge difficulty={answeredQuestion.question.difficulty} />
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-lg font-bold ${scoreColor}`}>
            {review.score}/10
          </span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">
              Your Answer
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {answeredQuestion.userAnswer || "(No answer provided)"}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">
              Feedback
            </h4>
            <p className="text-sm text-gray-700">{review.feedback}</p>
          </div>

          {review.missedPoints.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">
                Missed Points
              </h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {review.missedPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-1">
              Suggested Answer
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {review.suggestedAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
