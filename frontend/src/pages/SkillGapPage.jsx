import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./SkillGapPage.css";

function SkillGapPage() {
  const [roll, setRoll] = useState("");
  const [skills, setSkills] = useState("");
  const [job, setJob] = useState("web_developer");
  const [gap, setGap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const jobSkillHints = {
    web_developer: "Needs: html, css, javascript, react, git",
    data_analyst: "Needs: python, pandas, sql, matplotlib",
    full_stack_backend: "Needs: python, flask, node, database, authentication",
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError(""); setGap(null); setLoading(true);
    try {
      const skillList = skills.split(",").map(s => s.trim()).filter(s => s.length > 0);
      const res = await axios.post("/api/analysis/gap", { roll, skills: skillList, job });
      setGap(res.data.gap);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to analyze. Is the backend running?");
    } finally { setLoading(false); }
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2 className="page-title">🔍 Skill Gap Analysis</h2>
          <p className="page-desc">Enter your current skills and target job to find out what you're missing</p>
        </div>
        <div className="gap-layout">
          <div className="card">
            <h3 className="card-title">Analyze My Skills</h3>
            <form onSubmit={handleAnalyze}>
              <div className="form-group"><label>Roll Number</label><input type="text" placeholder="e.g. 22GH1A0501" value={roll} onChange={e => setRoll(e.target.value)} required /></div>
              <div className="form-group">
                <label>Target Job</label>
                <select value={job} onChange={e => setJob(e.target.value)}>
                  <option value="web_developer">Web Developer</option>
                  <option value="data_analyst">Data Analyst</option>
                  <option value="full_stack_backend">Full-Stack Backend</option>
                </select>
                <p className="hint">{jobSkillHints[job]}</p>
              </div>
              <div className="form-group">
                <label>Your Current Skills</label>
                <input type="text" placeholder="e.g. html, css, javascript" value={skills} onChange={e => setSkills(e.target.value)} required />
                <p className="hint">Separate skills with commas</p>
              </div>
              {error && <div className="alert alert-error">{error}</div>}
              <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Analyzing..." : "Analyze Skill Gap"}</button>
            </form>
          </div>

          {gap && (
            <div className="card gap-result">
              <h3 className="card-title">📊 Results</h3>
              <div className="progress-section">
                <div className="progress-label"><span>Readiness</span><strong>{gap.percent_complete}%</strong></div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: `${gap.percent_complete}%` }} /></div>
              </div>
              <div className="skill-section">
                <h4 className="skill-section-title missing">❌ Missing Skills ({gap.missing.length})</h4>
                {gap.missing.length === 0 ? <p className="skill-ok">🎉 You have all required skills!</p> : (
                  <div className="skill-tags">{gap.missing.map((s, i) => <span key={i} className="skill-tag missing-tag">{s}</span>)}</div>
                )}
              </div>
              {gap.matched && gap.matched.length > 0 && (
                <div className="skill-section">
                  <h4 className="skill-section-title matched">✅ Skills You Have ({gap.matched.length})</h4>
                  <div className="skill-tags">{gap.matched.map((s, i) => <span key={i} className="skill-tag matched-tag">{s}</span>)}</div>
                </div>
              )}
              {gap.extra && gap.extra.length > 0 && (
                <div className="skill-section">
                  <h4 className="skill-section-title extra">➕ Extra Skills</h4>
                  <div className="skill-tags">{gap.extra.map((s, i) => <span key={i} className="skill-tag extra-tag">{s}</span>)}</div>
                </div>
              )}
              {gap.missing.length > 0 && <div className="gap-tip">💡 Go to Roadmap page to learn how to gain these missing skills!</div>}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SkillGapPage;
