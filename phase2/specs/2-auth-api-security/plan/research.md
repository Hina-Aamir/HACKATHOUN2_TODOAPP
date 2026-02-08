# Research Outcomes: Authentication & API Security (Better Auth + JWT + FastAPI)

## Decision: Better Auth JWT Configuration
- **Rationale**: Better Auth can be configured to generate JWT tokens with custom claims including user_id and email. The JWTs will be signed with the same secret used by the backend for verification.
- **Implementation**: Configure Better Auth with JWT plugin enabled and specify the required claims in the token payload.

## Decision: JWT Verification in FastAPI
- **Rationale**: PyJWT is the most commonly used library for JWT handling in Python and integrates well with FastAPI. It provides functions to decode and verify JWT tokens.
- **Implementation**: Use PyJWT's jwt.decode() function with the shared secret to verify tokens and extract claims.

## Decision: User Identity Extraction Strategy
- **Rationale**: Extracting user_id from the JWT's 'sub' claim (subject) is the standard approach. Comparing this with the route parameter ensures proper user isolation.
- **Implementation**: Create a FastAPI dependency that extracts the token, verifies it, and returns the authenticated user's identity.

## Additional Research: Security Best Practices
- **Decision**: Implement proper error handling that doesn't leak information about why authentication failed
- **Rationale**: Security best practice to not distinguish between different types of auth failures
- **Implementation**: Return the same 401 status code for all authentication failures

## Additional Research: Token Storage and Transmission
- **Decision**: Tokens will be transmitted in the Authorization header using the Bearer scheme
- **Rationale**: Standard approach for API authentication that's widely supported
- **Implementation**: Frontend attaches "Authorization: Bearer <token>" to all API requests

## Additional Research: Environment Configuration
- **Decision**: Use python-dotenv for managing the BETTER_AUTH_SECRET environment variable
- **Rationale**: Standard practice in Python applications for environment configuration
- **Implementation**: Store the shared secret in a .env file and load it with dotenv