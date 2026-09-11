from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from app.models.attempt import Attempt
from app.models.evaluation import Evaluation
from typing import Any, Dict

async def create_attempt(db: AsyncSession, attempt_data: dict) -> Attempt:
    # Get last attempt number
    result = await db.execute(
        select(Attempt)
        .where(Attempt.problem_id == attempt_data["problem_id"])
        # if user_id is supported, filter by it here
        .order_by(desc(Attempt.attempt_number))
    )
    last_attempt = result.scalars().first()
    attempt_number = (last_attempt.attempt_number + 1) if last_attempt else 1

    attempt_data["attempt_number"] = attempt_number
    db_attempt = Attempt(**attempt_data)
    db.add(db_attempt)
    await db.commit()
    await db.refresh(db_attempt)
    return db_attempt

async def create_evaluation(db: AsyncSession, attempt_id: int) -> Evaluation:
    db_evaluation = Evaluation(attempt_id=attempt_id, status="Evaluating")
    db.add(db_evaluation)
    await db.commit()
    await db.refresh(db_evaluation)
    return db_evaluation

async def update_evaluation(db: AsyncSession, attempt_id: int, status: str, score: int = None, feedback: dict = None):
    result = await db.execute(select(Evaluation).where(Evaluation.attempt_id == attempt_id))
    db_eval = result.scalars().first()
    if db_eval:
        db_eval.status = status
        db_eval.overall_score = score
        db_eval.feedback_json = feedback
        await db.commit()
        await db.refresh(db_eval)
    return db_eval

async def get_evaluation_by_attempt_id(db: AsyncSession, attempt_id: int):
    result = await db.execute(select(Evaluation).where(Evaluation.attempt_id == attempt_id))
    return result.scalars().first()

async def get_attempts_history(db: AsyncSession): # Optionally pass user_id/problem_id
    result = await db.execute(
        select(Attempt).order_by(desc(Attempt.created_at))
    )
    attempts = result.scalars().all()
    # Eager loading is better, but for simplicity we'll fetch evals later or use joinedload
    history = []
    for attempt in attempts:
        eval_res = await db.execute(select(Evaluation).where(Evaluation.attempt_id == attempt.id))
        evaluation = eval_res.scalars().first()
        history.append({
            "attempt_id": attempt.id,
            "attempt_number": attempt.attempt_number,
            "problem_id" : attempt.problem_id,
            "score": evaluation.overall_score if evaluation else None,
            "created_at": attempt.created_at,
            "status": evaluation.status if evaluation else "Unknown"
        })
    return history
