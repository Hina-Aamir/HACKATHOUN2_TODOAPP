# Frontend-Backend API Contract: Todo Application

## Authentication Flow

### Sign Up
- **Endpoint**: Provided by Better Auth
- **Method**: POST
- **Description**: Creates a new user account
- **Success Response**: Redirects to dashboard or home page
- **Error Response**: Displays appropriate error messages

### Sign In
- **Endpoint**: Provided by Better Auth
- **Method**: POST
- **Description**: Authenticates an existing user
- **Success Response**: Sets JWT token and redirects to dashboard
- **Error Response**: Displays appropriate error messages

### Sign Out
- **Endpoint**: Provided by Better Auth
- **Method**: POST
- **Description**: Logs out the current user
- **Success Response**: Clears JWT token and redirects to landing page

## Task Management API Calls

### Create Task
- **Endpoint**: `POST /api/{user_id}/tasks`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "description": "string (optional)"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "user_id": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `400 Bad Request`: Invalid input data
  - `500 Internal Server Error`: Server error

### Get All Tasks
- **Endpoint**: `GET /api/{user_id}/tasks`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Success Response**: `200 OK`
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "completed": "boolean",
      "user_id": "string",
      "created_at": "datetime",
      "updated_at": "datetime"
    }
  ]
  ```
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `500 Internal Server Error`: Server error

### Get Single Task
- **Endpoint**: `GET /api/{user_id}/tasks/{task_id}`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Success Response**: `200 OK`
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "user_id": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `404 Not Found`: Task not found
  - `500 Internal Server Error`: Server error

### Update Task
- **Endpoint**: `PUT /api/{user_id}/tasks/{task_id}`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "string (required)",
    "description": "string (optional)"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "user_id": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `400 Bad Request`: Invalid input data
  - `404 Not Found`: Task not found
  - `500 Internal Server Error`: Server error

### Delete Task
- **Endpoint**: `DELETE /api/{user_id}/tasks/{task_id}`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
- **Success Response**: `204 No Content`
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `404 Not Found`: Task not found
  - `500 Internal Server Error`: Server error

### Toggle Task Completion
- **Endpoint**: `PATCH /api/{user_id}/tasks/{task_id}/complete`
- **Headers**: 
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "completed": "boolean (required)"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "user_id": "string",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
  ```
- **Error Responses**: 
  - `401 Unauthorized`: Invalid or missing JWT token
  - `403 Forbidden`: User does not have access to this user_id
  - `400 Bad Request`: Invalid input data
  - `404 Not Found`: Task not found
  - `500 Internal Server Error`: Server error

## Error Handling

### Common Error Responses
- `401 Unauthorized`: Returned when JWT token is missing, invalid, or expired
- `403 Forbidden`: Returned when user tries to access resources they don't own
- `404 Not Found`: Returned when requested resource doesn't exist
- `400 Bad Request`: Returned when request data is invalid
- `500 Internal Server Error`: Returned when an unexpected server error occurs

## Loading States
- Frontend should display loading indicators during API requests
- Frontend should handle network errors gracefully
- Frontend should implement retry mechanisms for failed requests

## Empty States
- Frontend should display appropriate messaging when no tasks exist
- Frontend should provide clear call-to-action for creating new tasks