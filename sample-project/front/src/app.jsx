
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage'

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path ="/account" element={<AccountPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
