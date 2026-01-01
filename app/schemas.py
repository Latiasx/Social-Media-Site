from pydantic import BaseModel
from datetime import datetime
from uuid import UUID

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