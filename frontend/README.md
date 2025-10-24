# Quote of the Day — Frontend

This frontend is a small React + Vite application that consumes the existing microservices:
- Auth Service (default: http://localhost:5000)
- Quote Service (default: http://localhost:5001)

It provides a sleek, animated UI built with Framer Motion.

## Quick start (Windows PowerShell)

1. Install dependencies

```powershell
cd frontend
npm install
```

2. Run in development mode

```powershell
npm run dev
```

3. Environment variables

You can set API base URL by creating a `.env` file in `frontend/` with:

```
VITE_API_BASE=http://localhost:5001
```

If you use a separate auth service URL, set it to `http://localhost:5000` for auth endpoints.

## Notes
- After signing up or logging in, a JWT is stored in `localStorage` as `qotd_token` and user as `qotd_user`.
- The UI uses Framer Motion for smooth transitions.

## Files of interest
- `src/pages/Home.jsx` — Main UI and quote fetching
- `src/pages/Login.jsx` — Login form
- `src/pages/Signup.jsx` — Signup form
- `src/pages/Favourites.jsx` — User favourites
- `src/components/QuoteCard.jsx` — Quote card with actions

Enjoy the UI! Feel free to ask for changes to styling, colors or more interactions.
