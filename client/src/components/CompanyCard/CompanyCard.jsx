import React from "react";
import PropTypes from "prop-types";
import "./companycard.css";

// Functional component to display company details
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

// PropTypes for type checking
CompanyCard.propTypes = {
  companyData: PropTypes.shape({
    company_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
};

export default CompanyCard;
