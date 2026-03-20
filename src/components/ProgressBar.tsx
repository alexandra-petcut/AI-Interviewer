export default function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div className="w-full">
      <div className="mb-1 flex justify-between text-sm text-gray-600">
        <span>
          Question {current + 1} of {total}
        </span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
