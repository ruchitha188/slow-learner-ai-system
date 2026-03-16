import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);
    try {
      const res = await axios.post(""/api/auth/login"", {
        email: loginEmail, password: loginPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage({ text: err.response?.data?.error || "Login failed.", type: "error" });
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    setLoading(true);
    try {
      const res = await axios.post(""/api/auth/register"", {
        name: regName, email: regEmail, password: regPassword,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setMessage({ text: err.response?.data?.error || "Registration failed.", type: "error" });
    } finally { setLoading(false); }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🎓</div>
          <h1 className="login-title">SlowLearn<span>AI</span></h1>
          <p className="login-subtitle">Identify skill gaps and get a roadmap to your dream job</p>
        </div>
        <div className="login-tabs">
          <button className={`tab-btn ${isLogin ? "active" : ""}`} onClick={() => { setIsLogin(true); setMessage({ text: "", type: "" }); }}>Login</button>
          <button className={`tab-btn ${!isLogin ? "active" : ""}`} onClick={() => { setIsLogin(false); setMessage({ text: "", type: "" }); }}>Register</button>
        </div>
        {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary full-width" disabled={loading}>{loading ? "Logging in..." : "Login →"}</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your full name" value={regName} onChange={e => setRegName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Choose a password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary full-width" disabled={loading}>{loading ? "Creating account..." : "Create Account →"}</button>
          </form>
        )}
        <p className="login-footer">Mini Project — 2-2 Semester</p>
      </div>
    </div>
  );
}

export default LoginPage;
