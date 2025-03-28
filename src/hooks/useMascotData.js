import { useState, useEffect } from "react";

export default function useMascotData() {
  const [mascotList, setMascotList] = useState([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    setIsInitialLoading(true);
    
    // Set a timeout to ensure loading state ends even if fetch fails
    const loadingTimeout = setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000); // 3 second timeout as a failsafe
    
    {/* This is for development mode
      *
    fetch("/mascots.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMascotList(data);
        // Minimum loading time of 150ms
        setTimeout(() => {
          clearTimeout(loadingTimeout); // Clear the failsafe timeout
          setIsInitialLoading(false);
        }, 150);
      })
      .catch((error) => {
        console.error("Error fetching mascots:", error);
        // Set empty array if fetch fails to prevent further issues
        setMascotList([]);
        setIsInitialLoading(false);
        clearTimeout(loadingTimeout); // Clear the failsafe timeout
      });
    */}

    // Production mode
    const basePath = import.meta.env.BASE_URL;
    console.log("Current base path:", basePath);
    console.log("Attempting to fetch from:", `${basePath}mascots.json`);
    
    fetch(`${basePath}mascots.json`)
      .then((response) => {
        console.log("Fetch response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data successfully loaded, first item:", data[0]);
        setMascotList(data);
        // Minimum loading time of 150ms
        setTimeout(() => {
          clearTimeout(loadingTimeout); // Clear the failsafe timeout
          setIsInitialLoading(false);
        }, 150);
      })
      .catch((error) => {
        console.error("Error fetching mascots (full error):", error);
        // Set empty array if fetch fails to prevent further issues
        setMascotList([]);
        setIsInitialLoading(false);
        clearTimeout(loadingTimeout); // Clear the failsafe timeout
      });
        
    // Cleanup function
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return { mascotList, isInitialLoading };
}