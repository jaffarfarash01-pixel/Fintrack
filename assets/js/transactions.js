/**
 * transactions.js
 * Add, delete, and render expense/income transactions.
 */

function addTransaction() {
  const desc   = document.getElementById('txDesc').value.trim();
  const amount = parseFloat(document.getElementById('txAmount').value);
  const type   = document.getElementById('txType').value;
  const cat    = document.getElementById('txCat').value;
  const date   = document.getElementById('txDate').value || today();

  if (!desc || !amount || amount <= 0) {
    alert('Please enter a description and a valid amount.');
    return;
  }

  let transactions = loadTransactions();
  transactions.unshift({ id: Date.now(), desc, amount, type, cat, date });
  saveTransactions(transactions);
  renderAll();

  // Clear inputs
  document.getElementById('txDesc').value   = '';
  document.getElementById('txAmount').value = '';
}

function deleteTransaction(id) {
  let transactions = loadTransactions();
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions(transactions);
  renderAll();
}

function renderExpenses() {
  const transactions = loadTransactions();
  const tbody = document.getElementById('allTbody');

  if (!transactions.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="color:var(--muted);text-align:center;padding:24px">No transactions yet. Add one above!</td></tr>`;
    return;
  }

  tbody.innerHTML = transactions.map(t => `
    <tr>
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td><span class="badge ${t.cat}">${t.cat}</span></td>
      <td><span class="badge ${t.type}">${t.type}</span></td>
      <td style="color:${t.type === 'income' ? 'var(--green)' : 'var(--red)'};font-weight:600">
        ${t.type === 'income' ? '+' : '-'}₹${fmt(t.amount)}
      </td>
      <td><button class="delete-btn" onclick="deleteTransaction(${t.id})">✕</button></td>
    </tr>
  `).join('');
}

/** Returns totals needed by the dashboard */
function getTotals() {
  const transactions = loadTransactions();
  const income  = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  return { income, expense, balance: income - expense, count: transactions.length };
}

/** Returns { cat: total } for the current calendar month */
function thisMonthSpending() {
  const m = new Date().toISOString().slice(0, 7);
  const byCat = {};
  loadTransactions()
    .filter(t => t.type === 'expense' && t.date.startsWith(m))
    .forEach(t => { byCat[t.cat] = (byCat[t.cat] || 0) + t.amount; });
  return byCat;
}
