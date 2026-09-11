from sqlalchemy import Column, Integer, String, Text
from app.database.db import Base

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True, nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String, nullable=False)
    requirements = Column(Text, nullable=False) # Store as bulleted string or JSON
    starter_code = Column(Text, nullable=True)
    language = Column(String, nullable=False)
