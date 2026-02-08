# Implementation Plan: Authentication & API Security (Better Auth + JWT + FastAPI)

**Feature Branch**: `2-auth-api-security`
**Created**: 2026-02-06
**Status**: Draft
**Plan**: [Link to this document]

## Technical Context

This plan outlines the implementation of authentication and API security for the Todo application using Better Auth (frontend) and JWT tokens with a FastAPI backend. The system will ensure that all API endpoints require valid JWT tokens and enforce strict user isolation.

### Technology Stack
- **Authentication Provider**: Better Auth (JavaScript/TypeScript)
- **Backend Framework**: FastAPI (Python 3.9+)
- **Token Type**: JWT (JSON Web Token)
- **Token Verification**: Python-JOSE or PyJWT library
- **Environment**: Environment variables for configuration (BETTER_AUTH_SECRET)

### Architecture Overview
- **Frontend**: Better Auth generates JWT tokens upon user authentication
- **API Layer**: FastAPI endpoints with JWT verification dependency
- **Security Layer**: JWT verification middleware/dependency extracting user identity
- **Service Layer**: Business logic enforcing user isolation based on JWT claims
- **Data Layer**: SQLModel models with user-scoped queries

### Known Unknowns
- Specific JWT payload structure from Better Auth
- Exact format of BETTER_AUTH_SECRET configuration
- How to handle token expiration on the backend side

## Constitution Check

This implementation will adhere to the following constitutional principles:

### I. Correctness of RESTful API Design
- All API endpoints will continue to follow REST conventions
- Each endpoint will handle appropriate HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Expected status codes will be returned (200, 201, 401, 403, 404)

### II. Data Integrity and Consistency
- Database queries will be filtered by authenticated user_id
- Transaction handling will ensure data consistency

### III. Clear Separation of Concerns
- Distinct Security, API, Service, and Data layers will be implemented
- Each layer will have well-defined interfaces between them

### IV. Reproducibility Through Specifications
- Implementation will follow the feature specification exactly
- All behaviors will be traceable back to specific requirements

### V. Deterministic Behavior
- API responses will be predictable and consistent
- Error cases will be explicitly handled and documented

### VI. Security and Access Control
- User isolation will be maintained at the data layer
- Users will only access their own tasks via JWT-based user_id verification

## Gates

### Compliance Gate
- [x] All constitutional principles will be followed
- [x] Implementation will adhere to specified constraints
- [x] Stateless authentication will be implemented (no backend session storage)
- [x] All endpoints will require valid JWT tokens

### Technical Gate
- [x] Better Auth will be used as the authentication provider
- [x] JWT tokens will be used for authorization
- [x] FastAPI will be used as the backend framework
- [x] BETTER_AUTH_SECRET will be used via environment variable

### Quality Gate
- [x] All functional requirements from the spec will be implemented
- [x] User isolation will be enforced via JWT verification
- [x] No cross-user data leakage will occur

## Phase 0: Outline & Research

### Research Tasks

1. **Better Auth JWT Configuration**
   - Decision: Configure Better Auth to generate JWT tokens with user_id and email
   - Rationale: Need to ensure the JWT payload contains the necessary user identity information
   - Alternatives considered: Custom JWT generation, different claim structures

2. **JWT Verification in FastAPI**
   - Decision: Use PyJWT library with a FastAPI dependency for token verification
   - Rationale: PyJWT is the standard library for JWT handling in Python with good FastAPI integration
   - Alternatives considered: python-jose, authlib

3. **User Identity Extraction Strategy**
   - Decision: Extract user_id from JWT claims and compare with route parameter
   - Rationale: Ensures proper user isolation at the service layer
   - Alternatives considered: Database lookup, header comparison

### Research Outcomes

1. **JWT Token Structure**
   - Better Auth JWTs contain user information in standard claims
   - Need to verify the exact claim name for user_id (could be 'sub', 'user_id', etc.)
   - Token verification requires the shared secret from BETTER_AUTH_SECRET

2. **FastAPI Security Dependencies**
   - Use FastAPI's Depends() to inject JWT verification logic
   - Create a dependency that extracts and validates the token
   - Return authenticated user identity for use in endpoints

3. **User Isolation Implementation**
   - Verify JWT user_id matches the route user_id parameter
   - Filter database queries by authenticated user_id
   - Return 403 for mismatched requests

