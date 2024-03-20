import React from "react";

const HeroSection = () => {
  return (
    <section className="overflow-hidden bg-white px-8 py-24 text-gray-900">
      <div className="mx-auto max-w-6xl grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-8">
        <div>
          <h1 className="text-5xl font-black leading-[1.25] md:text-7xl">
            Elevate Your Business with Us
          </h1>
          <p className="mt-4 mb-8 text-lg">
            Struggling to get your business off the ground or take it to the
            next level? We've got you covered. Leveraging cutting-edge AI, we
            provide tailored solutions to enhance your operations, develop
            stunning websites, and brainstorm innovative digital store ideas.
            Join us, and let's grow together. It's time to transform your vision
            into reality.
          </p>
          <a
            href="/about"
            className="inline-block bg-blue-600 text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Learn More
          </a>
        </div>
        <img
          alt="img"
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </section>
  );
};

export default HeroSection;
