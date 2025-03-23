import React from "react";
import MascotList from "./MascotList";
import LoadingSpinner from "./LoadingSpinner";

function MascotSearchResults({ 
  isInitialLoading, 
  isSearching, 
  displayedMascots, 
  lastItemRef, 
  isLoadingMore, 
  hasMore 
}) {
  if (isInitialLoading) {
    return <LoadingSpinner text="Loading..." />;
  }
  
  const searchingTooLong = isSearching && displayedMascots.length === 0;
  
  if (searchingTooLong) {
    return <LoadingSpinner text="Searching..." />;
  }
  
  if (displayedMascots.length === 0) {
    return <div className="no-results">No matching league, teams, or mascots found</div>;
  }
  
  return (
    <>
      <MascotList mascots={displayedMascots} lastItemRef={lastItemRef} />
      {isLoadingMore && hasMore && (
        <LoadingSpinner text="Loading more mascots..." isSmall={true} />
      )}
    </>
  );
}

export default MascotSearchResults;