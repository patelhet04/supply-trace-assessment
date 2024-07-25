// PieChart.js
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const LocationPieChart = ({ locations }) => {
  const getRegion = (state) => {
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

    for (const [region, states] of Object.entries(regions)) {
      if (states.includes(state)) {
        return region;
      }
    }
    return "Other";
  };

  const regionCounts = locations.reduce((acc, location) => {
    const state = location.address.split(", ")[2].split(" ")[0];
    const region = getRegion(state);
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.entries(regionCounts).map(([region, count]) => ({
    id: region,
    value: count,
    label: region,
  }));

  return (
    <div className="chart-container">
      <h2>Locations by Region</h2>
      <PieChart
        series={[
          {
            data: pieData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30 },
          },
        ]}
        width={500}
        height={300}
        innerRadius={50}
        outerRadius={100}
      />
    </div>
  );
};

export default LocationPieChart;
