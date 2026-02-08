// mock-auth-server.js
// Simple mock authentication server for development/testing

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Secret key for JWT signing
const SECRET_KEY = process.env.BETTER_AUTH_SECRET || 'supersecretkeyfordevelopment';

// In-memory storage for users (in production, use a real database)
const users = [];

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    password, // In real app, hash the password
    createdAt: new Date().toISOString()
  };
  users.push(newUser);

  // Generate JWT token
  const token = jwt.sign(
    { sub: newUser.id, email: newUser.email, name: newUser.name },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  res.json({ 
    user: { id: newUser.id, email: newUser.email, name: newUser.name }, 
    token,
    refreshToken: token // In real app, use separate refresh tokens
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign(
    { sub: user.id, email: user.email, name: user.name },
    SECRET_KEY,
    { expiresIn: '7d' }
  );

  res.json({ 
    user: { id: user.id, email: user.email, name: user.name }, 
    token,
    refreshToken: token // In real app, use separate refresh tokens
  });
});

// Verify token endpoint
app.post('/api/auth/verify', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Profile endpoint
app.get('/api/auth/profile', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = users.find(u => u.id === decoded.sub);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  // In a real app, you might invalidate the token
  res.json({ message: 'Logged out successfully' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock auth server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/auth/register - Register a new user');
  console.log('  POST /api/auth/login - Login with email and password');
  console.log('  POST /api/auth/verify - Verify a JWT token');
  console.log('  GET /api/auth/profile - Get user profile');
  console.log('  POST /api/auth/logout - Logout');
});