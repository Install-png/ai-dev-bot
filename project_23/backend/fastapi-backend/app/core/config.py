python
from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "MVS Situational Center API"
    API_V1_STR: str = "/api/v1"

    # Database settings
    DATABASE_URL: str = "postgresql+asyncpg://user:password@db:5432/mvs_situational_center" # db is service name in docker-compose
    
    # Redis settings
    REDIS_HOST: str = "redis" # redis is service name in docker-compose
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_PASSWORD: str | None = None

    # JWT settings
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_REPLACE_ME_IN_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days for demo, adjust for production

    # CORS settings
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]

    # WebSocket settings
    WEBSOCKET_BROADCAST_INTERVAL: int = 5 # seconds

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()