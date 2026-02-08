// app/tasks/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import TaskList from '@/components/tasks/TaskList';
import { makeApiRequest, Task } from '@/lib/api';

export default function TasksPage() {
  const { data: session } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchTasks();
    }
  }, [session]);

  const fetchTasks = async () => {
    if (!session?.user?.id) return;

    try {
      setLoading(true);
      const response = await makeApiRequest(
        `/api/${session.user.id}/tasks`,
        { method: 'GET' },
        session.user.token
      );
      setTasks(response);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskToggle = async (task: Task) => {
    try {
      await makeApiRequest(
        `/api/${session?.user.id}/tasks/${task.id}/complete`,
        {
          method: 'PATCH',
          body: JSON.stringify({ completed: !task.completed }),
        },
        session?.user.token
      );
      // Refresh the task list
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    }
  };

  const handleTaskEdit = (task: Task) => {
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleTaskDelete = async (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await makeApiRequest(
          `/api/${session?.user.id}/tasks/${task.id}`,
          { method: 'DELETE' },
          session?.user.token
        );
        // Refresh the task list
        fetchTasks();
      } catch (err) {
        setError('Failed to delete task');
        console.error(err);
      }
    }
  };

  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  My Tasks
                </h2>
              </div>
            </div>

            <div className="mt-8">
              {loading ? (
                <div className="text-center py-8">
                  <p>Loading tasks...</p>
                </div>
              ) : error ? (
                <div className="rounded-md bg-red-50 p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onTaskToggle={handleTaskToggle}
                  onTaskEdit={handleTaskEdit}
                  onTaskDelete={handleTaskDelete}
                />
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}