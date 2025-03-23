import { useState, useEffect } from "react";

export default function useStickyHeader(ref) {
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
        
      const searchPosition = ref.current.getBoundingClientRect().top;
      if (searchPosition <= 0 && !isHeaderSticky) {
        setIsHeaderSticky(true);
      } else if (searchPosition > 0 && isHeaderSticky) {
        setIsHeaderSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHeaderSticky, ref]);

  return isHeaderSticky;
}