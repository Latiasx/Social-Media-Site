# Social Frontend (Vite + React)

This frontend is built to match your FastAPI app endpoints:
- `POST /auth/jwt/login` (fastapi-users JWT login, form-encoded)
- `POST /auth/register`
- `GET /feed`
- `POST /upload` (multipart: `file` + `caption`)
- `DELETE /posts/{post_id}`

## Setup

1) Install deps
```bash
npm install
```

2) Configure backend URL
```bash
cp .env.example .env
# edit VITE_API_BASE_URL if needed
```

3) Run
```bash
npm run dev
```

## Notes
- If you see CORS errors, enable CORS middleware in FastAPI for the frontend origin.
- Token is stored in `localStorage` as `social_token`.
