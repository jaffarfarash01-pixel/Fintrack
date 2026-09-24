/**
 * budget.js
 * User-specific budgets using backend API
 */

function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please login first.");
    return null;
  }

  return user;
}


// ADD / UPDATE BUDGET
async function setBudget() {
  const cat = document.getElementById("budgetCat").value;
  const limit = parseFloat(
    document.getElementById("budgetLimit").value
  );

  const user = getLoggedInUser();

  if (!user) return;

  if (!limit || limit <= 0) {
    alert("Please enter a valid budget limit.");
    return;
  }

  try {
    const response = await fetch(
      "https://fintrack-production-4d9b.up.railway.app/api/budgets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: cat,
          limit: limit,
          userId: user.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add budget");
      return;
    }

    alert(data.message);

    document.getElementById("budgetLimit").value = "";

    await renderBudget();

  } catch (error) {
    console.error("Budget error:", error);
    alert("Server Error");
  }
}


// GET CURRENT USER'S BUDGETS
async function loadBudgets() {
  const user = getLoggedInUser();

  if (!user) return [];

  try {
    const response = await fetch(
      `https://fintrack-production-4d9b.up.railway.app/api/budgets?userId=${user.id}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return [];
    }

    return data;

  } catch (error) {
    console.error("Load budgets error:", error);
    return [];
  }
}


// RENDER BUDGETS
async function renderBudget() {
  const budgets = await loadBudgets();
  const spending = await thisMonthSpending();

  const cats = [
    "food",
    "transport",
    "education",
    "entertainment",
    "health",
    "other",
  ];

  const box = document.getElementById("budgetBars");

  box.innerHTML = cats.map(cat => {

    const budget = budgets.find(
      b => b.category === cat
    );

    const limit = budget ? Number(budget.limit) : 0;
    const spent = spending[cat] || 0;

    const pct =
      limit > 0
        ? Math.min(100, (spent / limit) * 100)
        : 0;

    const fill =
      pct >= 100
        ? "fill-red"
        : pct >= 80
        ? "fill-yellow"
        : "fill-green";

    const label =
      cat.charAt(0).toUpperCase() + cat.slice(1);

    return `
      <div class="budget-item">

        <div class="budget-row">

          <div class="budget-label">
            ${label}
          </div>

          <div class="budget-amounts">
            ${
              limit > 0
                ? `₹${fmt(spent)} / ₹${fmt(limit)}`
                : "No limit set"
            }
          </div>

        </div>

        <div class="progress-bar">

          <div
            class="progress-fill ${fill}"
            style="width:${pct}%">
          </div>

        </div>

      </div>
    `;

  }).join("");
}


// USED BY DASHBOARD ALERTS
async function getBudgetAlerts() {
  const budgets = await loadBudgets();
  const spending = await thisMonthSpending();

  const alerts = [];

  budgets.forEach((budget) => {
    const category = budget.category;
    const limit = Number(budget.limit);
    const spent = Number(spending[category] || 0);

    if (limit <= 0) {
      return;
    }

    const pct = spent / limit;

    if (pct >= 1) {
      alerts.push({
        type: "over",
        category,
        spent,
        limit,
        pct
      });
    } else if (pct >= 0.8) {
      alerts.push({
        type: "near",
        category,
        spent,
        limit,
        pct
      });
    }
  });

  return alerts;
}