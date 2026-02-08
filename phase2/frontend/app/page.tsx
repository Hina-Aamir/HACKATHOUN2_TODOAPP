'use client'


import Link from 'next/link'
import { useAuth } from 'better-auth/react'

export default function Home() {
  const { data: session } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Todo App</h1>
            <p className="mt-2 text-sm text-gray-600">
              {session ? 'You are logged in!' : 'Please sign in to manage your tasks.'}
            </p>
          </div>

          <div className="mt-6">
            <div className="space-y-6">
              {!session ? (
                <>
                  <div>
                    <Link href="/auth/signin" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Sign In
                    </Link>
                  </div>
                  <div>
                    <Link href="/auth/signup" className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <div>
                  <Link href="/dashboard" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Go to Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}