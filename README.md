# FinTrack — Student Finance Tracker

A full-stack personal finance management application designed for students to track expenses, manage budgets, set savings goals, and understand their spending habits.

FinTrack helps students build better financial habits by providing a simple dashboard to monitor their income, expenses, budgets, savings goals, and spending patterns in one place.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* Secure authentication
* User-specific financial data
* Protected application features

### 📊 Dashboard

* Overview of financial activity
* Total income
* Total expenses
* Current balance
* Budget overview
* Savings goals
* Recent transactions
* Spending insights

### 💸 Expense & Transaction Tracking

* Add income and expenses
* Categorize transactions
* View transaction history
* Track spending activity
* Manage individual transactions

### 💰 Budget Management

* Create budgets for different categories
* Monitor budget usage
* Compare spending against budgets
* Track remaining budget amounts

### 🎯 Savings Goals

* Create personal savings goals
* Set target amounts
* Track progress
* Monitor remaining amounts

### 💡 Financial Tips

* Financial tips for students
* Spending guidance
* Suggestions for better money management

### 📱 Responsive Design

* Desktop-friendly interface
* Mobile-responsive layout
* Sidebar navigation
* Mobile menu support

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* Responsive Web Design

### Backend

* Node.js
* Express.js
* REST API

### Database

* MySQL / MariaDB

### Development Tools

* Git
* GitHub
* VS Code
* XAMPP
* phpMyAdmin

---

## 📂 Project Structure

```text
FinTrack/
│
├── backend/
│   ├── ...
│   └── .env
│
├── frontend/
│   ├── ...
│   └── ...
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> **Note:** The `.env` file is intentionally excluded from GitHub because it contains private configuration and credentials.

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project directory:

```bash
cd fintrack
```

---

### 2. Install dependencies

Install the project dependencies:

```bash
npm install
```

If the backend has its own `package.json`, install its dependencies as well:

```bash
cd backend
npm install
```

Then return to the project root:

```bash
cd ..
```

---

## 🗄️ Database Setup

FinTrack uses MySQL/MariaDB for storing application data.

### Using XAMPP

1. Install and open XAMPP.
2. Start **Apache**.
3. Start **MySQL**.
4. Open phpMyAdmin.
5. Create the required FinTrack database.
6. Import or execute the project's database/table SQL if provided.
7. Configure the database credentials in your local `.env` file.

Example:

```env
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=fintrack
DB_PORT=3306
```

> Database configuration may differ depending on your local MySQL/XAMPP setup.

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory:

```text
backend/.env
```

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=fintrack
DB_PORT=3306

JWT_SECRET=your_secret_key
```

### ⚠️ Security

Never commit your real `.env` file to GitHub.

The repository uses `.gitignore` to prevent environment files from being uploaded:

```gitignore
node_modules/
.env
.env.*
!.env.example
```

If you are sharing the project with others, create an `.env.example` file containing only placeholder values.

---

## ▶️ Running the Application

### Start the backend

From the backend directory:

```bash
cd backend
npm start
```

Or, if your project uses a development script:

```bash
npm run dev
```

The backend API should start on the configured port, for example:

```text
http://localhost:5000
```

### Start the frontend

Open the frontend according to the project's frontend setup.

If it is a static HTML/CSS/JavaScript frontend, you can use VS Code Live Server or another local web server.

If the frontend has an npm development script:

```bash
cd frontend
npm install
npm run dev
```

---

## 🔄 Application Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Authentication
 │
 ▼
Dashboard
 │
 ├── Transactions
 │     ├── Add Income
 │     └── Add Expense
 │
 ├── Budgets
 │     └── Track Category Spending
 │
 ├── Goals
 │     └── Track Savings Progress
 │
 └── Tips
       └── Financial Guidance
```

---

## 📊 Core Modules

| Module         | Description                        |
| -------------- | ---------------------------------- |
| Authentication | Login and registration             |
| Dashboard      | Financial overview                 |
| Transactions   | Manage income and expenses         |
| Budgets        | Create and monitor spending limits |
| Goals          | Track savings targets              |
| Tips           | Financial guidance                 |
| Database       | Persistent user and finance data   |

---

## 🎯 Problem Statement

Students often struggle to manage their finances because their expenses are spread across cash transactions, digital payments, subscriptions, food, transportation, education, and other daily expenses.

Traditional methods such as notebooks or spreadsheets can make it difficult to understand spending patterns and maintain consistent budgets.

**FinTrack provides a centralized digital solution that allows students to:**

* Track their financial transactions
* Monitor their spending
* Set category-based budgets
* Create savings goals
* Analyze their financial activity
* Develop better financial habits

---

## 💡 Solution

FinTrack combines transaction tracking, budgeting, savings goals, and financial insights into one application.

Instead of manually maintaining separate records, users can manage their financial information through a single dashboard.

The application stores data in a database, allowing users to access and manage their financial records through the application's backend APIs.

---

## 📱 Responsive Interface

FinTrack is designed to work across different screen sizes.

The navigation system adapts for smaller screens with a mobile menu/sidebar approach.

```text
Desktop

┌─────────────────────────────────────────────┐
│ Sidebar │ Dashboard                         │
│         │                                   │
│         │ Financial Overview                │
│         │                                   │
│         │ Transactions / Budgets / Goals    │
└─────────────────────────────────────────────┘


Mobile

┌──────────────────────────┐
│ Dashboard           ☰    │
├──────────────────────────┤
│                          │
│ Financial Overview       │
│                          │
│ Transactions             │
│ Budgets                  │
│ Goals                    │
└──────────────────────────┘
```

---

## 🔒 Security Considerations

FinTrack follows basic security practices such as:

* Environment variables for sensitive configuration
* `.env` excluded from version control
* User authentication
* Protected backend routes where applicable
* Database-backed user data
* Separation between frontend and backend

> Never expose database passwords, API keys, JWT secrets, or other credentials in public repositories.

---

## 🧪 Future Improvements

Possible future improvements include:

* Advanced spending analytics
* Interactive financial charts
* Monthly financial reports
* Export transactions to CSV/PDF
* Recurring transactions
* Email notifications
* Improved financial recommendations
* Dark/light theme customization
* More advanced authentication
* Cloud deployment
* Improved mobile experience

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```markdown
## Screenshots

### Login

![FinTrack Login](screenshots/login.png)

### Dashboard

![FinTrack Dashboard](screenshots/dashboard.png)

### Transactions

![FinTrack Transactions](screenshots/transactions.png)

### Budgets

![FinTrack Budgets](screenshots/budgets.png)
```

You can create a `screenshots/` folder in the repository and place your project screenshots inside it.

---

## 🌐 Project Links

**GitHub Repository:**
`YOUR_GITHUB_REPOSITORY_URL`

**Live Demo:**
`YOUR_DEPLOYED_APP_URL`

> Add the actual links after deploying the application.

---

## 👨‍💻 Developer

**Jaffar Farash**

Bachelor of Computer Applications (BCA) Student
Frontend Web Developer

### Skills

* HTML
* CSS
* JavaScript
* C
* Python
* Node.js
* Express.js
* MySQL
* Git & GitHub
* REST APIs

---

## 📄 License

This project was developed as an academic and portfolio project.

You may modify this section if you decide to publish FinTrack under a specific open-source license such as MIT.

---

## ⭐ Acknowledgements

FinTrack was developed as a student-focused project to explore full-stack web development, database integration, authentication, REST APIs, responsive UI design, and practical financial management.

If you find this project useful, consider giving the repository a ⭐ on GitHub.
