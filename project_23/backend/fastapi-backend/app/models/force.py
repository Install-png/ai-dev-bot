python
from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Force(Base):
    __tablename__ = "forces"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, index=True) # Foreign key to events table
    unit_name = Column(String)
    personnel_count = Column(Integer)
    equipment_count = Column(Integer)
    status = Column(String, default="Призначено") # e.g., 'Призначено', 'В дорозі', 'На місці', 'Виконано'
    arrival_time_estimate = Column(DateTime, nullable=True)
    actual_arrival_time = Column(DateTime, nullable=True)
    effectiveness_rating = Column(Integer, nullable=True) # 1-5 scale
    assignment_details = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Force(id={self.id}, event_id={self.event_id}, unit='{self.unit_name}', status='{self.status}')>"