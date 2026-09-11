from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.problem import ProblemListResponse, ProblemDetailResponse
from app.services import problem_service

router = APIRouter(prefix="/problems", tags=["Problems"])

@router.get("/", response_model=List[ProblemListResponse])
def list_problems():
    return problem_service.get_problems()

@router.get("/{problem_id}", response_model=ProblemDetailResponse)
def get_problem(problem_id: str):
    problem = problem_service.get_problem(problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail="Problem not found")
    return problem
