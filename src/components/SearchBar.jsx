import React from "react";

export default function SearchBar({ searchTerm, onSearchChange, isDisabled, containerRef, isCompact }) {
  return (
    <div className={`search-container${isCompact ? " compact" : ""}`} ref={containerRef}>
      <svg 
        className="search-icon" 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      
      <div className="search-separator"></div>
      
      <input
        type="text"
        placeholder={isCompact ? "Search..." : "Search by league, team, or mascot"}
        value={searchTerm}
        onChange={onSearchChange}
        className="search-bar"
        disabled={isDisabled}
      />
    </div>
  );
}