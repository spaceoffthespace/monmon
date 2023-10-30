import React, { useState, useEffect, useContext, useRef  } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import './Account.css';
import head from '../assets/heads/head_9.png'

import withdraw from '../assets/account-icons/withdraw.png'
import recharge from '../assets/account-icons/recharge.png'

import invite from '../assets/account-icons/invite.png'
import teams from '../assets/account-icons/teams.png'
import record from '../assets/account-icons/record.png'
import manage from '../assets/account-icons/manage-wallet.png'
import NotificationsIcon from '@mui/icons-material/Notifications';
import financeIcon from '../assets/account-icons/icon_financial.png'
import detailIcon from '../assets/account-icons/icon_detail.png'
import totalIcon from '../assets/account-icons/icon_total.png'
import freezeIcon from '../assets/account-icons/icon_freeze.png'
import lvl1 from '../assets/lvl1.png'
import lvl2 from '../assets/lvl2.png'
import lvl3 from '../assets/lvl3.png'
import bronze from '../assets/b.png'
import silver from '../assets/s.png'
import gold from '../assets/g.png'
import platinum from '../assets/p.png'
import diamond from '../assets/d.png'
import support from '../assets/support.png'
import { useLocation } from 'react-router-dom';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Card, CardContent, CardActionArea } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook


import { AccountCircle, Assignment, Receipt, Message, LocationOn, PersonAdd, Security, Info } from '@mui/icons-material'; // Importing the icons from @mui/icons-material
import { Money, AccountBalance, Payment, FilterNone } from '@mui/icons-material'; // Importing the icons from @mui/icons-material
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import ManageWallet from './Manage/ManageWallet';
import Withdraw from '../Withdraw/Withdraw';
import Records from './Records/Records';
import Invite from './Invite/Invite';
import TeamsComponent from './teams/Teams';

