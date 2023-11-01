import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import { Button, Box, Typography } from '@mui/material';
import Navbutton from '../../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import './Invite.css';

const Invite = ({ handleGoBack, user }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;   
  const appurl = process.env.REACT_APP_URL;   
  

  const inviteLink = `${appurl}/register/${user.code}`;
  const { t } = useTranslation(); // Initialize the translation hook

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopySuccess(true);
    } catch (err) {
    }
  };

  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <div>
          <Navbutton pageName={t('AccountComp.Invite')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}

    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, backgroundColor: '#F2F5FA', minHeight: '100vh', padding: '20px' }}>
    
      <Typography variant="h4" color="primary"> {t('invites.inviteFriends')}</Typography>
      <Typography variant="body1" color="textPrimary" align="center">
      {t('invites.inviteDescription')}
      </Typography>
      <QRCode value={inviteLink} />
      {copySuccess ? <Typography color="primary">{t('invites.linkCopied')}</Typography> : null}
      <Button variant="contained" color="primary" onClick={handleCopy}>{t('invites.copyInviteLink')}</Button>
      <Navbutton onClick={handleGoBack} label="Go Back" />
    </Box>
    </div>
  );
}

export default Invite;
