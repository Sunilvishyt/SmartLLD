from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database.db import get_db
from app.schemas.attempt import AttemptCreate, AttemptResponse, AttemptHistoryResponse
from app.services import attempt_service

router = APIRouter(prefix="/attempts", tags=["Attempts"])

@router.post("/", response_model=AttemptResponse)
async def submit_attempt(
    attempt: AttemptCreate, 
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    return await attempt_service.submit_attempt(db, attempt, background_tasks)

@router.get("/history", response_model=List[AttemptHistoryResponse])
async def get_attempt_history(db: AsyncSession = Depends(get_db)):
    return await attempt_service.get_history(db)
