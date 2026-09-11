from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.routers import problems, attempts, evaluation
from app.database.db import engine, Base
# Import models so SQLAlchemy registers them for create_all
import app.models.attempt  # noqa: F401
import app.models.evaluation  # noqa: F401
import logging

logging.basicConfig(level=logging.INFO)

async def init_db():
    async with engine.begin() as conn:
        # Create all tables if they don't exist
        # Normally you would use Alembic for this
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI(title=settings.PROJECT_NAME)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(problems.router)
app.include_router(attempts.router)
app.include_router(evaluation.router)

@app.on_event("startup")
async def on_startup():
    await init_db()

@app.get("/")
def root():
    return {"message": "Welcome to SmartLLD API"}
