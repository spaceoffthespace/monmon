import React from 'react';
import { Typography, Paper, Grid, Divider } from '@mui/material';
import './Security.css';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import Navbutton from '../../../Navbutton/NavButton';
const SecurityComponent = ({handleGoBack}) => {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div>
                <Navbutton pageName={t('MenuSecurity.pageTitle')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}
        <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', margin: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">
                Our Commitment to Security and trust
            </Typography>
            <Divider variant="middle" style={{ margin: '20px 0' }} />

            <Typography variant="body1" paragraph>
                In an evolving digital era, the safeguarding of user data and transaction security stands paramount. We've ingrained this principle deeply within our platform's architecture.
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">End-to-End Encryption:</Typography>
                    <Typography variant="body1" paragraph>
                        All transactions and task data are encrypted both in transit and at rest, ensuring that your details remain confidential.
                    </Typography>

                    <Typography variant="h6">Trust in Our Ecosystem:</Typography>
                    <Typography variant="body1" paragraph>
                        We've built an ecosystem founded on trust. Our users trust us to safeguard their interests, and we uphold this trust with unwavering dedication.
                    </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Data Privacy is Paramount:</Typography>
                    <Typography variant="body1" paragraph>
                        Your personal information is never shared with third parties or used for unintended purposes. Our privacy protocols ensure a seamless and safe experience.
                    </Typography>

                    <Typography variant="h6">Constant Vigilance:</Typography>
                    <Typography variant="body1" paragraph>
                        Our team constantly monitors and updates our security measures to tackle emerging threats. With us, you're always in safe hands.
                    </Typography>
                </Grid>
            </Grid>

            <Typography variant="body1" align="center" paragraph>
                Security isn't just a feature for us; it's an inherent promise. With each task you perform, rest assured that your data and interests are always protected.
            </Typography>
        </Paper>
        </div>
    );
}

export default SecurityComponent;
