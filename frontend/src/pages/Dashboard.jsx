import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [roll, setRoll] = useState(""); const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [regMsg, setRegMsg] = useState({ text: "", type: "" });
  const [scoreRoll, setScoreRoll] = useState(""); const [subject, setSubject] = useState(""); const [score, setScore] = useState("");
  const [scoreMsg, setScoreMsg] = useState({ text: "", type: "" });
  const [classification, setClassification] = useState(null);
  const [viewRoll, setViewRoll] = useState(""); const [studentData, setStudentData] = useState(null); const [viewMsg, setViewMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); setRegMsg({ text: "", type: "" }); setLoading(true);
    try {
      await axios.post("/api/students/register", { roll, name, email });
      setRegMsg({ text: `✅ Student "${name}" registered!`, type: "success" });
      setRoll(""); setName(""); setEmail("");
    } catch (err) { setRegMsg({ text: err.response?.data?.error || "Failed", type: "error" }); }
    finally { setLoading(false); }
  };

  const handleAddScore = async (e) => {
    e.preventDefault(); setScoreMsg({ text: "", type: "" }); setClassification(null); setLoading(true);
    try {
      const res = await axios.post(`/api/students/${scoreRoll}/score`, { subject, score: Number(score) });
      setClassification(res.data);
      setScoreMsg({ text: `✅ Score added! Avg: ${res.data.average}`, type: "success" });
      setSubject(""); setScore("");
    } catch (err) { setScoreMsg({ text: err.response?.data?.error || "Failed", type: "error" }); }
    finally { setLoading(false); }
  };

  const handleViewStudent = async (e) => {
    e.preventDefault(); setViewMsg(""); setStudentData(null);
    try {
      const res = await axios.get(`/api/students/${viewRoll}`);
      setStudentData(res.data);
    } catch (err) { setViewMsg(err.response?.data?.error || "Student not found"); }
  };

  const classLabel = {
    slow_learner: { label: "Slow Learner", cls: "badge-slow" },
    average: { label: "Average", cls: "badge-average" },
    fast_learner: { label: "Fast Learner", cls: "badge-fast" },
    not_tested: { label: "Not Tested", cls: "badge-default" },
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="welcome-banner">
          <div>
            <h1 className="welcome-title">Welcome, {user.name || "Student"} 👋</h1>
            <p className="welcome-sub">Manage student records and track academic performance</p>
          </div>
          <div className="quick-nav">
            <button className="btn btn-outline" onClick={() => navigate("/skillgap")}>🔍 Skill Gap</button>
            <button className="btn btn-primary" onClick={() => navigate("/roadmap")}>🗺️ Roadmap</button>
          </div>
        </div>

        <div className="stats-row">
          {[
            { icon: "📊", label: "Track Scores", desc: "Add subject scores" },
            { icon: "🔍", label: "Skill Analysis", desc: "Find skill gaps", action: () => navigate("/skillgap") },
            { icon: "🗺️", label: "Roadmaps", desc: "Learning plans", action: () => navigate("/roadmap") },
            { icon: "🧠", label: "Quizzes", desc: "Self-assessment", action: () => navigate("/quiz") },
          ].map((s, i) => (
            <div key={i} className="stat-card" onClick={s.action} style={{ cursor: s.action ? "pointer" : "default" }}>
              <span className="stat-icon">{s.icon}</span>
              <div><div className="stat-label">{s.label}</div><div className="stat-desc">{s.desc}</div></div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div className="card">
            <h3 className="card-title">📝 Register New Student</h3>
            <form onSubmit={handleRegister}>
              <div className="form-group"><label>Roll Number</label><input type="text" placeholder="e.g. 22GH1A0501" value={roll} onChange={e => setRoll(e.target.value)} required /></div>
              <div className="form-group"><label>Full Name</label><input type="text" placeholder="Student name" value={name} onChange={e => setName(e.target.value)} required /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="student@example.com" value={email} onChange={e => setEmail(e.target.value)} required /></div>
              {regMsg.text && <div className={`alert alert-${regMsg.type}`}>{regMsg.text}</div>}
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Registering..." : "Register Student"}</button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">📈 Add Subject Score</h3>
            <form onSubmit={handleAddScore}>
              <div className="form-group"><label>Roll Number</label><input type="text" placeholder="e.g. 22GH1A0501" value={scoreRoll} onChange={e => setScoreRoll(e.target.value)} required /></div>
              <div className="form-group"><label>Subject</label><input type="text" placeholder="e.g. Mathematics" value={subject} onChange={e => setSubject(e.target.value)} required /></div>
              <div className="form-group"><label>Score (0–100)</label><input type="number" min="0" max="100" placeholder="e.g. 75" value={score} onChange={e => setScore(e.target.value)} required /></div>
              {scoreMsg.text && <div className={`alert alert-${scoreMsg.type}`}>{scoreMsg.text}</div>}
              {classification && (
                <div className="classification-box">
                  <span>Classification: </span>
                  <span className={`badge ${classLabel[classification.classification]?.cls}`}>{classLabel[classification.classification]?.label}</span>
                  <span style={{ marginLeft: 8, fontSize: 13, color: "var(--text-muted)" }}>Avg: {classification.average}</span>
                </div>
              )}
              <button type="submit" className="btn btn-success" disabled={loading}>{loading ? "Adding..." : "Add Score"}</button>
            </form>
          </div>

          <div className="card">
            <h3 className="card-title">👤 View Student Profile</h3>
            <form onSubmit={handleViewStudent}>
              <div className="form-group"><label>Roll Number</label><input type="text" placeholder="e.g. 22GH1A0501" value={viewRoll} onChange={e => setViewRoll(e.target.value)} required /></div>
              {viewMsg && <div className="alert alert-error">{viewMsg}</div>}
              <button type="submit" className="btn btn-outline">Search Student</button>
            </form>
            {studentData && (
              <div className="student-profile">
                <div className="profile-row"><strong>Name:</strong> {studentData.name}</div>
                <div className="profile-row"><strong>Email:</strong> {studentData.email}</div>
                <div className="profile-row"><strong>Classification:</strong> <span className={`badge ${classLabel[studentData.classification]?.cls}`}>{classLabel[studentData.classification]?.label}</span></div>
                {studentData.scores.length > 0 && (
                  <table className="score-table">
                    <thead><tr><th>Subject</th><th>Score</th></tr></thead>
                    <tbody>
                      {studentData.scores.map((s, i) => (
                        <tr key={i}>
                          <td>{s.subject}</td>
                          <td><span className={`badge ${s.score >= 60 ? "badge-fast" : s.score >= 40 ? "badge-average" : "badge-slow"}`}>{s.score}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
