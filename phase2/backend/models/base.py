from sqlmodel import SQLModel
from datetime import datetime
import uuid
from typing import Optional

def generate_uuid():
    return str(uuid.uuid4())

def get_current_time():
    return datetime.utcnow()

class BaseSQLModel(SQLModel):
    id: str
    created_at: datetime
    updated_at: datetime

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        if not self.id:
            self.id = generate_uuid()
        if not self.created_at:
            self.created_at = get_current_time()
        if not self.updated_at:
            self.updated_at = get_current_time()