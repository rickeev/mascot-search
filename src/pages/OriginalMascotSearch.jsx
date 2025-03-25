import "../App.css";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

function MascotSearch() {
    const [mascotList, setMascotList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayCount, setDisplayCount] = useState(6);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);
    
    const observer = useRef();
    const searchTimeoutRef = useRef(null);
    const searchContainerRef = useRef(null);
    
    useEffect(() => {
        setIsInitialLoading(true);
        
        {/*
        const fetchPromise = fetch("/mascots.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMascotList(data);
            })
            .catch((error) => {
                console.error("Error fetching mascots:", error);
            });
        */}

        // Use the BASE_URL environment variable that Vite provides
        const basePath = import.meta.env.BASE_URL; // This will be '/mascot-search/' in production and '/' in development
        const fetchPromise = fetch(`${basePath}mascots.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMascotList(data);
            })
            .catch((error) => {
                console.error("Error fetching mascots:", error);
            });
            
        const minLoadingTimePromise = new Promise(resolve => {
            setTimeout(resolve, 150);
        });
        
        Promise.all([fetchPromise, minLoadingTimePromise])
            .then(() => {
                setIsInitialLoading(false);
            });
    }, []);
    
    // Handle scroll event for sticky header
    useEffect(() => {
        const handleScroll = () => {
            if (!searchContainerRef.current) return;
            
            const searchPosition = searchContainerRef.current.getBoundingClientRect().top;
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
    }, [isHeaderSticky]);
    
    const scrollToTop = useCallback(() => {
        // Get the current scroll position
        const startPosition = window.scrollY;
        // Set the duration shorter for faster scrolling (in milliseconds)
        const duration = 200;
        const startTime = performance.now();
        
        function scrollStep(timestamp) {
            const elapsed = timestamp - startTime;
            // Calculate how far to scroll with easeInOutQuad easing
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = progress < 0.5 
                ? 2 * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            
            // Apply the scroll
            window.scrollTo(0, startPosition * (1 - easeProgress));
            
            // Continue the animation if not complete
            if (progress < 1) {
                window.requestAnimationFrame(scrollStep);
            }
        }
        // Start the scroll animation
        window.requestAnimationFrame(scrollStep);
    }, []);
    
    const filteredMascots = useMemo(() => {
        if (!searchTerm) return mascotList;
        
        const normalizedSearchTerm = searchTerm.toLowerCase();
        
        return mascotList.filter(({ team, league, mascot }) => {
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
    
    const displayedMascots = useMemo(() => {
        return filteredMascots.slice(0, displayCount);
    }, [filteredMascots, displayCount]);
    
    // Handle search term changes with debounce
    const handleSearchChange = useCallback((e) => {
        const newSearchTerm = e.target.value;
        
        if (newSearchTerm !== searchTerm) {
            setIsSearching(true);
            
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
            
            // Set a new timeout
            searchTimeoutRef.current = setTimeout(() => {
                setDisplayCount(6);
                setIsSearching(false);
            }, 300);
        }
        
        setSearchTerm(newSearchTerm);
    }, [searchTerm]);
    
    const loadMoreMascots = useCallback(() => {
        if (displayCount >= filteredMascots.length) return;
        
        setIsLoadingMore(true);
        
        setTimeout(() => {
            setDisplayCount(prevCount => 
                Math.min(prevCount + 6, filteredMascots.length)
            );
            setIsLoadingMore(false);
        }, 500);
    }, [displayCount, filteredMascots.length]);
    
    // Intersection observer callback for infinite scrolling
    const lastMascotRef = useCallback(node => {
        if (isLoadingMore || displayCount >= filteredMascots.length) return;
        
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && displayCount < filteredMascots.length) {
                loadMoreMascots();
            }
        });
        
        if (node) observer.current.observe(node);
    }, [isLoadingMore, displayCount, filteredMascots.length, loadMoreMascots]);
    
    // Clean up observer and timeout on component unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, []);
    
    // Render helper for mascot items
    const renderMascotItem = (mascot, index) => {
        const { id, team, league, mascot: mascotName } = mascot;
        const isMultipleMascots = Array.isArray(mascotName) && mascotName.length > 1;
        const mascotDisplay = Array.isArray(mascotName) && mascotName.length > 0
            ? " " + mascotName.join(", ")
            : " None";
            
        // Apply ref to last element for intersection observer
        const isLastElement = index === displayedMascots.length - 1;
        
        return (
            <li 
                key={id} 
                className="mascot-item"
                ref={isLastElement ? lastMascotRef : null}
            >
                <div className="mascot-content">
                  <p><span>Team: </span>{team || "No team name"}</p>
                    <p>
                        <span>Mascot{isMultipleMascots ? "s" : ""}:</span>
                        {mascotDisplay}
                    </p>
                    <p><span>League: </span>{league || "No league name"}</p>
                </div>
            </li>
        );
    };
    
    const renderContent = () => {
        if (isInitialLoading) {
            return (
                <div className="loading-search">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            );
        }
        
        if (isSearching) {
            return (
                <div className="loading-search">
                    <div className="loading-spinner"></div>
                    <p>Searching...</p>
                </div>
            );
        }
        
        if (displayedMascots.length === 0) {
            return <div className="no-results">No matching league, teams, or mascots found</div>;
        }
        
        return (
            <ul className="mascot-list">
                {displayedMascots.map(renderMascotItem)}
            </ul>
        );
    };
    
    return (
        <div className="page-wrapper">
            {isHeaderSticky && (
                <div className="sticky-header">
                    <div className="sticky-header-content">
                        <div className="sticky-title">
                            <h2 className="clickable" onClick={scrollToTop}>The Big League Mascots</h2>
                        </div>
                        
                        <div className="sticky-date">
                            <p>Last updated: January 20, 2025</p>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="container">
                <header className="page-header">
                    <h1>THE BIG LEAGUE MASCOTS</h1>
                    <p>Last updated: January 20, 2025</p>
                </header>
                
                <div className="search-container" ref={searchContainerRef}>
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
                        placeholder="Search by league, team, or mascot"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                        disabled={isInitialLoading}
                    />
                </div>
                
                <div className="mascot-list-container">
                    {renderContent()}
                    
                    {isLoadingMore && (
                        <div className="loading-more-spinner">
                            <div className="loading-spinner small"></div>
                            <p>Loading more mascots...</p>
                        </div>
                    )}
                </div>
            </div>
            
            <footer className="sticky-footer">
                <div className="footer-content">
                    <p>&copy; 2025 The Big League Mascots. This site is not affiliated with any sports leagues, teams, or organizations. All team names and mascot information are property of their respective owners and are used here for educational purposes only.</p>
                </div>
            </footer>
        </div>
    );
}

export default MascotSearch;