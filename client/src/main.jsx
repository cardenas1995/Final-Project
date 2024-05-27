import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Ensure this path is correct and 'App' is imported as default
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
