// PieChart.js
import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useMediaQuery, useTheme } from "@mui/material";
import ResponsiveChart from "./ResponsiveChart";

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
      <ResponsiveChart
        render={({ width, height }) => (
          <PieChart
            className="custom-legend"
            series={[
              {
                data: pieData,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: width * 0.06,
                  additionalRadius: -width * 0.06,
                },
              },
            ]}
            width={width}
            height={height}
            innerRadius={width * 0.1}
            outerRadius={width * 0.2}
            margin={{ top: 20, right: 150, bottom: 20, left: 20 }}
            slotProps={{
              legend: {
                direction: "column",
                position: { vertical: "middle", horizontal: "right" },
                padding: { left: 0, right: 0, top: 0, bottom: 0 },
                itemMarkWidth: 20,
                itemMarkHeight: 20,
                markGap: 5,
                itemGap: 10,
                labelStyle: {
                  fontSize: 14,
                  fill: "#000",
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
