from flask import Blueprint, request, jsonify

student_bp = Blueprint("student_bp", __name__)

students = {}

@student_bp.route("/register", methods=["POST"])
def register_student():
    data = request.get_json()
    roll = data.get("roll")
    name = data.get("name")
    email = data.get("email")

    if not roll or not name or not email:
        return jsonify({"error": "Roll, name and email are required"}), 400

    if roll in students:
        return jsonify({"error": "Student with this roll number already exists"}), 400

    students[roll] = {
        "name": name,
        "email": email,
        "scores": [],
        "classification": "not_tested"
    }
    return jsonify({"message": "Student registered successfully", "roll": roll}), 201


@student_bp.route("/<roll>", methods=["GET"])
def get_student(roll):
    student = students.get(roll)
    if not student:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(student)


@student_bp.route("/<roll>/score", methods=["POST"])
def add_score(roll):
    data = request.get_json()
    subject = data.get("subject")
    score = data.get("score")

    if subject is None or score is None:
        return jsonify({"error": "Subject and score are required"}), 400

    student = students.get(roll)
    if not student:
        return jsonify({"error": "Student not found"}), 404

    student["scores"].append({"subject": subject, "score": score})

    avg = sum(s["score"] for s in student["scores"]) / len(student["scores"])
    if avg < 40:
        student["classification"] = "slow_learner"
    elif avg < 60:
        student["classification"] = "average"
    else:
        student["classification"] = "fast_learner"

    return jsonify({
        "message": "Score added",
        "average": round(avg, 2),
        "classification": student["classification"]
    })


@student_bp.route("/all", methods=["GET"])
def get_all_students():
    return jsonify({"students": students})
