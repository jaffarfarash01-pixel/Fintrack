function getLoggedInUser() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return null;
  }

  return user;
}


// ===============================
// ADD TRANSACTION
// ===============================
async function addTransaction() {
  const description = document.getElementById("txDesc").value.trim();
  const amount = Number(document.getElementById("txAmount").value);
  const type = document.getElementById("txType").value;
  const category = document.getElementById("txCat").value;
  const date = document.getElementById("txDate").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please login first");
    return;
  }

  if (!description || !amount || !date) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:3000/api/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          amount,
          type,
          category,
          date,
          userId: user.id
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      alert(data.message);
      return;
    }

    alert(data.message);

    renderAll();

  } catch (error) {
    console.error("Add transaction error:", error);
    alert("Server Error");
  }
}

// ===============================
// GET USER TRANSACTIONS
// ===============================
async function renderExpenses() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    console.log("No logged-in user");
    return;
  }

  const response = await fetch(
    `http://localhost:3000/api/transactions?userId=${user.id}`
  );

  const transactions = await response.json();

  if (!response.ok) {
    console.error(transactions);
    return;
  }

  const tbody = document.getElementById("allTbody");

  tbody.innerHTML = "";

  transactions.forEach((t) => {
    tbody.innerHTML += `
      <tr>
        <td>${t.date}</td>
        <td>${t.description}</td>
        <td>${t.category}</td>
        <td>${t.type}</td>
        <td>₹${t.amount}</td>
        <td>
          <button onclick="editTransaction(${t.id})">Edit</button>
          <button onclick="deleteTransaction(${t.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}


// ===============================
// DELETE TRANSACTION
// ===============================
async function deleteTransaction(id) {
  if (!confirm("Delete this transaction?")) {
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please login first");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/transactions/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);

    renderAll();

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
}

// ===============================
// UPDATE TRANSACTION
// ===============================
async function editTransaction(id) {

  const description = prompt("Enter new description");
  const amount = prompt("Enter new amount");
  const category = prompt("Enter new category");
  const type = prompt("income or expense");
  const date = prompt("Enter date (YYYY-MM-DD)");

  if (!description || !amount || !category || !type || !date) {
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    alert("Please login first");
    return;
  }

  try {

    const response = await fetch(
      `http://localhost:3000/api/transactions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description,
          amount,
          category,
          type,
          date,
          userId: user.id
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    alert(data.message);

    renderAll();

  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
}

// ===============================
// GET TOTALS
// ===============================
async function getTotals() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.id) {
    return {
      income: 0,
      expense: 0,
      balance: 0,
      count: 0,
    };
  }

  const response = await fetch(
    `http://localhost:3000/api/transactions?userId=${user.id}`
  );

  const transactions = await response.json();

  if (!response.ok) {
    console.error(transactions);
    return {
      income: 0,
      expense: 0,
      balance: 0,
      count: 0,
    };
  }

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
    count: transactions.length,
  };
}
// ===============================
// THIS MONTH SPENDING
// ===============================
async function thisMonthSpending() {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
        return {};
    }

    try {

        const response = await fetch(
            `http://localhost:3000/api/transactions?userId=${user.id}`
        );

        const transactions = await response.json();

        if (!response.ok) {
            console.error(transactions);
            return {};
        }

        const month = new Date()
            .toISOString()
            .slice(0, 7);

        const byCat = {};

        transactions
            .filter(
                t =>
                    t.type === "expense" &&
                    t.date.startsWith(month)
            )
            .forEach(t => {

                byCat[t.category] =
                    (byCat[t.category] || 0) +
                    Number(t.amount);

            });

        return byCat;

    } catch (error) {

        console.error("Monthly spending error:", error);

        return {};
    }
}