import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import HomePage from './pages/HomePage';
import SubscriptionPage from './pages/SubscriptionPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
