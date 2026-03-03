python
from pydantic import BaseModel
from typing import List, Optional

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    username: Optional[str] = None
    roles: List[str] = []