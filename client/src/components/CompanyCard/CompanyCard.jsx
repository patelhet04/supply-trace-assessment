import React from "react";
import "./companycard.css";

const CompanyCard = ({ companyData }) => {
  return (
    <div className="company-card">
      <div className="company-card-details">
        <header>{companyData.name}</header>
        <p>{companyData.address}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
