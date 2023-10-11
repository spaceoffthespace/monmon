import React, { useContext } from 'react';
import './Acc.css';
import { Grid, Paper, Typography, Avatar } from '@mui/material';
import head from '../../../assets/heads/head_9.png';
import { AuthContext } from '../../../Context/AuthContext';
import Navbutton from '../../../Navbutton/NavButton';

import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Acc = ({ handleGoBack }) => {

    const { t } = useTranslation(); // Initialize the translation hook

    const { user } = useContext(AuthContext);

    return (
        <Grid container spacing={2}>
            <Navbutton pageName={t('accountPage.pageTitle')}  showBackButton={true} onBackClick={handleGoBack}/>

            <Grid item xs={12}>
                <Paper elevation={3} className="account-paper">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={3} md={2}>
                            <Avatar src={head} alt="Profile" className="account-avatar" />
                        </Grid>
                        <Grid item xs={12} sm={9} md={10}>
                            <Typography variant="h5" gutterBottom className="account-header">
                                {user.first_name} {user.last_name}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="account-info">
                            {t('accountPage.phoneNumberLabel')}: {user.username}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="account-info">
                            {t('accountPage.emailLabel')}: {user.email}
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom className="account-info">
                            {t('accountPage.accountTypeLabel')}: {user.account_type}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Acc;
