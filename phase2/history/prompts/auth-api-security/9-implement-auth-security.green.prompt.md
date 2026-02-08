---
id: 9
title: Implement Auth Security Backend
stage: green
date_iso: 2026-02-06
surface: agent
model: claude-sonnet-4
feature: auth-api-security
branch: 2-auth-api-security
user: user
command: /sp.implement
labels:
  - implementation
  - auth
  - security
  - jwt
  - fastapi
links:
  spec: ../spec.md
  plan: plan/impl-plan.md
  tasks: ./tasks.md
  ticket: null
  adr: null
  pr: null
files_yaml:
  - requirements.txt
  - .env
  - security/jwt_utils.py
  - api/tasks.py
  - README.md
tests_yaml: []
---

# Implement Auth Security Backend

## User Input

```
Objective:
Secure the Todo REST API by integrating Better Auth–issued JWT tokens with a FastAPI backend, ensuring authenticated, user-isolated access to all endpoints.

Plan steps:

1. **Better Auth Configuration**
   - Enable JWT plugin in Better Auth
   - Configure JWT payload to include:
     - user_id
     - email
   - Set token expiration (e.g., 7 days)
   - Use shared secret from BETTER_AUTH_SECRET

2. **Frontend API Client Updates**
   - Extract JWT token after user login
   - Attach token to every API request:
     - Authorization: Bearer <token>
   - Ensure token is sent consistently for all protected routes

3. **FastAPI JWT Verification**
   - Implement JWT verification dependency or middleware
   - Extract token from Authorization header
   - Verify JWT signature using shared secret
   - Reject invalid, expired, or missing tokens

4. **User Identity Enforcement**
   - Decode JWT payload to obtain authenticated user_id
   - Compare JWT user_id with user_id in route parameter
   - Reject mismatched requests with 403 Forbidden

5. **Securing API Routes**
   - Apply JWT verification to all task endpoints
   - Ensure unauthenticated requests return 401 Unauthorized
   - Ensure authenticated requests are user-scoped

6. **Query Filtering**
   - Modify database queries to filter by authenticated user_id
   - Prevent cross-user data access at query level
   - Enforce ownership checks on read, update, and delete operations

7. **Error Handling & Responses**
   - Standardize auth-related error responses
   - Return clear messages for:
     - Missing token
     - Invalid token
     - Expired token
     - Unauthorized access

8. **Verification**
   - Test authenticated vs unauthenticated requests
   - Confirm users only see their own tasks
   - Confirm JWT expiry is enforced
   - Verify backend remains stateless

Deliverable:
- Fully secured FastAPI backend
- JWT-based authentication enforced on all endpoints
- Strong user isolation with no cross-user data leakage
- Backend ready for frontend UX integration in Spec 3
```

## Response Summary

Successfully implemented the authentication and API security for the Todo backend. The implementation includes:

- Updated requirements.txt to include PyJWT and cryptography dependencies
- Created security/jwt_utils.py with JWT verification functions
- Updated .env to include BETTER_AUTH_SECRET
- Modified all API endpoints in api/tasks.py to require JWT authentication
- Implemented user identity verification to ensure user isolation
- Added proper error handling for authentication failures
- Updated README with authentication setup instructions

All API endpoints now require a valid JWT token in the Authorization header, and users can only access resources associated with their user ID. The system implements stateless authentication with no server-side session storage, and JWT expiration is enforced by the backend.

## Outcome

The backend is now fully secured with JWT-based authentication enforced on all endpoints. User isolation is properly implemented with no cross-user data leakage. The backend is ready for frontend UX integration in future phases.