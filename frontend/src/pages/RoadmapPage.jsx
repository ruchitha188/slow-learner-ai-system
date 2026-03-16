import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./RoadmapPage.css";

function RoadmapPage() {
  const [job, setJob] = useState("web_developer");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState({});

  const jobInfo = {
    web_developer: { label: "Web Developer", icon: "🌐", color: "#4f46e5" },
    data_analyst: { label: "Data Analyst", icon: "📊", color: "#0891b2" },
    full_stack_backend: { label: "Full-Stack Backend", icon: "⚙️", color: "#7c3aed" },
  };

  useEffect(() => {
    const fetchRoadmap = async () => {
      setError(""); setLoading(true); setRoadmap(null); setCompleted({});
      try {
        const res = await axios.get(`http://localhost:5000/api/roadmap/${job}`);
        setRoadmap(res.data.roadmap);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load roadmap. Is the backend running?");
      } finally { setLoading(false); }
    };
    fetchRoadmap();
  }, [job]);

  const toggleStep = (i) => setCompleted(prev => ({ ...prev, [i]: !prev[i] }));
  const completedCount = Object.values(completed).filter(Boolean).length;
  const totalSteps = roadmap?.length || 0;
  const progress = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2 className="page-title">🗺️ Learning Roadmap</h2>
          <p className="page-desc">Step-by-step plan to gain skills and crack placement jobs</p>
        </div>
        <div className="job-tabs">
          {Object.entries(jobInfo).map(([key, val]) => (
            <button key={key} className={`job-tab ${job === key ? "active" : ""}`} onClick={() => setJob(key)} style={{ "--tab-color": val.color }}>
              <span>{val.icon}</span><span>{val.label}</span>
            </button>
          ))}
        </div>
        {loading && <p style={{ color: "var(--text-muted)" }}>Loading roadmap...</p>}
        {error && <div className="alert alert-error">{error}</div>}
        {roadmap && (
          <div className="roadmap-card card">
            <div className="roadmap-header">
              <div>
                <h3 className="roadmap-job-title">{jobInfo[job].icon} {jobInfo[job].label} Roadmap</h3>
                <p className="roadmap-sub">{totalSteps} steps to complete</p>
              </div>
              <div className="roadmap-progress-box">
                <div className="rp-label"><span>Progress</span><strong>{progress}%</strong></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
                <p className="rp-count">{completedCount} / {totalSteps} done</p>
              </div>
            </div>
            <div className="roadmap-steps">
              {roadmap.map((step, i) => (
                <div key={i} className={`roadmap-step ${completed[i] ? "done" : ""}`} onClick={() => toggleStep(i)}>
                  <div className="step-number">{completed[i] ? "✓" : i + 1}</div>
                  <div className="step-text">{step}</div>
                </div>
              ))}
            </div>
            {progress === 100 && <div className="roadmap-done-banner">🎉 You've completed all steps! You're ready to apply for this role.</div>}
          </div>
        )}
      </div>
    </>
  );
}

export default RoadmapPage;
