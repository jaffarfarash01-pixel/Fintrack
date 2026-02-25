/**
 * goals.js
 * Create financial goals, add savings, and render progress.
 */

function addGoal() {
  const name   = document.getElementById('goalName').value.trim();
  const target = parseFloat(document.getElementById('goalTarget').value);
  const saved  = parseFloat(document.getElementById('goalSaved').value) || 0;

  if (!name || !target || target <= 0) {
    alert('Please enter a goal name and target amount.');
    return;
  }

  const goals = loadGoals();
  goals.push({ id: Date.now(), name, target, saved });
  saveGoals(goals);
  renderGoals();

  document.getElementById('goalName').value   = '';
  document.getElementById('goalTarget').value = '';
  document.getElementById('goalSaved').value  = '';
}

function addToGoal(id, amountStr) {
  const amount = parseFloat(amountStr);
  if (!amount || amount <= 0) { alert('Enter a valid amount to add.'); return; }

  const goals = loadGoals();
  const goal  = goals.find(g => g.id === id);
  if (goal) {
    goal.saved = Math.min(goal.target, goal.saved + amount);
    saveGoals(goals);
    renderGoals();
  }
}

function deleteGoal(id) {
  const goals = loadGoals().filter(g => g.id !== id);
  saveGoals(goals);
  renderGoals();
}

function renderGoals() {
  const goals = loadGoals();
  const box   = document.getElementById('goalsList');

  if (!goals.length) {
    box.innerHTML = `<div style="color:var(--muted);text-align:center;padding:30px">No goals yet. Add one above!</div>`;
    return;
  }

  box.innerHTML = goals.map(g => {
    const pct  = Math.min(100, Math.round((g.saved / g.target) * 100));
    const fill = pct >= 100 ? 'fill-green' : pct >= 50 ? 'fill-yellow' : 'fill-red';
    const inputId = `gamt_${g.id}`;

    return `
      <div class="goal-card">
        <div class="goal-header">
          <div class="goal-name">${g.name}</div>
          <div class="goal-pct">${pct}% achieved${pct >= 100 ? ' 🎉' : ''}</div>
        </div>
        <div class="budget-row">
          <div style="font-size:0.85rem;color:var(--muted)">Saved: ₹${fmt(g.saved)}</div>
          <div style="font-size:0.85rem;color:var(--muted)">Target: ₹${fmt(g.target)}</div>
        </div>
        <div class="progress-bar" style="margin:8px 0 14px">
          <div class="progress-fill ${fill}" style="width:${pct}%"></div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <input type="number" placeholder="Add savings ₹" id="${inputId}" style="width:160px;padding:7px 12px">
          <button class="btn" onclick="addToGoal(${g.id}, document.getElementById('${inputId}').value)">+ Add</button>
          <button class="btn outline danger" onclick="deleteGoal(${g.id})">Delete</button>
        </div>
      </div>`;
  }).join('');
}
