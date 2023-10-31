import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, Box, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './Recharge.css';
import { AuthContext } from '../Context/AuthContext';

import bronze from '../assets/b.png';
import silver from '../assets/s.png';
import gold from '../assets/g.png';
import platinum from '../assets/p.png';
import diamond from '../assets/d.png';

import usdt from '../assets/tokens/usdt-trc.png';
import usdteth from '../assets/tokens/usdt_eth.png';

import Navbutton from '../Navbutton/NavButton'; // Correct the import statement here

import PaymentPage from './PaymentPage/PaymentPage';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';  // or use faLandmark
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Recharge = () => {
  const [rechargeAmount, setRechargeAmount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [isTRC20Selected, setTRC20Selected] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [currency, setCurrency] = useState('USDT-ERC20');

  
  const { t } = useTranslation(); // Initialize the translation hook

  const handleTRC20Click = () => {
    setTRC20Selected(!isTRC20Selected);
};

  const handleAmountChange = (event) => {
    setRechargeAmount(event.target.value);
  };

  const handleOptionClick = (amount, currencyValue) => {
    setRechargeAmount(amount);
};
  const handlecurrency = ( currencyValue) => {
    setCurrency(currencyValue);
};


  const handleContinueClick = () => {
    if (!currency || !rechargeAmount || rechargeAmount == 0 || rechargeAmount === '0') {
        // Open the Snackbar instead of showing an alert
        setOpenSnackbar(true);
    } else {
        setCurrentStep(2);
    }
};

  const handleGoBack = () => {
    setCurrentStep(1);
  };




  return (
<div className='recharge-container'>
     
      


      
      {currentStep === 1 && (
        <div className='payment-1-wrapper'>
          <Navbutton pageName={t('RechargeComp.Pagetitle')} showBackButton={false}/>
      <Grid container spacing={2} className="recharge-input-container">
  <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', justifyContent: 'center', }}>
  <TextField
  label={t('RechargeComp.RechargeAmount')}
  type="number"
  value={rechargeAmount}
  onChange={handleAmountChange}
  variant="filled"
  fullWidth
  placeholder="Type amount"
  helperText={t('RechargeComp.HelperText')}
  InputLabelProps={{
    shrink: true,
  }}
  sx={{
    maxWidth: 450,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#43a8ff',
      },
      '&:hover fieldset': {
        borderColor: '#43a8ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#43a8ff',
      },
      // Add padding to the input element itself
      '& .MuiOutlinedInput-input': {
        paddingLeft: 2, // Adjust as needed
        paddingRight: 2, // Adjust as needed
      },
    },
  }}
/>
  </Grid>
  </Grid>
      <Grid container spacing={1} className="recharge-options">
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(20)} fullWidth>
          <img
                    src={bronze}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }}                    />
            $20
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(30)} fullWidth>
          <img
                    src={bronze}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $30
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <Button variant="contained" onClick={() => handleOptionClick(50)} fullWidth>
          <img
                    src={bronze}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $50
          </Button>
        </Grid>

        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(100)} fullWidth>
          <img
                    src={silver}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $100
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(250)} fullWidth>
          <img
                    src={silver}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $250
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(500)} fullWidth>
          <img
                    src={gold}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $500
          </Button>
        </Grid>

        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(1000)} fullWidth>
          <img
                    src={gold}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $1000
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(2000)} fullWidth>
          <img
                    src={platinum}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $2000
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(5000)} fullWidth>
          <img
                    src={platinum}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $5000
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(10000)} fullWidth>
          <img
                    src={diamond}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $10000
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(20000)} fullWidth>
          <img
                    src={diamond}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $20000
          </Button>
        </Grid>
        <Grid item xs={4} sm={4} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={() => handleOptionClick(50000)} fullWidth>
          <img
                    src={diamond}
                    alt="gold"
                    style={{
                      position: 'absolute',
                      left: '10px', // or adjust as needed
                      top: '50%',
                      transform: 'translateY(-50%)',
                      maxWidth: '150px',
                      maxHeight: '40px'
                  }} 
                  />
            $50000
          </Button>
        </Grid>

      </Grid>

        <div className='payment-method-main-container'>
          <Box
            bgcolor='white'   borderRadius={6}
            p={1}
            maxWidth="400px"  // add a maxWidth if you want
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            className="payment-method-container"
            onClick={handleTRC20Click}

          >
      <Grid item xs={12}>
        <FormControl fullWidth variant="filled">
          <InputLabel id="currency-select-label">{t('RechargeComp.Currency')}</InputLabel>
          <Select
  labelId="currency-select-label"
  id="currency-select"
  value={currency}
  label="Currency"
  onChange={(e) => setCurrency(e.target.value)}
  >

  <MenuItem value="USDT-ERC20">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        USDT
        <img
          src={usdteth}
          alt="USDT logo"
          style={{
            marginLeft: '10px',
            maxWidth: '50px',
            maxHeight: '25px'
          }} 
        />
      </div>
      <span style={{ fontSize: '0.8em', color: 'gray' }}>ERC20</span>
    </div>
  </MenuItem>
            <MenuItem value="USDT-TRC20">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  USDT
                  <img
                    src={usdt}
                    alt="USDT logo"
                    style={{
                      marginLeft: '10px',
                      maxWidth: '50px',
                      maxHeight: '25px'
                    }} 
                  />
                </div>
                <span style={{ fontSize: '0.8em', color: 'gray' }}>TRC20</span>
              </div>
            </MenuItem>
  <MenuItem value="bank-transfer" disabled>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FontAwesomeIcon icon={faUniversity} style={{ marginRight: '10px' }} />
      International Bank Transfer
    </div>
    <span style={{ fontSize: '0.8em', color: 'gray' }}>Contact Support</span>
  </div>
