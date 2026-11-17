import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProjects();
      setProjects(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const addProject = async (data) => {
    const res = await api.createProject({
      ...data,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setProjects((prev) => [...prev, res.data]);
  };

  const editProject = async (id, data) => {
    const res = await api.updateProject(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const removeProject = async (id) => {
    await api.deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    projects,
    loading,
    error,
    refetch: loadProjects,
    addProject,
    editProject,
    removeProject,
  };
}
