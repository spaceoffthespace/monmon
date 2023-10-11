import React, { useState, useEffect, useContext } from 'react';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import boxbox from '../../../assets/box-box.png';
import './Notification.css';
import Navbutton from '../../../Navbutton/NavButton';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import { Paper, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import LoadLoader from '../../../Loader/ClipsLoader';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const NotificationsComponent = ({ handleGoBack }) => {

    const apiUrl = process.env.REACT_APP_API_URL;


    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    let {user, authTokens} = useContext(AuthContext)

    const { t } = useTranslation(); // Initialize the translation hook


    const translateNotification = (title, content) => {
        const translationKey = title.replace(/\s/g, '').toLowerCase(); // Convert title to a key format
    
        const match = content.match(/(\d+(\.\d+)?)/); // Extract the amount from the content
        const amount = match ? match[0] : "";
    
        // Extract the status from the content (approved/denied)
        const statusMatch = content.match(/approved|denied/i);
        const status = statusMatch ? statusMatch[0] : "";
    
        return t(`notifPage.${translationKey}`, { amount, status }); // Translate and insert dynamic amount and status
    }


    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${apiUrl}/notifications/`, {
                headers: {
                    Authorization: `Bearer ${authTokens.access}`, 
                },
            });
            setNotifications(response.data);
            markNotificationsAsRead(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const markNotificationsAsRead = async () => {
        try {
        const response = await axios.patch(`${apiUrl}/notifications/mar/`, {}, {
            headers: {
                Authorization: `Bearer ${authTokens.access}`,
            },
        });

        if (response.status === 200) {
            console.log(response.data.detail);  // Log the response from the server
            // You can update the state or do something else here as needed
        }
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
    }
};

    function getIconForType(type) {
        switch (type) {
            case 'info':
                return <InfoIcon style={{ color: '#1976d2' }} />;
            case 'success':
                return <CheckCircleIcon style={{ color: '#4caf50' }} />;
            case 'warning':
                return <WarningIcon style={{ color: '#ff9800' }} />;
            case 'error':
                return <ErrorIcon style={{ color: '#f44336' }} />;
            default:
                return null;
        }
    }

    if (loading) {
        return <LoadLoader />;
    }

    if (notifications.length === 0) {
        return (
            <div>
                <Navbutton pageName={t('teamReport.noName')}showBackButton={true} onBackClick={handleGoBack} />
                <div className="no-notifications-container">
                    <NotificationsOffIcon className="no-notifications-icon" />
                    <p className="no-notifications-message"> {t('notifPage.noNot')}</p>
                    <img src={boxbox} alt="No data" className="no-data-background" />
                </div>
            </div>
        );
    }

    return (
        <div className="notifications-container">
            <Navbutton pageName={t('AccountComp.Menu_Notifications')} showBackButton={true} onBackClick={handleGoBack} />
            <div className="notifications-list">
            {notifications.map(notification => (
    <Paper key={notification.id} className="notification-item" elevation={3}>
        <div className="notification-icon-container">
            {getIconForType(notification.type)}
        </div>
        <div className="notification-content-container">
        <h3 className="notification-title">{notification.title}</h3>
        <p className="notification-content">{translateNotification(notification.title, notification.content)}</p>
        </div>
    </Paper>
))}
            </div>
        </div>
    );
};

export default NotificationsComponent;
