import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleCompanyWithIdeas,
  updateCompanyIdeas,
  fetchUserCompanies,
} from "../../store"; // Adjust the import path based on your project structure

const CompanyIdeas = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const company = useSelector((state) =>
    state.company.find((c) => c.id === Number(id))
  );

  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleCompanyWithIdeas(id));
      dispatch(fetchUserCompanies());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (company && company.ideas) {
      setIdeas(company.ideas);
    }
  }, [company]);

  const handleStatusChange = async (ideaId, newStatus) => {
    try {
      const updatedIdeas = ideas.map((idea) =>
        idea.id === ideaId ? { ...idea, status: newStatus } : idea
      );
      setIdeas(updatedIdeas);

      // Update the server with the new status
      await dispatch(updateCompanyIdeas(id, updatedIdeas));
    } catch (error) {
      console.error("Error updating idea status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Ideas for {company?.companyName}
      </h2>
      {ideas.length > 0 ? (
        <ul>
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="border-b py-2 flex justify-between items-center">
              <span>{idea.content}</span>
              <select
                value={idea.status}
                onChange={(e) => handleStatusChange(idea.id, e.target.value)}
                className="rounded-md bg-blue-600 text-white px-3 py-1 cursor-pointer hover:bg-blue-700">
                <option value="backlog">Backlog</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ideas found for this company.</p>
      )}
    </div>
  );
};

export default CompanyIdeas;
