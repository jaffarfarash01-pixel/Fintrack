const Transaction = require("../models/Transaction");

// GET User's Transactions
const getTransactions = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const transactions = await Transaction.findAll({
      where: { userId },
      order: [["date", "DESC"]],
    });

    res.status(200).json(transactions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ADD Transaction
const addTransaction = async (req, res) => {
  try {
    const {
      description,
      amount,
      type,
      category,
      date,
      userId,
    } = req.body;

    if (
      !description ||
      !amount ||
      !type ||
      !category ||
      !date ||
      !userId
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const transaction = await Transaction.create({
      description,
      amount,
      type,
      category,
      date,
      userId,
    });

    res.status(201).json({
      message: "Transaction Added",
      transaction,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// UPDATE Transaction
const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const transaction = await Transaction.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction Not Found",
      });
    }

    await transaction.update({
      description: req.body.description,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
      date: req.body.date,
    });

    res.json({
      message: "Transaction Updated",
      transaction,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// DELETE Transaction
const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const transaction = await Transaction.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction Not Found",
      });
    }

    await transaction.destroy();

    res.json({
      message: "Transaction Deleted",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};