export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      {message && (
        <p className="text-sm text-gray-500 animate-pulse">{message}</p>
      )}
    </div>
  );
}
