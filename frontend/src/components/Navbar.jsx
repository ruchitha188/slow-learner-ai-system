import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container container">
        <h2>Slow Learner AI System</h2>
        <div>
          <a className="nav-link" href="/">Login</a>
          <a className="nav-link" href="/dashboard">Dashboard</a>
          <a className="nav-link" href="/skillgap">Skill Gap</a>
          <a className="nav-link" href="/roadmap">Roadmap</a>
          <a className="nav-link" href="/quiz">Quiz</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

