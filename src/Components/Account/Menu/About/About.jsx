import React from 'react';
import { Typography, Paper, Grid, Divider } from '@mui/material';
import './About.css';
import Navbutton from '../../../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Aboutus = ({handleGoBack}) => {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div>
            <Navbutton pageName={t('MenuAbout.pageTitle')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                About Us
            </Typography>
            <Divider variant="middle" style={{ margin: '20px 0' }} />

            <Typography variant="body1" paragraph>
                At the core of our platform lies a profound mission: crafting a symbiotic relationship between merchants and our active user community. This vision is brought to life through our state-of-the-art task-based system.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Empowering Users:</Typography>
                    <Typography variant="body1" paragraph>
                        Our system not only provides a platform for users to engage and earn but also forms a nexus where contributions actively shape market dynamics. Here, every task is a step towards mutual success.
                    </Typography>

                    <Typography variant="h6">Trust and Collaboration:</Typography>
                    <Typography variant="body1" paragraph>
                        Our associations go beyond mere business contracts. They're weaved with threads of trust and mutual respect. Our enduring collaboration with Amazon merchants stands as an embodiment of this trust.
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Boosting Merchant Sales:</Typography>
                    <Typography variant="body1" paragraph>
                        Through our nurtured collaborations with premier merchants on platforms like Amazon, we facilitate the enhancement of sales data. In this ecosystem, merchants discover new horizons for their online ventures.
                    </Typography>

                    <Typography variant="h6">High Commissions, Real Benefits:</Typography>
                    <Typography variant="body1" paragraph>
                        Every user's effort is rewarded with enticing commissions, creating an environment of reciprocity. This paradigm ensures that while merchants flourish, our users are always rewarded for their dedication.
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body1" align="center" paragraph>
                We're not merely a platform; we're a movement. A consortium bound by collaboration, trust, and mutual growth. We invite you to be an integral part of our transformative odyssey.
            </Typography>
        </Paper>
        </div>
    );
}

export default Aboutus;
