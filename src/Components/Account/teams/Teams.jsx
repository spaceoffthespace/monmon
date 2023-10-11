import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import './Teams.css';
import Navbutton from '../../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const TeamsComponent = ({handleGoBack}) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { t } = useTranslation(); // Initialize the translation hook

    const handleButtonClick = () => {
        setSnackbarOpen(true);
    }

    return (
        <div className='teams-container'>
            <Navbutton pageName={t('TeamPage.Pagetitle')} showBackButton={true} onBackClick={handleGoBack}/>
            <Paper elevation={3} className="teams-rectangle">
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text1')}</Typography>
                    <Typography variant="h4">$0</Typography>
                </div>
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text2')}</Typography>
                    <Typography variant="h4">$0</Typography>
                </div>
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text3')}</Typography>
                    <Typography variant="h4">0</Typography>
                </div>
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text4')}</Typography>
                    <Typography variant="h4">0</Typography>
                </div>
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text5')}</Typography>
                    <Typography variant="h4">0</Typography>
                </div>
                <div className="teams-section">
                    <Typography variant="h6">{t('TeamPage.text6')}</Typography>
                    <Typography variant="h4">$0</Typography>
                </div>
            </Paper>
            
            <div className="teams-buttons">
                <Button
                    variant="contained"
                    color="primary"
                    className="teams-button"
                    onClick={handleButtonClick}
                >
                    {t('TeamPage.grab')}
                </Button>
                <Button
                    variant="outlined"
                   
                    className="teams-button"
                    onClick={handleButtonClick}
                >
                     {t('TeamPage.chat')}
                </Button>
            </div>

            <div className="teams-disclaimer">
                <Typography variant="body2" className="teams-disclaimer-text">
                  
                {t('TeamPage.fineprnt1')}
                </Typography>
                <Typography variant="body2" className="teams-disclaimer-text">
                {t('TeamPage.fineprnt2')}
                </Typography>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
                {t('TeamPage.alert')}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default TeamsComponent;
