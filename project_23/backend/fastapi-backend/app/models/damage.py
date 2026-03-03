python
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, Boolean
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Damage(Base):
    __tablename__ = "damages"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, index=True) # Foreign key to events table (not explicitly linked in model for simplicity here)
    damage_type = Column(String) # e.g., 'Руйнування будівель', 'Вартість техніки', 'Інфраструктурні пошкодження', 'Людські втрати'
    estimated_amount = Column(Float, default=0.0)
    manual_override = Column(Boolean, default=False)
    comment = Column(Text, nullable=True)
    photo_urls = Column(JSON, default=[]) # List of URLs to photos
    approved_by_user_id = Column(Integer, nullable=True) # User ID who approved
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<Damage(id={self.id}, event_id={self.event_id}, type='{self.damage_type}', amount={self.estimated_amount})>"