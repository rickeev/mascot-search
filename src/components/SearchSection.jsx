import React from "react";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";

function SearchSection({ 
  searchTerm, 
  handleSearchChange, 
  isDisabled, 
  containerRef 
}) {
  return (
    <>
      <PageHeader />
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isDisabled={isDisabled}
        containerRef={containerRef}
      />
    </>
  );
}

export default SearchSection;