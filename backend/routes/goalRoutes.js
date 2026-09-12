const express = require("express");
const router = express.Router();

const {
    getGoals,addGoal
} = require("../controllers/goalController");

router.get("/", getGoals);
router.post("/", addGoal);

module.exports = router;