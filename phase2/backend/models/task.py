from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

# helper functions
def generate_uuid() -> str:
    return str(uuid.uuid4())

def get_current_time() -> datetime:
    return datetime.utcnow()

# Database model
class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: str = Field(default_factory=generate_uuid, primary_key=True, index=True)
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    user_id: str = Field(..., max_length=255)
    created_at: datetime = Field(default_factory=get_current_time)
    updated_at: datetime = Field(default_factory=get_current_time)

# Model for creating a task
class TaskCreate(SQLModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    user_id: str = Field(..., max_length=255)

# Model for updating a task
class TaskUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: Optional[bool] = None

# Model for toggling completion
class TaskToggleComplete(SQLModel):
    completed: bool = Field(...)
