# Network Error - Solution Guide

## Problem
You're seeing a "Network Error" when trying to fetch todos. This error occurs because the frontend cannot connect to the backend server.

## Root Cause
The Network Error typically means one of the following:
1. **Backend server is not running** (most common)
2. **Backend is running on a different port/URL**
3. **CORS is not configured** in the backend
4. **API endpoint paths don't match**

## Quick Fix Steps

### Step 1: Start Your Backend Server
1. Navigate to your backend directory
2. Start your Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   # or
   mvn spring-boot:run
   # or run from your IDE
   ```
3. Verify it's running by opening: `http://localhost:8080` in your browser

### Step 2: Verify API URL
1. Check your `frontend/.env.local` file exists
2. Ensure it contains:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
3. If your backend uses a different port, update the URL accordingly

### Step 3: Restart Frontend Dev Server
1. Stop the Next.js server (Ctrl+C)
2. Restart it:
   ```bash
   cd frontend
   npm run dev
   ```

### Step 4: Check Browser Console
1. Open browser developer tools (F12)
2. Check the Console tab - you should see:
   - `API Base URL: http://localhost:8080/api`
3. Check the Network tab to see if requests are being made

## What Was Fixed in the Code

### 1. Enhanced Error Handling
- Better error messages that explain what's wrong
- Detailed error logging in development mode
- Clear indication when backend is offline

### 2. Backend Status Indicator
- Added a visual indicator showing if backend is online/offline
- Automatically checks backend status every 15 seconds
- Shows helpful error messages

### 3. Improved API Configuration
- Added timeout (10 seconds) to prevent hanging requests
- Better error detection for network issues
- Logs API URL in development mode for debugging

### 4. Better Error Display
- Formatted error messages in the UI
- Multi-line error support
- Visual error indicators

## Testing the Connection

### Manual Test
Open your browser and try:
```
http://localhost:8080/api/health
```
or
```
http://localhost:8080/actuator/health
```

If you get a response (even 404), the backend is running.

### Using curl
```bash
# Test backend is running
curl http://localhost:8080

# Test API endpoint (if public)
curl http://localhost:8080/api/health
```

## Backend Requirements

Your Spring Boot backend MUST have:

### 1. CORS Configuration
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

### 2. Required Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/todos` (requires JWT)
- `POST /api/todos` (requires JWT)
- `PUT /api/todos/:id` (requires JWT)
- `DELETE /api/todos/:id` (requires JWT)

### 3. JWT Authentication
- Backend must accept JWT tokens in `Authorization: Bearer <token>` header
- Token should be validated on protected endpoints
- Return 401 if token is invalid/expired

## Common Issues & Solutions

### Issue: "Cannot connect to backend server"
**Solution:** Start your Spring Boot backend server

### Issue: "CORS error" in browser console
**Solution:** Add CORS configuration to your Spring Boot backend (see above)

### Issue: "401 Unauthorized"
**Solution:** 
- Make sure you're logged in
- Check JWT token is being sent in requests
- Verify token is valid and not expired

### Issue: "404 Not Found"
**Solution:** 
- Verify API endpoint paths match between frontend and backend
- Check that backend controllers are properly mapped

### Issue: Port already in use
**Solution:**
- Change backend port in `application.properties`: `server.port=8081`
- Update `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8081/api`

## Still Not Working?

1. **Check Backend Logs:** Look for errors in your Spring Boot console
2. **Check Browser Console:** Look for detailed error messages
3. **Verify Database:** Make sure your database is running and connected
4. **Check Firewall:** Temporarily disable to test if it's blocking connections
5. **Try Different Browser:** Rule out browser-specific issues

## Next Steps

Once your backend is running:
1. The "Backend server is offline" message should disappear
2. You should be able to register/login
3. Todos should load and work properly

## Need More Help?

See `TROUBLESHOOTING.md` for comprehensive troubleshooting guide.

