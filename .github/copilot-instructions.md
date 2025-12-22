# AI Agent Instructions for Event Booking App

## Project Overview
React event booking application built with Vite + React Router v7 + Tailwind CSS v4. Uses mock data (no backend), supports user authentication via login form, dark mode toggle, and admin functionality.

## Architecture & Critical Patterns

### State Management: App-Level Prop Drilling
- **Current user state**: Managed in `App.jsx` as `currentUser` + `setCurrentUser`, passed to `Header` and route components
- **No context API**: Props are drilled through components (e.g., `currentUser` → `Header.jsx` → conditional admin link)
- **Local page state**: Pages use `useState` for form data (`Login.jsx`), booking lists (`MyBookings.jsx`), filtered data
- **LocalStorage**: `EventCard.jsx` stores selected event in localStorage on booking click
- **Mock data**: Static JS arrays in `/src/data/` (`events.js`, `users.js`, `bookings.js`)

### Authentication Flow
1. `Login.jsx`: Form validates email/password against `users` array, calls `setCurrentUser(user)` on success
2. Demo credentials: `john@example.com / 123456` (admin), `jane@example.com / 123456` (user)
3. User object includes: `{id, name, email, password, role: "admin" | "user"}`
4. **Admin routes**: Conditionally rendered in `Header.jsx` based on `currentUser?.role === "admin"`
5. Logout: Resets `currentUser` to null, navigates to `/login`

### Routing Configuration (`App.jsx`)
- React Router v7 with 8 routes: `/`, `/events`, `/my-bookings`, `/about`, `/contact`, `/login`, `/admin`, `/thank-you`
- Catch-all 404 route with inline error message
- `Header` and `Footer` wrap all routes (persist across navigation)
- **Protected routes**: Admin page checks `currentUser?.role` in component, not at router level

### Component Patterns
- **Functional components with hooks**: All components use `useState`, `useEffect`, destructured props
- **Tailwind CSS**: Via `@tailwindcss/vite` plugin; dark mode using `dark:` classes + class toggling on `document.documentElement`
- **Dark mode implementation** (`DarkModeToggle.jsx`): Button sets state, effect adds/removes `dark` class on `<html>`, persisted styles in `App.css`
- **Custom animations**: `fadeIn` keyframe + delay utility classes (`delay-100`, `delay-200`, etc.) in `App.css`
- **Icons**: `lucide-react` and `react-icons` for UI icons

### Data Flow Specifics
- `Events.jsx` page receives no props initially; appears unused (props signature: `events`, `addBooking` never passed)
- `MyBookings.jsx`: Filters static `bookings` array by `currentUser.id`, manages local state for cancellations
- `EventCard.jsx`: Simple display component, stores event to localStorage on click (not integrated with app state)
- **Mismatch**: `Events.jsx` expects props but receives none from `App.jsx`—currently shows "No events available"

## File Structure & Naming
- `/src/pages/` — Route-level components (PascalCase, one per route)
- `/src/components/` — Reusable UI (Header, Footer, EventCard, DarkModeToggle)
- `/src/data/` — Mock data arrays (camelCase filenames: events.js, users.js, bookings.js)
- `/public/` — Static images (e.g., `singer.avif`, `stage.avif`)
- `/src/styles/` — Currently unused; `animations.css` exists but not imported

## Build & Development
- **Vite + React 19.1**: Fast dev server, ES modules
- **Scripts**: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`
- **ESLint config**: Custom rule ignores unused uppercase variables (e.g., `React` in v19)
- **Tailwind v4**: Integrated via Vite plugin, no manual config file
- **No tests**: No test runner or test files present

## Key Integration Points & Gotchas

### Props Mismatch (Needs Fix)
`Events.jsx` expects `events` and `addBooking` props but `App.jsx` doesn't pass them. Currently shows empty state. Should either:
- Import events directly: `import { events } from "../data/events"`
- Receive props from App-level state (requires adding events to App state)

### Dark Mode Persistence
Not persisted across page reloads—uses component state only. To persist, store preference in localStorage (see `DarkModeToggle.jsx` lines 8-16).

### Forms Without Validation
`Login.jsx` uses inline input state; no react-hook-form integration despite being in package.json. Form validation is hardcoded (mock users only).

### Local Storage Usage
`EventCard.jsx` stores selectedEvent but nothing reads it. Booking flow is incomplete.

## Styling Approach
- **Tailwind classes**: Primary styling (shadows, rounded, hover effects)
- **Dark mode**: `dark:` prefix for dark styles; controlled by class toggle
- **Custom animations**: `fadeIn` + staggered delays via delay utility classes
- **Color scheme**: Purple/pink accents (primary), gradient backgrounds on hero sections
- **Responsive**: `md:` and `lg:` breakpoints standard throughout (e.g., grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

## Common Development Tasks

### Add a New Page
1. Create file in `/src/pages/YourPage.jsx` (functional component)
2. Add route in `App.jsx` inside `<Routes>`
3. If user-facing, add link in `Header.jsx` nav (check role if restricted)
4. Use Tailwind classes for styling; wrap in `min-h-screen` for full height

### Add a Component
1. Create in `/src/components/YourComponent.jsx`
2. Destructure props, use hooks as needed
3. Import Tailwind classes and optional icons from `lucide-react` or `react-icons`
4. Example structure: Image → Title → Details → CTA Button

### Fix Events Display
Import events at page level or pass from App state:
```jsx
// Option 1: Direct import in Events.jsx
import { events } from "../data/events";

// Option 2: Modify App.jsx to pass state
<Route path="/events" element={<Events events={events} />} />
// Then add to App state: const [events, setEvents] = useState([...]);
```

## Dependencies to Know
- `react-router-dom@7.7.1`: Client-side routing
- `react-hook-form@7.61.1`: Form state (installed but not widely used)
- `yup@1.6.1`: Validation schema (installed but not used)
- `firebase@12.0.0`: Not integrated
- `framer-motion@12.23.22`: Installed but minimal usage
- `lucide-react` & `react-icons`: Icon libraries

## ESLint & Code Standards
- No unused variable warnings for uppercase identifiers (config: `varsIgnorePattern: '^[A-Z_]'`)
- React 19 compatible (no React import needed in JSX files)
- Check with `npm run lint` before committing
