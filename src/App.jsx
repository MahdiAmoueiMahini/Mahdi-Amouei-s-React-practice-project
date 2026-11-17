import { HashRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <HashRouter>
      <div className="container-fluid py-4" style={{ maxWidth: "1200px" }}>
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
