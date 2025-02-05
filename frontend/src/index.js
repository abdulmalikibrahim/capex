import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Index from './Layout/Index';
import Swal from 'sweetalert2';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [shop,setShop] = useState("PRESS");
  const [idDelete, setidDelete] = useState(0)
  const showAlert = (title,msg,icon) => {
    Swal.fire({
      title:title,
      html:msg,
      icon:icon
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index shop={shop}setShop={setShop} Content={<Home shop={shop} API_URL={API_URL} showAlert={showAlert} idDelete={idDelete} /> } /> } />
        <Route path="/home" element={<Index shop={shop}setShop={setShop} Content={<Home shop={shop} API_URL={API_URL} showAlert={showAlert} idDelete={idDelete} /> } /> } />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);