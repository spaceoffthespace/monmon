import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Navbar.css';
import Home from '../Home/Home';
import Recharge from '../Recharge/Recharge';
import Grab from '../Grab/Grab';
import Task from '../Tasks/Task';
import Account from '../Account/Account';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {
  faHome,
  faCreditCard,
  faTasks,
  faUser,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../Context/AppContext';

const Navbar = () => {
  const { activeNavTab, setActiveNavTab } = useAppContext();
  const [previousTab, setPreviousTab] = useState(null); // Previous active tab
  const { t } = useTranslation();

  const contentRef = React.useRef(null);


  // Function to handle tab click
  const handleTabClick = (tab) => {
    setPreviousTab(activeNavTab); // Set the previous active tab
    setActiveNavTab(tab);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeNavTab]);

  // Function to render the corresponding component based on the active tab
  const renderComponent = () => {
    switch (activeNavTab) {
      case 'home':
        return <Home />;
      case 'recharge':
        return <Recharge />;
      case 'grab':
        return <Grab />;
      case 'task':
        return <Task />;
      case 'account':
        return <Account />;
      default:
        return null;
    }
  };

  // Function to handle the "Back" button click
  const handleBackButtonClick = () => {
    if (previousTab) {
      setActiveNavTab(previousTab); // Set the active tab to the previous tab
      setPreviousTab(null); // Reset the previous tab
    }
  };

  return (
    <div>
      <div className="content-container" ref={contentRef}>{renderComponent()}</div>
      <div className="navbar-container">
        <ul className="navbar-tabs">
          <li
            className={`navbar-tab ${activeNavTab === 'home' ? 'active' : ''}`}
            onClick={() => handleTabClick('home')}
          >
            <div className="navbar-icon navbar-home-icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span>{t('navbar.home')}</span>
          </li>
          <li
            className={`navbar-tab ${activeNavTab === 'recharge' ? 'active' : ''}`}
            onClick={() => handleTabClick('recharge')}
          >
            <div className="navbar-icon navbar-recharge-icon">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <span>{t('navbar.recharge')}</span>
          </li>
          <li
            className={`navbar-tab ${activeNavTab === 'grab' ? 'active' : ''}`}
            onClick={() => handleTabClick('grab')}
          >
            <div className="navbar-icon navbar-plus-icon">
            <FontAwesomeIcon icon={faPlusCircle} />
            </div>
            {/* <span>{t('navbar.grab')}</span> */}
          </li>
          <li
            className={`navbar-tab ${activeNavTab === 'task' ? 'active' : ''}`}
            onClick={() => handleTabClick('task')}
          >
            <div className="navbar-icon navbar-task-icon">
              <FontAwesomeIcon icon={faTasks} />
            </div>
            <span>{t('navbar.task')}</span>
          </li>
          <li
            className={`navbar-tab ${activeNavTab === 'account' ? 'active' : ''}`}
            onClick={() => handleTabClick('account')}
          >
            <div className="navbar-icon navbar-user-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span>{t('navbar.account')}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
