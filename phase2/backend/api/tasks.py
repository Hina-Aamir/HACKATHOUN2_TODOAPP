from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database.session import get_async_session
from models.task import Task as TaskModel, TaskCreate, TaskUpdate, TaskToggleComplete
from schemas.task import (
    TaskCreateRequest,
    TaskUpdateRequest,
    TaskResponse,
    TaskListResponse,
    TaskToggleCompleteRequest
)
from services.task_service import TaskService
from security.jwt_utils import get_current_user, verify_user_id_in_token
from fastapi.security import HTTPAuthorizationCredentials

router = APIRouter(prefix="/api/{user_id}", tags=["tasks"])

@router.post("/tasks", response_model=TaskResponse, status_code=201)
async def create_task(
    user_id: str,
    task_data: TaskCreateRequest,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Create a new task for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to create tasks for this user"
        )

    # Create the task using the service
    task = await TaskService.create_task(
        title=task_data.title,
        description=task_data.description,
        user_id=user_id,
        db_session=db_session
    )

    # Convert to response model
    return TaskResponse.model_validate(task)


@router.get("/tasks", response_model=TaskListResponse)
async def get_tasks(
    user_id: str,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Get all tasks for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view tasks for this user"
        )

    tasks = await TaskService.get_tasks_by_user_id(user_id, db_session)

    # Convert to response models
    task_responses = [
        TaskResponse.model_validate(task)
        for task in tasks
    ]

    return TaskListResponse(tasks=task_responses)


@router.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(
    user_id: str,
    task_id: str,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Get a specific task by ID for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to view tasks for this user"
        )

    task = await TaskService.get_task_by_id_and_user_id(task_id, user_id, db_session)

    # Convert to response model
    return TaskResponse.model_validate(task)


@router.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(
    user_id: str,
    task_id: str,
    task_data: TaskUpdateRequest,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Update a specific task by ID for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update tasks for this user"
        )

    # Update the task using the service
    task = await TaskService.update_task(
        task_id=task_id,
        user_id=user_id,
        title=task_data.title,
        description=task_data.description,
        db_session=db_session
    )

    # Convert to response model
    return TaskResponse.model_validate(task)


@router.delete("/tasks/{task_id}", status_code=204)
async def delete_task(
    user_id: str,
    task_id: str,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Delete a specific task by ID for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to delete tasks for this user"
        )

    await TaskService.delete_task(task_id, user_id, db_session)

    # Return 204 No Content on successful deletion
    return


@router.patch("/tasks/{task_id}/complete", response_model=TaskResponse)
async def toggle_task_completion(
    user_id: str,
    task_id: str,
    completion_data: TaskToggleCompleteRequest,
    current_user: dict = Depends(get_current_user),
    db_session: AsyncSession = Depends(get_async_session)
):
    """
    Toggle the completion status of a specific task for the specified user
    """
    # Verify that the user_id in the JWT matches the user_id in the route
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Not authorized to update tasks for this user"
        )

    # Toggle the task completion using the service
    task = await TaskService.toggle_task_completion(
        task_id=task_id,
        user_id=user_id,
        completed=completion_data.completed,
        db_session=db_session
    )

    # Convert to response model
    return TaskResponse.model_validate(task)