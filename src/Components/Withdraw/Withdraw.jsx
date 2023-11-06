import React, { useState, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { AuthContext } from '../Context/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import usdt from '../assets/tokens/usdt-trc.png';
import usdteth from '../assets/tokens/usdt_eth.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';  // or use faLandmark
import './Withdraw.css';
import { InputAdornment } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import Navbutton from '../Navbutton/NavButton';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});


const apiUrl = process.env.REACT_APP_API_URL;

const Withdraw = ({ handleGoBack }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const { user, authTokens } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [currency, setCurrency] = useState('USDT-ERC20');
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [deliveryAddressSet, setDeliveryAddressSet] = useState(!!user.deliveryAddress);
  const { t } = useTranslation();

  const handleConfirmWithdrawal = (e) => {
    e.preventDefault();
    setIsConfirming(false);
    handleWithdraw();
  };

  const handleWithdraw = async () => {

    const withdrawalAmount = parseFloat(withdrawAmount);

    // Check if the withdrawal amount is greater than the available balance
    if (withdrawalAmount > parseFloat(user.balance)) {
      setInsufficientBalance(true);
      return; // Stop further execution if the amount exceeds the balance
    }

    setInsufficientBalance(false); // Reset the insufficient balance error

    const data = {
      amount: withdrawalAmount,
      additionalInfo: additionalInfo,
      address: user.deliveryAddress, // Use the delivery address as the withdrawal address
      currency: currency,
      user: user.id, // Add this line, Django REST Framework expects the user ID here
    };

    try {
      const response = await axios.post(`${apiUrl}/requested-withdraw/`, data, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Include the Bearer token in the Authorization header
        },
      });
    
      setWithdrawAmount('');
      setAdditionalInfo('');
      setSeverity('success');
      setMessage(t('WithdrawComp.Success'));
      setOpen(true);
    } catch (error) {
  
      if (error.response && error.response.data && error.response.data.error) {
        setSeverity('error');

        if (error.response.data.error === "You must finish all available tasks for today before withdrawing.") {
            setMessage(t('WithdrawComp.TasksNotCompleted'));  // This is assuming you added a new entry in your translation JSON for this error message.
        } else {
           setMessage(t('WithdrawComp.TasksNotCompleted'));
        }
    } else {
        setSeverity('error');
        setMessage(t('WithdrawComp.ErrorMakingWithdrawal'));  // Generic error message.
    }

    setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleConfirmAddress = () => {
    const withdrawalAmountNum = parseFloat(withdrawAmount);
    
    if (!user.deliveryAddress) {
      setSeverity('error');
      setMessage(t('WithdrawComp.NoDeliveryAddress'));
      setOpen(true);
      return; // Exit the function here if no delivery address
    }
  
    if (parseFloat(user.balance) <= 10) {
      setSeverity('error');
      setMessage(t('WithdrawComp.InsufficientBalanceError')); // You'll need to define this message in your translations
      setOpen(true);
      return; // Exit the function here if balance is not greater than 10
    }
  
    if (withdrawalAmountNum > parseFloat(user.balance)) {
      setSeverity('error');
      setMessage(t('WithdrawComp.InsufficientBalanceError'));
      setOpen(true);
      return; // Exit the function here if withdrawal amount exceeds balance
    }
  
    // Only proceed to confirm if there's enough balance and it's over 10
    setIsConfirming(true);
  };
  

  return (
    <div>
       <Navbutton pageName={t('WithdrawComp.Pagetitle')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}
    <Box className="withdraw-container">
      <Typography variant="h5" className="withdraw-heading">
      {t('WithdrawComp.title2')}
      </Typography>
      <Typography variant="body2" className="balance-text">
      {t('WithdrawComp.BalanceText')}: {user.balance} USDT
      </Typography>

      <form className={`withdraw-form ${isConfirming ? 'confirm-delivery-address' : ''}`}>
        <Grid container spacing={2}>
          {isConfirming ? (
            <>
              <Grid item xs={12}>
                <Typography variant="body2" className="delivery-address-text">
                {t('WithdrawComp.DeliveryAddressText')}: {user.deliveryAddress}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className="withdraw-confirm-button"
                  onClick={handleConfirmWithdrawal}
                  >
                  {t('WithdrawComp.ConfirmWithdrawalButton')}
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
              <TextField
                  type="number"
                  label={t('WithdrawComp.WithdrawAmount')} 
                  variant="filled"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          size="small"
                          onClick={() => setWithdrawAmount(user.balance.toString())}
                        >
                          MAX
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              {insufficientBalance && (
                <Grid item xs={12}>
                  <Typography variant="body2" className="error-text">
                  {t('WithdrawComp.InsufficientBalanceError')}
                  </Typography>
                </Grid>
              )}

              <Grid item xs={12}>
              <FormControl fullWidth variant="filled">
    <InputLabel id="currency-select-label">{t('WithdrawComp.CurrencyLabel')}</InputLabel>
    <Select
      labelId="currency-select-label"
      id="currency-select"
      value={currency}
      label="Currency"
      onChange={(e) => setCurrency(e.target.value)}
    >
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

              <Grid item xs={12}>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  className="withdraw-button"
                  onClick={handleConfirmAddress}
                  >
                   {t('WithdrawComp.RequestWithdrawalButton')}
                </Button>
              </Grid>
            </>
          )}
        </Grid>

      </form>

      <Box className="withdraw-info">
        <Typography variant="body2" className="info-text">
        {t('WithdrawComp.InfoText1')}
        </Typography>
        <Typography variant="body2" className="info-text">
        {t('WithdrawComp.InfoText2')}
        </Typography>
      </Box>
      <Divider />
      <Typography variant="body2" className="withdraw-fine-print">
      {t('WithdrawComp.FinePrint')}
      </Typography>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
      </div>
  );
};

export default Withdraw;
