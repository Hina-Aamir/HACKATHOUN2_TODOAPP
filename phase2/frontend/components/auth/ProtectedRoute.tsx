// components/auth/ProtectedRoute.tsx
'use client';

import { useAuth } from 'better-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({ children, redirectTo = '/auth/signin' }: ProtectedRouteProps) => {
  const { data: session, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace(redirectTo);
    }
  }, [isPending, session, router, redirectTo]);

  // Show nothing while checking authentication status
  if (isPending || (!session && !isPending)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render children only if user is authenticated
  return <>{children}</>;
};

export default ProtectedRoute;