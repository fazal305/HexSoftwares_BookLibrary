"use strict";

/*   */
/* STORAGE KEYS */
/*   */

const STORAGE_KEY = "hexlibrary-books";
const HISTORY_KEY = "hexlibrary-history";

/*   */
/* STATE */
/*   */

let books = [];
let history = [];

let activeSearch = "";
let activeCategory = "all";

/*   */
/* LOAD / SAVE */
/*   */

function loadBooks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function loadHistory() {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
}

function saveHistory() {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

/*   */
/* ID */
/*   */

function generateId() {
  return Date.now() + Math.random();
}

/*   */
/* BORROW / RETURN */
/*   */

function borrowBook(id) {
  const name = prompt("Enter borrower name:");
  if (!name) return;

  books = books.map((b) =>
    b.id === id
      ? {
          ...b,
          borrowStatus: "borrowed",
          borrowerName: name,
          borrowDate: Date.now(),
        }
      : b,
  );

  saveBooks();
  renderBooks();
  renderStats();
}

function returnBook(id) {
  const book = books.find((b) => b.id === id);
  if (!book) return;

  history.push({
    id: generateId(),
    bookId: book.id,
    bookTitle: book.title,
    bookAuthor: book.author,
    borrowerName: book.borrowerName,
    borrowDate: book.borrowDate,
    returnDate: Date.now(),
  });

  saveHistory();

  books = books.map((b) =>
    b.id === id
      ? { ...b, borrowStatus: "available", borrowerName: "", borrowDate: null }
      : b,
  );

  saveBooks();
  renderBooks();
  renderHistory();
  renderStats();
}

/*   */
/* DELETE */
/*   */

function deleteBook(id) {
  books = books.filter((b) => b.id !== id);
  saveBooks();
  renderBooks();
  renderStats();
}

/*   */
/* FILTERS */
/*   */

function applyFilters() {
  let filtered = [...books];

  if (activeCategory !== "all") {
    filtered = filtered.filter((b) => b.category === activeCategory);
  }

  if (activeSearch.trim()) {
    const q = activeSearch.toLowerCase();

    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
  }

  return filtered;
}

/*   */
/* RENDER BOOKS */
/*   */

function renderBooks() {
  const grid = document.getElementById("booksGrid");
  grid.innerHTML = "";

  const filtered = applyFilters();

  if (!filtered.length) {
    grid.innerHTML = `<p style="color:#7a788a">No books found</p>`;
    return;
  }

  filtered.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";

    const borrowBtn =
      book.borrowStatus === "available"
        ? `<button onclick="borrowBook(${book.id})">Borrow</button>`
        : `<button onclick="returnBook(${book.id})">Return</button>`;

    card.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div class="book-author">${book.author}</div>

      <div class="badge">${book.category}</div>

      <div class="status">${book.readingStatus}</div>

      <div class="borrow-status">
        ${
          book.borrowStatus === "borrowed"
            ? `Borrowed by: ${book.borrowerName}`
            : "Available"
        }
      </div>

      ${borrowBtn}
      <button onclick="deleteBook(${book.id})">Delete</button>
    `;

    grid.appendChild(card);
  });
}

/*   */
/* HISTORY */
/*   */

function renderHistory() {
  const container = document.getElementById("historyTable");
  if (!container) return;

  container.innerHTML = "";

  if (!history.length) {
    container.innerHTML = "<p>No borrowing history yet.</p>";
    return;
  }

  history.forEach((h) => {
    const row = document.createElement("div");
    row.className = "history-row";

    const borrowDate = new Date(h.borrowDate).toLocaleDateString();
    const returnDate = new Date(h.returnDate).toLocaleDateString();

    const days = Math.ceil(
      (h.returnDate - h.borrowDate) / (1000 * 60 * 60 * 24),
    );

    row.innerHTML = `
      <strong>${h.bookTitle}</strong> by ${h.bookAuthor}<br>
      Borrower: ${h.borrowerName}<br>
      ${borrowDate} → ${returnDate} (${days} days)
      <hr>
    `;

    container.appendChild(row);
  });
}

/*   */
/* STATS ENGINE */
/*   */

function renderStats() {
  const total = books.length;
  const borrowed = books.filter((b) => b.borrowStatus === "borrowed").length;
  const available = total - borrowed;
  const finished = books.filter((b) => b.readingStatus === "finished").length;

  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  set("totalBooks", total);
  set("borrowedCount", borrowed);
  set("availableCount", available);
  set("finishedCount", finished);
}

/*   */
/* EVENTS */
/*   */

function setupEvents() {
  document.getElementById("searchInput").addEventListener("input", (e) => {
    activeSearch = e.target.value;
    renderBooks();
  });

  document.getElementById("clearSearchBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    activeSearch = "";
    renderBooks();
  });

  document.querySelectorAll(".category-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".category-pill")
        .forEach((b) => b.classList.remove("active"));

      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      renderBooks();
    });
  });

  document.getElementById("openAddBookBtn").addEventListener("click", () => {
    document.getElementById("bookFormModal").classList.remove("hidden");
  });

  document.getElementById("closeModalBtn").addEventListener("click", () => {
    document.getElementById("bookFormModal").classList.add("hidden");
  });
}
function showTab(tabId) {
  document.querySelectorAll(".tab-section").forEach((section) => {
    section.classList.remove("active");
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const target = document.getElementById(tabId);
  if (target) target.classList.add("active");

  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    showTab(btn.dataset.tab);
  });
});

/*   */
/* INIT */
/*   */

function init() {
  books = loadBooks();
  history = loadHistory();

  if (!books.length) {
    books = [
      {
        id: generateId(),
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        readingStatus: "finished",
        borrowStatus: "available",
        borrowerName: "",
        borrowDate: null,
      },
    ];

    saveBooks();
  }

  setupEvents();
  renderBooks();
  renderHistory();
  renderStats();
}

init();
