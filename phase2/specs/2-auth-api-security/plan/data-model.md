# Data Model: Authentication & API Security (Better Auth + JWT + FastAPI)

## Entity: JWT Token Claims
- **sub**: String (Subject - typically user ID)
  - Type: String
  - Constraints: Not Null, Unique identifier for the user
  - Description: The principal that is the subject of the JWT (typically user ID)

- **email**: String (User email address)
  - Type: String
  - Constraints: Valid email format
  - Description: Email address of the authenticated user

- **iat**: Integer (Issued At)
  - Type: Integer (Unix timestamp)
  - Constraints: Not Null, Current or past time
  - Description: Time at which the JWT was issued

- **exp**: Integer (Expiration Time)
  - Type: Integer (Unix timestamp)
  - Constraints: Not Null, Future time
  - Description: Expiration time on or after which the JWT will not be accepted

- **jti**: String (JWT ID) - Optional
  - Type: String
  - Constraints: Unique identifier for the token
  - Description: Unique identifier for the JWT (used for replay protection)

## Entity: Authenticated User Context
- **user_id**: String
  - Type: String
  - Constraints: Not Null, Matches JWT 'sub' claim
  - Description: The authenticated user's identifier extracted from the JWT

- **email**: String
  - Type: String
  - Constraints: Valid email format, Matches JWT 'email' claim
  - Description: The authenticated user's email address

- **is_authenticated**: Boolean
  - Type: Boolean
  - Constraints: Not Null, Default False
  - Description: Flag indicating if the user is successfully authenticated

- **token_expires_at**: DateTime
  - Type: DateTime
  - Constraints: Not Null, Future time
  - Description: The time when the JWT token expires

## Entity: Authorization Header
- **header_name**: String
  - Type: String
  - Constraints: Value must be "Authorization"
  - Description: The HTTP header name for authentication

- **header_value**: String
  - Type: String
  - Constraints: Format "Bearer <token>"
  - Description: The HTTP header value containing the JWT token

## Validation Rules
- JWT tokens must be properly formatted with header.payload.signature structure
- JWT signature must be verifiable with the shared secret (BETTER_AUTH_SECRET)
- JWT must not be expired (current time < exp claim)
- JWT 'sub' claim must match the user_id in the request path
- Authorization header must follow "Bearer <token>" format

## Relationships
- Authenticated User Context is derived from JWT Token Claims
- Authorization Header contains the JWT Token for transmission
- Authenticated User Context is used to enforce access control on resources