---
name: backend-skill
description: Generate secure backend routes for authentication, handle requests/responses, connect to databases, and implement JWT-based auth.
---

# Backend Authentication Skill

## Instructions

1. **User Signup**
   - Validate request body (email, password)
   - Check if user already exists
   - Hash password using bcrypt or argon2
   - Store user securely in the database

2. **User Signin**
   - Fetch user by email
   - Compare hashed password securely
   - Reject invalid credentials
   - Return auth token on success

3. **Password Security**
   - Always hash passwords before storing
   - Use proper salt rounds
   - Never expose password fields in responses

4. **JWT Authentication**
   - Generate JWT on successful login
   - Include user ID in token payload
   - Set token expiration
   - Verify token for protected routes

5. **Better Auth Integration**
   - Configure Better Auth provider
   - Enable session and token support
   - Integrate with backend APIs
   - Support scalable authentication flows

## Best Practices
- Never store plain-text passwords
- Use environment variables for secrets
- Apply token expiration and refresh logic
- Handle auth errors consistently
- Follow least-privilege access control
- Use HTTPS in production

## Example Structure
```js
// Signup
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({ email, password: hashedPassword });

// JWT Token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Protected Route
app.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Access granted",
    user: req.user
  });
});
