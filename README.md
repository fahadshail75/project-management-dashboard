# Project Management Dashboard

A modern, feature-rich Project Management Dashboard built with React, Redux Toolkit, and Tailwind CSS. This application allows users to manage projects, tasks, and team members with a beautiful, responsive interface.

## 🚀 Features

### Core Functionality
- **Project Management**: Create, view, and delete projects.
- **Task Management**: 
  - Kanban Board with Drag-and-Drop functionality (To Do, In Progress, Done).
  - Create, edit, and delete tasks.
  - Rich Text Editor (Quill) for task descriptions.
- **Team Management**: View team members (mock data).
- **Data Visualization**: Real-time charts showing task status distribution.

### 🌟 Bonus Features (Implemented)
- **Authentication System**: 
  - Secure login page.
  - Protected routes (redirects unauthenticated users).
- **Role-Based Access Control (RBAC)**:
  - **Admin**: Full access (Create/Delete Projects).
  - **User**: Restricted access (View/Edit Tasks only).
- **Dark Mode**: Fully integrated dark/light theme toggle.

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 7
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Drag & Drop**: React DnD
- **Charts**: Chart.js & React Chartjs 2
- **Forms**: Formik & Yup
- **Rich Text**: React Quill
- **Icons**: React Icons

## 📦 Installation & Setup

1. **Prerequisites**
   - Node.js (v16 or higher recommended)
   - npm or yarn

2. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd pm-dashboard
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will start at `http://localhost:5173` (or similar).

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔑 How to Use

### Login
When you first open the app, you will be presented with a Login screen. Since this is a demo, no passwords are required.

- **Login as Admin**: Click the "Login as Admin" button.
  - *Capabilities*: Can create new projects and delete existing ones.
- **Login as User**: Click the "Login as User" button.
  - *Capabilities*: Can view projects and manage tasks, but cannot create or delete projects.

### Dashboard
- View all your active projects.
- Toggle **Dark Mode** in the Settings page.

### Project Details
- **Kanban Board**: Drag tasks between columns to update their status.
- **Add Task**: Click the "New Task" button to open the form.
- **Edit Task**: Click on any task card to edit details or delete it.

## 📂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components (ProtectedRoute)
│   ├── charts/        # Chart.js components
│   ├── layout/        # Sidebar, Navbar, Layout wrapper
│   ├── projects/      # Project-related modals and stats
│   └── tasks/         # Kanban board, Task cards, Modals
├── pages/             # Main page views (Dashboard, Login, etc.)
├── store/             # Redux store and slices
│   ├── slices/        # Redux logic (auth, projects, tasks, ui)
│   └── store.js       # Store configuration
├── App.jsx            # Main routing configuration
└── main.jsx           # Entry point
```

## 📝 License

This project is open-source and available under the MIT License.
