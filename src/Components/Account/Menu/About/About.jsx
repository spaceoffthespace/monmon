import React from 'react';
import { Typography, Paper, Grid, Divider, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import './About.css';
import Navbutton from '../../../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Aboutus = ({handleGoBack}) => {
    const { t } = useTranslation(); // Initialize the translation hook

    return (
        <div>
        <Navbutton pageName={t('aboutus.pageTitle')} showBackButton={true} onBackClick={handleGoBack}/>
    <Paper elevation={3} style={{ padding: '20px', borderRadius: '10px', margin: '20px' }}>
        <Typography variant="h4" gutterBottom align="center">
            {t('aboutus.mainTitle')}
        </Typography>
        <Divider variant="middle" style={{ margin: '20px 0' }} />

        <Typography variant="body1" paragraph>
           {t('aboutus.introText')}
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Typography variant="h6">{t('aboutus.boostingMerchantTrafficTitle')}</Typography>
                <Typography variant="body1" paragraph>
                    {t('aboutus.boostingMerchantTrafficText')}
                </Typography>

                <Typography variant="h6">{t('aboutus.buyingAndSellingTitle')}</Typography>
                <Typography variant="body1" paragraph>
                    {t('aboutus.buyingAndSellingText')}
                </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
                <Typography variant="h6">{t('aboutus.dropshippingTitle')}</Typography>
                <Typography variant="body1" paragraph>
                    {t('aboutus.dropshippingText')}
                </Typography>
                <Typography variant="h6">{t('aboutus.faqTitle')}</Typography>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{t('aboutus.faq1Question')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {t('aboutus.faq1Answer')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{t('aboutus.faq2Question')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {t('aboutus.faq2Answer')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{t('aboutus.faq3Question')}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {t('aboutus.faq3Answer')}
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                </Grid>
                </Grid>
                </Paper>
</div>
    );
}

export default Aboutus;
