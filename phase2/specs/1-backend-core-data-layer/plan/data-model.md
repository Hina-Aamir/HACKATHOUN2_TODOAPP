# Data Model: Backend Core & Data Layer

## Entity: Task
- **id**: UUID (Primary Key, auto-generated)
  - Type: UUID (or Integer if simpler)
  - Constraints: Unique, Not Null, Auto-generated
  - Description: Unique identifier for each task

- **title**: String
  - Type: VARCHAR(255)
  - Constraints: Not Null, Max Length 255
  - Description: Brief title of the task

- **description**: Text
  - Type: TEXT
  - Constraints: Nullable
  - Description: Detailed description of the task (optional)

- **completed**: Boolean
  - Type: BOOLEAN
  - Constraints: Not Null, Default False
  - Description: Indicates whether the task is completed

- **user_id**: UUID
  - Type: UUID (or Integer if simpler)
  - Constraints: Not Null, Foreign Key reference to User.id
  - Description: Identifier of the user who owns this task

- **created_at**: DateTime
  - Type: TIMESTAMP
  - Constraints: Not Null, Auto-generated
  - Description: Timestamp when the task was created

- **updated_at**: DateTime
  - Type: TIMESTAMP
  - Constraints: Not Null, Auto-generated, Updates on Change
  - Description: Timestamp when the task was last updated

## Entity: User
- **id**: UUID
  - Type: UUID (or Integer if simpler)
  - Constraints: Primary Key, Unique, Not Null, Auto-generated
  - Description: Unique identifier for each user

- **user_id**: UUID
  - Type: UUID
  - Constraints: Unique, Not Null
  - Description: Identifier used in API routes to identify the user

## Relationships
- Task belongs to User (Many-to-One)
  - A user can have many tasks
  - Each task belongs to exactly one user
  - Implemented via foreign key constraint: Task.user_id → User.id

## Validation Rules
- Task.title: Required, maximum 255 characters
- Task.description: Optional, no character limit
- Task.completed: Boolean value, defaults to false
- Task.user_id: Must correspond to an existing user
- Task timestamps: Automatically managed by the system

## Indexes
- Index on user_id for efficient querying of user-specific tasks
- Index on (user_id, completed) for efficient filtering by user and completion status
- Index on created_at for chronological ordering