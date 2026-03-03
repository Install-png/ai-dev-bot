python
from sqlalchemy import Column, Integer, String, Boolean, JSON
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    email = Column(String, unique=True, index=True, nullable=True)
    is_active = Column(Boolean, default=True)
    roles = Column(JSON, default=['оператор']) # e.g., ['оператор', 'аналітик', 'керівник', 'адміністратор']

    def __repr__(self):
        return f"<User(username='{self.username}', roles='{self.roles}')>"