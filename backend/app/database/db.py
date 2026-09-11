from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base
from app.config.settings import settings

_db_url = settings.DATABASE_URL

engine = create_async_engine(
    _db_url,
    echo=True,
    future=True,
    connect_args={"check_same_thread": False} if _db_url.startswith("sqlite") else {}
)

async_session_maker = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with async_session_maker() as session:
        yield session
