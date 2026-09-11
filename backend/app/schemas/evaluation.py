from pydantic import BaseModel
from typing import Any, Dict, Optional

class EvaluationResponse(BaseModel):
    status: str
    score: Optional[int] = None
    feedback: Optional[Dict[str, Any]] = None

    class Config:
        from_attributes = True
