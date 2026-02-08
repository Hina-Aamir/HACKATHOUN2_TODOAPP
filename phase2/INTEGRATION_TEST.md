# Integration Test Script

This script tests the integration between the frontend, backend, and database.

## Test 1: Backend Health Check
1. Visit http://localhost:8000/health
2. Verify the response shows: {"status": "healthy", "database_url": "your_database_url"}

## Test 2: API Endpoint Access
1. Try accessing the tasks API without authentication:
   - GET http://localhost:8000/api/anyuser/tasks
   - Should return 401 Unauthorized

## Test 3: Frontend Access
1. Visit http://localhost:3000
2. Verify the homepage loads correctly
3. Check that the auth links work (Sign In/Sign Up)

## Test 4: Database Connection
1. The backend should have created the necessary tables on startup
2. Check the backend logs for successful database connection messages

## Expected Results:
- Both frontend and backend servers are running
- Database is connected and tables are created
- Authentication is properly configured
- API endpoints require valid JWT tokens
- User isolation is enforced at the API level