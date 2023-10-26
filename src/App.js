import React, { useEffect  } from 'react';
import Navbar from './Components/Navbar/Navbar';
import i18n from './Components/li8n/li8n';
import './App.css'
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './Components/Context/AuthContext';
import LoginPage from './Components/Login/LoginPage';
import RegistrationPage from './Components/Login/Register/Register';
import ProtectedRoute from './Components/utils/ProtectedRoute/ProtectedRoute';
import ManageWallet from './Components/Account/Manage/ManageWallet';

const App = () => {
  useEffect(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}, []);
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register/:ref_code' element={<RegistrationPage />} />
      <Route path='/register' element={<RegistrationPage />} />
      <Route path='/' element={<ProtectedRoute element={<Navbar />} />} />
      <Route path='/manage-wallet' element={<ProtectedRoute element={<ManageWallet />} />} />
      {/* More of your protected routes can go here */}
    </Routes>
  );
};

export default App;
