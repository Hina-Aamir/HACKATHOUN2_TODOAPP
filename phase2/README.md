# Todo Backend API

A FastAPI-based backend for managing user tasks with Neon Serverless PostgreSQL and JWT authentication.

## Features

- RESTful API for task management
- User isolation (each user can only access their own tasks)
- Full CRUD operations for tasks
- Task completion toggling
- Persistent storage with PostgreSQL
- JWT-based authentication and authorization

## Tech Stack

- **Backend Framework**: FastAPI (Python 3.9+)
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (for compatibility with both SQLAlchemy and Pydantic)
- **Authentication**: JWT tokens via Better Auth
- **API Style**: RESTful with JSON responses

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

3. **Set up environment variables**
   Create a `.env` file in the project root with the following content:
   ```
   DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   BETTER_AUTH_SECRET=your-super-secret-key-here-replace-with-real-key
   ```
   
   Replace the DATABASE_URL with your actual Neon PostgreSQL connection string and set your actual Better Auth secret.

4. **Run the application**
   ```bash
   uvicorn main:app --reload
   ```
   
   The API will be available at http://localhost:8000

## API Usage with Authentication

### Authenticating with Better Auth
1. User logs in via Better Auth on the frontend
2. Better Auth generates a JWT token
3. Frontend stores the JWT token securely

### Making Authenticated API Requests
All API requests must include the JWT token in the Authorization header:

```bash
curl -X GET "http://localhost:8000/api/user123/tasks" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Creating a Task with Authentication
```bash
curl -X POST "http://localhost:8000/api/user123/tasks" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Sample task", "description": "This is a sample task"}'
```

### Getting All Tasks for an Authenticated User
```bash
curl -X GET "http://localhost:8000/api/user123/tasks" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Getting a Specific Task
```bash
curl -X GET "http://localhost:8000/api/user123/tasks/task456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Updating a Task
```bash
curl -X PUT "http://localhost:8000/api/user123/tasks/task456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated task title", "description": "Updated description"}'
```

### Deleting a Task
```bash
curl -X DELETE "http://localhost:8000/api/user123/tasks/task456" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### Toggling Task Completion
```bash
curl -X PATCH "http://localhost:8000/api/user123/tasks/task456/complete" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## Endpoints

- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

## Security Considerations

- JWT tokens are verified using the shared secret (BETTER_AUTH_SECRET)
- All API requests require a valid JWT token
- Users can only access resources associated with their user ID
- The system implements stateless authentication (no server-side session storage)
- JWT expiration is enforced by the backend

## Architecture

The application follows a clear separation of concerns:

- **API Layer**: FastAPI endpoints handling HTTP requests/responses
- **Security Layer**: JWT verification and user identity extraction
- **Service Layer**: Business logic for task operations
- **Data Layer**: SQLModel models and database operations
- **Database**: Neon Serverless PostgreSQL with proper schema