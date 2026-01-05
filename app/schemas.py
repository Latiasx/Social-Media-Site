from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from fastapi_users import schemas
import uuid

class PostCreate(BaseModel):
    caption: str
    url: str
    file_type: str
    file_name: str

class PostResponse(BaseModel):
    id: UUID
    caption: str
    url: str
    file_type: str
    file_name: str
    created_at: datetime

class UserRead(schemas.BaseUser[uuid.UUID]):
    pass

class UserCreate(schemas.BaseUserCreate):
    pass

class UserUpdate(schemas.BaseUserUpdate):
    pass