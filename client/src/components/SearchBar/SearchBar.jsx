import React, { useEffect, useState } from "react";
import "./searchbar.css";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchQuery);
    }, 500); // Delay in milliseconds

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearch]);

  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search</label>
      <input
        type="text"
        id="search-input"
        placeholder="Type company name..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
