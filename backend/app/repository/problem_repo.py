"""
Problem repository — reads from static hardcoded data, not the database.
"""
from app.data.problems import get_all_problems, get_problem_by_id

__all__ = ["get_all_problems", "get_problem_by_id"]
