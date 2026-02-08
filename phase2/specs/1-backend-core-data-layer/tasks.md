# Tasks: Backend Core & Data Layer (FastAPI + Neon PostgreSQL)

**Feature**: Backend Core & Data Layer (FastAPI + Neon PostgreSQL)
**Created**: 2026-02-06
**Status**: Draft
**Plan**: [Link to implementation plan](./plan/impl-plan.md)

## Implementation Strategy

This project follows an incremental delivery approach where each user story builds upon the previous ones. The implementation begins with foundational setup and infrastructure, followed by user stories in priority order (P1, P2, P3). Each user story includes all necessary components (models, services, endpoints) to be independently testable.

**MVP Scope**: Phase 1 (Setup) + Phase 2 (Foundational) + Phase 3 (User Story 1 - Create New Task) will deliver the minimum viable product with the ability to create tasks.

## Phase 1: Setup

Initialize the project structure and configure dependencies.

- [X] T001 Create project directory structure following FastAPI conventions
- [X] T002 Set up Python virtual environment and requirements.txt with FastAPI, SQLModel, asyncpg, python-dotenv
- [X] T003 Create .env file template with DATABASE_URL placeholder
- [X] T004 Initialize main.py with basic FastAPI app setup
- [X] T005 Create .gitignore for Python project

## Phase 2: Foundational

Implement foundational components required by all user stories.

- [X] T006 Create database configuration module with Neon PostgreSQL connection setup
- [X] T007 Implement database session dependency for FastAPI
- [X] T008 Create base SQLModel with common fields (id, created_at, updated_at)
- [X] T009 Set up environment variable loading with python-dotenv
- [X] T010 Create database utility functions (create_tables, get_db)

## Phase 3: User Story 1 - Create New Task (Priority: P1)

As a user, I want to create new tasks in the system so that I can track my to-dos. The system should store my tasks persistently in the database and associate them with my user ID.

**Independent Test**: Can be fully tested by sending a POST request to the API with task details and verifying that the task is stored in the database with the correct user association.

- [X] T011 [US1] Create Task model in models/task.py with all required fields (id, title, description, completed, user_id, created_at, updated_at)
- [X] T012 [US1] Create TaskCreate schema in schemas/task.py for request validation
- [X] T013 [US1] Create TaskResponse schema in schemas/task.py for response validation
- [X] T014 [US1] Create TaskService in services/task_service.py with create_task method
- [X] T015 [US1] Create POST endpoint /api/{user_id}/tasks in api/tasks.py
- [X] T016 [US1] Implement request validation for task creation
- [X] T017 [US1] Implement response formatting for created task
- [ ] T018 [US1] Test task creation functionality with valid inputs
- [ ] T019 [US1] Test task creation with minimal inputs (title only)

## Phase 4: User Story 2 - Retrieve User Tasks (Priority: P1)

As a user, I want to retrieve all tasks associated with my user ID so that I can view my to-do list. The system should return only tasks that belong to me.

**Independent Test**: Can be fully tested by creating tasks for a user, then retrieving them via GET request and verifying only that user's tasks are returned.

- [X] T020 [US2] Add get_tasks_by_user_id method to TaskService in services/task_service.py
- [X] T021 [US2] Create TaskListResponse schema in schemas/task.py for multiple task responses
- [X] T022 [US2] Create GET endpoint /api/{user_id}/tasks in api/tasks.py
- [X] T023 [US2] Implement user_id validation in the endpoint
- [X] T024 [US2] Implement filtering of tasks by user_id
- [ ] T025 [US2] Test retrieval of tasks for a user with existing tasks
- [ ] T026 [US2] Test retrieval of tasks for a user with no tasks

## Phase 5: User Story 3 - View Individual Task (Priority: P2)

As a user, I want to view details of a specific task so that I can see its complete information. The system should ensure I can only access tasks that belong to me.

**Independent Test**: Can be fully tested by creating a task, then retrieving it by ID and verifying the details match.

- [X] T027 [US3] Add get_task_by_id_and_user_id method to TaskService in services/task_service.py
- [X] T028 [US3] Create GET endpoint /api/{user_id}/tasks/{id} in api/tasks.py
- [X] T029 [US3] Implement validation to ensure user can only access their own tasks
- [X] T030 [US3] Implement 404 response when task doesn't exist or doesn't belong to user
- [ ] T031 [US3] Test retrieval of a user's own task
- [ ] T032 [US3] Test retrieval of another user's task (should return 404)

## Phase 6: User Story 4 - Update Task Details (Priority: P2)

