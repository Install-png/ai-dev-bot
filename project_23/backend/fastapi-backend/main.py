python
import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from app.core.database import database, engine, Base
from app.core.websocket_manager import manager
from app.api.v1.routers import api_router
from app.models.user import User  # Import User model to ensure table creation
from app.models.event import Event # Import Event model
from app.models.damage import Damage # Import Damage model
from app.models.force import Force # Import Force model
import random
import datetime

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database
    print("Initializing database...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("Database initialized.")

    # Start WebSocket broadcaster in a background task
    asyncio.create_task(broadcast_mock_data())

    yield
    # Clean up (e.g., close database connections, stop background tasks)
    print("Shutting down...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.API_V1_STR,
    description="Ситуаційний центр МВС України API",
    lifespan=lifespan,
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to MVS Situational Center API"}

# Mock data broadcasting for demonstration
async def broadcast_mock_data():
    while True:
        # KPI Update
        kpi_data = {
            "type": "kpi_update",
            "data": {
                "totalEvents": random.randint(100, 500),
                "activeEvents": random.randint(5, 50),
                "personnelInvolved": random.randint(50, 500),
                "equipmentInvolved": random.randint(10, 100),
                "estimatedDamages": random.randint(100000, 5000000),
                "casualties": random.randint(0, 20),
                "evacuated": random.randint(0, 100),
            }
        }
        await manager.broadcast_json(kpi_data)

        # New Event (Map & Live Feed)
        event_types = ['Кримінальні', 'Пожежі', 'Масові заворушення', 'Міграційні інциденти']
        regions = ['Київська область', 'Львівська область', 'Одеська область', 'Харківська область', 'Дніпропетровська область']
        event_descriptions = {
            'Кримінальні': ['Крадіжка', 'Пограбування', 'Хуліганство'],
            'Пожежі': ['Пожежа в будинку', 'Займання лісу', 'Пожежа на складі'],
            'Масові заворушення': ['Протест', 'Мітинг', 'Конфлікт'],
            'Міграційні інциденти': ['Затримання нелегалів', 'Порушення кордону'],
        }
        event_type = random.choice(event_types)
        new_event = {
            "id": f"event_{random.randint(1000, 9999)}",
            "type": event_type,
            "description": f"{random.choice(event_descriptions[event_type])} у {random.choice(regions)}",
            "lat": random.uniform(46.0, 52.0),
            "lng": random.uniform(22.0, 40.0),
            "region": random.choice(regions),
            "status": random.choice(['Активна', 'Розслідування', 'Контролюється', 'Вирішено']),
            "personnel": random.randint(5, 100)
        }
        await manager.broadcast_json({"type": "new_event", "data": new_event})
        await manager.broadcast_json({"type": "live_feed_event", "data": {
            "id": new_event["id"],
            "type": new_event["type"],
            "message": new_event["description"]
        }})

        await asyncio.sleep(settings.WEBSOCKET_BROADCAST_INTERVAL) # Broadcast every X seconds