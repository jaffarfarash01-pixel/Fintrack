/**
 * budget.js
 * Set monthly budget limits per category and render progress bars.
 */

function setBudget() {
  const cat   = document.getElementById('budgetCat').value;
  const limit = parseFloat(document.getElementById('budgetLimit').value);

  if (!limit || limit <= 0) {
    alert('Please enter a valid budget limit.');
    return;
  }

  const budgets = loadBudgets();
  budgets[cat] = limit;
  saveBudgets(budgets);  
  renderBudget();
  document.getElementById('budgetLimit').value = '';
}

function renderBudget() {
  const budgets  = loadBudgets();
  const spending = thisMonthSpending();
  const cats     = ['food', 'transport', 'education', 'entertainment', 'health', 'other'];
  const box      = document.getElementById('budgetBars');

  box.innerHTML = cats.map(cat => {
    const limit = budgets[cat] || 0;
    const spent = spending[cat] || 0;
    const pct   = limit > 0 ? Math.min(100, (spent / limit) * 100) : 0;
    const fill  = pct >= 100 ? 'fill-red' : pct >= 80 ? 'fill-yellow' : 'fill-green';
    const label = cat.charAt(0).toUpperCase() + cat.slice(1);

    return `
      <div class="budget-item">
        <div class="budget-row">
          <div class="budget-label">${label}</div>
          <div class="budget-amounts">
            ${limit > 0 ? `₹${fmt(spent)} / ₹${fmt(limit)}` : 'No limit set — click above to add one'}
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill ${fill}" style="width:${pct}%"></div>
        </div>
      </div>`;
  }).join('');
}

/** Used by dashboard alerts */
function getBudgetAlerts() {
  const budgets  = loadBudgets();
  const spending = thisMonthSpending();
  const alerts   = [];

  for (const cat in budgets) {
    const spent = spending[cat] || 0;
    const pct   = spent / budgets[cat];
    if (pct >= 1) {
      alerts.push({ type: 'over',  cat, spent, limit: budgets[cat] });
    } else if (pct >= 0.8) {
      alerts.push({ type: 'near',  cat, spent, limit: budgets[cat], pct });
    }
  }
  return alerts;
}
