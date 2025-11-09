# Quick Start Guide

## Prerequisites

1. Make sure your Spring Boot backend is running on `http://localhost:8080`
2. Node.js 18+ installed
3. npm installed

## Setup Steps

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment**
   
   Create a `.env.local` file in the `frontend` directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   ```
   
   If your backend runs on a different URL, update this accordingly.

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open Browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Register a new account** or **Login** with existing credentials
2. **Create todos** by clicking the "+ New Todo" button
3. **Edit todos** by clicking the "Edit" button on any todo
4. **Mark todos as complete** by checking the checkbox
5. **Delete todos** by clicking the "Delete" button

## Features

- ✅ Full CRUD operations
- 🔐 JWT authentication
- 👤 User-specific todos
- 🎨 Modern UI with dark mode support
- 📱 Responsive design

## Troubleshooting

### Cannot connect to backend
- Make sure your Spring Boot backend is running
- Check that the `NEXT_PUBLIC_API_URL` in `.env.local` matches your backend URL
- Verify CORS is properly configured on the backend

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Run `npm run build` to check for errors

## Backend API Requirements

The frontend expects these endpoints:

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/todos` - Get all todos (requires JWT)
- `POST /api/todos` - Create todo (requires JWT)
- `PUT /api/todos/:id` - Update todo (requires JWT)
- `DELETE /api/todos/:id` - Delete todo (requires JWT)

Make sure your backend implements these endpoints and includes CORS configuration.

