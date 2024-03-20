const express = require("express");
const { OpenAI } = require("openai");
const NodeCache = require("node-cache");
const router = express.Router();
const {
  models: { Company },
} = require("../db");

// Initialize OpenAI with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

const myCache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

// Endpoint for generating company improvement ideas
router.post("/improve-company", async (req, res) => {
  try {
    // Extract companyName and description from the request body
    const { companyName, description, budget, goal } = req.body.companyData;

    // Use companyName as part of the cache key
    const cacheKey = `ai_results_${companyName}`;
    const cachedData = myCache.get(cacheKey);
    if (cachedData) {
      return res.json({ results: cachedData });
    }

    // Prepare the prompt
    const promptContent = `Given a company name and its description, generate innovative ideas on how to enhance its operations, offerings, or customer experience. Be creative, practical, and provide at least one actionable suggestion, also one of the bullets points should only be 1 sentence and 2 bullet point, and only 2 ideas should about how to the spend the buged.\nCompany Name: ${companyName}\nDescription: ${description}\nBudget: ${budget}\ngoal: ${goal} `;

    // Generate the completion using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: promptContent },
      ],
    });

    // Cache and return the results
    const results = completion.choices[0].message.content
      .split("\n")
      .filter((line) => line.trim() !== "");

    myCache.set(cacheKey, results);
    res.json({ results });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
