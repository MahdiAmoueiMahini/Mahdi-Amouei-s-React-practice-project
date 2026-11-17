import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">۴۰۴</h1>
      <p className="lead">صفحه‌ای که دنبالش بودید پیدا نشد.</p>
      <Link to="/" className="btn btn-primary">
        بازگشت به خانه
      </Link>
    </div>
  );
}
