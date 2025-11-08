# Todo App Frontend

A modern, responsive Todo application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete) for todos
- 🔐 JWT token-based authentication
- 👤 User-specific todos (users can only see their own todos)
- 🎨 Beautiful, modern UI with dark mode support
- 📱 Responsive design
- ⚡ Fast and optimized with Next.js

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Backend API running (Spring Boot)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file in the `frontend` directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

3. Update the `NEXT_PUBLIC_API_URL` to match your backend API URL if different.

### Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   ├── page.tsx           # Main todos page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── layout/           # Layout components
│   └── todo/             # Todo components
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Authentication hook
│   └── useTodos.ts       # Todos management hook
├── lib/                  # Utility libraries
│   ├── api.ts            # Axios API configuration
│   └── auth.ts           # Authentication utilities
└── types/                # TypeScript type definitions
    └── index.ts          # Type definitions
```

## API Endpoints

The frontend expects the following backend API endpoints:

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for the authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API base URL (default: http://localhost:8080/api)

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **JWT Decode** - JWT token handling
- **React Hooks** - State management

## Notes

- Make sure your backend API is running before starting the frontend
- The app uses JWT tokens stored in localStorage for authentication
- All API requests automatically include the JWT token in the Authorization header
- Users are automatically redirected to login if their token expires or is invalid
