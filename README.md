# The Big League Mascots

This React application allows users to search for sports team mascots across different leagues (NBA, NFL, MLB, NHL) and view the results with an infinite scroll interface. 

## Features

- **Real-time search** across teams, leagues, and mascot names
- **Debounced search** implementation for performance optimization
- **Infinite scroll** to load more results as the user scrolls down
- **Responsive design** that works on different screen sizes
- **Component-based architecture** with separation of concerns
- **Custom React hooks** for reusable logic

## Running It Locally

### You'll need

- Node.js (v14+)
- npm or yarn

### Installation steps

1. Clone the repository
   ```bash
   git clone https://github.com/rickeev/big-league-mascots.git
   cd big-league-mascots
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)


## Tech Stack

- **React**
- **JavaScript (ES6+)**
- **HTML, CSS**
- **Vite**

## Project Refactoring

This project demonstrates a refactoring journey from a single component (OriginalMascotSearch.jsx) to a structured, component-based architecture with custom hooks. The refactoring process:

1. Identified reusable UI components and moved logic into custom hooks
2. Improved performance through debouncing and memoization
3. Enhanced user experience with loading states and infinite scrolling

```
/public
  mascots.json              # Mascot data
/src
  OriginalMascotSearch.jsx  # Single component
  App.css                   # Global styles
  App.jsx                   # App entry point
  main.jsx                  # React application entry point
```

```
/public
  mascots.json              # Mascot data
/src
  /components               # Reusable UI components
    LoadingSpinner.jsx      #  Loading indicator component
    MascotItem.jsx          # Individual mascot display component
    MascotList.jsx          # Container for mascot items
    MascotSearchResults.jsx # Results container with loading states
    PageFooter.jsx          # Footer component
    PageHeader.jsx          # Page header component
    PageLayout.jsx          # Main layout wrapper
    SearchBar.jsx           # Search input component
    SearchSection.jsx       # Search section with header
    StickyHeader.jsx        # Header that appears on scroll
  /hooks                    # Custom React hooks
    useInfiniteScroll.js    # Infinite scrolling functionality
    useMascotData.js        # Data fetching logic
    useScrollToTop.js       # Smooth scroll to top functionality
    useSearchMascots.js     # Search filtering logic
    useStickyHeader.js      # Sticky header functionality
  /pages                    # Page components
    MascotSearch.jsx        # Main page component
  App.css                   # Global styles
  App.jsx                   # App entry point
  main.jsx                  # React application entry point
```

## Things That Could Be Added Later

- Add mascot images
- Add dark mode
- Add advanced search filters
- Add mascot details pages

## License

This project is licensed under the MIT License - see the LICENSE file for details.