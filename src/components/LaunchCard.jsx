import React from 'react';
import { Star, Calendar, Rocket, MapPin } from 'lucide-react';


const LaunchCard = ({ launch, isFavorite, onToggleFavorite, onClick }) => {
  if (!launch) return null; 


  const launchDate = new Date(launch.date_utc);
  const success = launch.success; 
  const rocketLabel = launch.rocket?.name || 'Unknown Rocket';
  const padLabel = launch.launchpad?.name || 'Unknown Launchpad';


  const handleFavClick = (e) => {
    e.stopPropagation(); 
    onToggleFavorite();
  };

 
  let statusText = '';
  let statusClasses = '';
  if (launch.upcoming) {
    statusText = 'Upcoming';
    statusClasses = 'bg-blue-100 text-blue-800';
  } else if (success) {
    statusText = 'Successful';
    statusClasses = 'bg-green-100 text-green-800';
  } else {
    statusText = 'Failed';
    statusClasses = 'bg-red-100 text-red-800';
  }

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {launch.name}
            </h3>
            

            {launch.flight_number && (
              <p className="text-sm text-gray-500 mt-1">Flight #{launch.flight_number}</p>
            )}
          </div>

          <button
            onClick={handleFavClick}
            className="flex-shrink-0 ml-2 p-2 hover:bg-yellow-50 rounded-full transition-colors"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star
              className={`h-5 w-5 ${
                isFavorite
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{launchDate.toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Rocket className="h-4 w-4 mr-2" />
            <span className="truncate">{rocketLabel}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{padLabel}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClasses}`}
          >
            {statusText}
          </span>

          {launch.links?.patch?.small ? (
            <img
              src={launch.links.patch.small}
              alt={`${launch.name} patch`}
              className="h-12 w-12 object-contain"
            />
          ) : (
           
            <div className="h-12 w-12 flex items-center justify-center text-gray-400 text-xs border rounded">
              no patch
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchCard;
