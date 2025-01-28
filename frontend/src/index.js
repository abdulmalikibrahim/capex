import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Index from './Layout/Index';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [shop,setShop] = useState("PRESS");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index 
          title={"CAPEX "+shop} 
          setShop={setShop} 
          Content={<Home 
            shop={shop} 
            setShop={setShop} 
            API_URL={API_URL} />
          } />
        } />
        <Route path="/home" element={<Index 
          title={"CAPEX "+shop} 
          setShop={setShop} 
          Content={<Home 
            shop={shop} 
            setShop={setShop} 
            API_URL={API_URL} />
          } />
        } />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);