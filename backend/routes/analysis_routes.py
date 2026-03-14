from flask import Blueprint, request, jsonify
from backend.utils.skill_analyzer import analyze_skill_gap

analysis_bp = Blueprint("analysis_bp", __name__)

@analysis_bp.route("/gap", methods=["POST"])
def skill_gap():
    data = request.get_json()
    roll = data.get("roll")
    current_skills = data.get("skills", [])
    target_job = data.get("job")

    if not roll or not current_skills or not target_job:
        return jsonify({"error": "roll, skills and job are required"}), 400

    gap = analyze_skill_gap(current_skills, target_job)
    return jsonify({
        "roll": roll,
        "target_job": target_job,
        "gap": gap
    })