## Phase 1: Design & Contracts

### Data Model (data-model.md)

**JWT Token Claims:**
- sub: User identifier (may be user_id)
- email: User email address
- iat: Issued at timestamp
- exp: Expiration timestamp

**Authenticated User Context:**
- user_id: Extracted from JWT claims
- email: User email from JWT claims
- is_authenticated: Boolean flag

### API Contracts

**Updated OpenAPI Specification:**

1. **POST /api/{user_id}/tasks**
   - Headers: Authorization: Bearer <token>
   - Request Body: {title: string, description?: string}
   - Response: 201 Created with Task object
   - Error Responses: 401 Unauthorized, 403 Forbidden, 400 Bad Request, 500 Internal Server Error

2. **GET /api/{user_id}/tasks**
   - Headers: Authorization: Bearer <token>
   - Response: 200 OK with array of Task objects
   - Error Responses: 401 Unauthorized, 403 Forbidden, 500 Internal Server Error

3. **GET /api/{user_id}/tasks/{id}**
   - Headers: Authorization: Bearer <token>
   - Response: 200 OK with Task object
   - Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

4. **PUT /api/{user_id}/tasks/{id}**
   - Headers: Authorization: Bearer <token>
   - Request Body: {title: string, description?: string}
   - Response: 200 OK with updated Task object
   - Error Responses: 401 Unauthorized, 403 Forbidden, 400 Bad Request, 404 Not Found, 500 Internal Server Error

5. **DELETE /api/{user_id}/tasks/{id}**
   - Headers: Authorization: Bearer <token>
   - Response: 204 No Content
   - Error Responses: 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error

6. **PATCH /api/{user_id}/tasks/{id}/complete**
   - Headers: Authorization: Bearer <token>
   - Request Body: {completed: boolean}
   - Response: 200 OK with updated Task object
   - Error Responses: 401 Unauthorized, 403 Forbidden, 400 Bad Request, 404 Not Found, 500 Internal Server Error

### Quickstart Guide

1. Set up Better Auth on the frontend to generate JWT tokens
2. Configure BETTER_AUTH_SECRET environment variable
3. Run the application: `uvicorn main:app --reload`
4. Authenticate via Better Auth to obtain JWT token
5. Include token in Authorization header for API requests: `Authorization: Bearer <token>`

### Agent Context Update

The following technologies will be added to the agent context:
- JWT token verification with PyJWT
- FastAPI security dependencies
- Better Auth integration patterns
- User isolation techniques in FastAPI

## Phase 2: Implementation Steps

### Step 1: JWT Verification Module
- Create JWT verification utility functions
- Implement token extraction from Authorization header
- Create FastAPI dependency for JWT verification

### Step 2: Security Dependencies
- Create dependency to verify JWT and extract user identity
- Implement user_id comparison logic
- Handle token validation errors

### Step 3: Update API Endpoints
- Add JWT verification dependency to all endpoints
- Modify service layer to use authenticated user_id
- Update database queries to filter by authenticated user

### Step 4: Error Handling
- Implement standardized error responses for auth failures
- Ensure consistent 401/403 responses
- Add proper error messaging

### Step 5: Testing
- Test authenticated requests with valid tokens
- Test unauthorized requests without tokens
- Test user isolation between different users
- Verify JWT expiration handling

## Success Criteria Verification

- [ ] All API endpoints require a valid JWT token with 100% enforcement rate
- [ ] Backend correctly verifies JWT signature using shared secret with 99.9% accuracy
- [ ] Authenticated user is correctly identified from JWT payload with 100% accuracy
- [ ] User can only access and modify their own tasks with 100% enforcement rate
- [ ] Unauthorized requests consistently return 401 errors with 100% consistency
- [ ] System processes authenticated requests with less than 10% additional latency compared to unsecured endpoints
- [ ] Backend remains stateless with no server-side session storage
- [ ] All functional requirements from the spec are implemented

## Risks & Mitigations

1. **Risk**: JWT token expiration not handled properly
   - **Mitigation**: Implement proper error handling for expired tokens with clear messaging

2. **Risk**: User isolation not properly enforced
   - **Mitigation**: Thorough testing of user access patterns and comprehensive validation

3. **Risk**: Security vulnerability in JWT verification
   - **Mitigation**: Use well-tested libraries and follow security best practices