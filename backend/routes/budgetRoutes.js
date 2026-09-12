const express = require("express");
const router = express.Router();

const {
    getBudgets,
    addBudget
} = require("../controllers/budgetController");

router.get("/", getBudgets);
router.post("/", addBudget);

module.exports = router;