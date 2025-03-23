import { useState, useRef, useCallback, useMemo, useEffect } from "react";

export default function useSearchMascots(mascotList) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Add a safety timeout effect
  useEffect(() => {
    if (isSearching) {
      const safetyTimeout = setTimeout(() => {
        setIsSearching(false);
      }, 2000);
      
      return () => clearTimeout(safetyTimeout);
    }
  }, [isSearching]);

  const filteredMascots = useMemo(() => {
    if (!searchTerm) return mascotList;
    
    const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, "");
    
    const isSearchingForNoMascot = 
      normalizedSearchTerm === "no" || 
      normalizedSearchTerm === "non" ||
      normalizedSearchTerm === "none";
    
    return mascotList.filter(({ team, league, mascot }) => {
      const hasNoMascot = !mascot || (Array.isArray(mascot) && mascot.length === 0);
      
      if (isSearchingForNoMascot && hasNoMascot) {
        return true;
      }
      
      const matchesSearchTerm = (str) => 
        str?.toLowerCase().includes(normalizedSearchTerm);
        
      const mascotNames = Array.isArray(mascot) ? mascot : [mascot];
      
      return (
        matchesSearchTerm(team) ||
        matchesSearchTerm(league) ||
        mascotNames.some(matchesSearchTerm)
      );
    });
  }, [searchTerm, mascotList]);

  // Handle search term changes with debounce
  const handleSearchChange = useCallback((e) => {
    const newSearchTerm = e.target.value;
    
    if (newSearchTerm !== searchTerm) {
      setIsSearching(true);
        
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
        
      searchTimeoutRef.current = setTimeout(() => {
        setIsSearching(false);
      }, 300);
    }
    
    setSearchTerm(newSearchTerm);
  }, [searchTerm]);

  // Clean up timeout on component unmount
  const cleanup = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setIsSearching(false);
  }, []);

  return { 
    filteredMascots, 
    searchTerm, 
    isSearching, 
    handleSearchChange, 
    cleanup 
  };
}