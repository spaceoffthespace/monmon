import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Navbutton.css'

const Navbutton = ({ pageName, showBackButton, onBackClick  }) => {
  const navigate = useNavigate();
  const location = useLocation();

  

  return (
    <div className="navbutton-container">
      {showBackButton && (
        <div className="navbar-back">
          <IconButton onClick={onBackClick}>
            <ArrowBackIcon />
          </IconButton>
        </div>
      )}
      <div className="navbutton-title">
        <h1>{pageName}</h1>
      </div>
      <div className="navbutton-right">
        {/* Add any additional elements you want to show on the right side of the Navbar */}
      </div>
    </div>
  );
};

export default Navbutton;
