import React from 'react';
import { X, Star, Calendar, Rocket, MapPin, ExternalLink, Youtube } from 'lucide-react';

const LaunchModal = ({ launch, isOpen, onClose, isFavorite, onToggleFavorite }) => {
  if (!isOpen || !launch) return null; 

  const launchDate = new Date(launch.date_utc);
  const missionDetails = launch.details || 'No details available for this mission.'; 


  const handleBackdropClick = (e) => {
   
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

 
  let statusText = '';
  let statusClasses = '';
  if (launch.upcoming) {
    statusText = 'Upcoming';
    statusClasses = 'bg-blue-100 text-blue-800';
  } else if (launch.success) {
    statusText = 'Successful';
    statusClasses = 'bg-green-100 text-green-800';
  } else {
    statusText = 'Failed';
    statusClasses = 'bg-red-100 text-red-800';
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
        
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-gray-900">{launch.name}</h2>
              {launch.flight_number && (
                <p className="text-gray-600">Flight #{launch.flight_number}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
            
              <button
                onClick={onToggleFavorite}
                className="p-2 hover:bg-yellow-50 rounded-full transition-colors"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star
                  className={`h-6 w-6 ${
                    isFavorite
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>

             
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          
          {launch.links?.patch?.large ? (
            <div className="flex justify-center mb-6">
              <img
                src={launch.links.patch.large}
                alt={`${launch.name} mission patch`}
                className="h-32 w-32 object-contain"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-6 text-gray-400 text-sm">
              (no patch available)
            </div>
          )}

          
          <div className="mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusClasses}`}
            >
              {statusText}
            </span>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Launch Date</div>
                <div>{launchDate.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <Rocket className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Rocket</div>
                <div>{launch.rocket?.name || 'Unknown'}</div>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">Launch Site</div>
                <div>{launch.launchpad?.name || 'Unknown'}</div>
              </div>
            </div>
          </div>

         
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Mission Details</h3>
            <p className="text-gray-700 leading-relaxed">{missionDetails}</p>
          </div>

         
          {(launch.links?.wikipedia || launch.links?.webcast) && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Links</h3>
              <div className="flex gap-4">
                {launch.links.wikipedia && (
                  <a
                    href={launch.links.wikipedia}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Wikipedia</span>
                  </a>
                )}
                {launch.links.webcast && (
                  <a
                    href={launch.links.webcast}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                    <span>Webcast</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchModal;
