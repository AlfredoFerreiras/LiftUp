"use strict";

const {
  db,
  models: { User, Company },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const [alfredo, cody, murphy] = await Promise.all([
    User.create({
      email: "alf@abc.com",
      username: "alfredo",
      password: "123",
      isAdmin: true,
      imageUrl:
        "https://ca.slack-edge.com/E05LYDFST6K-U04SM5GVDK2-fbe8ec81b13d-512",
    }),

    User.create({ email: "cody@aol.com", username: "cody", password: "123" }),
    User.create({
      email: "murphy@aol.com",
      username: "murphy",
      password: "123",
    }),
  ]);

  const [Jupiter, Venus, Mars] = await Promise.all([
    Company.create({ companyName: "jupiter", userId: cody.id }),
    Company.create({
      companyName: "venus",
      description: "Solar Panels sales",
      budget: "1000",
      goal: "Create more jobs and more revenue",
      userId: alfredo.id,
    }),
    Company.create({ companyName: "mars", userId: murphy.id }),
  ]);

  console.log(`seeded successfully`);
  return {
    users: {
      alfredo,
      cody,
      murphy,
    },
    company: {
      Jupiter,
      Venus,
      Mars,
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
