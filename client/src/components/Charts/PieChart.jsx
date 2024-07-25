// PieChart.js
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import ResponsiveChart from "./ResponsiveChart";

const LocationPieChart = ({ locations }) => {
  // Function to determine the region based on the state abbreviation
  const getRegion = (state) => {
    // Mapping of states to regions
    const regions = {
      "West Coast": ["CA", "OR", "WA"],
      Mountain: ["MT", "ID", "WY", "NV", "UT", "CO", "AZ", "NM"],
      Southwest: ["TX", "OK", "AZ", "NM"],
      Midwest: [
        "ND",
        "SD",
        "NE",
        "KS",
        "MN",
        "IA",
        "MO",
        "WI",
        "IL",
        "IN",
        "MI",
        "OH",
      ],
      Southeast: [
        "AR",
        "LA",
        "MS",
        "AL",
        "GA",
        "FL",
        "SC",
        "NC",
        "VA",
        "WV",
        "KY",
        "TN",
      ],
      Northeast: [
        "ME",
        "NH",
        "VT",
        "MA",
        "RI",
        "CT",
        "NY",
        "PA",
        "NJ",
        "DE",
        "MD",
        "DC",
      ],
      Alaska: ["AK"],
      Hawaii: ["HI"],
    };

    // Find and return the region for the given state
    for (const [region, states] of Object.entries(regions)) {
      if (states.includes(state)) {
        return region;
      }
    }
    return "Other"; // Default region if state does not match any known region
  };

  // Calculate the count of locations per region
  const regionCounts = locations.reduce((acc, location) => {
    // Extract state abbreviation from location address
    const state = location.address.split(", ")[2].split(" ")[0];
    const region = getRegion(state);
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  // Transform the region counts into the format required by the PieChart component
  const pieData = Object.entries(regionCounts).map(([region, count]) => ({
    id: region,
    value: count,
    label: region,
  }));

  return (
    <div className="chart-container">
      <h2>Locations by Region</h2>
      {/* Render the pie chart inside the ResponsiveChart component */}
      <ResponsiveChart
        render={({ width, height }) => (
          <PieChart
            className="custom-legend"
            series={[
              {
                data: pieData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: width * 0.06, // Inner radius of faded segments
                  additionalRadius: -width * 0.06, // Additional radius for faded segments
                },
              },
            ]}
            width={width} // Width of the PieChart
            height={height} // Height of the PieChart
            innerRadius={width * 0.1} // Inner radius of the pie chart
            outerRadius={width * 0.2} // Outer radius of the pie chart
            margin={{ top: 20, right: 150, bottom: 20, left: 20 }} // Margins around the chart
            slotProps={{
              legend: {
                direction: "column", // Direction of legend items
                position: { vertical: "middle", horizontal: "right" }, // Position of legend
                padding: { left: 0, right: 0, top: 0, bottom: 0 }, // Padding for legend
                itemMarkWidth: 20, // Width of the legend item mark
                itemMarkHeight: 20, // Height of the legend item mark
                markGap: 5, // Gap between the mark and the label
                itemGap: 10, // Gap between legend items
                labelStyle: {
                  fontSize: 14, // Font size for legend labels
                  fill: "#000", // Color of the legend labels
                },
              },
            }}
          />
        )}
      />
    </div>
  );
};

export default LocationPieChart;
