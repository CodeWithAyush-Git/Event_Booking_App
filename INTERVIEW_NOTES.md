# Event Booking App — Interview Notes

## Quick Overview
A React event booking application built with **Vite + React Router v7 + Tailwind CSS v4**. Demonstrates Phase 1–2 features: booking system, search/filter, reviews & ratings, admin dashboard, email notifications, and localStorage persistence.

**Live repo**: https://github.com/CodeWithAyush-Git/Event_Booking_App

---

## Architecture & Key Patterns

### State Management: Prop Drilling (Intentional)
- **Why**: Demonstrates understanding of React's core model without external libraries (Context, Redux).
- **Key state**: `currentUser`, `userBookings` in `src/App.jsx`.
- **Flow**: App → Header (auth toggle) and Pages (booking data).
- **Persistence**: `userBookings` and reviews saved to localStorage automatically.

### Tech Stack
| Layer | Tech | Why |
|-------|------|-----|
| **UI Framework** | React 19.1 | Fast, hooks-first, no legacy imports needed |
| **Routing** | React Router v7 | Client-side navigation, nested routes ready |
| **Styling** | Tailwind CSS v4 + custom animations | Rapid UI, dark mode toggle |
| **Build** | Vite 7 | ~10x faster than CRA, modern ES modules |
| **Data** | Mock JS arrays + localStorage | No backend needed for demo; easy to migrate to API |

### Data Flow (Simplified)
```
App (state) → Header (currentUser) + Routes (pages)
  ↓
Events (filter, book, review) → MyBookings (cancel) → Admin (analytics, delete)
  ↓
localStorage (persist bookings, reviews, sent emails)
```

---

## Key Files to Explain

| File | Purpose | Interview Talking Points |
|------|---------|--------------------------|
| `src/App.jsx` | App shell, global state (user, bookings) | Show `addBooking` logic, localStorage sync, email stub call |
| `src/pages/Events.jsx` | Event list with search/filter/reviews | Highlight filter logic (search, category, price), review form |
| `src/pages/MyBookings.jsx` | User's bookings, cancel option | Show `cancelBooking` and status update, localStorage persistence |
| `src/pages/Admin.jsx` | Dashboard: events, bookings, reviews, sent emails | Mention analytics (avg rating per event), email verification panel |
| `src/data/reviews.js` | Review store with localStorage persistence | Explain load/save pattern, seed data fallback |
| `src/utils/email.js` | Email stub (logs to localStorage) | Discuss why stubs are useful for testing; real email via EmailJS/Nodemailer |
| `src/components/Header.jsx` | Navigation, login/logout, dark mode toggle | Show conditional "Admin" link based on role |
| `.github/copilot-instructions.md` | AI agent guidelines for the codebase | Brief mention of project conventions (prop drilling, file structure) |

---

## Demo Script (10–15 minutes)

### 1. **Login & Browse Events** (2 min)
- Start: `npm run dev` → http://localhost:5176
- Go to `/login`, demo credentials: `jane@example.com / 123456`
- Navigate to `/events`, show:
  - Event cards with image, price, date/time/location
  - Search box (type event name)
  - Price slider (filter by max price)
  - Category dropdown (Music, Art, Tech)
  - Average rating badge per event

### 2. **Book an Event & Verify Persistence** (3 min)
- Click "Book Now" on an event (already logged in)
- Confirm alert shows booking ID
- Go to `/my-bookings` → shows new booking with image, price, status
- **Reload page** → booking persists (localStorage magic!)
- Try canceling a booking, then reload → status stays "Cancelled"

### 3. **Submit a Review** (2 min)
- Back to `/events`, expand "See reviews" on an event
- Submit rating (1–5 stars) + comment
- Confirm review appears in list immediately
- **Reload page** → review survives (persistent storage)
- Show average rating updated in event card

