import useProjects from '../hooks/useProjects';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function ProjectsPage() {
  const { projects, loading, error, addProject, removeProject, refetch } = useProjects();

  const handleDelete = async (id) => {
    if (window.confirm('آیا از حذف این پروژه مطمئن هستید؟ (تسک‌های مربوط به آن نیز در دیتابیس می‌مانند اما از لیست شما حذف می‌شوند)')) {
      try {
        await removeProject(id);
      } catch (err) {
        alert('خطا در حذف پروژه');
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>پروژه‌های من</h2>
        {/* دکمه پروژه جدید به همراه مودال */}
        <ProjectFormModal onAdd={addProject} />
      </div>

      {loading && <Spinner />}

      {error && <ErrorState message={error} onRetry={refetch} />}

      {!loading && !error && projects.length === 0 && (
        <EmptyState 
          title="هیچ پروژه‌ای پیدا نشد" 
          message="برای شروع، اولین پروژه خود را ایجاد کنید." 
        />
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="row">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}