// سرویس شبیه‌ساز API با استفاده از localStorage
// این فایل جایگزین axios و JSON Server شده است تا پروژه به صورت استاتیک کار کند.

const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// شبیه‌سازی پاسخ axios (برگرداندن یک پرامیس با پراپرتی data)
const mockResponse = (data) => Promise.resolve({ data });

// ---------- Projects ----------
export const getProjects = () => {
  return mockResponse(getStorageData("projects"));
};

export const getProject = (id) => {
  const projects = getStorageData("projects");
  const project = projects.find((p) => String(p.id) === String(id));
  return mockResponse(project);
};

export const createProject = (data) => {
  const projects = getStorageData("projects");
  // تولید یک آیدی تصادفی (رشته)
  const newProject = { ...data, id: Date.now().toString() };
  setStorageData("projects", [...projects, newProject]);
  return mockResponse(newProject);
};

export const updateProject = (id, data) => {
  let projects = getStorageData("projects");
  let updatedProject = null;
  projects = projects.map((p) => {
    if (String(p.id) === String(id)) {
      updatedProject = { ...p, ...data, id: p.id };
      return updatedProject;
    }
    return p;
  });
  setStorageData("projects", projects);
  return mockResponse(updatedProject);
};

export const deleteProject = (id) => {
  let projects = getStorageData("projects");
  projects = projects.filter((p) => String(p.id) !== String(id));
  setStorageData("projects", projects);

  // حذف تسک‌های مربوط به این پروژه (اختیاری، اما منطقی است)
  let tasks = getStorageData("tasks");
  tasks = tasks.filter((t) => String(t.projectId) !== String(id));
  setStorageData("tasks", tasks);

  return mockResponse({ success: true });
};

// ---------- Tasks ----------
export const getTasksByProject = (projectId) => {
  const tasks = getStorageData("tasks");
  const filteredTasks = tasks.filter(
    (t) => String(t.projectId) === String(projectId),
  );
  return mockResponse(filteredTasks);
};

export const createTask = (data) => {
  const tasks = getStorageData("tasks");
  const newTask = { ...data, id: Date.now().toString() };
  setStorageData("tasks", [...tasks, newTask]);
  return mockResponse(newTask);
};

export const updateTask = (id, data) => {
  let tasks = getStorageData("tasks");
  let updatedTask = null;
  tasks = tasks.map((t) => {
    if (String(t.id) === String(id)) {
      updatedTask = { ...t, ...data, id: t.id };
      return updatedTask;
    }
    return t;
  });
  setStorageData("tasks", tasks);
  return mockResponse(updatedTask);
};

export const deleteTask = (id) => {
  let tasks = getStorageData("tasks");
  tasks = tasks.filter((t) => String(t.id) !== String(id));
  setStorageData("tasks", tasks);
  return mockResponse({ success: true });
};
