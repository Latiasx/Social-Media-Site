# 📱 Social Media App 

## FastAPI + React (Vite)

A full-stack social media web application built with FastAPI for the backend and React (Vite) for the frontend.

The application allows users to:

#### -> Register and log in securely

#### -> Upload image/video posts with captions

#### -> View a responsive feed

#### -> Delete their own posts

This project is intended as a learning-focused full-stack implementation following real-world patterns.

## ✨ Features

#### 🔐 Authentication

#### -> User registration and login

#### -> JWT-based authentication

#### -> Protected routes for authenticated users

### 🖼️ Posts & Feed

#### -> Upload images or videos with captions

#### -> Responsive grid-based feed

#### -> Delete posts (owner-only)

#### -> Automatic feed refresh after changes

### 🎨 Frontend UI

#### -> Modern, minimal UI (Tailwind CSS)

#### -> Loading skeletons and toast notifications

#### -> Mobile-first responsive design

# 🛠️ Tech Stack

## Backend
    
### FastAPI

### FastAPI Users (JWT authentication)

### SQLAlchemy (Async)

### SQLite (development database)
    
##  Frontend
    
### React (Vite)

### TypeScript

### Tailwind CSS

### React Router

### TanStack React Query

### Axios

📂 Project Structure

    project-root/
    │
    ├── app/                    # FastAPI application
    ├── main.py                 # Backend entry point
    ├── pyproject.toml
    ├── .env.example            # Backend env template
    │
    ├── social-frontend/        # Frontend (React + Vite)
    │   ├── src/
    │   ├── index.html
    │   ├── package.json
    │   ├── .env.example        # Frontend env template
    │   └── README.md
    │
    └── README.md               # Project documentation



## 🚀 Getting Started (Local Development)
### 1️⃣ Backend Setup

#### Create and activate a virtual environment:

    python -m venv .venv
    source .venv/bin/activate      # Windows: .venv\Scripts\activate


#### Install dependencies:

    pip install -r requirements.txt
    # OR (if using uv)
    uv sync


#### Create a backend .env file:

    DATABASE_URL=sqlite+aiosqlite:///./test.db
    SECRET=your-secret-key


#### Run the backend server:

    uvicorn main:app --reload


#### Backend will be available at:

    http://localhost:8000


#### API documentation:

    http://localhost:8000/docs

### 2️⃣ Frontend Setup

#### Navigate to the frontend directory:

    cd social-frontend


#### Install dependencies:

    npm install


#### Create frontend environment file:

    cp .env.example .env


#### Start the development server:

    npm run dev


#### Frontend will be available at:

    http://localhost:5173

### 🌐 API Overview

    | Method | Endpoint          | Description           |
    | ------ | ----------------- | --------------------- |
    | POST   | `/auth/register`  | Register a new user   |
    | POST   | `/auth/jwt/login` | Login and receive JWT |
    | GET    | `/feed`           | Fetch posts feed      |
    | POST   | `/upload`         | Upload image/video    |
    | DELETE | `/posts/{id}`     | Delete own post       |


#### If the frontend cannot communicate with the backend, enable CORS in FastAPI:

    from fastapi.middleware.cors import CORSMiddleware

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


##### Restart the backend after adding this.

### 🧪 Notes

#### .env, .venv, and node_modules are not committed

#### SQLite is used only for development

#### JWT token is stored in localStorage

#### Backend and frontend run on separate servers in development

### 📌 Future Improvements

#### Likes and comments

#### User profile pages

#### Pagination / infinite scrolling

#### Cloud storage for media (S3 / Cloudinary)

#### Dockerized deployment

## 👨‍💻 Author

#### Amulya Kundalia (Latiasx)
##### Built as a full-stack learning project using FastAPI and React
