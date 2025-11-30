// Simple in-memory reviews store and helpers
let reviews = [
  // sample review
  { id: 1, eventId: 1, userId: 2, userName: "Jane", rating: 5, comment: "Amazing show!" },
];

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
  return rev;
}

export function deleteReview(id) {
  reviews = reviews.filter(r => r.id !== id);
}

export function getAverageRating(eventId) {
  const rs = getReviewsForEvent(eventId);
  if (rs.length === 0) return 0;
  return Math.round((rs.reduce((s, r) => s + r.rating, 0) / rs.length) * 10) / 10;
}
