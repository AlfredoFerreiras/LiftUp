import React from "react";

const TeamMemberCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-4">
        <img
          className="w-32 h-32 mx-auto rounded-full"
          src="https://ca.slack-edge.com/E05LYDFST6K-U04SM5GVDK2-fbe8ec81b13d-512" // Ensure this is the correct path to your image
          alt="Alfredo Ferreira"
        />
      </div>
      <div className="text-gray-900">
        <h3 className="text-xl font-bold">Alfredo Ferreira</h3>
        <p className="text-sm">CEO & Software Engineer</p>
        <p className="mt-4">
          At the helm of Lift You Up, Alfredo Ferreira stands as a beacon of
          innovation and technical prowess. With a rich background in full-stack
          development and a graduate of Fullstack Academy, Alfredo has channeled
          his passion into creating user-centric software solutions. Under his
          leadership, Lift You Up has carved a niche in the tech world, pushing
          the boundaries of healthcare, e-commerce, and educational
          technologies. He's not just the CEO; he's the company's technical
          heart, constantly seeking out new horizons and opportunities for
          growth. Join us, and let Alfredo lead your business to the digital
          zenith
        </p>
      </div>
    </div>
  );
};

export default TeamMemberCard;
