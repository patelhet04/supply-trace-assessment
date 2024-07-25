import React, { useRef, useState, useEffect } from "react";

const ResponsiveChart = ({ render }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || !entries.length) return;

      const { width } = entries[0].contentRect;
      setDimensions({
        width: width,
        height: width * 0.6, // Adjust this ratio as needed
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "auto" }}>
      {render(dimensions)}
    </div>
  );
};

export default ResponsiveChart;
