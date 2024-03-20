const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ...

// Endpoint for generating company improvement ideas
router.post("/improve-company", async (req, res) => {
  try {
    const { companyName, description, budget, goal } = req.body.companyData;

    // Prepare the prompt for generating content
    const prompt = `Limit everything to only 2 bullet points with 2 ideas, Given a company name and its description, generate innovative ideas on how to enhance its operations, offerings, or customer experience. Be creative, practical, and provide at least one actionable suggestion. Include ideas on how to utilize the budget effectively.\n\nCompany Name: ${companyName}\nDescription: ${description}\nBudget: ${budget}\nGoal: ${goal}`;

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    1;
    const text = await response.text();

    // Return the generated ideas as a response
    res.json({
      results: text.split("\n").filter((line) => line.trim() !== ""),
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
