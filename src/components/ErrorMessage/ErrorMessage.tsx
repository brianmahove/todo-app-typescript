import React from 'react';

// props for error message component
interface Props {
  message: string;        // text to show as error
  onRetry?: () => void;   // optional retry action
}

const ErrorMessage: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      {/* show error text */}
      <p>{message}</p>

      {/* show retry button only if onRetry is given */}
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
