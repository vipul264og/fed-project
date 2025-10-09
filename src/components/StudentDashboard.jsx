// src/components/StudentDashboard.jsx
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  const currentStudent = localStorage.getItem("currentStudent") || "student1";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(stored);
  }, []);

  const saveProjects = (updatedProjects) => {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleSubmitWork = (projectId, file) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileData = e.target.result;
      const updated = projects.map(p => {
        if (p.id === projectId) {
          const submissions = p.submissions || [];
          submissions.push({
            studentId: currentStudent,
            fileName: file.name,
            fileType: file.type,
            fileData,
            timestamp: new Date().toLocaleString()
          });
          p.submissions = submissions;
        }
        return p;
      });
      saveProjects(updated);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <header className="navbar">
        <h1>Student Dashboard</h1>
        <button className="btn-secondary" onClick={() => navigate("/")}>Logout</button>
      </header>
      <main className="container">
        <h2 className="section-title">Assigned Projects</h2>
        <div className="grid-container">
          {projects.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              isAdmin={false}
              studentId={currentStudent}
              onSubmitWork={handleSubmitWork}
            />
          ))}
        </div>
      </main>
    </>
  );
}
