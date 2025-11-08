# ToDo App Project

Full-stack ToDo application built with Spring Boot (Backend) and Next.js (Frontend).

---

## 👥 Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| Ridmi |  Integration | Repository setup, API docs, Integration testing |
| Rashmi | Backend Developer | Database design, API implementation |
| Ruhini | Backend Developer | Authentication, CRUD endpoints |
| Kasun | Frontend Developer | UI components, Todo management |
| Indu | Frontend Developer | Authentication UI, API integration |

---

## 🛠️ Tech Stack

### Backend
- **Language:** Java 17+
- **Framework:** Spring Boot 3.x
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Build Tool:** Maven

### Frontend
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **HTTP Client:** Axios

---

## 📚 Documentation

- 🚀 **[Setup Guide](./SETUP.md)** - Complete development environment setup instructions
- 🔌 **[API Documentation](./API_DOCUMENTATION.md)** - API endpoints and contract reference ⏳ *Under Review*
- 📮 **Postman Collection** - API testing collection *(Coming Soon)*

---

## 📁 Project Structure

```
todo-app/
├── backend/              # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/    # Java source code
│   │   │   └── resources/
│   │   └── test/        # Unit tests
│   ├── pom.xml          # Maven dependencies
│   └── README.md
│
├── frontend/            # Next.js application
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   ├── components/  # React components
│   │   └── lib/         # Utilities
│   ├── public/          # Static assets
│   ├── package.json     # NPM dependencies
│   └── README.md
│
├── SETUP.md             # Setup instructions
├── API_DOCUMENTATION.md # API reference
└── README.md            # This file
```

---

## 🚀 Quick Start

### Prerequisites
Before you begin, make sure you have:
- Java 17+ installed
- Maven installed
- Node.js 18+ installed
- PostgreSQL installed and running

📖 **[Read the complete setup guide](./SETUP.md)** for detailed instructions.

### Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
mvn clean install

# Configure database (edit application.properties)
# Then run the application
mvn spring-boot:run
```
Backend will run at: `http://localhost:8080`

### Frontend Setup
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api

# Run development server
npm run dev
```
Frontend will run at: `http://localhost:3000`

---

## 🔄 Development Workflow

### Branch Strategy
- `main` - Production-ready code (protected)
- `develop` - Main development branch
- `backend-dev` - Backend feature development
- `frontend-dev` - Frontend feature development
- `feature/feature-name` - Individual feature branches

### Workflow Steps
1. **Pull latest changes**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch to `develop`
   - Request review from team members
   - Wait for approval

6. **Merge after approval**
   - PR must be approved by at least 1 team member
   - Resolve any merge conflicts
   - Merge to `develop`

---

## 📊 Project Status

### Completed ✅
- [x] Repository setup and structure
- [x] Development environment setup guide
- [x] Team member invitations
- [x] Branch structure created
- [x] Git workflow established

### In Progress 🔄
- [ ] API documentation (Under Review)
- [ ] Database schema design
- [ ] Spring Boot project initialization
- [ ] Next.js project initialization

### Upcoming 📅
- [ ] Backend: Authentication implementation
- [ ] Backend: Todo CRUD endpoints
- [ ] Frontend: Login/Register pages
- [ ] Frontend: Todo management UI
- [ ] Integration testing
- [ ] Deployment

---

## 🎯 Sprint 1 Goals (3 Weeks)

### Week 1: Foundation
- ✅ Project setup and planning
- 🔄 Backend: Basic Spring Boot app + authentication
- 🔄 Frontend: Next.js setup + authentication UI

### Week 2: Core Features
- Backend: Complete Todo CRUD API
- Frontend: Todo list, add, edit, delete UI
- API integration

### Week 3: Integration & Polish
- Full integration testing
- Bug fixes
- Documentation
- Deployment preparation

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

### API Testing
- Use Postman collection (coming soon)
- Or use Thunder Client in VS Code

---

## 📝 Coding Standards

### Backend (Java/Spring Boot)
- Follow Java naming conventions (camelCase for methods, PascalCase for classes)
- Use meaningful variable names
- Add comments for complex logic
- Write unit tests for services
- Use DTOs for API requests/responses

### Frontend (TypeScript/React)
- Use TypeScript for type safety
- Follow React best practices (hooks, functional components)
- Use Tailwind utility classes for styling
- Keep components small and reusable
- Handle loading and error states

### Git Commits
- Use clear, descriptive commit messages
- Format: `type: description`
  - `feat:` new feature
  - `fix:` bug fix
  - `docs:` documentation changes
  - `style:` formatting changes
  - `refactor:` code refactoring
  - `test:` adding tests

Examples:
```
feat: add user registration endpoint
fix: resolve null pointer in todo controller
docs: update API documentation with new endpoints
```

---

## 🐛 Issue Reporting

Found a bug? Have a suggestion?
1. Check if the issue already exists
2. Create a new issue on GitHub
3. Use labels: `bug`, `enhancement`, `question`
4. Provide clear description and steps to reproduce

---

## 📞 Communication

### Daily Updates
- Post daily progress in team chat
- Update ClickUp task status
- Raise blockers immediately

### Questions & Help
- Check documentation first
- Ask in team chat
- Tag relevant team members
- Schedule pair programming if needed

---

## 🔗 Useful Links

- **ClickUp Board:** https://app.clickup.com/90181843508/v/l/t/90181843508
- **GitHub Repository:** https://github.com/KasunBandara921/ToDo-Application-Informatics-/edit/main/readme.md
- **API Documentation:** [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Setup Guide:** [SETUP.md](./SETUP.md)

---

## 📄 License

This project is for educational purposes as part of [Your Course/Institution Name].

---

## 🙏 Acknowledgments

Thanks to all team members for their contributions to this project!

---

**Last Updated:** November 08, 2025  
**Project Start Date:** November 08, 2025  
**Expected Completion:** November 29, 2025 (3 weeks)
