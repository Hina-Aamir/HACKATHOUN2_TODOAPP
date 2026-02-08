# Run the integrated application

## Prerequisites
Before running the application, ensure you have:

1. Python 3.9+ installed
2. Node.js 18+ installed
3. PostgreSQL server running (or Neon Serverless PostgreSQL configured)

## Setup Instructions

### Backend Setup
1. Navigate to the project root directory:
   ```bash
   cd D:\HACKATHOUN2\phase2
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname?sslmode=require
   BETTER_AUTH_SECRET=your-super-secret-key-here-replace-with-real-key
   ```

4. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at http://localhost:8000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd D:\HACKATHOUN2\phase2\frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `frontend/.env.local`:
   ```
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
   BETTER_AUTH_SECRET=supersecretkeyfordevelopment
   ```

4. Run the frontend server:
   ```bash
   npm run dev
   ```
   The frontend will be available at http://localhost:3000

## Running Both Servers

For development, you'll need to run both servers simultaneously:

### Option 1: Separate Terminals
1. Terminal 1: Run the backend server (navigate to project root)
   ```bash
   uvicorn main:app --reload
   ```

2. Terminal 2: Run the frontend server (navigate to frontend directory)
   ```bash
   cd frontend
   npm run dev
   ```

### Option 2: Using Concurrently (if installed)
1. Install concurrently globally:
   ```bash
   npm install -g concurrently
   ```

2. From the project root, run both servers:
   ```bash
   concurrently "cd D:\HACKATHOUN2\phase2 && uvicorn main:app --reload" "cd D:\HACKATHOUN2\phase2\frontend && npm run dev"
   ```

## Environment Configuration

### Backend Environment Variables (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT verification

### Frontend Environment Variables (frontend/.env.local)
- `NEXT_PUBLIC_BACKEND_API_URL`: URL of the backend API (usually http://localhost:8000)
- `NEXT_PUBLIC_BETTER_AUTH_URL`: URL of the Better Auth server
- `BETTER_AUTH_SECRET`: Secret key for JWT handling (should match backend)

## Testing the Integration

1. Start both the backend and frontend servers
2. Open your browser and navigate to http://localhost:3000
3. Register a new account or sign in
4. Create a new task and verify it appears in the list
5. Update and delete tasks to verify full CRUD functionality
6. Verify that authentication is working properly

## Troubleshooting

### Common Issues
- If the frontend can't connect to the backend, check that the `NEXT_PUBLIC_BACKEND_API_URL` is set correctly
- If authentication isn't working, ensure the `BETTER_AUTH_SECRET` matches between frontend and backend
- If database migrations aren't running, verify your database connection string is correct

### Useful Commands
- Check backend health: `curl http://localhost:8000/health`
- Verify database connection: Check the backend logs for successful startup messages
- Check frontend console for any authentication or API errors