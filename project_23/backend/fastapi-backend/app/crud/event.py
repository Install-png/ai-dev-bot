python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.event import Event
from app.schemas.event import EventCreate, EventUpdate
from typing import List, Optional

async def get_event(db: AsyncSession, event_id: int) -> Event | None:
    result = await db.execute(select(Event).filter(Event.id == event_id))
    return result.scalar_one_or_none()

async def get_events(
    db: AsyncSession,
    skip: int = 0,
    limit: int = 100,
    event_type: Optional[str] = None,
    region: Optional[str] = None,
    status: Optional[str] = None
) -> List[Event]:
    query = select(Event)
    if event_type:
        query = query.filter(Event.event_type == event_type)
    if region:
        query = query.filter(Event.region == region)
    if status:
        query = query.filter(Event.status == status)
    
    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()

async def create_event(db: AsyncSession, event: EventCreate) -> Event:
    db_event = Event(**event.model_dump())
    db.add(db_event)
    await db.commit()
    await db.refresh(db_event)
    return db_event

async def update_event(db: AsyncSession, event_id: int, event_update: EventUpdate) -> Event | None:
    db_event = await get_event(db, event_id)
    if db_event:
        update_data = event_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_event, key, value)
        db.add(db_event)
        await db.commit()
        await db.refresh(db_event)
    return db_event

async def delete_event(db: AsyncSession, event_id: int) -> Event | None:
    db_event = await get_event(db, event_id)
    if db_event:
        await db.delete(db_event)
        await db.commit()
    return db_event