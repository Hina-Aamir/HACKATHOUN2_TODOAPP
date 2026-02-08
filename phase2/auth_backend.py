# Better Auth Configuration for the Todo Backend

from better_auth import auth_backend, BaseUser
from better_auth.fastapi import get_current_user
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Better Auth
auth = auth_backend(
    secret=os.getenv("BETTER_AUTH_SECRET", "your-default-secret-for-development"),
    # Add other configuration options as needed
)

# Define the user model that matches Better Auth's expectations
class User(BaseUser):
    email: str
    name: Optional[str] = None

# Create the FastAPI app
app = FastAPI(title="Todo Backend API with Better Auth", 
              description="REST API for managing user tasks with Better Auth integration", 
              version="1.0.0")

# Include the authentication routes
app.include_router(auth.router, prefix="/auth")

# Include the tasks API router
from api.tasks import router as tasks_router
app.include_router(tasks_router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Backend API with Better Auth"}

# Add startup event to initialize database
from database.utils import create_tables
import asyncio

@app.on_event("startup")
async def on_startup():
    await create_tables()