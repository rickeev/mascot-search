import React from "react";
import StickyHeader from "./StickyHeader";
import PageFooter from "./PageFooter";

function PageLayout({ 
  children, 
  headerSticky, 
  scrollToTop, 
  searchTerm, 
  handleSearchChange, 
  isSearchDisabled 
}) {
  return (
    <div className="page-wrapper">
      <StickyHeader 
        isVisible={headerSticky} 
        onTitleClick={scrollToTop} 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        isSearchDisabled={isSearchDisabled}
      />
      <div className="container">
        {children}
      </div>
      <PageFooter />
    </div>
  );
}

export default PageLayout;