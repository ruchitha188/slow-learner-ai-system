import React, { useEffect, useState } from "react";
import axios from "axios";

function RoadmapPage() {
  const [job, setJob] = useState("web_developer");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      setError("");
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/roadmap/${job}`
        );
        setRoadmap(res.data.roadmap);
      } catch (err) {
        setError(
          "Failed to load roadmap. Check if backend is running."
        );
        setRoadmap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [job]);

  return (
    <div className="container page">
      <h2>Job Roadmap</h2>

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

      {loading && <p>Loading roadmap...</p>}
      {error && <div className="error">{error}</div>}

      {roadmap && (
        <div className="roadmap-list">
          <h3>Steps to reach this job:</h3>
          <ol>
            {roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default RoadmapPage;

