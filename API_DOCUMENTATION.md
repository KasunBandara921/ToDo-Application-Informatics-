# 📚 API Documentation Update - Authentication Service Implementation

## 🎯 Overview

This PR introduces JWT-based authentication to the ToDo App API. All endpoints now require proper authentication except for registration and login.

---

## 🔐 What's New - Authentication Service

### ✨ New Features Implemented

1. **User Registration** (`POST /api/auth/register`)
   - BCrypt password encryption
   - Duplicate email/username validation
   - Automatic user creation with timestamps

2. **User Login** (`POST /api/auth/login`)
   - JWT token generation
   - Secure password verification
   - 24-hour token expiration

3. **Spring Security Configuration**
   - Public access to `/api/auth/**` endpoints
   - Protected access to all other endpoints
   - CSRF disabled for REST API
   - Stateless session management

---

## 🔧 Technical Implementation Details

### Security Configuration
- **Password Encoding**: BCrypt with strength 10
- **JWT Algorithm**: HS256
- **Token Expiration**: 86400000ms (24 hours)
- **Authentication Manager**: Spring Security default

### Environment Variables Required

```bash
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/tododb
DB_USERNAME=postgres
DB_PASSWORD=your_secure_password

# JWT Configuration
JWT_SECRET=your-256-bit-secret-key-here
JWT_EXPIRATION=86400000
```

**Generate secure JWT secret:**
```bash
openssl rand -base64 32
```

---

## 📋 Updated API Endpoints

### Authentication Endpoints (NEW ✨)

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2025-11-08T10:30:00Z"
  }
}
```

**Validation Rules:**
- Username: 3-50 characters, unique
- Email: Valid format, unique
- Password: Minimum 8 characters

---

#### 2. Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
}
```

---

## 🔒 Authentication Flow

### For Frontend Developers

**Step 1: User Registration**
```javascript
const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'john_doe',
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});
```

**Step 2: User Login & Token Storage**
```javascript
const response = await fetch('http://localhost:8080/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!'
  })
});

const data = await response.json();
localStorage.setItem('token', data.data.token);
```

**Step 3: Authenticated Requests**
```javascript
const token = localStorage.getItem('token');

const response = await fetch('http://localhost:8080/api/todos', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

---

## 🛡️ Security Features Implemented

### ✅ Completed Security Measures

1. **Password Security**
   - BCrypt hashing (strength: 10 rounds)
   - Passwords never stored in plain text
   - Automatic salt generation

2. **JWT Token Security**
   - Signed with HS256 algorithm
   - Contains user ID and email claims
   - Configurable expiration time
   - Secret key stored in environment variables

3. **Configuration Security**
   - All secrets externalized to environment variables
   - `.env` file excluded from Git
   - `.env.example` provided for team setup
   - No hardcoded credentials in codebase

4. **Access Control**
   - Public: `/api/auth/register` and `/api/auth/login`
   - Protected: All other endpoints require valid JWT
   - User-specific data isolation (todos belong to authenticated user)

---

## 📊 Database Schema Updates

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Todos Table (Updated with User Relationship)
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(20) DEFAULT 'medium',
    due_date TIMESTAMP,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing Guide

### Postman Collection Setup

**1. Environment Variables**
```
base_url = http://localhost:8080/api
token = (will be set after login)
```

**2. Test Sequence**

```
Step 1: Register User
  POST {{base_url}}/auth/register
  Body: { username, email, password }
  Expected: 201 Created

Step 2: Login User  
  POST {{base_url}}/auth/login
  Body: { email, password }
  Expected: 200 OK with JWT token
  Action: Copy token to environment variable

Step 3: Create Todo (Authenticated)
  POST {{base_url}}/todos
  Headers: Authorization: Bearer {{token}}
  Body: { title, description }
  Expected: 201 Created

Step 4: Get User's Todos
  GET {{base_url}}/todos
  Headers: Authorization: Bearer {{token}}
  Expected: 200 OK with user's todos only
