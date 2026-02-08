# Todo Application Frontend

A Next.js frontend for the Todo application with authentication and task management features.

## Features

- User authentication with Better Auth
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Responsive design for all screen sizes
- JWT token management for secure API communication

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Authentication**: Better Auth
- **Styling**: Tailwind CSS
- **API Communication**: Fetch API with SWR for data fetching
- **Environment**: Environment variables for API URLs and auth configuration

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root with the following content:
   ```
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-nextauth-secret
   ```
   
   Replace the URLs with your actual backend API and Better Auth URLs.

4. **Run the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at http://localhost:3000

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at http://localhost:3000

2. **Access the application**
   - Visit http://localhost:3000 in your browser
   - You will be redirected to the sign-up page if not authenticated
   - Sign up or sign in to access the task management dashboard

## API Integration

The frontend communicates with the backend API through the service layer in `lib/api.ts`:

- All API requests automatically include the JWT token in the Authorization header
- Error responses are handled consistently across the application
- Loading states are managed using SWR or React Query

## Environment Variables

- `NEXT_PUBLIC_BACKEND_API_URL`: The URL of your backend API server
- `NEXT_PUBLIC_BETTER_AUTH_URL`: The URL of your Better Auth server
- `NEXTAUTH_SECRET`: Secret used for signing JWT tokens (required for NextAuth)

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

For deployment to platforms like Vercel or Netlify, follow their specific deployment guides and ensure environment variables are properly configured in the deployment environment.