import { useState, useEffect } from 'react';


export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    try {
      const stored = localStorage.getItem('spacex-favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (err) {
      
      console.warn('Could not parse favorites from localStorage:', err);
    }
  }, []);

  const toggleFavorite = (launchId) => {
    setFavorites((prev) => {
      let updated;

      if (prev.includes(launchId)) {
        
        updated = prev.filter(id => id !== launchId);
      } else {
        
        updated = [...prev, launchId];
      }

      
      try {
        localStorage.setItem('spacex-favorites', JSON.stringify(updated));
      } catch (err) {

        console.error('Failed to save favorites:', err);
      }

      return updated;
    });
  };

  const isFavorite = (launchId) => {
   
    return favorites.includes(launchId);
  };

  
  return { favorites, toggleFavorite, isFavorite };
};
