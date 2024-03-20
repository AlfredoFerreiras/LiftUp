//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Company = require("./models/Company");
const Idea = require("./models/Ideas");

//associations could go here!
User.hasMany(Company);
Company.belongsTo(User);

Company.hasMany(Idea);
Idea.belongsTo(Company);
// Assuming Company and Idea models are imported

module.exports = {
  db,
  models: {
    User,
    Company,
    Idea,
  },
};
