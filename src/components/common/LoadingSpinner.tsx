import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="loading-spinner">
    <div className="spinner" />
    <span>Loading...</span>
    <style>{`
      .loading-spinner { display: flex; align-items: center; gap: 8px; }
      .spinner {
        width: 18px; height: 18px;
        border: 3px solid #eee;
        border-top: 3px solid #2196f3;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default LoadingSpinner;