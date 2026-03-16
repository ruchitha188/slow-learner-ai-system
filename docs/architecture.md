# System Architecture

## Overview
This project is a **three‑part stack**:

- **Frontend**: React app for UI (login, dashboard, skill gap, roadmap, quiz).
- **Python backend**: Flask server for student data, skill‑gap analysis, and roadmaps.
- **Node.js server**: Handles authentication (JWT login/register).

## Data flow

1. **Frontend** → **Node auth**:
   - Students log in or register → receive a JWT token.

2. **Frontend** → **Flask backend**:
   - Get/analyze student performance → generate skill‑gap score.
   - Fetch job‑based learning roadmap.
   - Take quizzes and submit answers.

3. **Flask backend** → itself:
   - Store student scores and skills (in‑memory).
   - Run simple rule‑based skill‑gap analysis (can be upgraded with ML later).

