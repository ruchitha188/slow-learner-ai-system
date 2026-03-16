def analyze_skill_gap(current_skills, target_job):
    required_skills = {
        "web_developer": {"html", "css", "javascript", "react", "git"},
        "data_analyst": {"python", "pandas", "sql", "matplotlib"},
        "full_stack_backend": {"python", "flask", "node", "database", "authentication"}
    }

    req = required_skills.get(target_job.lower(), set())

    if not req:
        return {
            "error": f"Unknown job: {target_job}",
            "missing": [],
            "extra": [],
            "percent_complete": 0
        }

    current = set(s.lower().strip() for s in current_skills)
    missing = list(req - current)
    extra = list(current - req)
    matched = list(current & req)
    percent = int(100 * len(matched) / len(req)) if req else 0

    return {
        "missing": missing,
        "extra": extra,
        "matched": matched,
        "percent_complete": percent
    }
