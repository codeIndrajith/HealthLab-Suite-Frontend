import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg p-6 mb-6">
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>

        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index + 1}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 bg-gray-300 rounded w-10"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 bg-gray-300 rounded w-20"></div>
                <div className="h-8 bg-gray-300 rounded w-24"></div>
                <div className="h-9 bg-gray-300 rounded w-28"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
