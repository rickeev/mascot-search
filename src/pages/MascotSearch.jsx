import "../App.css";
import { useRef, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import SearchSection from "../components/SearchSection";
import MascotSearchResults from "../components/MascotSearchResults";
import useMascotData from "../hooks/useMascotData";
import useScrollToTop from "../hooks/useScrollToTop";
import useStickyHeader from "../hooks/useStickyHeader";
import useSearchMascots from "../hooks/useSearchMascots";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

function MascotSearch() {
    const searchContainerRef = useRef(null);
    
    const { mascotList, isInitialLoading } = useMascotData();
    const scrollToTop = useScrollToTop();
    const isHeaderSticky = useStickyHeader(searchContainerRef);
    const { 
        filteredMascots, 
        searchTerm, 
        isSearching, 
        handleSearchChange, 
        cleanup: cleanupSearch 
    } = useSearchMascots(mascotList);
    const { 
        displayedItems: displayedMascots, 
        isLoadingMore, 
        lastItemRef, 
        hasMore 
    } = useInfiniteScroll(filteredMascots);
    
    // Clean up resources on component unmount
    useEffect(() => {
        return () => {
            cleanupSearch();
        };
    }, [cleanupSearch]);
    
    return (
        <PageLayout 
            headerSticky={isHeaderSticky} 
            scrollToTop={scrollToTop}
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            isSearchDisabled={isInitialLoading}
        >
            <SearchSection 
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                isDisabled={isInitialLoading}
                containerRef={searchContainerRef}
            />
            
            <div className="mascot-list-container">
                <MascotSearchResults 
                    isInitialLoading={isInitialLoading}
                    isSearching={isSearching}
                    displayedMascots={displayedMascots}
                    lastItemRef={lastItemRef}
                    isLoadingMore={isLoadingMore}
                    hasMore={hasMore}
                />
            </div>
        </PageLayout>
    );
}

export default MascotSearch;