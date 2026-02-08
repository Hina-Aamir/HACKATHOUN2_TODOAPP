'use client'

import { AuthProvider } from 'better-auth/react'
import { authClient } from 'better-auth/client'

const client = authClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    'http://localhost:3001',
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider client={client}>
      {children}
    </AuthProvider>
  )
}