import Acc from './Menu/Acc/Acc';
import NotificationsComponent from './Menu/Notifications/Notifications';
import SecuritComponent from './Menu/Securtiy/Security';
import Aboutus from './Menu/About/About';
import Teamreports from './Menu/TeamReport/Teamreports';
import axios from 'axios';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Account = () => {
  
  const apiUrl = process.env.REACT_APP_API_URL;
  const appUrl = process.env.REACT_APP_URL;

  const { t } = useTranslation(); // Initialize the translation hook

  const menuContainerRef = useRef();

  const { setActiveTab } = useAppContext(1);
  const [showManageWallet, setShowManageWallet] = useState(false); // Initialize state
  const [activePage, setActivePage] = useState("account");
  const { activeNavTab, setActiveNavTab } = useAppContext();
  const [unreadCount, setUnreadCount] = useState(0);
  const contentRef = React.useRef(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const handleWithdraw = () => {
    // Handle withdraw logic here
  };
  
  const handleRecharge = () => {
    // Handle recharge logic here
  };
  let {user, authTokens, logoutUser} = useContext(AuthContext)
  
  const handleCopy = () => {
    const link = `${appUrl}/register/${user.code}`;
    navigator.clipboard.writeText(link);
    setCopySuccess(true);
  };

  const location = useLocation();
  
  const handleManageWalletClick = () => {
    setActivePage('wallet');
  };

  const handleWithdrawClick = () => {

    setActivePage('withdraw');
  };

  const handleRechargeButtonClick = () => {
    setActiveTab('recharge');
    // Add any other logic you need when the button is clicked
  };

  const handleRecordsButtonClick = () => {
    setActivePage('records');
    // Add any other logic you need when the button is clicked
  };
  const handleInviteClick = () => {
    setActivePage('invite');
    // Add any other logic you need when the button is clicked
  };

  const handleBackClick = () => {
    setActivePage("account");
  };

  const handleteamsClick = () => {
    setActivePage("teams");
  };


  const handleAccountComponent = () => {
    setActivePage("account-menu");
  };


  const handleNotifications = () => {
    setActivePage("notifications-menu");
  };
  const handleSecurity = () => {
    setActivePage("security-menu");
  };
  const handleAboutus = () => {
    setActivePage("aboutus-menu");
  };
  const handleTeamreports = () => {
    setActivePage("team-menu");
  };

  const renderAccountTypeImage = (type) => {
    switch(type) {
        case 'bronze':
          return <img src={bronze} loading="lazy" alt="Standard User" width="40" height="130" />;
        case 'silver':
          return <img src={silver} loading="lazy" alt="Standard User" width="50" height="130" />;
        case 'gold':
          return <img src={gold} loading="lazy" alt="Standard User" width="40" height="130" />;
        case 'platinum':
          return <img src={platinum} loading="lazy"alt="Standard User" width="40" height="130" />;
        case 'diamond':
          return <img src={diamond} loading="lazy" alt="Standard User" width="40" height="130" />;
        default:
            return null;
    }
}
  
const handleMenuClick = () => {
  if (menuContainerRef.current) {
    menuContainerRef.current.scrollTop = 0;
  }
};

const myRef = useRef(null);

useEffect(() => {
  myRef.current.scrollIntoView({ behavior: 'smooth' });
}, [activePage]);
const fetchUnreadCount = async () => {
    try {
        const response = await axios.get(`${apiUrl}/notifications/unr/`, {
            headers: {
                'Authorization': `Bearer ${authTokens.access}`
            }
        });
        setUnreadCount(response.data.unread_count);
    } catch (error) {
        console.error("Failed to fetch unread notifications count:", error);
    }
}
useEffect(() => {
    fetchUnreadCount();
});  // The empt
  

  return (

    
    <div    ref={myRef}>
     

      {activePage === "account" && (
        <>
        
      <Paper elevation={3} className="account-balance-card">
        
       
       

      <div className="account-profile-info">
        <div className="account-profile-image-container">
          <img src={head} alt="Profile" className="account-profile-image" />
        </div>
        
  <div style={{display: 'flex', alignItems: 'center'}}> {renderAccountTypeImage(user.account_type)}
  </div>
        <div className="account-username-container">
        {user && (
          <>
          <Typography variant="h6" className="account-username">
            {user.username}
            <Typography variant="h6">{user.account_type}</Typography>        

          </Typography>
          <div className="account-code-container">
            <Typography variant="body2" className="account-code">
            {t('AccountComp.invitecode')}: {user.code}
            </Typography>
          </div>
            <Button variant="outlined" size="small" onClick={handleCopy}>
            {copySuccess ? t('AccountComp.copiedLink') : t('AccountComp.copylink')}
            </Button>
            </>
          )}
        </div>
    </div>
    


  
  <Typography variant="h4" className="account-balance-heading">
  {t('AccountComp.balance')}: ${user.balance}
  </Typography>
  

  <div className="account-button-container">
    <div className="action-container">
      <img src={withdraw} alt="Withdraw" loading="lazy" className="action-image" onClick={handleWithdrawClick} />
      <Typography variant="body2" className="action-text">{t('AccountComp.Withdraw')}</Typography>
    </div>
    <div className="action-container">
      <img src={recharge} alt="Recharge" loading="lazy" className="action-image" onClick={() => setActiveNavTab('recharge')} />
      <Typography variant="body2" className="action-text">{t('AccountComp.Recharge')}</Typography>
    </div>
  </div>
</Paper>



<div>
<Paper elevation={3} className="account-menu-list">
  <Grid container spacing={2} className="aaccount-menu-container">
    <Grid item xs={3} sm={3} md={3}>
      <div className="account-menu-section">
        <Button  onClick={handleteamsClick} className="menu-button" variant="text" fullWidth>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={teams} alt="teams" loading="lazy" className="menu-image" />
            <Typography variant="body2" className="menu-text">{t('AccountComp.Teams')}</Typography>
          </div>
        </Button>
      </div>
    </Grid>

    <Grid item xs={3} sm={3} md={3}>
      <div className="account-menu-section">
        <Button  onClick={handleRecordsButtonClick} className="menu-button" variant="text" fullWidth>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={record} alt="records" loading="lazy" className="menu-image" />
            <Typography variant="body2" className="menu-text">{t('AccountComp.Records')}</Typography>
          </div>
        </Button>
      </div>
    </Grid>

    {/* "Manage Wallet" button remains unchanged */}
    <Grid item xs={3} sm={3} md={3}>
      <div className="account-menu-section">
     
        <Button onClick={handleManageWalletClick} className="menu-button" variant="text" fullWidth>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={manage} alt="manage" className="menu-image" />
            <Typography variant="body2" className="menu-text">{t('AccountComp.ManageWallet')}</Typography>
          </div>
        </Button>
     
      </div>
    </Grid>

    <Grid item xs={3} sm={3} md={3}>
      <div className="account-menu-section">
        <Button onClick={handleInviteClick} className="menu-button" variant="text" fullWidth>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={invite} alt="invite" loading="lazy" className="menu-image" />
            <Typography variant="body2" className="menu-text">{t('AccountComp.Invite')}</Typography>
          </div>
        </Button>
      </div>
    </Grid>
  </Grid>
</Paper>
</div>





<Paper elevation={3} className="account-info-card">
        <Grid container spacing={2} className="account-info-container">
          <Grid item xs={3} sm={3} md={3}>
            <div className="account-info-section">
              <AccountBalance className="account-info-icon" />
              <Typography variant="h7" className="account-info-title">
              {t('AccountComp.Revenue')}
              </Typography>
              <Typography variant="body2" className="account-info-value">
                ${user.total_earnings}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <div className="account-info-section">
              <Money className="account-info-icon" />
              <Typography variant="h7" className="account-info-title">
              {t('AccountComp.TodayEarning')}
              </Typography>
              <Typography variant="body2" className="account-info-value">
                ${user.today_earnings}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <div className="account-info-section">
              <Payment className="account-info-icon" />
              <Typography variant="h7" className="account-info-title">
              {t('AccountComp.Totalearning')}
              </Typography>
              <Typography variant="body2" className="account-info-value">
                ${user.total_earnings}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3} sm={3} md={3}>
            <div className="account-info-section">
              <FilterNone className="account-info-icon" />
              <Typography variant="h7" className="account-info-title">
              {t('AccountComp.HoldAmount')}
              </Typography>
              <Typography variant="body2" className="account-info-value">
                ${user.hold_balance}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>


<div ref={menuContainerRef} >
 

  <Card>
    <CardActionArea>
      <CardContent onClick={handleAccountComponent} className="menu-item-content">
        <div className="icon-and-text">
          <AccountCircle className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text" >{t('AccountComp.Menu_Account')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={handleNotifications} className="menu-item-content">
        <div  className="icon-and-text">
        <NotificationsIcon className="menu-info-icon" />
{unreadCount > 0 && (
    <span className="unread-badge">{unreadCount}</span>
)}

        <Typography variant="body2" className="menu-text">{t('AccountComp.Menu_Notifications')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={handleRecordsButtonClick} className="menu-item-content">
        <div className="icon-and-text">
          <Receipt className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text" >{t('AccountComp.Menu_Records')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={() => {handleMenuClick(); handleInviteClick();}} className="menu-item-content">
        <div className="icon-and-text">
          <PersonAdd className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text" >{t('AccountComp.Menu_Invite')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={handleTeamreports} className="menu-item-content">
        <div className="icon-and-text">
          <GroupAddIcon className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text">{t('AccountComp.Menu_Teams')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={handleSecurity} className="menu-item-content">
        <div className="icon-and-text">
          <Security className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text" >{t('AccountComp.Menu_Secuirty')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>

  <Card>
    <CardActionArea>
      <CardContent onClick={handleAboutus} className="menu-item-content">
        <div className="icon-and-text">
          <Info className="menu-info-icon" /> {/* New icon */}
          <Typography variant="body2" className="menu-text" >{t('AccountComp.Menu_Aboutus')}</Typography>
        </div>
        <ArrowForwardIcon className="menu-arrow" />
      </CardContent>
    </CardActionArea>
  </Card>
</div>





      <Paper elevation={3} className="service-section">

  {user ? (
          <p  onClick={logoutUser}> {t('AccountComp.Menu_logout')} </p>
        
        ) : (
          <Link to="/login">login</Link>
        )
      }

</Paper>

</>
      )}
    

    {activePage === "wallet" && (
        <div className='wallet-1-wrapper'>
          <ManageWallet handleGoBack={handleBackClick}/>
        </div>
      )}

{activePage === "withdraw" && (
        <div className='withdraw-1-wrapper'>
          <Withdraw handleGoBack={handleBackClick}/>
        </div>
      )}

{activePage === "records" && (
        <div className='records-1-wrapper'>
          <Records handleGoBack={handleBackClick}/>
        </div>
      )}

{activePage === "invite" && (
    <div className='invite-1-wrapper' >
      <Invite ref={myRef} handleGoBack={handleBackClick} user={user} />
    </div>
)}
{activePage === "teams" && (
    <div className='Teams-1-wrapper'>
      <TeamsComponent handleGoBack={handleBackClick} user={user} />
    </div>
)}




{activePage === "account-menu" && (
    <div className='invite-1-wrapper'>
      <Acc handleGoBack={handleBackClick} user={user} />
    </div>
)}
{activePage === "notifications-menu" && (
    <div className='invite-1-wrapper'>
      <NotificationsComponent handleGoBack={handleBackClick} user={user} />
    </div>
)}
{activePage === "security-menu" && (
    <div className='invite-1-wrapper'>
      <SecuritComponent handleGoBack={handleBackClick} user={user} />
    </div>
)}
{activePage === "aboutus-menu" && (
    <div className='invite-1-wrapper'>
      <Aboutus handleGoBack={handleBackClick} user={user} />
    </div>
)}
{activePage === "team-menu" && (
    <div className='teamreports-1-wrapper'>
      <Teamreports handleGoBack={handleBackClick} user={user} />
    </div>
)}






    </div>


  );
};

export default Account;
