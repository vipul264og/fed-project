// src/components/AdminDashboard.jsx
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [deadline, setDeadline] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("projects")) || [];
    setProjects(stored);
  }, []);

  const saveProjects = (updatedProjects) => {
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleAssign = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      title,
      desc,
      deadline,
      submissions: []
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    setTitle("");
    setDesc("");
    setDeadline("");
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
  };

  return (
    <>
      <header className="navbar">
        <h1>Admin Dashboard</h1>
        <button className="btn-secondary" onClick={() => navigate("/")}>Logout</button>
      </header>
      <main className="container">
        <section>
          <h2 className="section-title">Assign a Project</h2>
          <form className="form-inline" onSubmit={handleAssign}>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Project Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">Assign</button>
          </form>
        </section>

        <section>
          <h2 className="section-title">Project Submissions</h2>
          <div className="grid-container">
            {projects.map(p => (
              <ProjectCard
                key={p.id}
                project={p}
                isAdmin={true}
                onDelete={() => handleDelete(p.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
