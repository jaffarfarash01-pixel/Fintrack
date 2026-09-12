const Goal = require("../models/Goal");

// GET USER'S GOALS
const getGoals = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const goals = await Goal.findAll({
      where: { userId },
      order: [["id", "DESC"]],
    });

    res.status(200).json(goals);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ADD GOAL
const addGoal = async (req, res) => {
  try {
    const {
      name,
      target,
      saved,
      userId,
    } = req.body;

    if (!name || !target || !userId) {
      return res.status(400).json({
        message: "Name, target and user ID are required",
      });
    }

    const goal = await Goal.create({
      name,
      target,
      saved: saved || 0,
      userId,
    });

    res.status(201).json({
      message: "Goal Added",
      goal,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getGoals,
  addGoal,
};