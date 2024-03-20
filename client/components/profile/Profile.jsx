import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUserCompanies } from "../../store"; // Adjust the path as necessary

import AddCompanyForm from "../company/AddCompany.jsx";

const Profile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth); // Assuming the user's information is in auth state
  const userCompanies = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchUserCompanies()); // This action should fetch the user's companies
  }, [dispatch]);

  return (
    <section className="bg-gray-100 px-8 py-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {user.username}
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            You have {userCompanies?.length} companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userCompanies.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No companies found. Add a new company to get started.
            </p>
          ) : (
            userCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {company.companyName}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Description: {company.description}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Budget: ${company.budget}
                  </p>
                  <p className="text-gray-600 mt-2">Goal: {company.goal}</p>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <Link
                    to={`/companies/${company.id}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150 ease-in-out">
                    Start the process
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        <AddCompanyForm />
      </div>
    </section>
  );
};

export default Profile;
