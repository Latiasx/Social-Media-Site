📱 Social Media App (FastAPI + React)

A full-stack social media web application built with FastAPI (backend) and React + Vite (frontend).
Users can register, log in, upload image/video posts with captions, view a feed, and delete their own posts.

✨ Features
🔐 Authentication

User registration and login

JWT-based authentication

Protected routes (feed, upload, delete)

🖼️ Posts & Feed

Upload images or videos with captions

Responsive feed layout

Owner-only delete functionality

Real-time refresh after upload/delete

🎨 Frontend UI

Modern, responsive UI (Tailwind CSS)

Loading skeletons & toast notifications

Mobile-first design

Clean separation of concerns

🛠️ Tech Stack
Backend

FastAPI

FastAPI Users (JWT auth)

SQLAlchemy (Async)

SQLite (dev database)

Frontend

React (Vite)

TypeScript

Tailwind CSS

React Router

TanStack React Query

Axios

📂 Project Structure
project-root/
├── app/                  # FastAPI application
├── main.py               # Backend entry point
├── pyproject.toml
├── .env.example          # Backend env template
│
├── social-frontend/      # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── .env.example      # Frontend env template
│   └── README.md
│
└── README.md             # You are here

🚀 Getting Started (Local Development)
1️⃣ Backend Setup
# create virtual environment
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate

# install dependencies
pip install -r requirements.txt
# or (if using uv)
uv sync


Create backend .env:

DATABASE_URL=sqlite+aiosqlite:///./test.db
SECRET=your-secret-key


Run backend:

uvicorn main:app --reload


Backend runs at:

http://localhost:8000


Docs:

http://localhost:8000/docs

2️⃣ Frontend Setup
cd social-frontend
npm install
cp .env.example .env
npm run dev


Frontend runs at:

http://localhost:5173

🌐 API Overview
Method	Endpoint	Description
POST	/auth/register	Register user
POST	/auth/jwt/login	Login (JWT)
GET	/feed	Get posts feed
POST	/upload	Upload image/video
DELETE	/posts/{id}	Delete own post
🔒 CORS Configuration (Important)

If frontend cannot access backend, enable CORS in FastAPI:

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

🧪 Notes

node_modules/, .venv/, and .env files are not committed

SQLite is used for development only

JWT token is stored in localStorage

📌 Future Improvements

Likes & comments

User profiles

Pagination / infinite scroll

Cloud storage for media (S3 / Cloudinary)

Production deployment (Docker + CI/CD)

👨‍💻 Author

Amulya Kundalia
Built as a learning-focused full-stack project using FastAPI & React.