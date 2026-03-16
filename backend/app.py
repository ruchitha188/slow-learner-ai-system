from flask import Flask, jsonify
from flask_cors import CORS
from routes.student_routes import student_bp
from routes.analysis_routes import analysis_bp
from routes.roadmap_routes import roadmap_bp
from routes.quiz_routes import quiz_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(student_bp, url_prefix="/api/students")
app.register_blueprint(analysis_bp, url_prefix="/api/analysis")
app.register_blueprint(roadmap_bp, url_prefix="/api/roadmap")
app.register_blueprint(quiz_bp, url_prefix="/api/quiz")

@app.route("/api/test")
def test():
    return jsonify({
        "message": "Backend is working!",
        "project": "AI System to Identify and Support Slow Learners"
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
