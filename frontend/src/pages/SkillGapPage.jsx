import React, { useState } from "react";
import axios from "axios";

function SkillGapPage() {
  const [roll, setRoll] = useState("");
  const [skills, setSkills] = useState(""); // comma‑separated string
  const [job, setJob] = useState("web_developer");
  const [gap, setGap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setLoading(true);
    try {
      const skillList = skills
        .split(",")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const res = await axios.post("http://localhost:5000/api/analysis/gap", {
        roll,
        skills: skillList,
        job,
      });

      setGap(res.data.gap);
    } catch (err) {
      setError("Failed to analyze skill gap. Check backend and network.");
      setGap(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page">
      <h2>Skill Gap Analysis</h2>

      <div className="form-group">
        <label>Roll Number:</label>
        <input
          type="text"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          placeholder="e.g., 22GH1A0501"
        />
      </div>

      <div className="form-group">
        <label>Your Skills (comma‑separated):</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="html, css, javascript, python"
        />
      </div>

      <div className="form-group">
        <label>Target Job:</label>
        <select value={job} onChange={(e) => setJob(e.target.value)}>
          <option value="web_developer">Web Developer</option>
          <option value="data_analyst">Data Analyst</option>
          <option value="full_stack_backend">
            Full‑Stack Backend
          </option>
        </select>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="button"
      >
        {loading ? "Analyzing..." : "Analyze Skill Gap"}
      </button>

      {error && <div className="error">{error}</div>}

      {gap && (
        <div className="gap-result">
          <h3>Missing Skills</h3>
          <ul>
            {gap.missing.length === 0 ? (
              <li>No skills missing for this role — you’re on track!</li>
            ) : (
              gap.missing.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))
            )}
          </ul>

          <h3>Extra Skills</h3>
          <ul>
            {gap.extra.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>

          <h3>Progress</h3>
          <p>
            You are <strong>{gap.percent_complete}%</strong> complete
            for this role.
          </p>
        </div>
      )}
    </div>
  );
}

export default SkillGapPage;

