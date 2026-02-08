# Implementation Plan: Backend Core & Data Layer (FastAPI + Neon PostgreSQL)

**Feature Branch**: `1-backend-core-data-layer`
**Created**: 2026-02-06
**Status**: Draft
**Plan**: [Link to this document]

## Technical Context

This plan outlines the implementation of a backend core for a multi-user Todo web application using FastAPI and Neon Serverless PostgreSQL. The system will support full CRUD operations with persistent storage while ensuring user data isolation.

### Technology Stack
- **Backend Framework**: FastAPI (Python 3.9+)
- **Database**: Neon Serverless PostgreSQL
- **ORM**: SQLModel (for compatibility with both SQLAlchemy and Pydantic)
- **API Style**: RESTful with JSON responses
- **Environment**: Environment variables for configuration

### Architecture Overview
- **API Layer**: FastAPI endpoints handling HTTP requests/responses
- **Service Layer**: Business logic for task operations
- **Data Layer**: SQLModel models and database operations
- **Database**: Neon Serverless PostgreSQL with proper schema

### Known Unknowns
- Specific database connection string format for Neon PostgreSQL
- Exact structure of environment variable configuration
- Detailed validation requirements for task fields

## Constitution Check

This implementation will adhere to the following constitutional principles:

### I. Correctness of RESTful API Design
- All API endpoints will follow REST conventions
- Each endpoint will handle appropriate HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Expected status codes will be returned (200, 201, 404, 400, 500)

### II. Data Integrity and Consistency
- Database schemas will be well-defined with appropriate constraints
- Primary keys will be enforced at the database level
- Transaction handling will ensure data consistency

### III. Clear Separation of Concerns
- Distinct API, Service, and Data layers will be implemented
- Each layer will have well-defined interfaces between them

### IV. Reproducibility Through Specifications
- Implementation will follow the feature specification exactly
- All behaviors will be traceable back to specific requirements

### V. Deterministic Behavior
- API responses will be predictable and consistent
- Error cases will be explicitly handled and documented

### VI. Security and Access Control
- User isolation will be maintained at the data layer
- Users will only access their own tasks via user_id scoping

## Gates

### Compliance Gate
- [x] All constitutional principles will be followed
- [x] Implementation will adhere to specified constraints
- [x] No authentication or JWT verification will be implemented in this spec
- [x] All endpoints will return JSON responses

### Technical Gate
- [x] FastAPI will be used as the backend framework
- [x] Neon Serverless PostgreSQL will be used for data storage
- [x] SQLModel will be used as the ORM
- [x] Environment variables will be used for configuration

### Quality Gate
- [x] All functional requirements from the spec will be implemented
- [x] User isolation will be enforced via user_id
- [x] No cross-user data leakage will occur

## Phase 0: Outline & Research

### Research Tasks

1. **Neon PostgreSQL Connection Setup**
   - Decision: Use async PostgreSQL driver with connection pooling
   - Rationale: Neon supports standard PostgreSQL protocols with serverless scaling
   - Alternatives considered: Standard PostgreSQL, other cloud DBs

2. **SQLModel Implementation Patterns**
   - Decision: Use SQLModel for both Pydantic models and SQLAlchemy ORM
   - Rationale: Provides seamless integration between API validation and database operations
   - Alternatives considered: Pure SQLAlchemy, Tortoise ORM

3. **FastAPI Dependency Injection for Database**
   - Decision: Use FastAPI's dependency injection system for database sessions
   - Rationale: Ensures proper session management and error handling
   - Alternatives considered: Global session objects, manual session handling

### Research Outcomes

1. **Database Connection**
   - Neon PostgreSQL uses standard PostgreSQL connection strings
   - Async drivers like asyncpg or aiopg can be used
   - Connection pooling should be configured appropriately for serverless

2. **SQLModel Schema Design**
   - Use SQLModel with Pydantic validation
   - Define both request/response models and database models
   - Implement proper relationships and constraints

