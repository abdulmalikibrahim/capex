import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home API_URL={API_URL} />} />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);