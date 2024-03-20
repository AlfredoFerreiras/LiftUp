import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCompanyThunk } from "../../store";

const AddCompanyForm = () => {
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");

  const handleAddCompany = async (e) => {
    e.preventDefault();

    if (!companyName.trim() || !description.trim()) {
      setError("Please enter both company name and description.");
      return;
    }

    try {
      await dispatch(
        createCompanyThunk({ companyName, description, budget, goal })
      );
      setCompanyName("");
      setDescription("");
      setBudget("");
      setGoal("");
      setError("");
    } catch (error) {
      setError("Failed to add company. Please try again later.");
      console.error("Failed to add company:", error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Company</h2>
      <form onSubmit={handleAddCompany} className="space-y-4">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700">
            Company Name:
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-gray-700">
            Budget:
          </label>
          <textarea
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        <div>
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-gray-700">
            Goal:
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows="4"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
          Add Company
        </button>
      </form>
    </div>
  );
};

export default AddCompanyForm;
