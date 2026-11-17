import { Link } from 'react-router-dom';

export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm border-0">
        {/* نوار رنگی بالای کارت */}
        <div style={{ height: '8px', backgroundColor: project.color, borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}></div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{project.title}</h5>
          <p className="card-text text-muted small mt-auto mb-3">
            تاریخ ساخت: {project.createdAt || 'نامشخص'}
          </p>
          
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/project/${project.id}`} className="btn btn-sm btn-outline-primary">
              مشاهده تسک‌ها
            </Link>
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => onDelete(project.id)}
              title="حذف پروژه"
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}