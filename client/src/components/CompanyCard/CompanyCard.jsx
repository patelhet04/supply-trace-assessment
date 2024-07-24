import React from "react";
import "./companycard.css";

const CompanyCard = ({ companyData }) => {
  return (
    <div className="company-card">
      <div className="company-card-details">
        <h3>{companyData.companyName}</h3>
        <p>{companyData.address}</p>
      </div>
    </div>
  );
};

export default CompanyCard;
