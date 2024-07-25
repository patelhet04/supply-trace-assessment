import React, { useEffect, useState } from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./companylist.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useCompanyContext } from "../../context/CompanyContext";

const CompanyList = () => {
  // Destructure state and fetchCompanies from CompanyContext
  const { state, fetchCompanies } = useCompanyContext();
  const { companies, loading, error } = state;
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  // Fetch companies data on initial render
  useEffect(() => {
    if (!initialFetchDone) {
      fetchCompanies(); // Trigger API call to fetch companies
      setInitialFetchDone(true); // Mark initial fetch as done
    }
  }, [fetchCompanies, initialFetchDone]); // Dependency array includes fetchCompanies and initialFetchDone

  // Display loading message until the initial fetch is completed
  if (!initialFetchDone) return <div>Loading...</div>;

  // Display error message if there's an error loading the data
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <>
      <h1>Browse Companies</h1>
      {/* Search bar for filtering companies */}
      <SearchBar onSearch={fetchCompanies} />
      <div className="company-container">
        {/* Map over the list of companies and render a CompanyCard for each */}
        {companies.map((company) => (
          <Link
            key={company.company_id} // Unique key for each company card
            to={`/company/${company.company_id}`} // Navigate to company details page
            className="company-link" // Custom class for styling the link
            style={{ textDecoration: "none" }} // Remove default link styling
          >
            <CompanyCard companyData={company} />{" "}
            {/* Render the CompanyCard component */}
          </Link>
        ))}
      </div>
    </>
  );
};

export default CompanyList;
