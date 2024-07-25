import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "./charts.css";
const LocationBarChart = ({ locations }) => {
  // Process the data to get employee count by state for each company
  const companyStateData = locations.reduce((acc, location) => {
    const state = location.address.split(", ")[2].split(" ")[0]; // Extract state from address
    const { company_id, employees } = location;

    if (!acc[state]) {
      acc[state] = {};
    }

    if (!acc[state][company_id]) {
      acc[state][company_id] = 0;
    }

    acc[state][company_id] += employees;
    return acc;
  }, {});

  // Get unique states and companies
  const states = [
    ...new Set(locations.map((l) => l.address.split(", ")[2].split(" ")[0])),
  ].sort();
  const companies = [...new Set(locations.map((l) => l.company_id))].sort(
    (a, b) => a - b
  );

  // Prepare series data
  const series = companies.map((companyId) => ({
    data: states.map((state) => companyStateData[state]?.[companyId] || 0),
  }));

  return (
    <div className="chart-container">
      <h2>Employee Distribution by State</h2>
      <BarChart
        width={700}
        height={300}
        series={series}
        xAxis={[{ data: states, scaleType: "band", label: "State" }]}
      />
    </div>
  );
};

export default LocationBarChart;
