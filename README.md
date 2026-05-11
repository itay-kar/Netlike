# Netlike

A Netflix-inspired streaming app built with React, Node.js, Express, MongoDB, and the TMDB API. Users can sign up, browse trending movies and TV shows, search for titles and people, and manage a personalised search history.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, React Router v6, Zustand |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT stored in HttpOnly cookies, bcryptjs for password hashing |
| Content | [TMDB API](https://developer.themoviedb.org/) |

---

## Features

- User signup and login with JWT authentication
- Protected routes — movie, TV, and search endpoints require a valid session
- Browse trending, popular, and top-rated movies and TV shows
- Hero banner with a randomly selected trending title
- Search for movies, TV shows, and people
- Per-user search history (add, remove, and clear entries)
- Randomised avatar assigned on signup
- Responsive landing page for unauthenticated visitors

---

## Project Structure

```
Netlike/
├── backend/
│   ├── server.js
│   ├── config/
│   │   ├── db.js
│   │   └── envVars.js
│   ├── controllers/
│   │   ├── auth.controller.js      # signup, login, logout, getMe
│   │   ├── movie.controller.js     # trending, trailers, details, recommended, similar, category
│   │   ├── tv.controller.js        # same shape as movie controller
│   │   └── search.controller.js    # search + history CRUD
│   ├── middleware/
│   │   └── protectRoute.js         # JWT auth guard
│   ├── models/
│   │   └── user.model.js           # User + typed searchHistory sub-schema
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── movie.route.js
│   │   ├── tv.route.js
│   │   └── search.route.js
│   ├── services/
│   │   └── tmdb.service.js         # Axios wrapper for TMDB
│   └── utils/
│       └── generateToken.js        # JWT creation + cookie setter
├── frontend/
│   ├── index.html
│   └── src/
│       ├── App.jsx                 # Routes + auth guard + Toaster
│       ├── main.jsx
│       ├── index.css
│       ├── lib/
│       │   └── axios.js            # Axios instance (baseURL + credentials)
│       ├── store/
│       │   └── authStore.js        # Zustand store: user, login, signup, logout, checkAuth
│       ├── components/
│       │   └── Navbar.jsx          # Sticky nav with search and logout
│       └── pages/
│           ├── LoginPage.jsx
│           ├── SignupPage.jsx
│           └── home/
│               ├── HomePage.jsx    # Auth gate: shows AuthScreen or HomeScreen
│               ├── AuthScreen.jsx  # Landing page for logged-out visitors
│               └── HomeScreen.jsx  # Main browse page with hero + content rows
├── .env.example
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A TMDB account with a **Bearer token** ([TMDB API docs](https://developer.themoviedb.org/docs/getting-started))

### Environment Variables

Copy `.env.example` to `.env` in the project root and fill in your values:

```env
MONGO_URI=mongodb://localhost:27017/netlike
PORT=5000
JWT_SECRET=change_this_to_a_long_random_string
NODE_ENV=development
TMDB_API_KEY=your_tmdb_bearer_token_here
```

> **Note:** `TMDB_API_KEY` must be the **Bearer token** (the long one from the TMDB dashboard), not the short API key.

### Install & Run

```bash
# 1. Install backend dependencies (from project root)
npm install

# 2. Install frontend dependencies
cd frontend && npm install && cd ..

# 3. Start the backend (with auto-reload)
npm run dev

# 4. In a separate terminal, start the frontend
cd frontend && npm run dev
```

| Service | URL |
|---|---|
| Backend API | http://localhost:5000 |
| Frontend | http://localhost:5173 |

The Vite dev server proxies all `/api` requests to the backend automatically, so no manual CORS configuration is needed during development.

---

## API Reference

All routes are prefixed with `/api/v1/`. Routes marked **Auth** require a valid session cookie.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | — | Register a new user |
| POST | `/api/v1/auth/login` | — | Login and receive a session cookie |
| POST | `/api/v1/auth/logout` | — | Clear the session cookie |
| GET | `/api/v1/auth/me` | Yes | Return the currently logged-in user |

### Movies

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/movies/trending` | Yes | Random popular movie |
| GET | `/api/v1/movies/popular` | Yes | Popular movies list |
| GET | `/api/v1/movies/top_rated` | Yes | Top-rated movies list |
| GET | `/api/v1/movies/:id/trailers` | Yes | Videos for a movie |
| GET | `/api/v1/movies/:id/details` | Yes | Full movie details |
| GET | `/api/v1/movies/:id/recommended/:page` | Yes | Recommended movies |
| GET | `/api/v1/movies/:id/similar` | Yes | Similar movies |
| GET | `/api/v1/movies/:category` | Yes | Movies by TMDB category slug |

### TV Shows

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/tv/trending` | Yes | Random trending TV show |
| GET | `/api/v1/tv/popular` | Yes | Popular TV shows |
| GET | `/api/v1/tv/top_rated` | Yes | Top-rated TV shows |
| GET | `/api/v1/tv/:id/trailers` | Yes | Videos for a show |
| GET | `/api/v1/tv/:id/details` | Yes | Full show details |
| GET | `/api/v1/tv/:id/recommended/:page` | Yes | Recommended shows |
| GET | `/api/v1/tv/:id/similar` | Yes | Similar shows |
| GET | `/api/v1/tv/:category` | Yes | Shows by TMDB category slug |

### Search & History

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/v1/search/person/:query` | Yes | Search for a person |
| GET | `/api/v1/search/movie/:query` | Yes | Search for a movie |
| GET | `/api/v1/search/tv/:query` | Yes | Search for a TV show |
| GET | `/api/v1/search/history` | Yes | Retrieve search history |
| DELETE | `/api/v1/search/history/:id` | Yes | Remove one history entry |
| DELETE | `/api/v1/search/history` | Yes | Clear all history |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` (root) | Start the Express backend with nodemon |
| `npm run dev` (frontend/) | Start the Vite dev server |
| `npm run build` (frontend/) | Production build to `frontend/dist/` |
| `npm run lint` (frontend/) | Run ESLint |
| `npm run preview` (frontend/) | Preview the production build locally |
