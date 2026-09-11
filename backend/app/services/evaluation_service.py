import logging
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.db import async_session_maker
from app.repository import attempt_repo
from app.data.problems import get_problem_by_id
from app.ai.evaluator import evaluate_submission

logger = logging.getLogger(__name__)

async def run_evaluation_background(attempt_id: int, problem_id: str, language: str, code: str):
    """Runs in the background after the attempt is saved."""
    async with async_session_maker() as db:
        try:
            problem = get_problem_by_id(problem_id)
            if not problem:
                await attempt_repo.update_evaluation(
                    db, attempt_id, status="Failed",
                    feedback={"error": f"Problem '{problem_id}' not found."}
                )
                return

            result = await evaluate_submission(
                title=problem["title"],
                requirements=problem["requirements"],
                language=language,
                code=code
            )

            await attempt_repo.update_evaluation(
                db,
                attempt_id,
                status="Completed",
                score=result.overall_score,
                feedback=result.model_dump()
            )
        except Exception as e:
            logger.error(f"Evaluation failed for attempt {attempt_id}: {e}")
            await attempt_repo.update_evaluation(
                db, attempt_id, status="Failed", feedback={"error": str(e)}
            )

async def get_evaluation(db: AsyncSession, attempt_id: int):
    return await attempt_repo.get_evaluation_by_attempt_id(db, attempt_id)
