// Email helper - stub that simulates sending emails and stores sent messages in localStorage
export function sendEmail(to, subject, body) {
  const message = { to, subject, body, date: new Date().toISOString() };
  try {
    const existing = JSON.parse(localStorage.getItem("sentEmails") || "[]");
    existing.unshift(message);
    localStorage.setItem("sentEmails", JSON.stringify(existing));
  } catch (e) {
    // ignore storage errors in environments without localStorage
    // (e.g., some test runners)
    // still log to console
  }
  console.info("[Email Stub] Sent email:", message);
  return Promise.resolve(message);
}
