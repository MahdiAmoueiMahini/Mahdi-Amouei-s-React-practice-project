export default function TaskCard({ task, onStatusChange, onDelete, onEdit }) {
  const priorityColors = {
    high: "danger",
    medium: "warning",
    low: "success",
  };

  const priorityLabels = {
    high: "بالا",
    medium: "متوسط",
    low: "پایین",
  };

  return (
    <div
      className="card mb-2 shadow-sm border-0"
      style={{ transition: "transform 0.2s", cursor: "grab" }}
    >
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title mb-0 fw-bold text-dark">{task.title}</h6>
          <span
            className={`badge bg-${priorityColors[task.priority] || "secondary"}`}
          >
            {priorityLabels[task.priority] || "نامشخص"}
          </span>
        </div>

        <p
          className="card-text text-muted small mb-3 text-truncate"
          style={{ maxWidth: "100%" }}
        >
          {task.description || "بدون توضیحات"}
        </p>

        {/* نمایش برچسب‌ها */}
        <div className="mb-3">
          {task.tags &&
            task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge bg-light text-secondary border me-1 mb-1"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* اکشن‌ها */}
        <div className="d-flex justify-content-between align-items-center mt-auto border-top pt-2">
          <select
            className="form-select form-select-sm w-auto border-0 bg-light"
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="todo">برای انجام</option>
            <option value="in-progress">در حال انجام</option>
            <option value="done">انجام شده</option>
          </select>

          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-secondary border-0"
              onClick={() => onEdit(task)}
              title="ویرایش تسک"
            >
              ✎
            </button>
            <button
              className="btn btn-sm btn-outline-danger border-0"
              onClick={() => onDelete(task.id)}
              title="حذف تسک"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
