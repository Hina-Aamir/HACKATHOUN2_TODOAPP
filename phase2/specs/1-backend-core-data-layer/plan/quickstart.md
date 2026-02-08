# Quickstart Guide: Backend Core & Data Layer

## Prerequisites
- Python 3.9 or higher
- pip package manager
- Access to Neon PostgreSQL database

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   Or if no requirements.txt exists yet:
   ```bash
   pip install fastapi uvicorn sqlmodel psycopg2-binary python-dotenv
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root with the following content:
   ```
   DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   ```
   
   Replace the DATABASE_URL with your actual Neon PostgreSQL connection string.

4. **Initialize the application**
   The application entry point will be in `main.py` which creates the FastAPI app.

## Running the Application

1. **Start the development server**
   ```bash
   uvicorn main:app --reload
   ```
   
   The API will be available at http://localhost:8000

2. **Access the API documentation**
   - Interactive documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

## API Usage

### Creating a Task
```bash
curl -X POST "http://localhost:8000/api/user123/tasks" \
  -H "Content-Type: application/json" \
  -d '{"title": "Sample task", "description": "This is a sample task"}'
```

### Getting All Tasks for a User
```bash
curl -X GET "http://localhost:8000/api/user123/tasks"
```

### Getting a Specific Task
```bash
curl -X GET "http://localhost:8000/api/user123/tasks/task456"
```

### Updating a Task
```bash
curl -X PUT "http://localhost:8000/api/user123/tasks/task456" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated task title", "description": "Updated description"}'
```

### Deleting a Task
```bash
curl -X DELETE "http://localhost:8000/api/user123/tasks/task456"
```

### Toggling Task Completion
```bash
curl -X PATCH "http://localhost:8000/api/user123/tasks/task456/complete" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## Project Structure
```
project-root/
├── main.py                 # Application entry point
├── models/                 # SQLModel models
│   └── task.py
├── database/               # Database setup and session management
│   └── session.py
├── api/                    # API routes
│   └── tasks.py
├── services/               # Business logic
│   └── task_service.py
├── schemas/                # Pydantic schemas for request/response validation
│   └── task.py
├── .env                    # Environment variables (not committed)
├── requirements.txt        # Python dependencies
└── README.md
```

## Configuration
- Database connection is configured via the DATABASE_URL environment variable
- The application uses SQLModel for database modeling
- FastAPI handles request routing and validation
- All API responses are in JSON format