# Troubleshooting Guide

## Network Error / Cannot Connect to Backend

If you're seeing a "Network Error" or "Cannot connect to backend server" message, follow these steps:

### 1. Check if Backend is Running

**Verify the backend server is running:**
- Open a terminal/command prompt
- Navigate to your backend directory
- Start your Spring Boot application
- Verify it's running on `http://localhost:8080`

**Test backend connection:**
```bash
# Using curl
curl http://localhost:8080/api/health

# Or open in browser
http://localhost:8080/api/health
```

### 2. Verify API URL Configuration

**Check your `.env.local` file:**
1. Navigate to the `frontend` directory
2. Open or create `.env.local` file
3. Ensure it contains:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```

**Note:** If your backend uses a different port or path, update the URL accordingly.

### 3. Restart Development Server

After changing `.env.local`:
1. Stop the Next.js dev server (Ctrl+C)
2. Delete `.next` folder (optional, but recommended)
3. Restart the server:
   ```bash
   npm run dev
   ```

### 4. Check CORS Configuration

The backend must allow requests from `http://localhost:3000`. 

**Spring Boot CORS Configuration Example:**
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

### 5. Verify Backend API Endpoints

Ensure your backend has these endpoints:

**Authentication:**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

**Todos:**
- `GET /api/todos` - Get all todos (requires JWT)
- `POST /api/todos` - Create todo (requires JWT)
- `PUT /api/todos/:id` - Update todo (requires JWT)
- `DELETE /api/todos/:id` - Delete todo (requires JWT)

### 6. Check Browser Console

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab to see failed requests

### 7. Verify JWT Token

If you can login but todos fail to load:
1. Check if JWT token is stored in localStorage
2. Verify token is included in request headers
3. Check backend logs for authentication errors

### 8. Common Issues

**Port Already in Use:**
- Backend: Change port in `application.properties`
- Frontend: Use different port: `npm run dev -- -p 3001`

**Firewall/Antivirus:**
- Temporarily disable to test if it's blocking connections

**Windows/WSL:**
- If using WSL, use `http://localhost:8080` not `http://127.0.0.1:8080`
- Or use the WSL IP address

**Docker:**
- If backend runs in Docker, ensure ports are properly mapped
- Use `http://host.docker.internal:8080` if needed

### 9. Debug Mode

The app logs API URLs and errors in development mode. Check the browser console for:
- API Base URL being used
- Detailed error information
- Request/response details

### 10. Test Backend Manually

**Test registration:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

**Test login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Test todos (with token):**
```bash
curl -X GET http://localhost:8080/api/todos \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Still Having Issues?

1. Check backend logs for errors
2. Verify database connection
3. Ensure all dependencies are installed
4. Check Spring Boot application is properly configured
5. Verify JWT secret key is set in backend

## Quick Checklist

- [ ] Backend server is running
- [ ] Backend is accessible at `http://localhost:8080`
- [ ] `.env.local` file exists with correct API URL
- [ ] Next.js dev server restarted after changing `.env.local`
- [ ] CORS is properly configured in backend
- [ ] Backend API endpoints match expected paths
- [ ] No firewall blocking connections
- [ ] Browser console shows detailed error messages

