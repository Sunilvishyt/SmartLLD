from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AttemptCreate(BaseModel):
    problem_id: str   # slug, e.g. "parking-lot"
    language: str
    code: str

class AttemptResponse(BaseModel):
    attempt_id: int
    status: str

class AttemptHistoryResponse(BaseModel):
    attempt_id: int
    attempt_number: int
    score: Optional[int]
    created_at: datetime
    status: str

    class Config:
        from_attributes = True
