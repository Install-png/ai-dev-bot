python
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.crud.event import get_event, get_events, create_event, update_event, delete_event
from app.schemas.event import EventCreate, EventInDB, EventUpdate
from app.core.security import RoleChecker

router = APIRouter()

@router.get("/", response_model=List[EventInDB], dependencies=[Depends(RoleChecker(["оператор", "аналітик", "керівник", "адміністратор"]))])
async def read_events(
    skip: int = 0,
    limit: int = 100,
    event_type: Optional[str] = None,
    region: Optional[str] = None,
    status: Optional[str] = None,
    db: AsyncSession = Depends(get_db)
):
    events = await get_events(db, skip=skip, limit=limit, event_type=event_type, region=region, status=status)
    return events

@router.post("/", response_model=EventInDB, status_code=status.HTTP_201_CREATED, dependencies=[Depends(RoleChecker(["оператор", "адміністратор"]))])
async def create_new_event(event: EventCreate, db: AsyncSession = Depends(get_db)):
    return await create_event(db, event)

@router.get("/{event_id}", response_model=EventInDB, dependencies=[Depends(RoleChecker(["оператор", "аналітик", "керівник", "адміністратор"]))])
async def read_event(event_id: int, db: AsyncSession = Depends(get_db)):
    event = await get_event(db, event_id)
    if event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event

@router.put("/{event_id}", response_model=EventInDB, dependencies=[Depends(RoleChecker(["оператор", "адміністратор"]))])
async def update_existing_event(event_id: int, event: EventUpdate, db: AsyncSession = Depends(get_db)):
    updated_event = await update_event(db, event_id, event)
    if updated_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return updated_event

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(RoleChecker(["адміністратор"]))])
async def delete_existing_event(event_id: int, db: AsyncSession = Depends(get_db)):
    deleted_event = await delete_event(db, event_id)
    if deleted_event is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return {"message": "Event deleted successfully"}