import React, { useState, useEffect } from 'react';
import { Search, Star } from 'lucide-react'; 

const SearchFilters = ({
  searchTerm,
  onSearchChange,
  yearFilter,
  onYearChange,
  successFilter,
  onSuccessChange,
  years,
  showFavorites,
  onShowFavoritesChange
}) => {
  
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      onSearchChange(localSearch); 
    }, 300);

    return () => clearTimeout(timer); 
  }, [localSearch, onSearchChange]);

 
  const toggleFavorites = () => {
    onShowFavoritesChange(!showFavorites);
  };
  

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        <div className="relative">
        
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search missions..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

      
        <select
          value={yearFilter}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Years</option>
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={successFilter}
            onChange={(e) => onSuccessChange(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Successful launches only</span>
        </label>

        <button
          onClick={toggleFavorites}
          className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            showFavorites
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Star className={`h-4 w-4 ${showFavorites ? 'fill-yellow-500' : ''}`} />
          <span>{showFavorites ? 'Showing Favorites' : 'Show Favorites'}</span>
        </button>
      </div>
    </div>
  );
};


export default SearchFilters;
