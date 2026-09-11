from pydantic import BaseModel, Field
from typing import List

class CategoryScore(BaseModel):
    category: str = Field(description="The evaluation category (e.g., Responsibilities, Encapsulation)")
    score: int = Field(description="Score out of 10")
    max_score: int = Field(default=10, description="Maximum possible score, usually 10")
    evidence: str = Field(description="Evidence from the code supporting the score")
    concern: str = Field(description="What is wrong or concerning based on the evidence")
    suggestion: str = Field(description="How to improve and the expected benefit")

class EvaluationOutput(BaseModel):
    overall_score: int = Field(description="Overall score out of 100")
    grade: str = Field(description="A short grade like 'Excellent', 'Good', 'Needs Improvement'")
    summary: str = Field(description="High level summary of the submission")
    category_scores: List[CategoryScore] = Field(description="Detailed scores for each category in the rubric")
    strengths: List[str] = Field(description="List of key strengths")
    weaknesses: List[str] = Field(description="List of key weaknesses")
    missing_edge_cases: List[str] = Field(description="Any missing edge cases not handled")
    possible_extensions: List[str] = Field(description="Ideas for how the design could be extended")
    next_steps: List[str] = Field(description="Recommended next steps for the learner")
    confidence: float = Field(description="Confidence score between 0.0 and 1.0")
