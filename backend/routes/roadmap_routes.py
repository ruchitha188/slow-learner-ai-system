from flask import Blueprint, jsonify

roadmap_bp = Blueprint("roadmap_bp", __name__)

JOB_ROADMAPS = {
    "web_developer": [
        "Learn HTML, CSS, JavaScript",
        "Learn React basics",
        "Build 3 small projects",
        "Learn Git and GitHub",
        "Create 1 portfolio project and deploy it"
    ],
    "data_analyst": [
        "Learn Python basics",
        "Learn pandas and matplotlib",
        "Work on 2 real datasets",
        "Learn SQL basics",
        "Create a data analysis portfolio"
    ],
    "full_stack_backend": [
        "Learn Python Flask or Node.js",
        "Build a CRUD API",
        "Connect to a database",
        "Add authentication",
        "Deploy a full‑stack project"
    ]
}

@roadmap_bp.route("/<job>", methods=["GET"])
def get_roadmap(job):
    roadmap = JOB_ROADMAPS.get(job)
    if not roadmap:
        return jsonify({"error": "No roadmap for this job"}), 404
    return jsonify({"job": job, "roadmap": roadmap})

