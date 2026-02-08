---
name: auth-skill
description: Implement secure authentication systems including signup, signin, password hashing, JWT tokens, and Better Auth integration.
---

# Authentication Skill

## Instructions

1. **User Signup**
   - Validate user input (email, password)
   - Hash passwords before storing
   - Prevent duplicate accounts

2. **User Signin**
   - Verify credentials securely
   - Compare hashed passwords
   - Handle invalid login attempts

3. **Password Security**
   - Use bcrypt or argon2 for hashing
   - Never store plain-text passwords
   - Apply proper salt rounds

4. **JWT Authentication**
   - Generate access tokens on login
   - Use secure secret keys
   - Set token expiration
   - Verify tokens on protected routes

5. **Better Auth Integration**
   - Configure Better Auth provider
   - Enable session and token handling
   - Integrate with backend APIs
   - Support scalable auth flows

## Best Practices
- Always hash passwords
- Use HTTPS in production
- Store JWT secrets in environment variables
- Implement token expiration and refresh
- Follow least-privilege access control
- Handle auth errors gracefully

## Example Structure
```js
// Signup
const hashedPassword = await bcrypt.hash(password, 10);

// JWT Token
const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

// Protected Route
app.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});
 