README.md
md# 🎓 AI System to Identify and Support Slow Learners

A mini project for 2-2 Semester — helps college students track performance,
identify skill gaps, and get learning roadmaps to crack placement jobs.

## 🗂️ Project Structureslow-learner-ai-system/
├── backend/           → Python Flask API (port 5000)
├── node-server/       → Node.js Auth Server (port 3001)
├── frontend/          → React UI (port 3000)
├── docs/              → Architecture & API docs
└── scripts/           → Setup scripts

## 🚀 How to Run (3 Terminals)

**Terminal 1 — Flask Backend:**
```bashcd backend
pip install -r ../requirements.txt
python app.py

**Terminal 2 — Node Auth Server:**
```bashcd node-server
npm install
node index.js

**Terminal 3 — React Frontend:**
```bashcd frontend
npm install
npm start

Open http://localhost:3000 in your browser.

## 👥 Team Split

| Member | Branch | Responsibility |
|--------|--------|----------------|
| Member 1 | feature/react-frontend | Dashboard, pages in React |
| Member 2 | feature/flask-api | Flask routes, skill analyzer |
| Member 3 | feature/node-auth | Login/register with JWT |
| Member 4 | feature/ml-model | scikit-learn + docs |

## 🛠️ Features
- 📊 Student performance tracking
- 🔍 Skill gap analysis by job role
- 🗺️ Learning roadmaps
- 🧠 Self-assessment quiz
- 🔐 JWT-based authentication
