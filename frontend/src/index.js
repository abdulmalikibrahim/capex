import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Index from './Layout/Index';
import Swal from 'sweetalert2';
import TableMonitoring from './Pages/TableMonitoring';
import SummaryReport from './Pages/SummaryReport';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [shop,setShop] = useState("PRESS");
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
        <Route path="/" element={<Index shop={shop} setShop={setShop} Content={<Home shop={shop} API_URL={API_URL} showAlert={showAlert} /> } /> } />
        <Route path="/home" element={<Index shop={shop} setShop={setShop} Content={<Home shop={shop} API_URL={API_URL} showAlert={showAlert} /> } /> } />
        <Route path="/tablemonitoring" element={<Index shop={shop} setShop={setShop} Content={<TableMonitoring API_URL={API_URL} showAlert={showAlert} /> } /> } />
        <Route path="/summaryreport" element={<Index shop={shop} setShop={setShop} Content={<SummaryReport API_URL={API_URL} showAlert={showAlert} /> } /> } />
      </Routes>
    </Router>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);