### 4. **Admin Dashboard** (3 min)
- Logout → login as admin: `john@example.com / 123456`
- Go to `/admin`
- Show:
  - Manage Events table (can edit/delete/add)
  - Reviews & Ratings panel (avg rating per event, recent reviews, delete option)
  - Sent Emails panel (read from localStorage, shows booking confirmation emails)
  - All Bookings table + All Users table
- Click "Refresh" on emails, explain that email stub logs every booking email

### 5. **Talking Points** (2–3 min)
- **Prop drilling**: "I chose prop drilling to avoid Context overhead for a medium app. Tradeoff: more boilerplate, but clear data flow for interviews."
- **localStorage**: "I persist bookings and reviews to simulate a real backend without needing a server. Page reload shows data durability."
- **Email stub**: "The email stub stores messages in localStorage. In production, I'd use EmailJS or a Node backend with Nodemailer to send real emails."
- **Next steps**: "For production, I'd add: (1) Node/Express API + MongoDB, (2) JWT auth, (3) Razorpay payment integration, (4) real email service, (5) CI/CD."

---

## Architecture Decision Log

### Why localStorage instead of a backend?
- **Pro**: Quick to demo without deploying a server; works offline; shows client-side state management.
- **Con**: Not production-ready; data lost on browser clear; no server-side auth.
- **Real app**: Move to REST API + database (MongoDB/PostgreSQL).

### Why prop drilling?
- **Pro**: Explicit data flow; easy to understand for interviews; no abstraction overhead.
- **Con**: Boilerplate; doesn't scale to 100+ components.
- **Real app**: Introduce Context API or Redux for shared state.

### Why email stub?
- **Pro**: Demonstrates async patterns, side effects, logging without external APIs.
- **Con**: Doesn't send real emails.
- **Real app**: EmailJS (client) or Node + Nodemailer (server).

---

## Testing & Validation

### Manual checks
- [ ] Login/logout with demo creds works
- [ ] Bookings persist after reload
- [ ] Reviews persist after reload
- [ ] Admin can see sent emails and delete reviews
- [ ] Dark mode toggle works (button in Header)
- [ ] Filter/search on Events page updates results

### Lint check
```bash
npm run lint
```
(Some existing warnings are pre-existing; new code should pass ESLint.)

---

## How to Extend (Post-Interview)

### 1. Add Backend (Priority 1)
```bash
npm install express cors mongoose
# Create /server folder with API routes
# Move data from /src/data to MongoDB
# Update App.jsx to fetch from API
```

### 2. Add Payment (Priority 2)
```bash
npm install @stripe/stripe-js
# OR use Razorpay: https://razorpay.com/docs/react
```

### 3. Add Real Email (Priority 2)
```bash
npm install emailjs-com
# OR set up Node + Nodemailer
```

### 4. Add Tests (Priority 3)
```bash
npm install -D vitest @testing-library/react
# Write unit tests for Events.jsx filter logic
# Write integration tests for booking flow
```

---

## Interview Checklist

- ✅ App runs locally: `npm run dev`
- ✅ Demo login, booking, reviews, admin
- ✅ Explain prop drilling + localStorage tradeoffs
- ✅ Mention next steps: backend, payments, tests
- ✅ Show code: explain key files (App.jsx, Events.jsx, Admin.jsx)
- ✅ Answer "Why did you choose this tech?" thoughtfully

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Check localStorage in DevTools
# → Open DevTools → Application → Local Storage → http://localhost:5176
# → Keys: event_app_bookings, event_app_reviews, sentEmails
```

---

## FAQ for Interviewers

**Q: Why no backend?**  
A: To keep the demo runnable offline and showcase client-side patterns. For production, I'd add a Node/Express API.

**Q: Why prop drilling?**  
A: To demonstrate understanding of React's core and explicit data flow. Context would be next step if the app scales.

**Q: How would you handle auth in production?**  
A: JWT tokens + refresh tokens, store in HTTP-only cookies, server-side session validation.

**Q: How would you deploy this?**  
A: Build → Vercel or Netlify (frontend) + Heroku/Railway/Render (backend API).

---

**Built with ❤️ for interviews. Good luck!**
