import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearchChange }) => {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for sets..."
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;