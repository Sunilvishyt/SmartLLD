from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartLLD Backend"

    # Matches the POSTGRES_URL key in .env
    # Pydantic-settings is case-insensitive, so POSTGRES_URL → postgres_url
    POSTGRES_URL: str = "sqlite+aiosqlite:///./smartlld.db"

    GEMINI_API_KEY: str = ""

    @property
    def DATABASE_URL(self) -> str:
        """
        Return an async-compatible connection URL.
        Converts plain postgresql:// → postgresql+asyncpg://
        sqlite URLs are left as-is.
        """
        url = self.POSTGRES_URL
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        return url  # e.g. already has +asyncpg or is sqlite

    class Config:
        env_file = ".env"
        extra = "ignore"    # Silently ignore any .env keys we don't declare

settings = Settings()
