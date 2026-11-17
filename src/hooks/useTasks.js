import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

export default function useTasks(projectId) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.getTasksByProject(projectId);
      setTasks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (data) => {
    const res = await api.createTask({
      ...data,
      projectId: projectId, // <--- تغییر اصلی اینجاست (Number را حذف کنید)
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setTasks((prev) => [...prev, res.data]);
  };

  const editTask = async (id, data) => {
    const res = await api.updateTask(id, data);
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const changeStatus = async (id, status) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    await editTask(id, { ...task, status });
  };

  return {
    tasks,
    loading,
    error,
    refetch: loadTasks,
    addTask,
    editTask,
    removeTask,
    changeStatus,
  };
}
