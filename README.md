#  Collaborative Task Manager

A full-stack collaborative task management application built using **MERN Stack**.  
This application allows users to create, assign, update, and manage tasks in real-time.

---

## Features

- User Authentication & Authorization (JWT)
- Create, Assign, Update & Delete Tasks
- Task Status Management (To Do / In Progress / Completed)
- View:
  - Tasks created by logged-in user
  - Tasks assigned to logged-in user
- Real-time Updates using Socket.IO
- Protected Routes (Authorized access only)
- Responsive UI using Tailwind CSS

---

##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Query

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO

---

## Project Structure

collaborative-task-manager/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middlewares/
│       ├── socket.js
│       ├── app.js
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/
│       ├── components/
│       ├── api/
│       └── socket.js
│
└── README.md


---

##  Authentication Flow

- User logs in → JWT token generated
- Token stored in localStorage
- Token sent in Authorization header
- Backend middleware validates token
- Protected APIs accessible only to authenticated users

---

##  Real-Time Functionality

- Socket.IO is used for real-time task updates
- When a task is created, updated, or deleted:
- Server emits `taskUpdated` event
- All connected clients refresh task list instantly
- Socket connection is initialized once on app load
- Events are broadcasted to all connected clients


---

##  Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/collaborative-task-manager.git
cd collaborative-task-manager
```

### Backend Setup
cd backend
npm install

Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start backend server:
npm run dev

### Frontend Setup
cd frontend
npm install
npm run dev

---

## API Endpoints

### Auth
POST /api/auth/login
POST /api/auth/register

### Tasks
GET /api/tasks
POST /api/tasks
PATCH /api/tasks/:id/status
DELETE /api/tasks/:id

## Assignment Requirements Covered
- CRUD Operations
- Authentication
- Real-Time Updates
- Protected Routes
- Clean Folder Structure
- README Documentation

## Sample Credentials (For Local Testing only)
Email: test@example.com
Password: 123456

## Submission Notes
- Code is modular and well-structured
- Followed best practices for backend & frontend
- Real-time features implemented using Socket.IO

## Author
Payal Meena
BCA Undergraduate | MERN Stack Developer

Contact
For any queries or feedback, feel free to connect.