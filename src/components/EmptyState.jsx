export default function EmptyState({ title, message }) {
  return (
    <div className="text-center py-5 text-muted">
      <h5>{title || "موردی یافت نشد"}</h5>
      <p>{message}</p>
    </div>
  );
}
