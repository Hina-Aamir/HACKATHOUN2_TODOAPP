# Data Model: Frontend Application & User Experience (Next.js + Better Auth)

## Entity: User
- **id**: String
  - Type: String
  - Constraints: Not Null, Unique identifier for the user
  - Description: The unique identifier for the authenticated user

- **email**: String
  - Type: String
  - Constraints: Valid email format, Not Null
  - Description: The user's email address used for authentication

- **name**: String
  - Type: String
  - Constraints: Max length 255 characters
  - Description: The user's display name

- **createdAt**: DateTime
  - Type: DateTime
  - Constraints: Not Null, Auto-generated
  - Description: The timestamp when the user account was created

## Entity: Task
- **id**: String
  - Type: String
  - Constraints: Not Null, Unique identifier for the task
  - Description: The unique identifier for the task

- **title**: String
  - Type: String
  - Constraints: Not Null, Max length 255 characters
  - Description: The title of the task

- **description**: Text
  - Type: Text
  - Constraints: Nullable, No character limit
  - Description: Optional detailed description of the task

- **completed**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Indicates whether the task is completed

- **user_id**: String
  - Type: String
  - Constraints: Not Null, Reference to User.id
  - Description: The identifier of the user who owns this task

- **created_at**: DateTime
  - Type: DateTime
  - Constraints: Not Null, Auto-generated
  - Description: The timestamp when the task was created

- **updated_at**: DateTime
  - Type: DateTime
  - Constraints: Not Null, Auto-generated, Updates on change
  - Description: The timestamp when the task was last updated

## Entity: Authentication State
- **isAuthenticated**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if the user is currently authenticated

- **user**: Object
  - Type: Object
  - Constraints: Present when authenticated
  - Description: User information when logged in

- **isLoading**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if authentication state is being loaded

## Entity: UI State
- **isLoading**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if data is currently loading

- **isError**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if there was an error in the operation

- **isEmpty**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if there is no data to display

- **errorMessage**: String
  - Type: String
  - Constraints: Nullable
  - Description: Error message to display when isError is true

## Relationships
- User has many Tasks (One-to-Many)
  - A user can have multiple tasks
  - Each task belongs to exactly one user
  - Implemented via foreign key constraint: Task.user_id → User.id

## Validation Rules
- User.email: Must be a valid email format
- Task.title: Required, maximum 255 characters
- Task.description: Optional, no character limit
- Task.completed: Boolean value, defaults to false
- Task.user_id: Must correspond to an existing user
- Task timestamps: Automatically managed by the system