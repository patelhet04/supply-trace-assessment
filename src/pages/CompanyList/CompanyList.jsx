import React from "react";
import CompanyCard from "../../components/CompanyCard";

const CompanyList = () => {
  const companies = [
    { id: 1, companyName: "ABC" },
    { id: 2, companyName: "ABC" },
    { id: 3, companyName: "ABC" },
    { id: 4, companyName: "ABC" },
  ];

  return (
    <>
      <h2>Browse Companies</h2>
      {companies.map((company) => (
        <CompanyCard companyData={company} />
      ))}
    </>
  );
};

export default CompanyList;
