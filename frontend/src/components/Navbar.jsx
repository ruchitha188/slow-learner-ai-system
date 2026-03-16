import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const links = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/skillgap", label: "Skill Gap" },
    { path: "/roadmap", label: "Roadmap" },
    { path: "/quiz", label: "Quiz" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">
        <div className="nav-logo" onClick={() => navigate("/dashboard")}>
          <span>🎓</span>
          <span>SlowLearn<span className="logo-ai">AI</span></span>
        </div>
        <div className="nav-links">
          {links.map((link) => (
            <button
              key={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="nav-right">
          {user && <span className="nav-user">👤 {user.name}</span>}
          <button className="btn btn-outline nav-logout" onClick={handleLogout}>Logout</button>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          {links.map((link) => (
            <button
              key={link.path}
              className={`mobile-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
            >
              {link.label}
            </button>
          ))}
          <button className="mobile-link logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
