python
from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True) # e.g., 'Кримінальні', 'Пожежі', 'Масові заворушення', 'Міграційні інциденти'
    description = Column(Text)
    latitude = Column(Float)
    longitude = Column(Float)
    region = Column(String, index=True)
    status = Column(String, default="Активна") # e.g., 'Активна', 'Розслідування', 'Завершена'
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    # Additional fields
    threat_level = Column(String, default="Середній") # 'Низький', 'Середній', 'Високий', 'Критичний'
    personnel_involved = Column(Integer, default=0)
    equipment_involved = Column(Integer, default=0)
    service_involved = Column(String) # e.g., 'Національна поліція', 'ДСНС', 'НГУ', 'ДМС'

    def __repr__(self):
        return f"<Event(id={self.id}, type='{self.event_type}', status='{self.status}')>"