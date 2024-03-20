import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserCompanies } from "../../store";

const CompanyList = () => {
  const dispatch = useDispatch();
  const userCompanies = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchUserCompanies());
  }, [dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-2">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Companies</h2>
      {userCompanies.length === 0 ? (
        <p className="text-gray-600">No 7companies found.</p>
      ) : (
        userCompanies.map((company) => (
          <div key={company.id} className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold text-gray-800">
              {company.companyName}
            </h3>
            <p>Description: {company.description}</p>
            <p>Budget: ${company.budget}</p>
            <p>Goal: {company.goal}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CompanyList;
