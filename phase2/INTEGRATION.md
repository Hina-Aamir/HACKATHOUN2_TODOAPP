# Frontend-Backend-Database Integration Documentation

## Overview
This document describes the integration between the frontend (Next.js), backend (FastAPI), and database (PostgreSQL) for the Todo application with Better Auth authentication.

## Architecture

### Frontend (Next.js)
- Located in the `frontend/` directory
- Built with Next.js 14+ using the App Router
- Uses Better Auth for authentication
- Communicates with the backend via REST API
- Uses Tailwind CSS for styling

### Backend (FastAPI)
- Located in the root directory (`D:\HACKATHOUN2\phase2`)
- Built with FastAPI framework
- Implements JWT-based authentication and authorization
- Uses SQLModel as the ORM
- Connects to PostgreSQL database

### Database (PostgreSQL)
- Uses Neon Serverless PostgreSQL
- Stores user tasks with user isolation
- Enforces data integrity through constraints

## Authentication Flow

### Frontend Authentication
1. User registers/logs in via Better Auth components
2. Better Auth generates a JWT token
3. Frontend stores the JWT token securely
4. All API requests include the token in the Authorization header: `Authorization: Bearer <token>`

### Backend Authentication Verification
1. Backend receives API request with Authorization header
2. JWT token is extracted and verified using the shared secret
3. User identity is extracted from the token payload
4. User ID in JWT is compared with user ID in the route parameter
5. Request is processed only if user is authorized

## API Endpoints

### Task Management Endpoints
All endpoints follow the pattern: `/api/{user_id}/{resource}`

- `POST /api/{user_id}/tasks` - Create a new task
- `GET /api/{user_id}/tasks` - Get all tasks for a user
- `GET /api/{user_id}/tasks/{id}` - Get a specific task
- `PUT /api/{user_id}/tasks/{id}` - Update a specific task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a specific task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

### Authentication Requirements
- All endpoints require a valid JWT token in the Authorization header
- User ID in JWT must match the user_id in the route parameter
- Unauthorized requests return 401 or 403 status codes

## Database Schema

### Task Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    user_id VARCHAR(255) NOT NULL,  -- References the user identifier
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Isolation
- Each task is associated with a user_id
- Database queries are filtered by user_id to ensure user isolation
- Users can only access their own tasks

## Environment Variables

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Shared secret for JWT verification

### Frontend (frontend/.env.local)
- `NEXT_PUBLIC_BACKEND_API_URL`: URL of the backend API
- `NEXT_PUBLIC_BETTER_AUTH_URL`: URL of the Better Auth server
- `BETTER_AUTH_SECRET`: Secret for JWT handling (if needed)

## Data Flow

### Creating a Task
1. User enters task details in the frontend form
2. Frontend validates input and prepares the request
3. JWT token is attached to the Authorization header
4. Request is sent to `POST /api/{user_id}/tasks`
5. Backend verifies JWT and user authorization
6. Task is created in the database with the user_id
7. Response with the created task is returned to the frontend

### Retrieving Tasks
1. Frontend requests tasks from `GET /api/{user_id}/tasks`
2. JWT token is included in the Authorization header
3. Backend verifies JWT and checks user authorization
4. Database query retrieves tasks filtered by user_id
5. Task list is returned to the frontend

### Updating Task Completion
1. User toggles completion status in the frontend
2. Frontend sends request to `PATCH /api/{user_id}/tasks/{id}/complete`
3. JWT token is included in the Authorization header
4. Backend verifies JWT and checks if user owns the task
5. Task completion status is updated in the database
6. Updated task is returned to the frontend

## Security Measures

### Authentication
- JWT tokens are used for authentication
- Tokens are verified using the shared secret
- Token expiration is enforced

### Authorization
- User ID in JWT is compared with route parameter
- Users can only access their own tasks
- Unauthorized requests return 403 Forbidden

### Data Protection
- Database queries are filtered by user_id
- Input validation is performed on both frontend and backend
- SQL injection is prevented through parameterized queries

## Error Handling

### Authentication Errors
- Invalid or expired tokens return 401 Unauthorized
- Mismatched user IDs return 403 Forbidden
- Malformed requests return 400 Bad Request

### Server Errors
- Database connection issues return 500 Internal Server Error
- Unexpected errors return 500 Internal Server Error with generic messages

## Running the Integrated Application

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL server (or Neon Serverless PostgreSQL)

### Backend Setup
1. Install Python dependencies: `pip install -r requirements.txt`
2. Set up environment variables in `.env`
3. Run the backend: `uvicorn main:app --reload`

### Frontend Setup
1. Install Node dependencies: `npm install`
2. Set up environment variables in `frontend/.env.local`
3. Run the frontend: `npm run dev`

### Database Setup
1. Ensure PostgreSQL is running
2. The application will automatically create tables on startup

## Testing the Integration

### Manual Testing
1. Start the backend server
2. Start the frontend server
3. Register a new user via the frontend
4. Create, read, update, and delete tasks
5. Verify that user isolation works correctly
6. Test authentication by logging in and out

### API Testing
1. Use tools like Postman or curl to test API endpoints
2. Verify JWT token handling
3. Test unauthorized access attempts
4. Verify user isolation at the database level

## Troubleshooting

### Common Issues
- JWT token verification failures: Check that the secret key matches between frontend and backend
- Database connection issues: Verify the DATABASE_URL is correctly configured
- User isolation problems: Ensure user_id in JWT matches the route parameter
- CORS issues: Configure appropriate CORS settings if needed

### Debugging Tips
- Check logs on both frontend and backend
- Verify environment variables are properly set
- Use browser developer tools to inspect API requests and responses
- Test API endpoints directly with tools like Postman