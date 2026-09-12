/**
 * storage.js
 * Centralised localStorage helpers for FinTrack.
 * All other modules read/write state through these functions.
 */

const KEYS = {
  TRANSACTIONS: 'ft_tx',
  BUDGETS:      'ft_budgets',
  GOALS:        'ft_goals',
};

function loadTransactions() {
  // return JSON.parse(localStorage.getItem(KEYS.TRANSACTIONS) || '[]');
  fetch("http://localhost:3000/api/transactions")
}
function saveTransactions(data) {
  localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(data));
}

function loadBudgets() {
  return JSON.parse(localStorage.getItem(KEYS.BUDGETS) || '{}');
}
function saveBudgets(data) {
  localStorage.setItem(KEYS.BUDGETS, JSON.stringify(data));
}

function loadGoals() {
  return JSON.parse(localStorage.getItem(KEYS.GOALS) || '[]');
}
function saveGoals(data) {
  localStorage.setItem(KEYS.GOALS, JSON.stringify(data));
}

/** Seed demo data on first visit */
function seedDemoData() {
  if (loadTransactions().length) return; // already has data

  const demo = [
    { id: 1, desc: 'Monthly Stipend',    amount: 8000, type: 'income',  cat: 'income',        date: '2026-02-01' },
    { id: 2, desc: 'College Canteen',    amount: 450,  type: 'expense', cat: 'food',          date: '2026-02-03' },
    { id: 3, desc: 'Bus Pass',           amount: 300,  type: 'expense', cat: 'transport',     date: '2026-02-04' },
    { id: 4, desc: 'Python Book',        amount: 600,  type: 'expense', cat: 'education',     date: '2026-02-05' },
    { id: 5, desc: 'Movie Night',        amount: 350,  type: 'expense', cat: 'entertainment', date: '2026-02-10' },
    { id: 6, desc: 'Groceries',          amount: 700,  type: 'expense', cat: 'food',          date: '2026-02-12' },
  ];
  saveTransactions(demo);
  saveBudgets({ food: 3000, transport: 500, entertainment: 1000, education: 2000 });
  saveGoals([
    { id: 1, name: 'New Laptop',      target: 50000, saved: 12000 },
    { id: 2, name: 'Emergency Fund',  target: 10000, saved: 3500  },
  ]);
}
