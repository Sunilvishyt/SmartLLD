from pydantic import BaseModel
from typing import Dict, Optional

class ProblemListResponse(BaseModel):
    id: str
    title: str
    difficulty: str

class ProblemDetailResponse(BaseModel):
    id: str
    title: str
    difficulty: str
    description: str
    requirements: str
    starter_code: Optional[Dict[str, str]] = None
