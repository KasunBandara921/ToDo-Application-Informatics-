# ToDo Application - Backend

Spring Boot REST API for ToDo application with JWT authentication.

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- PostgreSQL 14 or higher
- Maven 3.6+

### Environment Setup

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd todoapp
```

2. **Create PostgreSQL database**
```sql
   CREATE DATABASE tododb;
```

3. **Configure environment variables**

   Copy the example environment file:
```bash
   cp .env.example .env
```

Update `.env` with your credentials:
```properties
   DB_PASSWORD=your_actual_postgres_password
   JWT_SECRET=your_generated_secret_key
```

4. **Generate JWT Secret** (recommended)
```bash
   # On Mac/Linux
   openssl rand -base64 32
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the output to `JWT_SECRET` in `.env`

5. **Run the application**
```bash
   # Using Maven wrapper
   ./mvnw spring-boot:run
   
   # On Windows
   mvnw.cmd spring-boot:run
```

6. **Verify it's running**

   Open browser or Postman:
```
   GET http://localhost:8080/api/auth/health
```

Expected response:
```json
   {
     "status": "OK",
     "message": "Auth service is running"
   }
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/health` - Health check

### Todos (Day 4)
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/{id}` - Update todo
- `DELETE /api/todos/{id}` - Delete todo
- `PATCH /api/todos/{id}/toggle` - Toggle completion

## 🔒 Security

- Passwords encrypted with BCrypt
- JWT tokens for authentication
- Environment variables for sensitive data
- Input validation on all endpoints

## 🛠️ Tech Stack

- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT (JSON Web Tokens)
- Lombok
- Maven

## 📝 Notes

- Never commit `.env` file to Git
- Always use environment variables for secrets
- Use different secrets for dev/staging/prod
- Database tables auto-created by Hibernate

## 👥 Team

- Backend: [Your Name], Ruhini
- Frontend: Kasun, Indu
- Full-stack: Ridmi