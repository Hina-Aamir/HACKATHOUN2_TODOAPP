// app/tasks/new/page.tsx
'use client';

import { useState } from 'react';
import { useAuth } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import TaskForm from '@/components/tasks/TaskForm';
import { createTask } from '@/lib/api';

export default function NewTaskPage() {
  const { data: session } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { title: string; description?: string }) => {
    if (!session?.user?.id) {
      setError('User not authenticated');
      return;
    }

    try {
      await createTask(session.user.id, data, session.user.token);
      router.push('/tasks'); // Redirect to tasks list after successful creation
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.back(); // Go back to previous page
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  Create New Task
                </h2>
              </div>
            </div>

            <div className="mt-8">
              {error && (
                <div className="rounded-md bg-red-50 p-4 mb-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              <TaskForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                submitLabel="Create Task"
              />
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}