3. **User Isolation Strategy**
   - Validate user_id in all endpoints against route parameter
   - Query database with user_id filter to ensure isolation
   - Return 404 for tasks that don't belong to the requesting user

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**Task Entity:**
- id: UUID (Primary Key, auto-generated)
- title: String (required, max length 255)
- description: Text (optional)
- completed: Boolean (default false)
- user_id: UUID (Foreign Key reference to User)
- created_at: DateTime (auto-generated)
- updated_at: DateTime (auto-generated, updated on change)

**User Entity:**
- id: UUID (Primary Key, auto-generated)
- user_id: UUID (unique identifier for the user)

### API Contracts

**OpenAPI Specification:**

1. **POST /api/{user_id}/tasks**
   - Request Body: {title: string, description?: string}
   - Response: 201 Created with Task object
   - Error Responses: 400 Bad Request, 500 Internal Server Error

2. **GET /api/{user_id}/tasks**
   - Response: 200 OK with array of Task objects
   - Error Responses: 500 Internal Server Error

3. **GET /api/{user_id}/tasks/{id}**
   - Response: 200 OK with Task object
   - Error Responses: 404 Not Found, 500 Internal Server Error

4. **PUT /api/{user_id}/tasks/{id}**
   - Request Body: {title: string, description?: string}
   - Response: 200 OK with updated Task object
   - Error Responses: 400 Bad Request, 404 Not Found, 500 Internal Server Error

5. **DELETE /api/{user_id}/tasks/{id}**
   - Response: 204 No Content
   - Error Responses: 404 Not Found, 500 Internal Server Error

6. **PATCH /api/{user_id}/tasks/{id}/complete**
   - Request Body: {completed: boolean}
   - Response: 200 OK with updated Task object
   - Error Responses: 400 Bad Request, 404 Not Found, 500 Internal Server Error

### Quickstart Guide

1. Clone the repository
2. Install dependencies: `pip install -r requirements.txt`
3. Set environment variables:
   - DATABASE_URL: Neon PostgreSQL connection string
4. Run the application: `uvicorn main:app --reload`
5. Access API at http://localhost:8000

### Agent Context Update

The following technologies will be added to the agent context:
- FastAPI framework specifics
- SQLModel ORM patterns
- Neon PostgreSQL serverless considerations
- Async database operations in Python

## Phase 2: Implementation Steps

### Step 1: Project Setup
- Initialize FastAPI application
- Configure environment variables
- Set up database connection to Neon PostgreSQL

### Step 2: Database Models
- Define Task and User models using SQLModel
- Set up proper relationships and constraints
- Create database migration scripts

### Step 3: Data Access Layer
- Implement CRUD operations for tasks
- Create database session management
- Implement user isolation logic

### Step 4: Service Layer
- Create business logic for task operations
- Implement validation and error handling
- Ensure proper user isolation

### Step 5: API Layer
- Implement all required endpoints
- Add request/response validation
- Implement proper error responses

### Step 6: Testing
- Unit tests for data access layer
- Integration tests for API endpoints
- Verify user isolation works correctly

## Success Criteria Verification

- [ ] All CRUD endpoints function exactly as specified
- [ ] Tasks persist correctly in the database across requests
- [ ] Each task is correctly associated with a user_id
- [ ] API responses are consistent and predictable
- [ ] Backend is ready to accept JWT-based auth in a later spec without refactor
- [ ] Zero cross-user data leakage occurs
- [ ] All endpoints return appropriate HTTP status codes
- [ ] All responses are in JSON format

## Risks & Mitigations

1. **Risk**: Database connection issues with Neon Serverless
   - **Mitigation**: Implement proper connection pooling and retry logic

2. **Risk**: User isolation not properly enforced
   - **Mitigation**: Thorough testing of user access patterns and comprehensive validation

3. **Risk**: Performance issues under load
   - **Mitigation**: Proper indexing and query optimization