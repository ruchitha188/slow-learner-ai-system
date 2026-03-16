const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();
const SECRET = "slow-learner-secret-key-2024";
const USERS = [];

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email and password are required" });
  }

  const existing = USERS.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "User already exists with this email" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: USERS.length + 1, email, name, password: hashed };
  USERS.push(user);

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1d" });

  return res.json({
    message: "User registered successfully",
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = USERS.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1d" });

  return res.json({
    message: "Login successful",
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

module.exports = router;
