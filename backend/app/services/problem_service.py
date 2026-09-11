from app.repository.problem_repo import get_all_problems, get_problem_by_id

def get_problems() -> list:
    return get_all_problems()

def get_problem(problem_id: str) -> dict | None:
    return get_problem_by_id(problem_id)
