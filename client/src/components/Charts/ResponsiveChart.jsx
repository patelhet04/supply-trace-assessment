import React, { useRef, useState, useEffect } from "react";

// The ResponsiveChart component is designed to adjust its dimensions
// based on the size of its container and render a chart or other
// content accordingly.
const ResponsiveChart = ({ render }) => {
  // Ref to store a reference to the container div
  const containerRef = useRef(null);

  // State to store the current dimensions of the container
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    // Create a ResizeObserver to monitor changes in the container's size
    const resizeObserver = new ResizeObserver((entries) => {
      // If there are no entries or entries are undefined, return early
      if (!entries || !entries.length) return;

      // Get the new width from the ResizeObserver entries
      const { width } = entries[0].contentRect;

      // Update the dimensions state with the new width and computed height
      setDimensions({
        width: width,
        height: width * 0.6, // Assuming a 3:5 aspect ratio
      });
    });

    // Start observing the container element if it exists
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup function to unobserve the container element when the component unmounts
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div ref={containerRef} style={{ width: "100%", height: "auto" }}>
      {/* Render the chart or content based on the current dimensions */}
      {render(dimensions)}
    </div>
  );
};

export default ResponsiveChart;
