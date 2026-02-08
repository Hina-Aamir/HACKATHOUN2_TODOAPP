from sqlmodel import select
from models.task import Task as TaskModel, TaskCreate, TaskUpdate, TaskToggleComplete
from typing import List
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

class TaskService:
    @staticmethod
    async def create_task(title: str, description: str, user_id: str, db_session: AsyncSession):
        """
        Create a new task in the database using SQLModel
        """
        # Create a new Task instance from the input data
        task = TaskModel(
            title=title,
            description=description,
            user_id=user_id,
            completed=False
        )

        # Add to session and commit
        db_session.add(task)
        await db_session.commit()
        await db_session.refresh(task)

        return task

    @staticmethod
    async def get_tasks_by_user_id(user_id: str, db_session: AsyncSession) -> List[TaskModel]:
        """
        Get all tasks for a specific user using SQLModel
        """
        statement = select(TaskModel).where(TaskModel.user_id == user_id)
        result = await db_session.execute(statement)
        tasks = result.scalars().all()
        return tasks

    @staticmethod
    async def get_task_by_id_and_user_id(task_id: str, user_id: str, db_session: AsyncSession) -> TaskModel:
        """
        Get a specific task by its ID and user ID using SQLModel
        """
        statement = select(TaskModel).where(TaskModel.id == task_id, TaskModel.user_id == user_id)
        result = await db_session.execute(statement)
        task = result.scalar_one_or_none()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        return task

    @staticmethod
    async def update_task(task_id: str, user_id: str, title: str, description: str, db_session: AsyncSession) -> TaskModel:
        """
        Update a task by its ID and user ID using SQLModel
        """
        # Get the existing task
        statement = select(TaskModel).where(TaskModel.id == task_id, TaskModel.user_id == user_id)
        result = await db_session.execute(statement)
        task = result.scalar_one_or_none()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # Update the task with the provided data
        task.title = title
        task.description = description
        task.updated_at = datetime.utcnow()

        await db_session.commit()
        await db_session.refresh(task)

        return task

    @staticmethod
    async def delete_task(task_id: str, user_id: str, db_session: AsyncSession) -> bool:
        """
        Delete a task by its ID and user ID using SQLModel
        """
        # Get the existing task
        statement = select(TaskModel).where(TaskModel.id == task_id, TaskModel.user_id == user_id)
        result = await db_session.execute(statement)
        task = result.scalar_one_or_none()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        await db_session.delete(task)
        await db_session.commit()

        return True

    @staticmethod
    async def toggle_task_completion(task_id: str, user_id: str, completed: bool, db_session: AsyncSession) -> TaskModel:
        """
        Toggle the completion status of a task using SQLModel
        """
        # Get the existing task
        statement = select(TaskModel).where(TaskModel.id == task_id, TaskModel.user_id == user_id)
        result = await db_session.execute(statement)
        task = result.scalar_one_or_none()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        # Toggle the completion status
        task.completed = completed
        task.updated_at = datetime.utcnow()

        await db_session.commit()
        await db_session.refresh(task)

        return task