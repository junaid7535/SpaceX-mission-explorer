import React from 'react';

const widthOptions = ['w-1/3', 'w-1/2', 'w-2/3', 'w-3/4'];


const getRandomWidth = () => widthOptions[Math.floor(Math.random() * widthOptions.length)];

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
     
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className={`h-4 bg-gray-200 rounded ${getRandomWidth()}`}></div>
        </div>
        <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
      </div>
      
     
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
            <div className={`h-4 bg-gray-200 rounded ${getRandomWidth()}`}></div>
          </div>
        ))}
      </div>
      
     
      <div className="mt-4 flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded w-20"></div>
        <div className="h-12 w-12 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};


export default LoadingSkeleton;
