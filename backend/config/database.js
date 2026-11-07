const { Sequelize } = require("sequelize");

const useCloud = !!process.env.DB_HOST;

const sequelize = new Sequelize(
  process.env.DB_NAME || "fintrack",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    dialectOptions: useCloud
      ? { ssl: { ca: process.env.DB_CA, rejectUnauthorized: true } }
      : {},
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    logging: false,
  }
);

module.exports = sequelize;