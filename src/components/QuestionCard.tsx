import { Question } from "@/lib/types";
import DifficultyBadge from "./DifficultyBadge";

interface QuestionCardProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
}

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {question.text}
        </h2>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>
      <textarea
        className="w-full rounded-md border border-gray-300 p-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={7}
        placeholder="Type your answer here..."
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
      />
    </div>
  );
}
