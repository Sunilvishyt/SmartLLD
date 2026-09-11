from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.db import get_db
from app.schemas.evaluation import EvaluationResponse
from app.services import evaluation_service

router = APIRouter(prefix="/evaluation", tags=["Evaluation"])

@router.get("/{attempt_id}", response_model=EvaluationResponse)
async def get_evaluation(attempt_id: int, db: AsyncSession = Depends(get_db)):
    evaluation = await evaluation_service.get_evaluation(db, attempt_id)
    if not evaluation:
        raise HTTPException(status_code=404, detail="Evaluation not found")
        
    return EvaluationResponse(
        status=evaluation.status,
        score=evaluation.overall_score,
        feedback=evaluation.feedback_json
    )
