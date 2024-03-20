import React from "react";

import SlidePricing from "../price-cards/PriceCards.jsx";

const features = [
  {
    title: "AI-Driven Insights",
    description:
      "Unlock the potential of your data with AI-driven insights, enabling smarter business decisions and a deeper understanding of your customer's needs.",
    icon: "🔍", // Placeholder icon, you might want to replace this with an actual image or icon component.
  },
  {
    title: "Automated Customer Support",
    description:
      "Enhance your customer service with AI-powered chatbots, ensuring 24/7 support and instant responses to your customer queries.",
    icon: "💬",
  },
  {
    title: "Personalized Marketing",
    description:
      "Leverage AI to personalize your marketing campaigns, targeting users with precision and increasing conversion rates.",
    icon: "🎯",
  },
  {
    title: "Efficient Operations",
    description:
      "Streamline operations with AI optimizations, reducing costs and improving efficiency across your business processes.",
    icon: "⚙️",
  },
];

const Feature = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">App Features</h2>
          <p className="text-lg mt-4">
            Discover how our app empowers small businesses through AI.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-100 p-6 rounded-lg shadow">
              <div className="text-3xl">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <SlidePricing />
        </div>
      </div>
    </section>
  );
};

export default Feature;
