import { useState, useRef, useCallback, useMemo, useEffect } from "react";

export default function useInfiniteScroll(itemsList, initialCount = 6, loadMoreDelay = 500) {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  // Memoized displayed items
  const displayedItems = useMemo(() => {
    return itemsList.slice(0, displayCount);
  }, [itemsList, displayCount]);

  // Reset display count when itemsList changes (usually due to search filter change)
  useEffect(() => {
    setDisplayCount(initialCount);
  }, [itemsList, initialCount]);

  const loadMoreItems = useCallback(() => {
    if (displayCount >= itemsList.length) return;
    
    setIsLoadingMore(true);
    
    setTimeout(() => {
      setDisplayCount(prevCount => 
        Math.min(prevCount + initialCount, itemsList.length)
      );
      setIsLoadingMore(false);
    }, loadMoreDelay);
  }, [displayCount, itemsList.length, loadMoreDelay, initialCount]);

  // Intersection observer callback for infinite scrolling
  const lastItemRef = useCallback(node => {
    if (isLoadingMore || displayCount >= itemsList.length) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayCount < itemsList.length) {
        loadMoreItems();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoadingMore, displayCount, itemsList.length, loadMoreItems]);

  // Clean up observer on component unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    displayedItems,
    isLoadingMore,
    lastItemRef,
    hasMore: displayCount < itemsList.length
  };
}