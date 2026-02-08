from sqlmodel import SQLModel
from .session import engine
import asyncio

async def create_tables():
    """Create all tables in the database"""
    async with engine.begin() as conn:
        # Import all models here to ensure they're registered with SQLModel metadata
        from models.task import Task  # noqa: F401
        await conn.run_sync(SQLModel.metadata.create_all)

def get_db():
    """Get database session - for use in dependencies"""
    from .session import get_async_session
    return get_async_session()


# For testing and initialization purposes
if __name__ == "__main__":
    asyncio.run(create_tables())