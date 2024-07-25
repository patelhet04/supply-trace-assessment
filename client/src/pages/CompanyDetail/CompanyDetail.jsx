import React, { useEffect } from "react";
import "./companydetail.css";
import { Link, useParams } from "react-router-dom";
import CompanyMap from "../../components/CompanyMap/CompanyMap";
import { useCompanyContext } from "../../context/CompanyContext";
import LocationPieChart from "../../components/Charts/PieChart";
import LocationBarChart from "../../components/Charts/LocatoionBarChart";

const CompanyDetail = () => {
  const { id } = useParams();
  const { state, fetchCompany, fetchLocations } = useCompanyContext();
  const { company, locations, loading, error } = state;
  const renderedAddresses = new Set();
  useEffect(() => {
    fetchCompany(id);
    fetchLocations(id);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  return (
    <>
      <Link key={id} to={`/`} style={{ textDecoration: "none" }}>
        <button className="back-btn">Back to list</button>
      </Link>
      <header className="company-header">
        <strong>{company?.name}</strong>
        <hr />
      </header>
      <div className="company-details">
        <div className="details-left">
          <div className="info-card">
            <div className="address">
              <h3>Address</h3>
              <p>{company?.address}</p>
            </div>
            <div className="locations">
              <h3>Locations</h3>
              {locations.length > 0 &&
                locations.map((location) => {
                  // Extract the address part to check for uniqueness
                  const addressPart = location?.address.split(", ")[1];

                  // Check if the address part has already been rendered
                  if (addressPart && !renderedAddresses.has(addressPart)) {
                    // Add the address part to the Set
                    renderedAddresses.add(addressPart);

                    return (
                      <span key={location.location_id} className="badge">
                        {addressPart}
                      </span>
                    );
                  }

                  // Return null if the address part is a duplicate
                  return null;
                })}
            </div>
          </div>
        </div>

        <div className="details-right">
          <div className="map">
            <CompanyMap locations={locations} loading={loading} />
          </div>
        </div>
      </div>
      <div className="company-chart">
        <LocationPieChart locations={locations} />
        <LocationBarChart locations={locations} />
      </div>
    </>
  );
};

export default CompanyDetail;
