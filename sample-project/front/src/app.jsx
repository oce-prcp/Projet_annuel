import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import LoginPage from './pages/LoginPage';
import InvoicePage from './pages/InvoicePage'
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function App() {
  return (
    <>    
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path ="/invoice" element={<InvoicePage />} />
          <Route path ="/dashboard" element={<DashboardPage />} />
          <Route path ="/admin" element={<AdminDashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
