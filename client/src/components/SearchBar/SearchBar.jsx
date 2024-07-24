import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search</label>
      <input
        type="text"
        id="search-input"
        placeholder="Type company name..."
        // value={value}
        // onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
