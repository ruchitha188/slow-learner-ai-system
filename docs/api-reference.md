# API Reference

## Flask Backend — Port 5000

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/test | Test if backend works |
| POST | /api/students/register | Register a new student |
| GET | /api/students/:roll | Get student profile |
| POST | /api/students/:roll/score | Add a score |
| POST | /api/analysis/gap | Analyze skill gap |
| GET | /api/roadmap/:job | Get job roadmap |
| GET | /api/quiz/:quiz_id | Get quiz questions |

## Node Auth — Port 3001

| Method | URL | What it does |
|--------|-----|--------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
