export const seedInitialData = () => {
  // اگر قبلاً داده‌ای وجود دارد، کاری نکن
  if (localStorage.getItem('projects')) return;

  const initialProjects = [
    { id: "1", title: "پروژه سایت فروشگاهی", color: "#4f46e5", createdAt: "2024-01-10" },
    { id: "2", title: "اپلیکیشن موبایل", color: "#16a34a", createdAt: "2024-02-01" }
  ];

  const initialTasks = [
    {
      id: "1",
      projectId: "1",
      title: "طراحی صفحه محصول",
      description: "طراحی رابط کاربری صفحه جزئیات محصول",
      status: "todo",
      priority: "high",
      tags: ["UI", "Design"],
      dueDate: "2024-03-15",
      createdAt: "2024-02-10"
    },
    {
      id: "2",
      projectId: "1",
      title: "اتصال به API محصولات",
      description: "دریافت لیست محصولات از بک‌اند",
      status: "in-progress",
      priority: "medium",
      tags: ["API", "React"],
      dueDate: "2024-03-20",
      createdAt: "2024-02-12"
    },
    {
      id: "3",
      projectId: "1",
      title: "تست صفحه سبد خرید",
      description: "تست عملکرد سبد خرید",
      status: "done",
      priority: "low",
      tags: ["Test"],
      dueDate: "2024-03-10",
      createdAt: "2024-02-05"
    }
  ];

  localStorage.setItem('projects', JSON.stringify(initialProjects));
  localStorage.setItem('tasks', JSON.stringify(initialTasks));
};