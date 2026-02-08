// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/MainLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Task, makeApiRequest } from '@/lib/api';

export default function DashboardPage() {
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

  const handleAddTask = () => {
    router.push('/tasks/new');
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
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <Button onClick={handleAddTask} variant="primary">
                  Add Task
                </Button>
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
              ) : tasks.length === 0 ? (
                <Card>
                  <Card.Body>
                    <div className="text-center py-8">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
                      <p className="mt-1 text-sm text-gray-500">Get started by creating a new task.</p>
                      <div className="mt-6">
                        <Button onClick={handleAddTask} variant="primary">
                          Add Task
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tasks.map((task) => (
                    <Card key={task.id}>
                      <Card.Body>
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {task.description || 'No description'}
                        </p>
                        <div className="mt-4 flex items-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              task.completed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {task.completed ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="flex justify-between">
                          <Button
                            variant="secondary"
                            onClick={() => router.push(`/tasks/${task.id}`)}
                          >
                            View
                          </Button>
                          <Button
                            variant={task.completed ? 'secondary' : 'primary'}
                            onClick={async () => {
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
                            }}
                          >
                            {task.completed ? 'Mark Pending' : 'Mark Complete'}
                          </Button>
                        </div>
                      </Card.Footer>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
}