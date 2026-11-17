import { useState, useEffect } from "react";

export default function TaskFormModal({
  onAdd,
  onUpdate,
  initialData,
  isEdit = false,
}) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    tags: "",
    dueDate: "",
  });

  // اگر در حالت ویرایش بود، فرم با داده‌های قبلی پر می‌شود
  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        ...initialData,
        tags: initialData.tags ? initialData.tags.join(", ") : "",
      });
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert("عنوان تسک الزامی است.");

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");
    const dataToSubmit = {
      ...formData,
      title: formData.title.trim(),
      tags: tagsArray,
    };

    if (isEdit) {
      onUpdate(initialData.id, dataToSubmit);
    } else {
      onAdd(dataToSubmit);
      // ریست فرم فقط در حالت ساخت
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        tags: "",
        dueDate: "",
      });
    }
    setShow(false);
  };

  return (
    <>
      {isEdit ? (
        <button
          className="btn btn-sm btn-outline-secondary border-0"
          onClick={() => setShow(true)}
          title="ویرایش"
        >
          ✎
        </button>
      ) : (
        <button className="btn btn-primary" onClick={() => setShow(true)}>
          + افزودن تسک
        </button>
      )}

      {show && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-start">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEdit ? "ویرایش تسک" : "تسک جدید"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShow(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">عنوان تسک *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">توضیحات</label>
                    <textarea
                      className="form-control"
                      rows="2"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label">اولویت</label>
                      <select
                        className="form-select"
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                      >
                        <option value="high">بالا</option>
                        <option value="medium">متوسط</option>
                        <option value="low">پایین</option>
                      </select>
                    </div>
                    <div className="col-6 mb-3">
                      <label className="form-label">وضعیت</label>
                      <select
                        className="form-select"
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                      >
                        <option value="todo">برای انجام</option>
                        <option value="in-progress">در حال انجام</option>
                        <option value="done">انجام شده</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      برچسب‌ها (با کاما جدا کنید)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="مثلاً: UI, React"
                      value={formData.tags}
                      onChange={(e) =>
                        setFormData({ ...formData, tags: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">تاریخ سررسید</label>
                    <input
                      type="date"
                      className="form-control"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShow(false)}
                  >
                    انصراف
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {isEdit ? "ذخیره تغییرات" : "ثبت تسک"}
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
