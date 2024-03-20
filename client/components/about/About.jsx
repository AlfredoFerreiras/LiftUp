import React from "react";
import TeamMemberCard from "./Team-Member/TeamMemberCard.jsx";
const AboutUs = () => {
  return (
    <section className="bg-white px-8 py-24 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-6xl">About Us</h2>
          <p className="mt-4 text-lg">
            Dive deeper into who we are and why we do what we do.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
          <img
            alt="we need this information"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            className="rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-3xl font-semibold">Our Mission</h3>
            <p className="mt-4">
              Our mission is to empower businesses through technology,
              innovation, and creativity. We aim to revolutionize how businesses
              operate, enhance efficiency, and foster growth in a digital age.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
          <div>
            <h3 className="text-3xl font-semibold">Why Choose Us?</h3>
            <p className="mt-4">
              We're not just about technology. We're about bringing
              human-centric solutions to complex problems. Our approach combines
              cutting-edge AI with bespoke strategies, ensuring your business
              stands out and thrives.
            </p>
          </div>
          <img
            alt="more info needed sorry :("
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-semibold">Meet the Team</h3>
          <p className="mt-4 mb-8 text-lg">
            Our team is a blend of industry experts, visionaries, and creative
            minds, all dedicated to making a difference in your business
            journey.
          </p>

          <TeamMemberCard />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
