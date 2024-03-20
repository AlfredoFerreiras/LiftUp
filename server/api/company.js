const express = require("express");
const router = express.Router();
const {
  models: { Company, User, Idea },
} = require("../db");

module.exports = router;

// Middleware to authenticate and set user on request

// GET all companies for the authenticated user
router.get("/", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const companies = await Company.findAll({
      where: { userId: user.id },
      include: [Idea],
    });
    res.json(companies);
  } catch (err) {
    next(err);
  }
});

// GET a single company by ID, including its ideas
router.get("/:id", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const company = await Company.findByPk(req.params.id, {
      include: [Idea],
      where: { userId: user.id },
    });

    if (!company) return res.status(404).send("Company not found");
    res.json(company);
  } catch (error) {
    next(error);
  }
});

router.get("/:id/ideas", async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const company = await Company.findByPk(req.params.id, {
      include: [Idea],
      where: { userId: user.id },
    });

    if (!company) return res.status(404).send("Company not found");
    res.json(company);
  } catch (error) {
    next(error);
  }
});

// POST a new company
router.post("/", async (req, res, next) => {
  try {
    const { companyName, description, budget, goal } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const newCompany = await Company.create({
      companyName: companyName,
      description: description,
      budget: budget,
      goal: goal,
      userId: user.id,
    });
    res.status(201).json(newCompany);
  } catch (err) {
    next(err);
  }
});

// PUT to update a company's details
router.put("/:id", async (req, res, next) => {
  try {
    const { companyName, description, budget, goal } = req.body;
    const company = await Company.findByPk(req.params.id);

    if (!company || company.userId !== req.user.id)
      return res.status(404).send("Company not found or unauthorized");

    await company.update({ companyName, description, budget, goal });
    res.json(company);
  } catch (err) {
    next(err);
  }
});

// DELETE a company
router.delete("/:id", async (req, res, next) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company || company.userId !== req.user.id)
      return res.status(404).send("Company not found or unauthorized");

    await company.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Ideas-related routes

// GET ideas for a specific company
// router.get("/:id/ideas", async (req, res, next) => {
//   try {
//     const company = await Company.findByPk(req.params.id);
//     if (!company || company.userId !== req.user.id)
//       return res.status(404).send("Company not found or unauthorized");

//     const ideas = await Idea.findAll({
//       where: { companyId: req.params.id },
//     });
//     res.json(ideas);
//   } catch (err) {
//     next(err);
//   }
// });

// POST a new idea to a company
router.post("/:id/ideas", async (req, res, next) => {
  try {
    const { ideas } = req.body;
    const companyId = req.params.id;
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findByToken(token);
    const company = await Company.findByPk(companyId);

    if (!company || company.userId !== user.id) {
      return res.status(404).send("Company not found or unauthorized");
    }

    const createdIdeas = await Promise.all(
      ideas.map(async (idea) => {
        // Assuming the idea object doesn't have an ID, as it's new
        return Idea.create({
          ...idea,
          companyId: companyId,
        });
      })
    );

    res.json(createdIdeas);
  } catch (err) {
    console.error("Error creating ideas:", err);
    next(err);
  }
});

// PUT to update ideas for a company
// PUT to update ideas for a company
router.put("/:id/ideas", async (req, res, next) => {
  try {
    const { id } = req.params;
    const idea = await Idea.findByPk(id);

    if (!idea) {
      return res.status(404).send("Idea not found");
    }

    const updatedIdea = await idea.update(req.body);

    res.json(updatedIdea);
  } catch (error) {
    next(error);
  }
});
