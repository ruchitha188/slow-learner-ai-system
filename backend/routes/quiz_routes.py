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
            "question": "Which of these is NOT a data type in JavaScript?",
            "options": ["Number", "String", "Boolean", "Function"],
            "correct": 3
        },
        {
            "question": "How do you write a comment in JavaScript?",
            "options": ["# This is a comment", "// This is a comment", "<!-- comment -->", "** comment **"],
            "correct": 1
        },
        {
            "question": "Which method adds an item to the end of an array?",
            "options": ["push()", "pop()", "shift()", "unshift()"],
            "correct": 0
        }
    ],
    "beginner_python": [
        {
            "question": "How do you print in Python?",
            "options": ["echo('Hello')", "console.log('Hello')", "print('Hello')", "System.out.println('Hello')"],
            "correct": 2
        },
        {
            "question": "What symbol is used for comments in Python?",
            "options": ["//", "/*", "#", "--"],
            "correct": 2
        },
        {
            "question": "How do you create a list in Python?",
            "options": ["list = {1,2,3}", "list = (1,2,3)", "list = [1,2,3]", "list = <1,2,3>"],
            "correct": 2
        }
    ],
    "web_basics": [
        {
            "question": "What does HTML stand for?",
            "options": [
                "HyperText Markup Language",
                "HighText Machine Language",
                "HyperText Machine Language",
                "HyperTool Markup Language"
            ],
            "correct": 0
        },
        {
            "question": "Which HTML tag is used for the largest heading?",
            "options": ["<h6>", "<heading>", "<h1>", "<head>"],
            "correct": 2
        },
        {
            "question": "What does CSS stand for?",
            "options": ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            "correct": 1
        }
    ]
}

@quiz_bp.route("/<quiz_id>", methods=["GET"])
def get_quiz(quiz_id):
    quiz = QUIZZES.get(quiz_id)
    if not quiz:
        return jsonify({"error": f"Quiz '{quiz_id}' not found"}), 404
    return jsonify({"quiz_id": quiz_id, "questions": quiz})


@quiz_bp.route("/all", methods=["GET"])
def get_all_quizzes():
    return jsonify({"quizzes": list(QUIZZES.keys())})
