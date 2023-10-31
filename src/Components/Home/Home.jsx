import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';
import { Box, Grid, ButtonBase, Typography, Badge, Select } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import Withdraw from '../Withdraw/Withdraw';
import Recharge from '../Recharge/Recharge';
import NotificationsComponent from '../Account/Menu/Notifications/Notifications';
import amazonlogo from '../assets/download.png';
import homeimg1 from '../assets/home-img.jpg';
import homeimg2 from '../assets/home-img2.png';
import homeimg3 from '../assets/home-img3.jpg';
import victoria from '../assets/victoria.jpg';
import support from '../assets/support.png';



import Invite from '../Account/Invite/Invite';

import ProductSlider from './ProductSlider/ProductSlider';

import recharge from '../assets/recharge.png';
import widthdraw from '../assets/withdraw.png';
import invite from '../assets/invite.png';
import homenotif from '../assets/notification.png';

import HomeBalance from './HomeBalance/HomeBalance';
import HonorRoll from './Honorroll/Honoroll';
import Partners from './Partners/Partners';
import Chat from '../Chat/Chat';

import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LoadLoader from '../Loader/ClipsLoader';
import { useAppContext } from '../Context/AppContext';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [currentImage, setCurrentImage] = useState(homeimg1);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCum, setActiveCum] = useState("home");
  const { activeNavTab, setActiveNavTab } = useAppContext();
  const [earningsData, setEarningsData] = useState([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';  // Retrieve saved language or default to English
  });
  const [loading, setLoading] = useState(true);

  const [unreadCount, setUnreadCount] = useState(0);
  let {user, authTokens, logoutUser} = useContext(AuthContext)
  const apiUrl = process.env.REACT_APP_API_URL;

  


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
}, []);  // Note

  const handlereturn = () => {
    setActiveCum('home');
    // Add any other logic you need when the button is clicked
  };

  useEffect(() => {
    const imageInterval = setInterval(() => {
      if (currentImage === homeimg1) {
        setCurrentImage(homeimg3);
      } else if (currentImage === homeimg3) {
        setCurrentImage(victoria);
      } else if (currentImage === victoria) {
        setCurrentImage(homeimg2);
      } else {
        setCurrentImage(homeimg1);
      }
    }, 3000);

    return () => {
      clearInterval(imageInterval);
    };
  }, [currentImage]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    i18n.changeLanguage(language);  // Change language in i18n
    localStorage.setItem('language', language);  // Store the current language in localStorage
  }, [language, i18n]);  // Dependency array to watch for changes in 'language' and 'i18n'


  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);  // Update language state which triggers useEffect
  };

  return (
    <div>
      {activeCum === "home" && (
        <div className="home-container">

        <div className="logo-home-container">
          <div className="left">
            <img src={support} className="sup-image" onClick={() => setActiveCum('chatsup')} />
          </div>

          <div className="center">
            <img src={amazonlogo}  loading="lazy" className="logo-image" />
          </div>

          <div className="right">
            <div className="language-container">
              <select value={language} onChange={handleLanguageChange}>  {/* Set value prop to ensure the selected option matches the state */}
                <option value="en">English</option>
                <option value="ar">العربية</option> 
                <option value="fr">Français</option>
                <option value="gr">Deutsch</option> 
              </select>
            </div>
          </div>
        </div>

        <div className="image-spot-container">
        <div className={`image-spot-skeleton ${isLoaded ? 'fade-out' : 'fade-in'}`}></div>
        <img
            src={currentImage}
            className={`image-spot ${isLoaded ? 'fade-in' : 'fade-out'}`}
            onLoad={handleImageLoad}
        />
    </div>
     
          
          <Box
            bgcolor="white"
            borderRadius={24}
            p={2}
            width="90%"
            mt={2}
            display="flex"
            alignItems="center"
            className="announcement-container"
          >
            <div className="speaker-icon">
              <FontAwesomeIcon icon={faVolumeUp} style={{ fontSize: 16 }} />
            </div>
            <div className="announcement-text">
              <marquee direction="left" behavior="scroll" scrollamount="4">
                Welcome to the Amazon platform! As long as you have a mobile phone or computer, you can join our work
                anytime, anywhere, and the operation is simple. Match task orders through the intelligent system of Amazon
                platform every day, help merchants increase sales and reputation, and complete task orders to get the
                corresponding principal + commission, and easily earn high remuneration!
              </marquee>
            </div>
          </Box>

          <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  width="100%"
  
  borderRadius={12}
  p={4}
  className="button-section"
>
  <Grid container spacing={3} justify="center">
    {[
     { src: recharge, alt: "Recharge", text: t('HomeComp.Recharge'), action: () => setActiveNavTab('recharge') },
     { src: widthdraw, alt: "Withdraw", text: t('HomeComp.Withdraw'), action: () => setActiveCum('withdraw') },
     { src: homenotif, alt: "Notifications", text: t('HomeComp.Notifications'), action: () => setActiveCum('notifications'), notif: true },
     { src: invite, alt: "Invite", text: t('HomeComp.Invite'), action: () => setActiveCum('invite') }
    ].map((item, index) => (
      <Grid item xs={3} sm={3} md={3} key={index}>
        <div className="button-item" onClick={item.action}>
          <div className="notif-image-container">
            {item.notif && unreadCount > 0 && (
              <span className="unread-home-badge">{unreadCount}</span>
            )}
            <img src={item.src} alt={item.alt} className="button-image" />
          </div>
          <div className="button-text">{item.text}</div>
        </div>
      </Grid>
    ))}
  </Grid>
</Box>
          <div className='home-balance-main-container'>

          <HomeBalance   setActiveNavTab={setActiveNavTab}/>
          </div>
          <div style={{ paddingBottom: '20px' }}>

          </div>
          <HonorRoll />



          <div className="product-main-container">
              <ProductSlider />
          </div>
          
          <div className="partners-home-container">
            
            <Partners />
          </div>


        </div>
      )}

      {activeCum === "withdraw" && (
        <div className='withdraw-2-wrapper'>
          <Withdraw handleGoBack={handlereturn}/> 
        </div>
      )}

      {activeCum === "recharge" && (
        <div className='recharge-2-wrapper'>
          <Recharge />
        </div>
      )}
      {activeCum === "invite" && (
        <div className='invite-2-wrapper'>
          <Invite user={user} handleGoBack={handlereturn}/>
        </div>
      )}



      {activeCum === "notifications" && (
        <div className='notifications-2-wrapper'>
          <NotificationsComponent user={user} handleGoBack={handlereturn}/>
        </div>
      )}
      {activeCum === "chatsup" && (
        <div className='chat-2-wrapper'>
          <Chat handleGoBack={handlereturn}/>
        </div>
      )}
    </div>
  );
};

export default Home;
