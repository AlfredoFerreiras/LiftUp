const Sequelize = require("sequelize");
const db = require("../db");

const Idea = db.define("idea", {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("backlog", "planned", "active", "completed"),
    defaultValue: "backlog",
  },
  // companyId is automatically managed by Sequelize associations
});

module.exports = Idea;
