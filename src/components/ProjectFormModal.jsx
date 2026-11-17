import { useState } from 'react';

export default function ProjectFormModal({ onAdd }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#4f46e5');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('عنوان پروژه نمی‌تواند خالی باشد.');
    
    // ارسال به تابع addProject در useProjects
    onAdd({ title: title.trim(), color });
    
    // ریست کردن فرم و بستن مودال
    setTitle('');
    setColor('#4f46e5');
    setShow(false);
  };

  return (
    <>
      <button className="btn btn-primary mb-4" onClick={() => setShow(true)}>
        + پروژه جدید
      </button>

      {show && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">ساخت پروژه جدید</h5>
                  <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>
                
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">عنوان پروژه</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="مثلاً: طراحی سایت فروشگاه"
                      autoFocus
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">رنگ پروژه</label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                    انصراف
                  </button>
                  <button type="submit" className="btn btn-primary">
                    ایجاد پروژه
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}