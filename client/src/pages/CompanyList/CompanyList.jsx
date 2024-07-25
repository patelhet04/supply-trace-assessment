import React, { useEffect, useState } from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./companylist.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useCompanyContext } from "../../context/CompanyContext";

const CompanyList = () => {
  const { state, fetchCompanies } = useCompanyContext();
  const { companies, loading, error } = state;
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  useEffect(() => {
    if (!initialFetchDone) {
      fetchCompanies();
      setInitialFetchDone(true);
    }
  }, [fetchCompanies, initialFetchDone]);

  if (!initialFetchDone) return <div>Loading...</div>;

  if (error) return <div>Error loading data: {error}</div>;

  return (
    <>
      <h1>Browse Companies</h1>
      <SearchBar onSearch={fetchCompanies} />
      <div className="company-container">
        {companies.map((company) => (
          <Link
            key={company.company_id}
            to={`/company/${company.company_id}`}
            className="company-link"
            style={{ textDecoration: "none" }}
          >
            <CompanyCard companyData={company} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default CompanyList;
