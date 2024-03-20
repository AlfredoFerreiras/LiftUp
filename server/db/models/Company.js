const Sequelize = require("sequelize");
const db = require("../db");

const Company = db.define("company", {
  companyName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  budget: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  goal: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  // Define the ideas column to accept JSON data
});

module.exports = Company;
