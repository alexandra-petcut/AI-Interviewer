import { ReviewResult } from "@/lib/types";

export default function ScoreSummary({ review }: { review: ReviewResult }) {
  const scoreColor =
    review.overallScore >= 70
      ? "text-green-600"
      : review.overallScore >= 40
        ? "text-yellow-600"
        : "text-red-600";

  const barColor =
    review.overallScore >= 70
      ? "bg-green-500"
      : review.overallScore >= 40
        ? "bg-yellow-500"
        : "bg-red-500";

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-500 mb-1">Overall Score</p>
        <p className={`text-5xl font-bold ${scoreColor}`}>
          {review.overallScore}
          <span className="text-2xl text-gray-400">/100</span>
        </p>
      </div>

      <div className="mb-6 h-3 w-full rounded-full bg-gray-200">
        <div
          className={`h-3 rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${review.overallScore}%` }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-green-700">
            Strengths
          </h3>
          <ul className="space-y-1">
            {review.strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-green-500">&#10003;</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-orange-700">
            Areas for Improvement
          </h3>
          <ul className="space-y-1">
            {review.areasForImprovement.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-orange-500">&#9679;</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
