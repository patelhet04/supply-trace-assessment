import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import CompanyMap from "../../components/CompanyMap/CompanyMap";
import { useCompanyContext } from "../../context/CompanyContext";
import LocationPieChart from "../../components/Charts/PieChart";
import LocationBarChart from "../../components/Charts/LocatoionBarChart";
import "./companydetail.css";

const CompanyDetail = () => {
  // Extract company ID from URL parameters
  const { id } = useParams();

  // Access company context for state and actions
  const { state, fetchCompany, fetchLocations } = useCompanyContext();
  const { company, locations, loading, error } = state;

  // Fetch company details and locations when component mounts or ID changes
  useEffect(() => {
    fetchCompany(id);
    fetchLocations(id);
  }, [id, fetchCompany, fetchLocations]);

  // Memoize unique locations to prevent unnecessary re-renders
  const uniqueLocations = useMemo(() => {
    const renderedAddresses = new Set();
    return locations.filter((location) => {
      const addressPart = location?.address.split(", ")[1];
      if (addressPart && !renderedAddresses.has(addressPart)) {
        renderedAddresses.add(addressPart);
        return true;
      }
      return false;
    });
  }, [locations]);

  // Show loading state
  if (loading) return <div>Loading...</div>;

  // Show error state
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <article>
      {/* Navigation back to company list */}
      <Link to="/" className="back-btn">
        Back to list
      </Link>

      {/* Company name header */}
      <header className="company-header">
        {company?.name} <hr />
      </header>

      <section className="company-details">
        <div className="details-left">
          <div className="info-card">
            {/* Company address */}
            <div className="address">
              <h3>Address</h3>
              <p>{company?.address}</p>
            </div>

            {/* Unique company locations */}
            <div className="locations">
              <h3>Locations</h3>
              {uniqueLocations.length > 0 ? (
                uniqueLocations.map((location) => (
                  <span key={location.location_id} className="badge">
                    {location.address.split(", ")[1]}
                  </span>
                ))
              ) : (
                <p>No locations available</p>
              )}
            </div>
          </div>
        </div>

        {/* Company locations map */}
        <div className="details-right">
          <CompanyMap locations={locations} loading={loading} />
        </div>
      </section>

      {/* Charts for location data visualization */}
      <section className="company-chart">
        <LocationPieChart locations={locations} />
        <LocationBarChart locations={locations} />
      </section>
    </article>
  );
};

// PropTypes for type checking
CompanyDetail.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CompanyDetail;
