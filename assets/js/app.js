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
function renderAll() {
  renderDashboard();
  renderExpenses();
  renderBudget();
  renderGoals();
  renderTips();
}

/* ── DASHBOARD ──────────────────────────────────────────── */
function renderDashboard() {
  const { income, expense, balance, count } = getTotals();

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
  const transactions = loadTransactions().slice(0, 5);
  document.getElementById('recentTbody').innerHTML = transactions.length
    ? transactions.map(t => `
        <tr>
          <td>${t.date}</td>
          <td>${t.desc}</td>
          <td><span class="badge ${t.cat}">${t.cat}</span></td>
          <td style="color:${t.type === 'income' ? 'var(--green)' : 'var(--red)'};font-weight:600">
            ${t.type === 'income' ? '+' : '-'}₹${fmt(t.amount)}
          </td>
        </tr>`).join('')
    : `<tr><td colspan="4" style="color:var(--muted);text-align:center;padding:20px">No transactions yet</td></tr>`;

  // Smart alerts
  const alertItems = getBudgetAlerts();
  let alertHtml = alertItems.map(a => {
    if (a.type === 'over') {
      return `<div class="alert warn">⚠️ <b>${a.cat}</b> budget exceeded! Spent ₹${fmt(a.spent)} of ₹${fmt(a.limit)}</div>`;
    }
    return `<div class="alert warn">🔶 <b>${a.cat}</b> at ${Math.round(a.pct * 100)}% of monthly budget</div>`;
  }).join('');

  if (balance > 0) {
    alertHtml += `<div class="alert success">✅ Positive balance of ₹${fmt(balance)} — great job!</div>`;
  }
  if (!Object.keys(loadBudgets()).length) {
    alertHtml += `<div class="alert info">💡 Go to the Budget tab to set spending limits and get alerts</div>`;
  }
  if (!alertHtml) {
    alertHtml = `<div class="alert success">✅ All budgets are on track this month!</div>`;
  }

  document.getElementById('alertsBox').innerHTML = alertHtml;

  // Donut chart
  drawDonut(thisMonthSpending());
}

/* ── UTILITIES ──────────────────────────────────────────── */
function fmt(n) {
  return Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function today() {
  return new Date().toISOString().split('T')[0];
}

/* ── INIT ───────────────────────────────────────────────── */
document.getElementById('txDate').value = today();
seedDemoData();
renderAll();
