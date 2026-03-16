const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/auth/test", (req, res) => {
  res.json({ message: "Node auth server is working!" });
});

app.listen(3001, () => {
  console.log("Node auth server running on port 3001");
});

