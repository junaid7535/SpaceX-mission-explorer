// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Rocket, Star } from 'lucide-react'; // not using all the icons, so I trimmed this
import LaunchCard from './components/LaunchCard';
import LaunchModal from './components/LaunchModal';
import SearchFilters from './components/SearchFilters';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getLaunches, getLaunch } from './services/spacexApi';
import { useFavorites } from './hooks/useFavorites';
import './App.css';

function App() {
  const [allLaunches, setAllLaunches] = useState([]);     // renamed to be clearer
  const [visibleLaunches, setVisibleLaunches] = useState([]); // filtered list
  const [selectedLaunch, setSelectedLaunch] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // starts true so we see skeletons
  const [errorMessage, setErrorMessage] = useState(null);

  // custom hook for handling favorites
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // filtering state
  const [searchText, setSearchText] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [onlySuccessful, setOnlySuccessful] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // load launches from API
  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const data = await getLaunches();
      setAllLaunches(data);
      setVisibleLaunches(data); // initially show everything
    } catch (err) {
      setErrorMessage('Could not fetch launches. Try again later.');
      console.warn('fetchLaunches error:', err); // switched from error to warn
    } finally {
      setLoading(false);
    }
  };

  // filter launches whenever something changes
  useEffect(() => {
    let results = [...allLaunches]; // just to be safe, clone the array

    if (showOnlyFavorites) {
      results = results.filter(l => isFavorite(l.id));
    }

    if (searchText.trim()) {
      results = results.filter(l =>
        l.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedYear) {
      results = results.filter(l =>
        new Date(l.date_utc).getFullYear().toString() === selectedYear
      );
    }

    if (onlySuccessful) {
      results = results.filter(l => l.success);
    }

    setVisibleLaunches(results);
  }, [allLaunches, searchText, selectedYear, onlySuccessful, showOnlyFavorites, isFavorite]);

  const handleLaunchClick = async (id) => {
    try {
      const details = await getLaunch(id);
      setSelectedLaunch(details);
      setShowModal(true);
    } catch (err) {
      setErrorMessage('Failed to fetch launch details.');
      console.error('Launch detail fetch failed:', err);
    }
  };

  const handleRetryClick = () => {
    fetchLaunches();
  };

  // extract available years from launches (note: might be slow with big arrays but whatever)
  const availableYears = [...new Set(allLaunches.map(l => new Date(l.date_utc).getFullYear()))]
    .sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                SpaceX Mission Explorer
              </h1>
            </div>

            {/* Favorites toggle button */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showOnlyFavorites
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-yellow-500' : ''}`} />
              <span>Favorites ({favorites.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          searchTerm={searchText}
          onSearchChange={setSearchText}
          yearFilter={selectedYear}
          onYearChange={setSelectedYear}
          successFilter={onlySuccessful}
          onSuccessChange={setOnlySuccessful}
          years={availableYears}
          showFavorites={showOnlyFavorites}
          onShowFavoritesChange={setShowOnlyFavorites}
        />

        {/* Error message if something blew up */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <p className="text-red-700">{errorMessage}</p>
              <button
                onClick={handleRetryClick}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Show skeletons while loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <LoadingSkeleton key={idx} />
            ))}
          </div>
        ) : visibleLaunches.length === 0 ? (
          // if no results
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <Rocket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No launches found
              </h3>
              <p className="text-gray-600">
                {showOnlyFavorites
                  ? "You haven't added any missions to favorites yet."
                  : "Try adjusting your search or filters to find more missions."}
              </p>
            </div>
          </div>
        ) : (
          // actual grid of launches
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleLaunches.map((launch) => (
              <LaunchCard
                key={launch.id}
                launch={launch}
                isFavorite={isFavorite(launch.id)}
                onToggleFavorite={() => toggleFavorite(launch.id)}
                onClick={() => handleLaunchClick(launch.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* modal with launch details */}
      <LaunchModal
        launch={selectedLaunch}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isFavorite={selectedLaunch ? isFavorite(selectedLaunch.id) : false}
        onToggleFavorite={() => selectedLaunch && toggleFavorite(selectedLaunch.id)}
      />
    </div>
  );
}

export default App;
