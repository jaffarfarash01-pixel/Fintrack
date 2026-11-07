const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
// const Users = require("./user");

const Budget = sequelize.define("Budget", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  limit: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Budget;