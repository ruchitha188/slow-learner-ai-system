# System Architecture

| Part | Tech | Port |
|------|------|------|
| Frontend | React.js | 3000 |
| Backend API | Python Flask | 5000 |
| Auth Server | Node.js + JWT | 3001 |

## Flow
- User logs in → Node.js auth → gets JWT token
- Dashboard → Flask backend → student data
- Skill Gap → Flask /api/analysis/gap
- Roadmap → Flask /api/roadmap/:job
- Quiz → Flask /api/quiz/:quiz_id

## Student Classification
- Score < 40 → slow_learner
- Score 40–60 → average
- Score > 60 → fast_learner
