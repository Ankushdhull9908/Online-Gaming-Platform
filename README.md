# React Player Dashboard

## Add the files
1. Copy `PlayerDashboard.jsx` into `src/pages/`.
2. Copy `PlayerDashboard.css` into the same folder.
3. Check the AuthContext import path in `PlayerDashboard.jsx`. It currently expects `src/context/AuthContext.jsx`.
4. Add a route:

```jsx
import PlayerDashboard from './pages/PlayerDashboard'

<Route path="/dashboard" element={<ProtectedRoute />}>
  <Route index element={<PlayerDashboard />} />
</Route>
```

If your `ProtectedRoute` uses `<Outlet />`, the nested route above will work. You can also use:

```jsx
<Route path="/dashboard" element={<PlayerDashboard />} />
```

inside your existing protected route group.

## AuthContext expectations
The component expects:

```js
const { user, logout } = useAuth()
```

`user` should include `_id` (or `id`) and ideally `username`/`ingameId`, `xp`, `coins`, `level`, `profileurl` or `playerprofile`, `createdAt`, and `email`.

Your `logout` function should clear the AuthContext user and call your backend logout endpoint if you have one. If your context names it `handleLogout`, update the destructuring.

## API endpoints used
- `GET /api/auth/player/:id`
- `GET /api/games/snake/stats/:id`
- `GET /api/games/snake/history/:id?limit=8&page=1`
- `GET /api/games/snake/leaderboard?limit=8`
- `POST /api/upload/profile` with multipart field `profile`
- `POST /api/auth/updateProfile` with `{ email, profileurl }`

The component sends `credentials: 'include'` for cookie-based authentication. Your Express CORS config must allow the frontend origin and credentials.

## Important
The dashboard is based on the API paths and response fields in your uploaded vanilla JS. If your backend uses different field names or response shapes, adjust those mappings. Profile upload assumes the upload API returns `{ imageUrl }`.
