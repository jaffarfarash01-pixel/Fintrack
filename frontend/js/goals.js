/**
 * goals.js
 * User-specific financial goals using backend API.
 */

// Get logged-in user
function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please login first.");
    return null;
  }

  return user;
}


// GET CURRENT USER'S GOALS
async function loadGoals() {
  const user = getLoggedInUser();

  if (!user) return [];

  try {
    const response = await fetch(
      `https://fintrack-production-4d9b.up.railway.app/api/goals?userId=${user.id}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return [];
    }

    return data;

  } catch (error) {
    console.error("Load goals error:", error);
    return [];
  }
}


// ADD GOAL
async function addGoal() {
  const name = document.getElementById("goalName").value.trim();

  const target = parseFloat(
    document.getElementById("goalTarget").value
  );

  const saved = parseFloat(
    document.getElementById("goalSaved").value
  ) || 0;

  const user = getLoggedInUser();

  if (!user) return;

  if (!name) {
    alert("Please enter a goal name.");
    return;
  }

  if (!target || target <= 0) {
    alert("Please enter a valid target amount.");
    return;
  }

  if (saved < 0 || saved > target) {
    alert("Saved amount must be between ₹0 and the target amount.");
    return;
  }

  try {

    const response = await fetch(
      "https://fintrack-production-4d9b.up.railway.app/api/goals",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          target,
          saved,
          userId: user.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to add goal");
      return;
    }

    alert(data.message);

    // Clear form
    document.getElementById("goalName").value = "";
    document.getElementById("goalTarget").value = "";
    document.getElementById("goalSaved").value = "";

    // Reload goals
    await renderGoals();

  } catch (error) {
    console.error("Add goal error:", error);
    alert("Server Error");
  }
}


// RENDER GOALS
async function renderGoals() {

  const goals = await loadGoals();

  const box = document.getElementById("goalsList");

  if (!box) return;

  if (!goals.length) {

    box.innerHTML = `
      <div class="card">
        <p style="text-align:center; opacity:.7;">
          No financial goals yet. Add your first goal above.
        </p>
      </div>
    `;

    return;
  }


  box.innerHTML = goals.map(goal => {

    const percentage = Math.min(
      100,
      (Number(goal.saved) / Number(goal.target)) * 100
    );

    const remaining = Math.max(
      0,
      Number(goal.target) - Number(goal.saved)
    );

    return `
      <div class="card goal-card" style="margin-bottom:16px;">

        <div class="budget-row">

          <div>

            <div class="section-title">
              ${escapeHTML(goal.name)}
            </div>

            <div style="opacity:.7; margin-top:4px;">
              ₹${fmt(goal.saved)} saved of ₹${fmt(goal.target)}
            </div>

          </div>

          <div style="text-align:right;">
            <strong>${percentage.toFixed(0)}%</strong>
          </div>

        </div>


        <div class="progress-bar" style="margin-top:16px;">

          <div
            class="progress-fill fill-green"
            style="width:${percentage}%">
          </div>

        </div>


        <div class="budget-row" style="margin-top:12px;">

          <span>
            ${
              remaining > 0
                ? `₹${fmt(remaining)} remaining`
                : "🎉 Goal completed!"
            }
          </span>

        </div>

      </div>
    `;

  }).join("");
}


// HTML SECURITY HELPER
function escapeHTML(value) {

  const div = document.createElement("div");

  div.textContent = value;

  return div.innerHTML;
}