---
name: frontend-skill
description: Build frontend pages, reusable components, layouts, and styling with secure authentication flows. Use for modern web applications.
---

# Frontend Skill – Pages, Components & Auth

## Instructions

1. **Hero Section**
   - Create responsive hero sections
   - Use clean layout and typography
   - Include headline, subtext, and CTA
   - Optimize for mobile-first design

2. **Page & Component Structure**
   - Build reusable UI components
   - Separate layout and logic
   - Use semantic HTML
   - Follow component-based architecture

3. **Styling & Layout**
   - Use Flexbox and Grid
   - Maintain consistent spacing and colors
   - Apply modern CSS or Tailwind
   - Support dark/light themes

4. **User Signup UI**
   - Design signup forms
   - Validate email and password inputs
   - Show inline validation errors
   - Prevent duplicate submissions

5. **User Signin UI**
   - Build secure login forms
   - Handle invalid credentials gracefully
   - Display loading and error states
   - Redirect after successful login

6. **Authentication Integration**
   - Connect frontend with backend auth APIs
   - Handle JWT tokens securely
   - Store tokens safely (httpOnly cookies or memory)
   - Protect authenticated pages

7. **Better Auth Integration**
   - Integrate Better Auth provider
   - Manage sessions and tokens
   - Support scalable auth flows
   - Sync frontend state with backend auth

## Best Practices
- Keep UI clean and accessible
- Use reusable components
- Never expose secrets in frontend
- Handle auth errors gracefully
- Follow responsive and mobile-first design
- Ensure smooth UX for login/signup flows

## Example Structure
```html
<section class="hero">
  <div class="hero-content">
    <h1>Build Modern Frontend Experiences</h1>
    <p>Pages, components, layouts, and secure auth</p>
    <button class="cta-button">Get Started</button>
  </div>
</section>

<form class="auth-form">
  <input type="email" placeholder="Email" required />
  <input type="password" placeholder="Password" required />
  <button type="submit">Sign In</button>
</form>
