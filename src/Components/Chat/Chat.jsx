import React, { useState } from 'react';
import './Chat.css';
import Navbutton from '../Navbutton/NavButton';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Chat = ({ handleGoBack }) => {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const handleOpenChat = () => {
    window.open("https://t.me/MallSupportChat", "_blank");
  };

  return (
    <div className="chat-container">
      <Navbutton pageName={t('ChatComp.Pagetitle')} showBackButton={true} onBackClick={handleGoBack} />

      <div onClick={handleOpenChat} className="chat-content">
        <div className="chat-icon">
          💬
        </div>
        <div className="chat-text">{t('ChatComp.open')}</div>
      </div>

      {loading && (
        <div className="loading">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}

      <Button variant="outlined" color="primary" onClick={handleOpenChat}>
      {t('ChatComp.click')}
      </Button>

      <div className="customer-support" onClick={handleOpenChat}>
    <div className="help-bubble">
        <span> {t('ChatComp.help')}</span>
    </div>
    <img src="https://res.cloudinary.com/idemo/image/upload/dpr_1.0,c_thumb,g_face,w_200,h_200/woman.jpg" alt="Support" className="support-image" />
</div>
    </div>
  );
};

export default Chat;
