const express = require("express");
const sequelize = require("./config/database");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const transactionRoutes = require("./routes/transactionRoutes");
const Transaction = require("./models/Transaction");
const budgetRoutes = require("./routes/budgetRoutes");
const goalRoutes = require("./routes/goalRoutes");

const app = express();
// app.use("/api/auth", authRoutes);


// const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/goals", goalRoutes);


app.get("/", (req, res) => {
  res.send("FinTrack Backend Running 🚀");
});

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(async () => {
    console.log("✅ Database Connected");

    await sequelize.sync({ alter: true});
    console.log("✅ Tables Created");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });