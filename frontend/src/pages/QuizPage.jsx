import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./QuizPage.css";

function QuizPage() {
  const [quizId, setQuizId] = useState("beginner_js");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");

  const quizOptions = [
    { id: "beginner_js", label: "🟨 Beginner JavaScript" },
    { id: "beginner_python", label: "🐍 Beginner Python" },
    { id: "web_basics", label: "🌐 Web Basics" },
  ];

  useEffect(() => {
    const fetchQuiz = async () => {
      setError(""); setQuiz(null); setSubmitted(false); setScore(0);
      try {
        const res = await axios.get(`/api/quiz/${quizId}`);
        setQuiz(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) { setError("Failed to load quiz. Is the backend running?"); }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswer = (qi, oi) => {
    if (submitted) return;
    const updated = [...answers]; updated[qi] = oi; setAnswers(updated);
  };

  const handleSubmit = () => {
    const unanswered = answers.findIndex(a => a === null);
    if (unanswered !== -1) { alert(`Please answer question ${unanswered + 1}`); return; }
    let correct = 0;
    quiz.forEach((q, i) => { if (answers[i] === q.correct) correct++; });
    setScore(correct); setSubmitted(true);
  };

  const handleRetry = () => { setSubmitted(false); setScore(0); setAnswers(quiz ? new Array(quiz.length).fill(null) : []); };

  const getResult = () => {
    const pct = quiz ? Math.round((score / quiz.length) * 100) : 0;
    if (pct === 100) return { label: "Perfect Score! 🎉", cls: "result-perfect" };
    if (pct >= 60) return { label: "Good Job! 👍", cls: "result-good" };
    return { label: "Keep Practicing! 💪", cls: "result-low" };
  };

  return (
    <>
      <Navbar />
      <div className="container page">
        <div className="page-header">
          <h2 className="page-title">🧠 Self-Assessment Quiz</h2>
          <p className="page-desc">Test your knowledge to understand where you stand</p>
        </div>
        <div className="quiz-selector">
          {quizOptions.map(opt => (
            <button key={opt.id} className={`quiz-tab ${quizId === opt.id ? "active" : ""}`} onClick={() => setQuizId(opt.id)}>{opt.label}</button>
          ))}
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {!quiz && !error && <p style={{ color: "var(--text-muted)" }}>Loading quiz...</p>}
        {submitted && quiz && (
          <div className={`result-banner ${getResult().cls}`}>
            <div className="result-main"><span className="result-label">{getResult().label}</span><span className="result-score">{score} / {quiz.length}</span></div>
            <div className="progress-bar" style={{ maxWidth: 300 }}><div className="progress-fill" style={{ width: `${(score / quiz.length) * 100}%` }} /></div>
            <button className="btn btn-outline retry-btn" onClick={handleRetry}>🔄 Try Again</button>
          </div>
        )}
        {quiz && (
          <div className="quiz-questions">
            {quiz.map((q, i) => (
              <div key={i} className="question-card card">
                <div className="q-number">Q{i + 1}</div>
                <div className="q-text">{q.question}</div>
                <div className="q-options">
                  {q.options.map((opt, j) => {
                    let cls = "option";
                    if (submitted) { if (j === q.correct) cls += " correct"; else if (answers[i] === j) cls += " wrong"; }
                    else if (answers[i] === j) cls += " selected";
                    return (
                      <button key={j} className={cls} onClick={() => handleAnswer(i, j)} disabled={submitted}>
                        <span className="opt-letter">{String.fromCharCode(65 + j)}</span>
                        <span>{opt}</span>
                        {submitted && j === q.correct && <span className="opt-icon">✓</span>}
                        {submitted && answers[i] === j && j !== q.correct && <span className="opt-icon">✗</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!submitted && <button className="btn btn-primary submit-btn" onClick={handleSubmit}>Submit Quiz →</button>}
          </div>
        )}
      </div>
    </>
  );
}

export default QuizPage;
