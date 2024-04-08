const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// ...
// Function to sanitize text by removing or replacing asterisks
function sanitizeText(text) {
  // Remove both asterisks and dashes
  return text.replace(/[\*\-\#]/g, "");
}
// Endpoint for generating company improvement ideas
router.post("/improve-company", async (req, res) => {
  try {
    const { companyName, description, budget, goal } = req.body.companyData;

    const prompt = `For the company "${companyName}" described as "${description}", with a budget of ${budget} and aiming to achieve "${goal}", generate comprehensive and innovative ideas that will benefit the company. Structure the response with clear headings for each category (e.g., "Operations Enhancement", "Customer Experience Improvement", and "Budget Allocation") followed immediately by the ideas related to that category. Each idea should include an actionable suggestion, its expected impact on the company, and its associated budget allocation. Ensure the ideas under each category are listed in a bullet-point format directly after the category's introduction, creating a seamless flow from category title to the ideas themselves. The budget allocation for each idea should be mentioned directly alongside the idea for clarity and easy reference.`;

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const text = await response.text();
    console.log(text);

    // Sanitize the generated text before returning
    const sanitizedText = sanitizeText(text);
    res.json({
      results: sanitizedText
        .split("\n")
        .filter((line) => line.trim() !== "")
        .slice(0, 4),
    });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
