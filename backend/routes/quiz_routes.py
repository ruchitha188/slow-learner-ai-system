from flask import Blueprint, jsonify

quiz_bp = Blueprint("quiz_bp", __name__)

QUIZZES = {
    "beginner_js": [
        {
            "question": "What does 'let' do in JavaScript?",
            "options": [
                "Declares a variable with block scope",
                "Defines a constant",
                "Declares a global variable",
                "Imports a module"
            ],
            "correct": 0
        },
        {
            "question": "Which of these is NOT a data type?",
            "options": ["Number", "String", "Boolean", "Function"],
            "correct": 3
        }
    ]
}

@quiz_bp.route("/<quiz_id>", methods=["GET"])
def get_quiz(quiz_id):
    quiz = QUIZZES.get(quiz_id)
    if not quiz:
        return jsonify({"error": "Quiz not found"}), 404
    return jsonify({"quiz_id": quiz_id, "questions": quiz})

