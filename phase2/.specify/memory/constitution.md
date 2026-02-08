<!-- SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles: None (new constitution)
Added sections: Core Principles (6), Additional Constraints, Development Workflow
Removed sections: None
Templates requiring updates: 
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
Follow-up TODOs: None
-->

# Phase II – Todo Full-Stack Web Application Constitution

## Core Principles

### I. Correctness of RESTful API Design
All API endpoints must follow REST conventions and implement the specified CRUD operations correctly. Each endpoint must handle the appropriate HTTP methods and return expected status codes. APIs must be designed with clear, consistent interfaces that follow industry best practices.

### II. Data Integrity and Consistency
All database interactions must maintain data integrity through proper constraints, validation, and transaction handling. Data persistence must be reliable and consistent across all operations. Database schemas must be well-defined with appropriate relationships and constraints enforced at the database level.

### III. Clear Separation of Concerns
The application must maintain clear separation between API, service, and data layers. Each layer should have distinct responsibilities with well-defined interfaces between them. This promotes maintainability, testability, and scalability of the application.

### IV. Reproducibility Through Specifications
All backend behaviors must be explicitly specified in documentation before implementation. Code generation must follow specifications and prompts to ensure reproducibility. All implementations must be traceable back to specific requirements in the specification documents.

### V. Deterministic Behavior
All API responses and database interactions must be deterministic and predictable. Error cases must be explicitly handled and documented. The system must behave consistently under identical inputs and conditions.

### VI. Security and Access Control
All endpoints must validate user identity and enforce proper access controls. User isolation must be maintained at the data layer to prevent cross-user data leakage. Authentication and authorization must be properly implemented and validated.

## Additional Constraints

- Backend framework: FastAPI (Python)
- Database: Neon Serverless PostgreSQL
- ORM or query layer must be clearly defined using SQLModel
- No manual coding — implementation must be agent-generated
- All API behaviors must be explicitly specified
- HTTP status codes must follow REST conventions
- Error cases must be explicitly handled and described
- Code generation must follow FastAPI best practices
- Each task must be associated with a user_id
- Return only tasks matching the provided user_id

## Development Workflow

- All development must follow the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via Claude Code
- All functional requirements must be implemented as specified:
  - GET /api/{user_id}/tasks
  - POST /api/{user_id}/tasks
  - GET /api/{user_id}/tasks/{id}
  - PUT /api/{user_id}/tasks/{id}
  - DELETE /api/{user_id}/tasks/{id}
  - PATCH /api/{user_id}/tasks/{id}/complete
- All endpoints must return predictable JSON schemas
- Validation errors must return 4xx responses
- Server errors must return 5xx responses
- No silent failures allowed

## Quality Standards

- API responses must be JSON
- All endpoints must return predictable schemas
- Validation errors must return 4xx responses
- Server errors must return 5xx responses
- No silent failures allowed
- All database interactions must be deterministic and documented
- Primary keys must be enforced at the database level
- User-task relationship must be enforced via user_id column
- Database schema must be reproducible

## Functional Requirements

- Implement all core Todo CRUD endpoints as specified
- Persist all tasks in PostgreSQL
- Each task must be associated with a user_id
- Support task completion toggling
- Return only tasks matching the provided user_id
- Task fields: id, title, description, completed, user_id, created_at, updated_at

## Governance

This constitution governs all development activities for the Phase II Todo Full-Stack Web Application. All implementations must comply with these principles and constraints. Amendments to this constitution require documentation of the change, approval from project stakeholders, and a migration plan for existing code.

All pull requests and reviews must verify compliance with these principles. Complexity must be justified with clear benefits to the project. Use specification documents for runtime development guidance.

**Version**: 1.1.0 | **Ratified**: 2026-02-06 | **Last Amended**: 2026-02-06