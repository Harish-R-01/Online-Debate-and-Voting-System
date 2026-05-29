/**
 * assets/js/utils.js
 * Reusable helper functions shared across all pages.
 */

/* ─────────────────────────────────────────────
   TOAST NOTIFICATIONS
   Usage: showToast("Saved!", "success")
   types: "success" | "error" | "warning" | "info"
───────────────────────────────────────────── */
export function showToast(message, type = "info", duration = 3500) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const icons = {
    success: "✅",
    error:   "❌",
    warning: "⚠️",
    info:    "ℹ️"
  };

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span>${message}</span>`;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add("show"));

  // Auto-remove
  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}

/* ─────────────────────────────────────────────
   FULL-PAGE LOADING SPINNER
───────────────────────────────────────────── */
let spinnerEl = null;

export function showSpinner() {
  if (spinnerEl) return;
  spinnerEl = document.createElement("div");
  spinnerEl.id = "global-spinner";
  spinnerEl.innerHTML = `<div class="spinner-ring"></div>`;
  document.body.appendChild(spinnerEl);
}

export function hideSpinner() {
  if (!spinnerEl) return;
  spinnerEl.remove();
  spinnerEl = null;
}

/* ─────────────────────────────────────────────
   AUTH GUARD
   Redirects to login if user is not signed in.
   Usage: guardAuth(auth, "login.html");
───────────────────────────────────────────── */
export function guardAuth(auth, redirectPath = "../index.html") {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      if (user) {
        resolve(user);
      } else {
        window.location.href = redirectPath;
        reject(new Error("Not authenticated"));
      }
    });
  });
}

/* ─────────────────────────────────────────────
   DARK / LIGHT MODE TOGGLE
   Reads from localStorage; call initTheme() on every page.
───────────────────────────────────────────── */
export function initTheme() {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  return saved;
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next    = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  return next;
}

/* ─────────────────────────────────────────────
   RELATIVE TIME FORMATTER
   e.g. "3 hours ago", "2 days ago"
───────────────────────────────────────────── */
export function timeAgo(timestamp) {
  if (!timestamp) return "just now";
  const date   = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diff   = (Date.now() - date.getTime()) / 1000; // seconds

  if (diff < 60)   return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ─────────────────────────────────────────────
   VOTE PERCENTAGE CALCULATOR
───────────────────────────────────────────── */
export function getVotePercents(yesVotes = 0, noVotes = 0) {
  const total = yesVotes + noVotes;
  if (total === 0) return { yes: 50, no: 50, total: 0 };
  return {
    yes:   Math.round((yesVotes / total) * 100),
    no:    Math.round((noVotes  / total) * 100),
    total
  };
}

/* ─────────────────────────────────────────────
   SKELETON LOADER BUILDER
   Returns an HTML string with n skeleton cards.
───────────────────────────────────────────── */
export function buildSkeletonCards(count = 6) {
  return Array(count).fill(null).map(() => `
    <div class="skeleton-card" aria-hidden="true">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton skeleton-line lg"></div>
        <div class="skeleton skeleton-line md"></div>
        <div class="skeleton skeleton-line sm"></div>
      </div>
    </div>
  `).join("");
}

/* ─────────────────────────────────────────────
   CATEGORY BADGE HELPER
───────────────────────────────────────────── */
export const CATEGORIES = [
  "Politics", "Technology", "Science", "Education",
  "Sports",   "Environment", "Health", "Society", "Other"
];

export function categoryColor(cat) {
  const map = {
    Politics:    "#e53935",
    Technology:  "#1e88e5",
    Science:     "#8e24aa",
    Education:   "#fb8c00",
    Sports:      "#43a047",
    Environment: "#00897b",
    Health:      "#d81b60",
    Society:     "#6d4c41",
    Other:       "#757575"
  };
  return map[cat] || "#757575";
}

/* ─────────────────────────────────────────────
   COPY TEXT TO CLIPBOARD
───────────────────────────────────────────── */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/* ─────────────────────────────────────────────
   DEBOUNCE
───────────────────────────────────────────── */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
