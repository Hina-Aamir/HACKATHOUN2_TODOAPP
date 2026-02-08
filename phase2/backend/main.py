from fastapi import FastAPI
from api.tasks import router as tasks_router
from database.utils import create_tables
import asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Todo Backend API",
    description="REST API for managing user tasks in the Todo application with Better Auth integration",
    version="1.0.0"
)

# Include the tasks API router
app.include_router(tasks_router)

@app.on_event("startup")
async def on_startup():
    await create_tables()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Todo Backend API with Better Auth integration"}

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "database_url": os.getenv("DATABASE_URL")}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)