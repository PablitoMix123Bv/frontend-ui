import os


class Settings:
    env: str = os.getenv("ENV", "development")
    cors_origins: list[str] = os.getenv(
        "CORS_ORIGINS", "http://localhost:5000,http://localhost:5173"
    ).split(",")


settings = Settings()
