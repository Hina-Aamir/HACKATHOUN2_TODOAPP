---
name: database-skill
description: Design secure database schemas and implement authentication with hashed passwords, JWT, and Better Auth integration.
---

# Database & Authentication Skill

## Instructions

1. **User Signup**
   - Design user table/schema (id, email, password, timestamps)
   - Validate email and password inputs
   - Hash passwords before storing
   - Enforce unique email constraint to prevent duplicates

2. **User Signin**
   - Fetch user by email securely
   - Compare hashed passwords using bcrypt or argon2
   - Return meaningful errors for invalid credentials
   - Protect against brute-force attempts

3. **Password Security**
   - Use bcrypt or argon2 for hashing
   - Apply appropriate salt rounds
   - Never store or log plain-text passwords
   - Support future password upgrades

4. **JWT Authentication**
   - Generate access tokens on successful login
   - Store JWT secret in environment variables
   - Set token expiration (e.g., 1h)
   - Verify JWT on protected routes
   - Attach decoded user data to request context

5. **Better Auth Integration**
   - Configure Better Auth provider
   - Enable session and token handling
   - Integrate with backend APIs
   - Support scalable and modular auth flows

## Best Practices
- Always hash passwords before saving
- Use HTTPS in production
- Store secrets and keys in environment variables
- Implement token expiration and refresh strategies
- Follow least-privilege access control
- Handle authentication errors gracefully
- Use migrations for schema changes

## Example Structure
```js
// Signup – Password Hashing
const hashedPassword = await bcrypt.hash(password, 10);

// Save user
await User.create({
  email,
  password: hashedPassword
});

// JWT Token Generation
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Protected Route
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});
