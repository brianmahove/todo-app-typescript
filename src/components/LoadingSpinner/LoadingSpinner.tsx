import React from 'react';
import '../../styles/LoadingSpinner.css';

// simple spinner shown when something is loading
const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      {/* animated spinner */}
      <div className="spinner"></div>

      {/* loading text */}
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
