import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import LoginPage from './pages/LoginPage';
import InvoicePage from './pages/InvoicePage'
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NavbarComponent from "./components/Navbar";
import FooterComponent from "./components/Footer";

function App() {
  return (
    <>    
      <NavbarComponent />
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
      <FooterComponent />
    </>
  );
}

export default App;
