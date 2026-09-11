from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import BackgroundTasks, HTTPException
from app.repository import attempt_repo
from app.schemas.attempt import AttemptCreate
from app.services.evaluation_service import run_evaluation_background
from app.data.problems import get_problem_by_id

async def submit_attempt(db: AsyncSession, attempt: AttemptCreate, background_tasks: BackgroundTasks):
    # Validate that the problem exists in the hardcoded store
    problem = get_problem_by_id(attempt.problem_id)
    if not problem:
        raise HTTPException(status_code=404, detail=f"Problem '{attempt.problem_id}' not found.")

    # Map schema field `code` to model field `submitted_code`
    attempt_data = {
        "problem_id": attempt.problem_id,
        "language": attempt.language,
        "submitted_code": attempt.code,
    }

    db_attempt = await attempt_repo.create_attempt(db, attempt_data)
    db_eval = await attempt_repo.create_evaluation(db, db_attempt.id)

    background_tasks.add_task(
        run_evaluation_background,
        attempt_id=db_attempt.id,
        problem_id=attempt.problem_id,
        language=attempt.language,
        code=attempt.code
    )

    return {"attempt_id": db_attempt.id, "status": db_eval.status}

async def get_history(db: AsyncSession):
    return await attempt_repo.get_attempts_history(db)
