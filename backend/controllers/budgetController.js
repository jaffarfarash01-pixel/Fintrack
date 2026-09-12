const Budget = require("../models/Budget");

// GET User's Budgets
const getBudgets = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const budgets = await Budget.findAll({
      where: { userId },
    });

    res.status(200).json(budgets);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ADD Budget
const addBudget = async (req, res) => {
  try {
    const { category, limit, userId } = req.body;

    if (!category || !limit || !userId) {
      return res.status(400).json({
        message: "Category, limit and userId are required",
      });
    }

    const budget = await Budget.create({
      category,
      limit,
      userId,
    });

    res.status(201).json({
      message: "Budget Added",
      budget,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getBudgets,
  addBudget,
};