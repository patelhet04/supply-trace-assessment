import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// URL for the map tile layer
const TILE_LAYER_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Memoized CompanyMap component to prevent unnecessary re-renders
const CompanyMap = React.memo(({ locations, loading }) => {
  // Show loading state
  if (loading) {
    return <div>Loading map...</div>;
  }

  // Handle case when no locations are available
  if (!locations || locations.length === 0) {
    return <div>No locations available</div>;
  }

  // Set the center of the map to the first location
  const center = [locations[0].latitude, locations[0].longitude];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      {/* Add the tile layer to the map */}
      <TileLayer
        url={TILE_LAYER_URL}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add markers for each location */}
      {locations.map((location) => (
        <Marker
          key={location.location_id}
          position={[location.latitude, location.longitude]}
        >
          <Popup>{location.address}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
});

// PropTypes for type checking
CompanyMap.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      location_id: PropTypes.number.isRequired,
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

// Display name for the component (useful for debugging)
CompanyMap.displayName = "CompanyMap";

export default CompanyMap;
