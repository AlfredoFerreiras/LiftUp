import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAIResults, addCompanyToIdeasThunk } from "../../store"; // Adjust the import paths as necessary

const CompanyImprovements = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const company = useSelector((state) =>
    state.company.find((c) => c.id === Number(id))
  );
  const [aiIdeas, setAiIdeas] = useState([]);

  useEffect(() => {
    if (company && company.companyName && company.description) {
      dispatch(
        fetchAIResults({
          companyName: company.companyName,
          description: company.description,
          budget: company.budget,
          goal: company.goal,
        })
      )
        .then((results) => {
          setAiIdeas(results); // Now directly setting the state with the fetched AI ideas
        })
        .catch((error) =>
          console.error("Failed to fetch or set AI results:", error)
        );
    }
  }, [dispatch, company]);

  const handleRegenerateIdeas = () => {
    if (company) {
      dispatch(
        fetchAIResults({
          companyName: company.companyName,
          description: company.description,
          budget: company.budget,
          goal: company.goal,
        })
      ).then(setAiIdeas); // Refresh AI ideas
    }
  };

  const handleSubmitIdeas = () => {
    if (company && aiIdeas.length > 0) {
      dispatch(addCompanyToIdeasThunk(company.id, aiIdeas)); // Update the company's ideas with AI-generated ones
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow">
      <div className="aiContainer max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          AI-Generated Ideas for Improvement
        </h2>
        <div className="space-y-4">
          {/* Display fetched AI ideas */}
          {aiIdeas.length > 0 ? (
            aiIdeas.map((idea, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">{idea.content}</p>
                <span className="text-sm text-gray-500">
                  Status: {idea.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-600">
              Loading or no AI-generated ideas yet...
            </p>
          )}
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleRegenerateIdeas}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">
            Regenerate Ideas
          </button>
          <button
            onClick={handleSubmitIdeas}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors">
            Submit AI Ideas to Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyImprovements;
