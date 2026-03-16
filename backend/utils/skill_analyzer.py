def analyze_skill_gap(current_skills, target_job):
    # Dummy mapping; you can expand later
    required_skills = {
        "web_developer": {"html", "css", "javascript", "react", "git"},
        "data_analyst": {"python", "pandas", "sql", "matplotlib"},
        "full_stack_backend": {"python", "flask", "node", "database", "authentication"}
    }

    req = required_skills.get(target_job.lower(), set())
    current = set(s.lower() for s in current_skills)

    missing = req - current
    extra = current - req

    return {
        "missing": list(missing),
        "extra": list(extra),
        "percent_complete": int(100 * len(current & req) / len(req)) if req else 0
    }

