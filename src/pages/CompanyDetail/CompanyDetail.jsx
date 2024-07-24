import React from "react";
import "./companydetail.css";
import { Link } from "react-router-dom";
import CompanyMap from "../../components/CompanyMap/CompanyMap";
import BarChart from "../../components/BarChart/BarChart";
const CompanyDetail = () => {
  const position = [51.505, -0.09];
  const locationData = [
    { name: "Location 1", value: 10 },
    { name: "Location 2", value: 15 },
    { name: "Location 3", value: 8 },
    { name: "Location 4", value: 10 },
    { name: "Location 5", value: 15 },
    { name: "Location 6", value: 8 },
    { name: "Location 7", value: 10 },
    { name: "Location 8", value: 15 },
    { name: "Location 9", value: 8 },
  ];

  return (
    <>
      <Link
        // key={company.company_id}
        to={`/`}
        style={{ textDecoration: "none" }}
      >
        <button className="back-btn">Back to list</button>
      </Link>
      <header className="company-header">
        <strong>Tech Innovators Inc.</strong>
        <hr />
      </header>
      <div className="company-details">
        <div className="details-left">
          <div className="address">
            <h4>Address</h4>
            <p>123 Tech Lane, Innovation City, USA</p>
          </div>
          <div className="locations">
            <h4>Locations</h4>
            <span className="badge">Location 1</span>
            <span className="badge">Location 2</span>
            <span className="badge">Location 3</span>
            <span className="badge">Location 3</span>
            <span className="badge">Location 3</span>
            <span className="badge">Location 3</span>
          </div>
        </div>
        <div className="details-right">
          <div className="map">
            {/* Here you would integrate your map component, e.g., Leaflet or Google Maps */}
            <CompanyMap position={position} />
          </div>
        </div>
      </div>
      <div className="company-chart">
        <BarChart data={locationData} />
      </div>
    </>
  );
};

export default CompanyDetail;
