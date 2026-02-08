from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from models.task import Task as TaskModel

class TaskCreateRequest(BaseModel):
    title: str
    description: Optional[str] = None

class TaskUpdateRequest(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None

class TaskToggleCompleteRequest(BaseModel):
    completed: bool

class TaskResponse(BaseModel):
    id: str
    title: str
    description: Optional[str]
    completed: bool
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]