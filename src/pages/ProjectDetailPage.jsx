import { useState, useMemo } from "react"; // useMemo و useState اضافه شد
import { useParams, Link } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import useProjects from "../hooks/useProjects";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import Spinner from "../components/Spinner";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

export default function ProjectDetailPage() {
  const { id } = useParams();

  const { projects, loading: projectsLoading } = useProjects();
  const currentProject = projects.find((p) => p.id == id);

  // ۱. editTask را از هوک گرفتیم
  const {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    changeStatus,
    refetch,
  } = useTasks(id);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");

  // ۲. استیت برای تسک در حال ویرایش اضافه شد
  const [editingTask, setEditingTask] = useState(null);

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("آیا از حذف این تسک مطمئن هستید؟")) {
      await removeTask(taskId);
    }
  };

  // ۳. تابع کلیک روی دکمه ویرایش
  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPriority =
        filterPriority === "all" || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, searchTerm, filterPriority]);

  if (projectsLoading || loading) return <Spinner />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!currentProject && !projectsLoading) {
    return <h4 className="text-center mt-5">پروژه یافت نشد!</h4>;
  }

  const getTasksByStatus = (status) =>
    filteredTasks.filter((t) => t.status === status);

  const columns = [
    { id: "todo", title: "برای انجام", bg: "secondary" },
    { id: "in-progress", title: "در حال انجام", bg: "primary" },
    { id: "done", title: "انجام شده", bg: "success" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <Link to="/" className="text-decoration-none text-muted mb-2 d-block">
            &larr; بازگشت به پروژه‌ها
          </Link>
          <h2 className="mb-0">
            <span
              className="badge me-2"
              style={{ backgroundColor: currentProject.color }}
            >
              &nbsp;
            </span>
            {currentProject.title}
          </h2>
        </div>
      </div>

      <div className="row mb-4 g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="جستجو در عنوان تسک‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">همه اولویت‌ها</option>
            <option value="high">اولویت بالا</option>
            <option value="medium">اولویت متوسط</option>
            <option value="low">اولویت پایین</option>
          </select>
        </div>
        <div className="col-md-2 text-end">
          <TaskFormModal onAdd={addTask} />
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center mt-5">
          <EmptyState
            title="هیچ تسکی وجود ندارد"
            message="اولین تسک را ایجاد کنید."
          />
        </div>
      ) : (
        <div className="row g-4">
          {columns.map((col) => (
            <div className="col-md-4" key={col.id}>
              <div className="bg-white p-3 rounded shadow-sm h-100 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <h6 className="mb-0 fw-bold">
                    {col.title}
                    <span className="badge bg-light text-dark border ms-2">
                      {getTasksByStatus(col.id).length}
                    </span>
                  </h6>
                </div>

                <div className="flex-grow-1" style={{ minHeight: "100px" }}>
                  {getTasksByStatus(col.id).length === 0 ? (
                    <p className="text-muted small text-center mt-3">
                      تسکی یافت نشد
                    </p>
                  ) : (
                    getTasksByStatus(col.id).map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onStatusChange={changeStatus}
                        onDelete={handleDeleteTask}
                        onEdit={handleEditClick} // ۴. پاس دادن تابع ویرایش به کارت
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ۵. مودال ویرایش (فقط وقتی یک تسک برای ویرایش انتخاب شده نمایش داده می‌شود) */}
      {editingTask && (
        <TaskFormModal
          isEdit={true}
          initialData={editingTask}
          onUpdate={(taskId, data) => {
            editTask(taskId, data);
            setEditingTask(null); // بستن مودال
          }}
        />
      )}
    </div>
  );
}
