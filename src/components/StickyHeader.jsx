import React from "react";
import SearchBar from "./SearchBar";

export default function StickyHeader({ 
  isVisible, 
  onTitleClick, 
  searchTerm, 
  onSearchChange, 
  isSearchDisabled 
}) {
  if (!isVisible) return null;

  return (
    <div className="sticky-header">
      <div className="sticky-header-content">
        <div className="sticky-title">
          <h2 className="clickable" onClick={onTitleClick}>
            The Big League Mascots
          </h2>
        </div>
        
        <div className="sticky-search">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            isDisabled={isSearchDisabled}
            isCompact={true}
          />
        </div>
        
        <div className="sticky-date">
          <p>Last updated: March 23, 2025</p>
        </div>
      </div>
    </div>
  );
}