python
import random
from fastapi import APIRouter, Depends
from app.core.security import RoleChecker

router = APIRouter()

@router.get("/kpis", dependencies=[Depends(RoleChecker(["оператор", "аналітик", "керівник", "адміністратор"]))])
async def get_dashboard_kpis():
    """
    Provides mock KPI data for the dashboard.
    In a real application, this would fetch aggregated data from the database.
    """
    return {
        "totalEvents": random.randint(100, 500),
        "activeEvents": random.randint(5, 50),
        "personnelInvolved": random.randint(50, 500),
        "equipmentInvolved": random.randint(10, 100),
        "estimatedDamages": random.randint(100000, 5000000),
        "casualties": random.randint(0, 20),
        "evacuated": random.randint(0, 100),
    }

@router.get("/threat_level", dependencies=[Depends(RoleChecker(["оператор", "аналітик", "керівник", "адміністратор"]))])
async def get_current_threat_level():
    """
    Returns the current simulated threat level.
    """
    threat_levels = ["зелений", "жовтий", "червоний"]
    return {"threat_level": random.choice(threat_levels)}

# Placeholder for AI analytics endpoint
@router.get("/analytics/ai_forecast", dependencies=[Depends(RoleChecker(["аналітик", "керівник", "адміністратор"]))])
async def get_ai_forecast():
    return {
        "prediction_events_7_days": random.randint(200, 400),
        "risk_assessment": "Середній",
        "anomalies_detected": ["Виявлено сплеск кримінальних подій у північних регіонах"],
        "trend_analysis": "Зростання кіберзлочинності на 10% за останній місяць"
    }