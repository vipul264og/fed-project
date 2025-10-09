// src/components/ProjectCard.jsx
import { useRef } from "react";

export default function ProjectCard({ project, isAdmin, onDelete, studentId, onSubmitWork }) {
  const fileInput = useRef();

  const studentSubmission = project.submissions?.find(s => s.studentId === studentId);

  return (
    <div className="card">
      <h4>{project.title}</h4>
      <p>{project.desc}</p>
      <p><strong>Deadline:</strong> {project.deadline}</p>

      {isAdmin ? (
        <>
          <div className="status-badge status-pending">Submissions: {project.submissions.length}</div>
          <div className="submissions-list">
            {project.submissions.length > 0 ? project.submissions.map((s, i) => (
              <div key={i}>
                <strong>{s.studentId}</strong> submitted: {s.fileName} 
                <a href={s.fileData} target="_blank">[View]</a> ({s.fileType}) at {s.timestamp}
              </div>
            )) : <p>No submissions yet</p>}
          </div>
          <button className="btn-secondary" onClick={onDelete}>Delete</button>
        </>
      ) : (
        <>
          {studentSubmission ? (
            <>
              <div className="status-badge status-submitted">Submitted ✔</div>
              <div className="submissions-list">
                File: {studentSubmission.fileName} 
                <a href={studentSubmission.fileData} target="_blank">[View]</a> 
                ({studentSubmission.fileType}) at {studentSubmission.timestamp}
              </div>
            </>
          ) : (
            <>
              <input type="file" ref={fileInput} />
              <button className="btn-primary" onClick={() => {
                if (!fileInput.current.files.length) {
                  alert("Select a file first!");
                  return;
                }
                onSubmitWork(project.id, fileInput.current.files[0]);
                fileInput.current.value = "";
              }}>Submit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}
