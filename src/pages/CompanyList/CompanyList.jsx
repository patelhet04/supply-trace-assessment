import React from "react";
import CompanyCard from "../../components/CompanyCard/CompanyCard";
import "./companylist.css";
import SearchBar from "../../components/SearchBar/SearchBar";
const CompanyList = () => {
  const companies = [
    { id: 1, companyName: "ABC" },
    { id: 2, companyName: "ABC" },
    { id: 3, companyName: "ABC" },
    { id: 4, companyName: "ABC" },
    { id: 3, companyName: "ABC" },
    { id: 4, companyName: "ABC" },
  ];

  return (
    <>
      <h2>Browse Companies</h2>
      <SearchBar />
      <div className="company-container">
        {companies.map((company) => (
          <CompanyCard companyData={company} />
        ))}
      </div>
    </>
  );
};

export default CompanyList;