</MenuItem>
</Select>
        </FormControl>
      </Grid>

    </Box>



</div>
      


      <div className='continue-btn'>
            <button onClick={handleContinueClick}>{t('RechargeComp.Continue')}</button>
      </div>
      
      <Grid container spacing={2} className="reward-features">

        <Grid item xs={12} sm={6} md={3}>
      <Card className="custom-card" style={{ background: "#F6922B", padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center' }}>
          <img src={bronze} alt="Bronze Level" style={{maxWidth: '130px', maxHeight: '130px', background: '#ffff', borderRadius: '5px', marginRight: '10px' }} />
          <div>
             
              <Typography className="text-stroke" variant="h6" gutterBottom>Bronze</Typography>
              <Typography  className="text-stroke" variant="subtitle1" gutterBottom>$20 - $50</Typography>
              <Typography className="text-stroke" variant="body2">
                  <ul className='ul-rewards'>
                      <li className='ul-rewards-list'>{t('RewardLevels.Bronze1')}</li>
                      <li className='ul-rewards-list'>{t('RewardLevels.Bronze2')}</li>
                  </ul>
              </Typography>
          </div>
      </Card>
  </Grid>

    {/* Silver Card */}
    <Grid item xs={12} sm={6} md={3}>
        <Card className="custom-card" style={{ background: "#C2CAD0", padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center' }}>
                <img src={silver} alt="Silver Level" style={{maxWidth: '130px', maxHeight: '130px', background: '#ffff', borderRadius: '5px', marginRight: '10px' }} />
                <div>
            <Typography className="text-stroke" variant="h6" gutterBottom>Silver</Typography>
            <Typography className="text-stroke" variant="subtitle1" gutterBottom>$100 - $499</Typography>
            <Typography className="text-stroke" variant="body2">
                <ul className='ul-rewards'>
                    <li className='ul-rewards-list'>{t('RewardLevels.Silver1')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Silver2')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Silver3')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Silver4')}</li>
                </ul>
            </Typography>
            </div>
        </Card>
    </Grid>

    {/* Gold Card */}
    <Grid item xs={12} sm={6} md={3}>
        <Card className="custom-card" style={{ background: "#FFB70A", padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center' }}>
                <img src={gold} alt="Gold Level" style={{maxWidth: '130px', maxHeight: '130px', background: '#ffff', borderRadius: '5px', marginRight: '10px' }} />
            <div>
            <Typography className="text-stroke" variant="h6" gutterBottom>Gold</Typography>
            <Typography className="text-stroke" variant="subtitle1" gutterBottom>$500 - $1,999</Typography>
            <Typography className="text-stroke" variant="body2">
                <ul className='ul-rewards'>
                    <li className='ul-rewards-list'>{t('RewardLevels.Gold1')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Gold2')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Gold3')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Gold4')}</li>
                </ul>
            </Typography>
      
            </div>
        </Card>
    </Grid>

    {/* Platinum Card */}
    <Grid item xs={12} sm={6} md={3}>
        <Card className="custom-card" style={{ background: "#A9B1C7", padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center' }}>
                <img src={platinum} alt="Platinum Level" style={{maxWidth: '130px', maxHeight: '130px', background: '#ffff', borderRadius: '5px', marginRight: '10px' }} />
              <div>

            <Typography className="text-stroke" variant="h6" gutterBottom>Platinum</Typography>
            <Typography className="text-stroke" variant="subtitle1" gutterBottom>$2,000 - $9,999</Typography>
            <Typography className="text-stroke" variant="body2">
                <ul className='ul-rewards'>
                    <li className='ul-rewards-list'>{t('RewardLevels.Platinum1')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Platinum2')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Platinum3')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Platinum4')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Platinum5')}</li>
                </ul>
            </Typography>
              </div>
        </Card>
    </Grid>

    {/* Diamond Card */}
    <Grid item xs={12} sm={6} md={3}>
    <Card className="custom-card" style={{ background: "#5F9CB9", padding: '10px', border: '1px solid rgba(0, 0, 0, 0.12)', display: 'flex', alignItems: 'center' }}>
                <img src={diamond} alt="Diamond Level" style={{maxWidth: '130px', maxHeight: '130px', background: '#ffff', borderRadius: '5px', marginRight: '10px' }} />
            <div>

            <Typography className="text-stroke" variant="h6" gutterBottom>Diamond</Typography>
            <Typography className="text-stroke" variant="subtitle1" gutterBottom>$10,000 - $49,999</Typography>
            <Typography className="text-stroke" variant="body2">
                <ul className='ul-rewards'>
                    <li className='ul-rewards-list'>{t('RewardLevels.Diamond1')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Diamond2')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Diamond3')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Diamond4')}</li>
                    <li className='ul-rewards-list'>{t('RewardLevels.Diamond5')}</li>
                    
                </ul>
            </Typography>
            </div>
        </Card>
<div style={{ marginBottom: '50px' }}></div>
    </Grid>


</Grid>


      </div>

      
)}

{currentStep === 2 && (
  <div className='payment-1-wrapper'>
     <Navbutton pageName="Recharge" showBackButton={true} onBackClick={handleGoBack}/>

  <PaymentPage rechargeAmount={rechargeAmount} selectedCurrency={currency}/>
  </div>
)}

<Snackbar 
    open={openSnackbar} 
    autoHideDuration={6000} 
    onClose={() => setOpenSnackbar(false)}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
    <MuiAlert onClose={() => setOpenSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
        Please select a valid recharge amount and payment method before continuing.
    </MuiAlert>
</Snackbar>
    </div>
  );
};

export default Recharge;
