from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.db import Base

class Attempt(Base):
    __tablename__ = "attempts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True, nullable=True)   # Optional for now
    # problem_id is a slug (e.g. "parking-lot"), not a DB FK — problems are hardcoded
    problem_id = Column(String, nullable=False, index=True)
    language = Column(String, nullable=False)
    submitted_code = Column(Text, nullable=False)
    attempt_number = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    evaluation = relationship("Evaluation", back_populates="attempt", uselist=False)
