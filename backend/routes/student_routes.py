from flask import Blueprint, request, jsonify

student_bp = Blueprint("student_bp", __name__)

# In‑memory fake data (replace with database later)
students = {}

@student_bp.route("/register", methods=["POST"])
def register_student():
    data = request.get_json()
    roll = data.get("roll")
    name = data.get("name")
    email = data.get("email")
    if not roll or not name or not email:
        return jsonify({"error": "Roll, name and email required"}), 400
    students[roll] = {"name": name, "email": email, "scores": []}
    return jsonify({"message": "Student registered", "roll": roll}), 201

@student_bp.route("/<roll>", methods=["GET"])
def get_student(roll):
    student = students.get(roll)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student)

# Temporary helper to add score
@student_bp.route("/<roll>/score", methods=["POST"])
def add_score(roll):
    data = request.get_json()
    subject = data.get("subject")
    score = data.get("score")
    student = students.get(roll)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    if "scores" not in student:
        student["scores"] = []
    student["scores"].append({"subject": subject, "score": score})
    return jsonify({"message": "Score added", "score": score})

