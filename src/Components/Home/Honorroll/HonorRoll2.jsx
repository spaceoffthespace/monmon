import React, { useState, useEffect } from 'react';
import './Honoroll2.css';
import * as profileImages from './index.js';
import { useTranslation } from 'react-i18next';

import bronze from '../../assets/b.png';
import silver from '../../assets/s.png';
import gold from '../../assets/g.png';
import platinum from '../../assets/p.png';
import diamond from '../../assets/d.png';

const HonorRoll2 = () => {
  const [randomizedUsers, setRandomizedUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const randomized = Array.from({ length: 10 }, (_, index) => ({
      id: index,
      action: `****${Math.floor(1000 + Math.random() * 9000)} ${t('HomeComp.completedorder')}`,
      amount: `${parseFloat((Math.random() * 10000).toFixed(2)).toLocaleString()} USD`, 
      amountValue: parseFloat((Math.random() * 10000).toFixed(2)),
      profilePhoto: getRandomProfilePhoto(),
    }));
    
    setRandomizedUsers(randomized);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % randomized.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [t]);  // Added the dependency here

  const getRandomProfilePhoto = () => {
    const keys = Object.keys(profileImages);
    return profileImages[keys[Math.floor(Math.random() * keys.length)]];
  };

  const translateY = -currentIndex * 115; 

  return (
    <div className="honor-roll-container2">
      <div className="honor-roll-wrapper2" style={{ transform: `translateY(${translateY}px)` }}>
        <div className="user-items2">
          {randomizedUsers.concat(randomizedUsers).map((user, index) => (
            <div className="user-item2" key={index}>
              <div className="user-info">
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="honor-profile-image"
                  style={{ maxWidth: '80px', maxHeight: '80px' }}
                />
                {user.amountValue >= 7000 ? (
                  <img
                    src={diamond}
                    alt="Diamond"
                    className="account-level-icon"
                    style={{ maxWidth: '90px', maxHeight: '50px' }}
                  />
                ) : user.amountValue >= 5000 ? (
                  <img
                    src={platinum}
                    alt="Platinum"
                    className="account-level-icon"
                    style={{ maxWidth: '90px', maxHeight: '50px' }}
                  />
                ) : user.amountValue >= 1000 ? (
                  <img
                    src={gold}
                    alt="Gold"
                    className="account-level-icon"
                    style={{ maxWidth: '90px', maxHeight: '50px' }}
                  />
                ) : user.amountValue >= 400 ? (
                  <img
                    src={silver}
                    alt="Silver"
                    className="account-level-icon"
                    style={{ maxWidth: '90px', maxHeight: '50px' }}
                  />
                ) : (
                  <img
                    src={bronze}
                    alt="Bronze"
                    className="account-level-icon"
                    style={{ maxWidth: '90px', maxHeight: '50px' }}
                  />
                )}
                <div className="user-action2">{user.action}</div>
                <div className="user-amount2">
  <span className="earnings-label">Earned</span><br />{user.amount}
</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HonorRoll2;
