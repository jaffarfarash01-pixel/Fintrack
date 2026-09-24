/**
 * app.js
 * Main controller: navigation, dashboard render, utility helpers.
 * Loaded last so all other modules are available.
 */

/* ── NAVIGATION ─────────────────────────────────────────── */
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  el.classList.add('active');
  renderAll();
}

/* ── MASTER RENDER ──────────────────────────────────────── */
async function renderAll() {

    await renderDashboard();

    await renderExpenses();

    await renderBudget();

    await renderGoals();

    renderTips();
}

/* ── DASHBOARD ──────────────────────────────────────────── */
async function renderDashboard() {
  const transactions = await loadTransactions();

let income = 0;
let expense = 0;

transactions.forEach((t) => {
    if (t.type === "income") {
        income += Number(t.amount);
    } else {
        expense += Number(t.amount);
    }
});

const balance = income - expense;
const count = transactions.length;

  // Summary cards
  document.getElementById('summaryCards').innerHTML = `
    <div class="card">
      <div class="card-label">Total Balance</div>
      <div class="card-value ${balance >= 0 ? 'green' : 'red'}">₹${fmt(balance)}</div>
    </div>
    <div class="card">
      <div class="card-label">Total Income</div>
      <div class="card-value green">₹${fmt(income)}</div>
    </div>
    <div class="card">
      <div class="card-label">Total Expenses</div>
      <div class="card-value red">₹${fmt(expense)}</div>
    </div>
    <div class="card">
      <div class="card-label">Transactions</div>
      <div class="card-value">${count}</div>
    </div>
  `;

  // Recent 5 transactions
  // const transactions = (await loadTransactions()).slice(0, 5);
  document.getElementById('recentTbody').innerHTML = transactions.length
    ? transactions.map(t => `
        <tr>
          <td>${t.date}</td>
          <td>${t.description}</td>
          <td><span class="badge ${t.category}">${t.category}</span></td>
          <td style="color:${t.type === 'income' ? 'var(--green)' : 'var(--red)'};font-weight:600">
            ${t.type === 'income' ? '+' : '-'}₹${fmt(t.amount)}
          </td>
        </tr>`).join('')
    : `<tr><td colspan="4" style="color:var(--muted);text-align:center;padding:20px">No transactions yet</td></tr>`;

  // Smart alerts
const alertItems = await getBudgetAlerts();

let alertHtml = alertItems.map(a => {
  if (a.type === 'over') {
    return `<div class="alert warn">
      ⚠️ <b>${a.category}</b> budget exceeded!
      Spent ₹${fmt(a.spent)} of ₹${fmt(a.limit)}
    </div>`;
  }

  return `<div class="alert warn">
    🔶 <b>${a.category}</b> at ${Math.round(a.pct * 100)}% of monthly budget
  </div>`;
}).join('');

// Positive balance
if (balance > 0) {
  alertHtml += `<div class="alert success">
    ✅ Positive balance of ₹${fmt(balance)} — great job!
  </div>`;
}

if (balance < 0) {
  alertHtml += `<div class="alert warn">
    ⚠️ <b>Negative Balance!</b>
    You have spent ₹${fmt(Math.abs(balance))} more than your income.
  </div>`;
}
// If there are no budget alerts
if (!alertItems.length) {
  alertHtml += `<div class="alert info">
    💡 Go to the Budget tab to set spending limits and get alerts
  </div>`;
}

if (!alertHtml) {
  alertHtml = `<div class="alert success">
    ✅ All budgets are on track this month!
  </div>`;
}
document.getElementById('alertsBox').innerHTML = alertHtml;

  // Donut chart
  const spending = await thisMonthSpending();
drawDonut(spending);
}

/* ── UTILITIES ──────────────────────────────────────────── */
function fmt(n) {
  return Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function today() {
  return new Date().toISOString().split('T')[0];
}
async function loadTransactions() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
        console.log("No logged-in user");
        return [];
    }

    try {

        const response = await fetch(
            `https://fintrack-production-4d9b.up.railway.app/api/transactions?userId=${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
            console.error(data);
            return [];
        }

        return data;

    } catch (error) {

        console.error("Load transactions error:", error);

        return [];
    }
}
/* ── INIT ───────────────────────────────────────────────── */
document.getElementById('txDate').value = today();
// seedDemoData();
renderAll();
