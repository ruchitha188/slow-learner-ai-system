import React, { useEffect, useState } from "react";
import axios from "axios";

function QuizPage() {
  const [quizId, setQuizId] = useState("beginner_js");
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quiz/${quizId}`
        );
        setQuiz(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(null));
      } catch (err) {
        console.error("Quiz load failed");
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correct = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });

    setScore(correct);
    setSubmitted(true);
  };

  if (!quiz) {
    return (
      <div className="container page">
        <h2>Quiz</h2>
        <p>Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="container page">
      <h2>Self‑Assessment Quiz</h2>
      <div className="form-group">
        <label>Quiz:</label>
        <select
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
        >
          <option value="beginner_js">Beginner JavaScript</option>
        </select>
      </div>

      {quiz.map((q, i) => (
        <div key={i} className="question-block">
          <h4>Q{i + 1}. {q.question}</h4>
          {q.options.map((opt, j) => (
            <div key={j} className="option">
              <label>
                <input
                  type="radio"
                  name={`q${i}`}
                  checked={answers[i] === j}
                  onChange={() => handleAnswerChange(i, j)}
                  disabled={submitted}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      {!submitted && (
        <button className="button" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}

      {submitted && (
        <div className="quiz-result">
          <h3>Result</h3>
          <p>
            You scored: <strong>{score} / {quiz.length}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default QuizPage;

