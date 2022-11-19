import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bulma.css';
import './css/index.css';
import App from './components/App';
import "mapbox-gl/dist/mapbox-gl.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

