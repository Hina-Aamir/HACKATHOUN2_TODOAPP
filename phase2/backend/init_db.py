# Initialize the database for the Todo application

import asyncio
import sys
import os

# Add the project root to the Python path so imports work correctly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.utils import create_tables

async def init_db():
    print("Initializing database...")
    try:
        await create_tables()
        print("Database initialized successfully!")
        print("Tables created:")
        print("- Task table")
        print("You can now run the backend server with 'uvicorn main:app --reload'")
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False
    return True

if __name__ == "__main__":
    success = asyncio.run(init_db())
    if not success:
        sys.exit(1)