As a user, I want to update my tasks so that I can modify their details as needed. The system should ensure I can only update tasks that belong to me.

**Independent Test**: Can be fully tested by creating a task, updating it via PUT request, and verifying the changes are persisted.

- [X] T033 [US4] Create TaskUpdate schema in schemas/task.py for update request validation
- [X] T034 [US4] Add update_task method to TaskService in services/task_service.py
- [X] T035 [US4] Create PUT endpoint /api/{user_id}/tasks/{id} in api/tasks.py
- [X] T036 [US4] Implement validation to ensure user can only update their own tasks
- [X] T037 [US4] Implement 404 response when task doesn't exist or doesn't belong to user
- [X] T038 [US4] Implement response formatting for updated task
- [ ] T039 [US4] Test updating a user's own task
- [ ] T040 [US4] Test updating another user's task (should return 404)

## Phase 7: User Story 5 - Delete Task (Priority: P2)

As a user, I want to delete tasks I no longer need so that I can keep my task list clean. The system should ensure I can only delete tasks that belong to me.

**Independent Test**: Can be fully tested by creating a task, deleting it via DELETE request, and verifying it's removed from the database.

- [X] T041 [US5] Add delete_task method to TaskService in services/task_service.py
- [X] T042 [US5] Create DELETE endpoint /api/{user_id}/tasks/{id} in api/tasks.py
- [X] T043 [US5] Implement validation to ensure user can only delete their own tasks
- [X] T044 [US5] Implement 404 response when task doesn't exist or doesn't belong to user
- [X] T045 [US5] Implement 204 response for successful deletion
- [ ] T046 [US5] Test deleting a user's own task
- [ ] T047 [US5] Test deleting another user's task (should return 404)

## Phase 8: User Story 6 - Toggle Task Completion (Priority: P3)

As a user, I want to mark tasks as completed or incomplete so that I can track my progress. The system should ensure I can only update tasks that belong to me.

**Independent Test**: Can be fully tested by creating a task, toggling its completion status via PATCH request, and verifying the change is persisted.

- [X] T048 [US6] Create TaskToggleComplete schema in schemas/task.py for completion toggle request
- [X] T049 [US6] Add toggle_task_completion method to TaskService in services/task_service.py
- [X] T050 [US6] Create PATCH endpoint /api/{user_id}/tasks/{id}/complete in api/tasks.py
- [X] T051 [US6] Implement validation to ensure user can only update their own tasks
- [X] T052 [US6] Implement 404 response when task doesn't exist or doesn't belong to user
- [X] T053 [US6] Implement response formatting for updated task
- [ ] T054 [US6] Test toggling completion status of a user's own task
- [ ] T055 [US6] Test toggling completion status of another user's task (should return 404)

## Phase 9: Polish & Cross-Cutting Concerns

Address cross-cutting concerns and finalize the implementation.

- [X] T056 Implement global error handling with appropriate HTTP status codes
- [X] T057 Add request/response logging for debugging purposes
- [X] T058 Implement input validation for user_id parameter
- [X] T059 Add database transaction handling for operations that modify data
- [X] T060 Create API documentation with examples
- [ ] T061 Add unit tests for all service layer functions
- [ ] T062 Add integration tests for all API endpoints
- [ ] T063 Perform end-to-end testing of all user stories
- [ ] T064 Optimize database queries with proper indexing
- [X] T065 Update README with setup and usage instructions

## Dependencies

User stories are designed to be as independent as possible, but there are some dependencies:

1. All user stories depend on Phase 1 (Setup) and Phase 2 (Foundational)
2. US3 (View Individual Task) can reuse components from US1 (Create New Task)
3. US4 (Update Task Details) can reuse components from US1 and US3
4. US5 (Delete Task) can reuse components from US1 and US3
5. US6 (Toggle Task Completion) can reuse components from US1, US3, and US4

## Parallel Execution Opportunities

Several tasks can be executed in parallel:

- [P] Tasks T011-T013 (model and schema creation) can be done in parallel
- [P] Tasks T020-T022 (US2 service and endpoint creation) can be done in parallel with US3-6 components
- [P] Tasks T027-T029 (US3 components) can be done in parallel with US4-6 components
- [P] Tasks T033-T035 (US4 components) can be done in parallel with US5-6 components
- [P] Tasks T041-T043 (US5 components) can be done in parallel with US6 components
- [P] Tasks T048-T050 (US6 components) can be done in parallel
- [P] Tasks T061-T063 (testing) can be done in parallel after all endpoints are implemented