```

### Manual Testing Checklist

- [ ] ✅ User registration with valid data succeeds
- [ ] ✅ Registration with duplicate email fails (400)
- [ ] ✅ Login with correct credentials returns token
- [ ] ✅ Login with wrong password fails (401)
- [ ] ✅ Accessing protected endpoint without token fails (401)
- [ ] ✅ Accessing protected endpoint with valid token succeeds
- [ ] ✅ Users can only see/modify their own todos
- [ ] ✅ Token expires after 24 hours

---

## ⚠️ Breaking Changes

### For Existing API Consumers

**Before (No Authentication):**
```javascript
// Old way - no longer works
const response = await fetch('http://localhost:8080/api/todos');
```

**After (With Authentication):**
```javascript
// New way - token required
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:8080/api/todos', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Migration Steps for Frontend

1. Implement login/register UI
2. Store JWT token after successful login
3. Add Authorization header to all API requests
4. Handle 401 errors (redirect to login)
5. Implement token refresh logic (future enhancement)

---

## 🚀 Deployment Checklist

### Before Deploying to Production

- [ ] Set `JWT_SECRET` environment variable (min 256 bits)
- [ ] Set `DB_PASSWORD` environment variable
- [ ] Verify `.env` is in `.gitignore`
- [ ] Test all authentication flows
- [ ] Configure CORS for frontend domain
- [ ] Set up HTTPS (required for production)
- [ ] Enable rate limiting on auth endpoints
- [ ] Set up monitoring for failed login attempts

### Environment-Specific Configuration

**Development (.env.local):**
```bash
JWT_SECRET=dev-secret-key-not-for-production
JWT_EXPIRATION=86400000
DB_PASSWORD=todopass123
```

**Production (.env.production):**
```bash
JWT_SECRET=<strong-256-bit-secret>
JWT_EXPIRATION=86400000
DB_PASSWORD=<strong-database-password>
```

---

## 📝 Code Changes Summary

### New Files Added
- `src/main/java/com/todo/config/SecurityConfig.java`
- `src/main/java/com/todo/controller/AuthController.java`
- `src/main/java/com/todo/service/AuthService.java`
- `src/main/java/com/todo/dto/LoginRequest.java`
- `src/main/java/com/todo/dto/RegisterRequest.java`
- `src/main/java/com/todo/dto/AuthResponse.java`
- `.env.example`
- `README.md` (setup documentation)

### Modified Files
- `src/main/resources/application.properties` (externalized secrets)
- `src/main/java/com/todo/entity/User.java` (password field added)
- `.gitignore` (added `.env`)

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. **No Token Refresh**: Tokens expire after 24 hours, user must login again
2. **No Password Reset**: Feature planned for future release
3. **No Email Verification**: Users can register without email confirmation
4. **No Rate Limiting**: Auth endpoints not rate-limited yet

### Planned Enhancements (Future PRs)
- [ ] Refresh token mechanism
- [ ] Password reset flow via email
- [ ] Email verification for new users
- [ ] OAuth2 social login (Google, GitHub)
- [ ] Rate limiting for authentication endpoints
- [ ] Account lockout after failed attempts
- [ ] Two-factor authentication (2FA)

---

## 📞 Support & Questions

**For Implementation Questions:**
- Backend Lead: @rashmibimashaa
- Reviewer: @ridmi
- Team Channel: #backend-dev

**For Security Concerns:**
- Security Review: @ridmi
- 

**Documentation Updates:**
- Create PR to update this API documentation
- Notify team in #api-changes channel

---

## ✅ Approval Status

**Reviewed by**: @ridmi  
**Status**: ✅ Approved  
**Date**: November 9, 2025  
**Branch**: `feature/auth-service` → `main`  
**Version**: 1.1.0

---

## 🎉 Conclusion

This authentication implementation provides a solid foundation for secure user management. All critical security issues have been addressed, and the system follows Spring Boot security best practices.

**Ready to merge!** 🚀

---

**Last Updated**: November 9, 2025  
**API Version**: 1.1.0 (Authentication Update)  
**Maintained by**: Backend Team (Ridmi coordinator)
