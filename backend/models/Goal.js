const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Goal = sequelize.define("Goal", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  target: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  saved: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Goal;