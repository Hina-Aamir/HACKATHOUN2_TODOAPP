# Quickstart Guide: Frontend Application & User Experience (Next.js + Better Auth)

## Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Access to the backend API (FastAPI server)
- Better Auth configured on the backend

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Or if using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root with the following content:
   ```
   BACKEND_API_URL=https://your-backend-api.com
   NEXT_PUBLIC_BETTER_AUTH_URL=https://your-better-auth.com
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

## Application Structure

```
frontend-todo-app/
├── app/                    # Next.js App Router pages
│   ├── (auth)/           # Authentication pages (sign-up, sign-in)
│   │   ├── sign-up/
│   │   └── sign-in/
│   ├── dashboard/        # Main dashboard page
│   ├── tasks/            # Task management pages
│   │   └── [id]/         # Individual task pages
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── tasks/            # Task management components
│   └── ui/               # Generic UI components
├── lib/                  # Utility functions and services
│   ├── auth.ts           # Authentication helpers
│   └── api.ts            # API service layer
├── hooks/                # Custom React hooks
│   └── useTasks.ts       # Task management hooks
├── styles/               # Global styles
│   └── globals.css       # Tailwind CSS configuration
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

## Key Features

### Authentication
- User registration and login via Better Auth
- Automatic JWT token management
- Protected routes that redirect unauthenticated users

### Task Management
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- View all tasks associated with the authenticated user

### Responsive Design
- Mobile-first design approach
- Responsive layouts that adapt to different screen sizes
- Touch-friendly interface elements

### State Management
- Loading states during API requests
- Error handling and display
- Empty state handling when no tasks exist

## API Integration

The frontend communicates with the backend API through the service layer in `lib/api.ts`:

- All API requests automatically include the JWT token in the Authorization header
- Error responses are handled consistently across the application
- Loading states are managed using SWR or React Query

## Environment Variables

- `BACKEND_API_URL`: The URL of your backend API server
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