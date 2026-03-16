const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

const SECRET = "your-secret-key";
const USERS = [];

router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const existing = USERS.find(u => u.email === email);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: USERS.length + 1, email, name, password: hashed };
  USERS.push(user);

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  return res.json({ message: "User registered", token, user: { id: user.id, email: user.email, name } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  return res.json({ message: "Login successful", token, user: { id: user.id, email: user.email, name: user.name } });
});

module.exports = router;

