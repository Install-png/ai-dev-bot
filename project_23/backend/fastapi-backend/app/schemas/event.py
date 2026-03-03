python
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class EventBase(BaseModel):
    event_type: str = Field(..., examples=["Кримінальні"])
    description: str = Field(..., examples=["Збройне пограбування банку"])
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)
    region: str = Field(..., examples=["Київська область"])
    status: str = Field("Активна", examples=["Активна"])
    threat_level: str = Field("Середній", examples=["Високий"])
    personnel_involved: int = Field(0, ge=0)
    equipment_involved: int = Field(0, ge=0)
    service_involved: str = Field(..., examples=["Національна поліція України"])

class EventCreate(EventBase):
    pass

class EventUpdate(EventBase):
    event_type: Optional[str] = None
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    region: Optional[str] = None
    status: Optional[str] = None
    threat_level: Optional[str] = None
    personnel_involved: Optional[int] = None
    equipment_involved: Optional[int] = None
    service_involved: Optional[str] = None

class EventInDB(EventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True