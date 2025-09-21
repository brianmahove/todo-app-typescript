import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// get root element from HTML
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// render the app inside React StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
