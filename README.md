# 💼 Task Manager - Full Stack MERN App

A production-ready Task Management application built with React (Vite), Node.js/Express, MongoDB, and deployed on Vercel. Supports full CRUD operations with responsive UI.

## ✨ Features
- ✅ Create, Read, Update, Delete (CRUD) tasks

- 📱 Fully Responsive design (Mobile + Desktop)

- 🗄️ MongoDB database with real-time sync

- 🚀 Serverless deployment on Vercel

- 🎨 Modern UI with gradients and animations

- ⚡ Fast loading with optimized assets

## 🛠️ Tech Stack
| Frontend     | Backend    | Database | Deployment | Tools  |
| ------------ | ---------- | -------- | ---------- | ------ |
| React 18     | Node.js    | MongoDB  | Vercel     | Vite   |
| Vite         | Express    | Mongoose | GitHub     | Axios  |
| Tailwind CSS | Serverless | Atlas    |            | ESLint |

## 🎬 Demo
Live Demo: https://task-manager-frontend-newone.vercel.app/

### 1. Clone & Install Backend
```bash
cd server
npm install
cp .env.example .env  # Add your MongoDB URI
npm run server
```
### 2. Clone & Install Frontend
```bash
cd client
npm install
npm run dev
```

### 3. Environment Variables
server/.env

```bash 
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```


## 🧪 API Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/tasks     | Get all tasks   |
| POST   | /api/tasks     | Create new task |
| PUT    | /api/tasks/:id | Update task     |
| DELETE | /api/tasks/:id | Delete task     |

Made with ❤️ by AkbarMWaris


