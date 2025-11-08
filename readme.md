# ToDo App Project

Full-stack ToDo application built with Spring Boot (Backend) and Next.js (Frontend).

## Team Members
- Ridmi - Integration
- [Your name] - Backend Developer
- Ruhini - Backend Developer
- Kasun - Frontend Developer
- Indu - Frontend Developer

## Tech Stack

### Backend
- Java 17+
- Spring Boot 3.x
- PostgreSQL
- JWT Authentication

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Project Structure
```
todo-app/
├── backend/          # Spring Boot application
├── frontend/         # Next.js application
└── README.md
```

## Getting Started
Setup instructions coming soon...

## Development Workflow
- `main` - Production-ready code
- `develop` - Development branch
- `backend-dev` - Backend features
- `frontend-dev` - Frontend features
```

---

### **Step 4: Create Branches (5 minutes)**

1. In your repository, click **"main"** dropdown (top left)
2. Type `develop` → Click **"Create branch: develop"**
3. Repeat for:
   - `backend-dev`
   - `frontend-dev`

---

### **Step 5: Add Branch Protection (Optional but Recommended)**

1. Go to **Settings** → **Branches**
2. Click **"Add branch protection rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require approvals: 1
5. Click **"Create"**

---

### **Step 6: Invite Team Members (5 minutes)**

1. Go to **Settings** → **Collaborators**
2. Click **"Add people"**
3. Enter each team member's GitHub username or email
4. Set their role as **"Write"** (they can push code)
5. Send invitations to all 4 team members

---

### **Step 7: Add Better .gitignore Files**

**For Backend folder:**
Create `backend/.gitignore`:
```
# Spring Boot
target/
*.jar
*.war
*.class
.mvn/
mvnw
mvnw.cmd

# IDE
.idea/
*.iml
.vscode/
*.swp

# Environment
.env
application-local.properties
```

**For Frontend folder:**
Create `frontend/.gitignore`:
```
# Next.js
.next/
out/
node_modules/

# Environment
.env*.local

# IDE
.idea/
.vscode/
*.swp

# Dependencies
package-lock.json
yarn.lock
```

---

### **Step 8: Share with Team (5 minutes)**

1. Copy your repository URL (e.g., `https://github.com/YOUR-USERNAME/todo-app`)
2. Post in your team group chat or ClickUp:
```
✅ Repository Setup Complete!

📦 Repository: [paste URL here]

Please:
1. Accept the GitHub invitation (check your email)
2. Clone the repository: git clone [URL]
3. Let me know once you have access

Branches created:
- main (protected)
- develop (main development)
- backend-dev (for backend work)
- frontend-dev (for frontend work)
