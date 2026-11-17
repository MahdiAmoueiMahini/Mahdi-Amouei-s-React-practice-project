export default function ErrorState({ message, onRetry }) {
  return (
    <div className="alert alert-danger text-center">
      <p className="mb-3">خطا: {message || 'مشکلی پیش آمد.'}</p>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm" onClick={onRetry}>
          تلاش مجدد
        </button>
      )}
    </div>
  );
}