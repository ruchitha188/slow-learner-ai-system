from flask import Blueprint, jsonify

roadmap_bp = Blueprint("roadmap_bp", __name__)

JOB_ROADMAPS = {
    "web_developer": [
        "Learn HTML basics — headings, links, forms, tables",
        "Learn CSS — flexbox, grid, responsive design",
        "Learn JavaScript — variables, loops, functions, DOM",
        "Learn React basics — components, props, useState",
        "Build 3 small projects (portfolio, todo app, weather app)",
        "Learn Git and GitHub — commit, push, pull, branches",
        "Create 1 portfolio project and deploy on Netlify or Vercel"
    ],
    "data_analyst": [
        "Learn Python basics — variables, loops, functions",
        "Learn pandas — DataFrames, filtering, groupby",
        "Learn matplotlib and seaborn — charts, plots",
        "Work on 2 real datasets from Kaggle",
        "Learn SQL basics — SELECT, JOIN, GROUP BY",
        "Create a data analysis portfolio on GitHub",
        "Practice 20 SQL problems on HackerRank"
    ],
    "full_stack_backend": [
        "Learn Python Flask or Node.js Express basics",
        "Build a simple CRUD REST API",
        "Connect API to SQLite or MongoDB database",
        "Add user authentication with JWT",
        "Learn Docker basics",
        "Deploy your backend on Render or Railway",
        "Create one full-stack project combining frontend + backend"
    ]
}

@roadmap_bp.route("/<job>", methods=["GET"])
def get_roadmap(job):
    roadmap = JOB_ROADMAPS.get(job)
    if not roadmap:
        return jsonify({"error": f"No roadmap found for job: {job}"}), 404
    return jsonify({"job": job, "roadmap": roadmap})


@roadmap_bp.route("/all", methods=["GET"])
def get_all_roadmaps():
    return jsonify({"jobs": list(JOB_ROADMAPS.keys())})
