# Development Environment Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your machine.

---

## 🔧 Backend Setup (Spring Boot + PostgreSQL)

### Required Software

#### 1. Java Development Kit (JDK) 17+
**Download & Install:**
- **Windows/Mac/Linux:** [Download from Oracle](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) or [Adoptium](https://adoptium.net/)

**Verify Installation:**
```bash
java -version
# Should show: java version "17.x.x" or higher
```

#### 2. Maven (Build Tool)
**Download & Install:**
- **Windows/Mac/Linux:** [Download Maven](https://maven.apache.org/download.cgi)
- Follow [installation instructions](https://maven.apache.org/install.html)

**Verify Installation:**
```bash
mvn -version
# Should show: Apache Maven 3.x.x
```

#### 3. PostgreSQL Database
**Download & Install:**
- **Windows:** [PostgreSQL Installer](https://www.postgresql.org/download/windows/)
- **Mac:** `brew install postgresql@15`
- **Linux:** `sudo apt-get install postgresql postgresql-contrib`

**Default Credentials:**
- Username: `postgres`
- Password: (set during installation)
- Port: `5432`

**Verify Installation:**
```bash
psql --version
# Should show: psql (PostgreSQL) 15.x
```

**Create Database:**
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE todo_app;

# Verify
\l
\q
```

#### 4. IDE for Backend (Choose One)

**Option A: IntelliJ IDEA (Recommended)**
- [Download Community Edition](https://www.jetbrains.com/idea/download/) (Free)
- Built-in Spring Boot support

**Option B: Eclipse**
- [Download Eclipse IDE for Java Developers](https://www.eclipse.org/downloads/)
- Install Spring Tools 4 plugin

**Option C: VS Code**
- [Download VS Code](https://code.visualstudio.com/)
- Install extensions:
  - Extension Pack for Java
  - Spring Boot Extension Pack

---

## 🎨 Frontend Setup (Next.js)

### Required Software

#### 1. Node.js (v18+ LTS)
**Download & Install:**
- [Download Node.js](https://nodejs.org/) (Choose LTS version)

**Verify Installation:**
```bash
node -v
# Should show: v18.x.x or higher

npm -v
# Should show: 9.x.x or higher
```

#### 2. Package Manager (Choose One)

**Option A: npm (Comes with Node.js)**
```bash
npm -v
```

**Option B: Yarn (Optional, faster)**
```bash
npm install -g yarn
yarn -v
```

#### 3. IDE for Frontend (Choose One)

**Option A: VS Code (Recommended)**
- [Download VS Code](https://code.visualstudio.com/)
- Install extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Prettier - Code formatter
  - ESLint

**Option B: WebStorm**
- [Download WebStorm](https://www.jetbrains.com/webstorm/download/)

---

## 🚀 Project Setup

### Backend Setup (Spring Boot)

1. **Clone the Repository:**
```bash
git clone https://github.com/YOUR-USERNAME/todo-app.git
cd todo-app/backend
```

2. **Configure Database Connection:**
Create `src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_app
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# Server Configuration
server.port=8080

# JWT Configuration (will be added later)
jwt.secret=your-secret-key-here
jwt.expiration=86400000
```

3. **Install Dependencies:**
```bash
mvn clean install
```

4. **Run the Application:**
```bash
mvn spring-boot:run
```

**Backend should start at:** `http://localhost:8080`

---

### Frontend Setup (Next.js)

1. **Navigate to Frontend Folder:**
```bash
cd todo-app/frontend
```

2. **Install Dependencies:**
```bash
npm install
# or
yarn install
```

3. **Create Environment File:**
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

4. **Run Development Server:**
```bash
npm run dev
# or
yarn dev
```

**Frontend should start at:** `http://localhost:3000`

---

## 🧪 Testing Tools

### Postman (API Testing)
1. [Download Postman](https://www.postman.com/downloads/)
2. Create a new collection: "ToDo App API"
3. Import API endpoints (documentation coming soon)

### Thunder Client (VS Code Extension)
- Alternative to Postman
- Install from VS Code Extensions marketplace

---

## 📦 Recommended VS Code Extensions (Complete List)

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "dsznajder.es7-react-js-snippets",
    "vscjava.vscode-java-pack",
    "vmware.vscode-spring-boot",
    "rangav.vscode-thunder-client",
    "eamodio.gitlens"
  ]
}
```

---

## 🔍 Verify Your Setup

### Backend Verification
```bash
cd backend
mvn clean test
# All tests should pass
```

### Frontend Verification
```bash
cd frontend
npm run build
# Build should complete successfully
```

---

## 🆘 Troubleshooting

### Backend Issues

**Problem: Port 8080 already in use**
```bash
# Windows: Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Mac/Linux: Find and kill process
lsof -ti:8080 | xargs kill -9
```

**Problem: Cannot connect to PostgreSQL**
- Verify PostgreSQL is running: `sudo service postgresql status`
- Check credentials in `application.properties`
- Ensure database `todo_app` exists

**Problem: Maven dependencies not downloading**
```bash
mvn clean install -U
# -U forces update of dependencies
```

### Frontend Issues

**Problem: Module not found errors**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem: Port 3000 already in use**
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Useful Commands Cheat Sheet

### Git Commands
```bash
# Clone repository
git clone <repo-url>

# Create and switch to new branch
git checkout -b feature-name

# Pull latest changes
git pull origin develop

# Push your changes
git add .
git commit -m "Your message"
git push origin your-branch
```

### Backend Commands
```bash
# Run application
mvn spring-boot:run

# Clean and build
mvn clean install

# Run tests
mvn test

# Skip tests during build
mvn clean install -DskipTests
```

### Frontend Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linter
npm run lint
```

---

## 📞 Need Help?

If you encounter any issues:
1. Check this troubleshooting guide first
2. Search for the error message online
3. Ask in the team chat
4. Contact Ridmi (Integration Lead)

---

## ✅ Setup Checklist

Before starting development, ensure:

- [ ] JDK 17+ installed and verified
- [ ] Maven installed and verified
- [ ] PostgreSQL installed and database created
- [ ] Node.js 18+ installed and verified
- [ ] IDE installed and configured
- [ ] Repository cloned successfully
- [ ] Backend runs without errors (port 8080)
- [ ] Frontend runs without errors (port 3000)
- [ ] Postman or Thunder Client installed
- [ ] Git configured with your credentials

---

**Last Updated:** November 2025  
**Maintained by:** Ridmi (Team Lead)
