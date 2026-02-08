// components/tasks/task-list.tsx
import { Task } from '@/lib/api';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRouter } from 'next/navigation';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (task: Task) => void;
  onTaskEdit: (task: Task) => void;
  onTaskDelete: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskToggle, onTaskEdit, onTaskDelete }: TaskListProps) {
  const router = useRouter();

  if (tasks.length === 0) {
    return (
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
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <Card.Body>
            <div className="flex justify-between">
              <div>
                <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {task.description || 'No description'}
                </p>
              </div>
              <div className="flex items-center">
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
              <div className="space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => onTaskEdit(task)}
                >
                  Edit
                </Button>
                <Button
                  variant={task.completed ? 'secondary' : 'primary'}
                  onClick={() => onTaskToggle(task)}
                >
                  {task.completed ? 'Mark Pending' : 'Mark Complete'}
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onTaskDelete(task)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}