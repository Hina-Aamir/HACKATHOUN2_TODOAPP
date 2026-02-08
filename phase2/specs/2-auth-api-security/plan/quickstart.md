# Quickstart Guide: Authentication & API Security (Better Auth + JWT + FastAPI)

## Prerequisites
- Python 3.9 or higher
- pip package manager
- Access to Neon PostgreSQL database
- Better Auth configured on the frontend
- Shared secret for JWT verification (BETTER_AUTH_SECRET)

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
   
   Ensure PyJWT is included in your requirements:
   ```bash
   pip install PyJWT[crypto]
   ```

3. **Set up environment variables**
   Update your `.env` file with the following content:
   ```
   DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   BETTER_AUTH_SECRET=your-shared-secret-key-here
   ```
   
   Replace the DATABASE_URL with your actual Neon PostgreSQL connection string and set your actual Better Auth secret.

4. **Configure Better Auth (Frontend)**
   - Ensure Better Auth is configured to generate JWT tokens
   - Verify the JWT contains the required claims (user_id, email)
   - Set the token expiration as needed (e.g., 7 days)

## Running the Application

1. **Start the development server**
   ```bash
   uvicorn main:app --reload
   ```
   
   The API will be available at http://localhost:8000

2. **Access the API documentation**
   - Interactive documentation: http://localhost:8000/docs
   - Alternative documentation: http://localhost:8000/redoc

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

## Error Responses

The API returns the following error codes for authentication issues:

- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: Valid token but user doesn't have access to requested resource
- `404 Not Found`: Resource doesn't exist or user doesn't have access to it

## Security Considerations

- JWT tokens are verified using the shared secret (BETTER_AUTH_SECRET)
- All API requests require a valid JWT token
- Users can only access resources associated with their user ID
- The system implements stateless authentication (no server-side session storage)
- JWT expiration is enforced by the backend