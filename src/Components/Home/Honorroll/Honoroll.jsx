import React, { useState, useEffect } from 'react';
import './Honoroll.css';
import * as profileImages from './index.js';

import bronze from '../../assets/b.png';
import silver from '../../assets/s.png';
import gold from '../../assets/g.png';
import platinum from '../../assets/p.png';
import diamond from '../../assets/d.png';
import { useTranslation } from 'react-i18next';
import { FlagIcon } from 'react-flag-kit';

import { Grid, Typography } from '@mui/material';

const HonorRoll = () => {
  const [randomizedUsers, setRandomizedUsers] = useState([]);
  const { t } = useTranslation();
 
useEffect(() => {
  const countries = ['US', 'AE', 'CA', 'DE', 'FR', ]; // Add more country codes as needed

  const randomized = Array.from({ length: 10 }, (_, index) => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      return {
          id: index,
          country,
          action: generateRandomAction(country),
          amount: `${parseFloat((Math.random() * 10000).toFixed(2)).toLocaleString()} USD`, 
          amountValue: parseFloat((Math.random() * 10000).toFixed(2)),
          profilePhoto: getRandomProfilePhoto(),
      }
  });

  setRandomizedUsers(randomized);
}, [t]);
const generateRandomAction = (country) => {
  const actions = [
      <span>
          <FlagIcon code={country} size={16} /> 
          {`****${Math.floor(5 + Math.random() * 9000)} ${t('HomeComp.succesdepo')}`}
      </span>,
      <span>
          <FlagIcon code={country} size={16} />
          {`****${Math.floor(50 + Math.random() * 9000)} ${t('HomeComp.successwith')}`}
      </span>,
  ];

  return actions[Math.floor(Math.random() * actions.length)];
};
  const getRandomProfilePhoto = () => {
    const keys = Object.keys(profileImages);
    return profileImages[keys[Math.floor(Math.random() * keys.length)]];
  };

  const getAccountLevelIcon = (amountValue) => {
    if (amountValue >= 7000) return diamond;
    if (amountValue >= 5000) return platinum;
    if (amountValue >= 1000) return silver;
    if (amountValue >= 400) return bronze;
    return bronze;
  };

  return (
    <div className="honor-roll-container">
      <div className="honor-roll-wrapper">
        <div className="user-items">
          {randomizedUsers.map((user) => (
            <div className="user-item" key={user.id}>
              <div className="user-info">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="honor-profile-image"
                  loading="lazy"
                  style={{ maxWidth: '80px', maxHeight: '80px' }}
                />
                   <img
                  src={getAccountLevelIcon(user.amountValue)}
                  alt="Account Level"
                  className="account-level-icon"
                  loading="lazy"
                  style={{ maxWidth: '90px', maxHeight: '50px' }}
                />
                <div className="user-action">{user.action}</div>
                <div className="user-amount"> {user.amount}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HonorRoll;
