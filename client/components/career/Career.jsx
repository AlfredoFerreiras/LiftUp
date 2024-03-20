import React from "react";

const jobListings = [
  {
    title: "AI Research Scientist",
    description:
      "Seeking a passionate AI Research Scientist to lead the development of innovative AI solutions. Ideal candidates will have a strong background in machine learning and experience in applying AI technologies to solve real-world problems.",
    qualifications: [
      "Ph.D. in Computer Science or related field",
      "3+ years of experience in AI research",
      "Proficiency in Python and machine learning libraries",
    ],
  },
  {
    title: "Frontend Developer",
    description:
      "We're looking for a skilled Frontend Developer to create seamless user experiences. The role involves translating our company and customer needs into functional and appealing interactive applications.",
    qualifications: [
      "Bachelor's degree in Computer Science",
      "Experience with React and modern frontend frameworks",
      "Understanding of web markup, including HTML5 and CSS3",
    ],
  },
  {
    title: "Business Development Manager",
    description:
      "As a Business Development Manager, you'll drive our sales strategies, develop new business opportunities, and build strong relationships with clients. We value innovative thinking and a dynamic approach to business growth.",
    qualifications: [
      "Bachelor's degree in Business, Marketing, or a related field",
      "Proven sales track record",
      "Strong negotiation and communication skills",
    ],
  },
  {
    title: "Product Manager",
    description:
      "Join us as a Product Manager to oversee the development and marketing strategies of our AI tools. The ideal candidate will have experience in product lifecycle management and a keen eye for identifying market opportunities.",
    qualifications: [
      "Bachelor's degree in Business Administration, Marketing, or related field",
      "Experience in product management or related field",
      "Strong analytical and project management skills",
    ],
  },
];

const Careers = () => {
  const handleApply = () => {
    alert("To apply, please add me on LinkedIn: /in/alfredoferreiras");
  };

  return (
    <section className="bg-white px-8 py-24 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-6xl">Careers</h2>
          <p className="mt-4 text-lg">
            Explore career opportunities with us and help shape the future of AI
            in small business.
          </p>
        </div>
        {jobListings.map((job, index) => (
          <div key={index} className="space-y-4 border-b-2 pb-8">
            <h3 className="text-3xl font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <h4 className="text-xl font-semibold">Qualifications:</h4>
            <ul className="list-disc pl-8">
              {job.qualifications.map((qual, qIndex) => (
                <li key={qIndex}>{qual}</li>
              ))}
            </ul>
            <button
              onClick={handleApply}
              className="mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Apply
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Careers;
