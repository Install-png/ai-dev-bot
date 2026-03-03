python
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas.user import UserCreate, UserInDB
from app.core.security import get_password_hash

async def get_user(db: AsyncSession, user_id: int) -> User | None:
    result = await db.execute(select(User).filter(User.id == user_id))
    return result.scalar_one_or_none()

async def get_user_by_username(db: AsyncSession, username: str) -> User | None:
    result = await db.execute(select(User).filter(User.username == username))
    return result.scalar_one_or_none()

async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()

async def create_user(db: AsyncSession, user: UserCreate) -> User:
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        hashed_password=hashed_password,
        email=user.email,
        is_active=user.is_active,
        roles=user.roles
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user