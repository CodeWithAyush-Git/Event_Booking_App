// Reviews store with localStorage persistence
const STORAGE_KEY = "event_app_reviews";

// Default seed data used only when no stored reviews exist
const DEFAULT_REVIEWS = [
  { id: 1, eventId: 1, userId: 2, userName: "Jane", rating: 5, comment: "Amazing show!" },
];

let reviews = loadReviews();

function saveReviews() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    // ignore localStorage errors (e.g., SSR or private mode)
    // but keep reviews in memory
  }
}

function loadReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_REVIEWS.slice();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return DEFAULT_REVIEWS.slice();
    return parsed;
  } catch (e) {
    return DEFAULT_REVIEWS.slice();
  }
}

export function getAllReviews() {
  return reviews;
}

export function getReviewsForEvent(eventId) {
  return reviews.filter(r => r.eventId === eventId);
}

export function addReview({ eventId, userId, userName, rating, comment }) {
  const id = Date.now();
  const rev = { id, eventId, userId, userName, rating: Number(rating), comment };
  reviews = [rev, ...reviews];
  saveReviews();
  return rev;
}

export function deleteReview(id) {
  reviews = reviews.filter(r => r.id !== id);
  saveReviews();
}

export function getAverageRating(eventId) {
  const rs = getReviewsForEvent(eventId);
  if (rs.length === 0) return 0;
  return Math.round((rs.reduce((s, r) => s + r.rating, 0) / rs.length) * 10) / 10;
}
