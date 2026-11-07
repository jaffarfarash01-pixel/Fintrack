const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");

// make sure models are loaded
require("./models/user");
require("./models/Transaction");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      // allow your Vercel site (any fintrack deployment URL) and tools with no origin
      if (!origin || /^https:\/\/fintrack[a-z0-9-]*\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);

app.get("/", (req, res) => {
  res.send("FinTrack Backend Running 🚀");
});

app.get("/health", async (req, res) => {
  try {
    await sequelize.query("SELECT 1");
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "db error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

sequelize
  .authenticate()
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.error("❌ Database connection failed:", err.message));