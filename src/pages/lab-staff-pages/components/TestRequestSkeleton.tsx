import React from "react";

const TestRequestSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index}>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
      <div className="h-24 bg-gray-200 rounded"></div>
    </div>
  );
};

export default TestRequestSkeleton;
