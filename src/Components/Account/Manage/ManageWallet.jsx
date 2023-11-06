import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../../Context/AuthContext';
import './ManageWallet.css';
import Navbutton from '../../Navbutton/NavButton';
import { Grid, Paper, TextField, Button, Box, Card, CardContent, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook


import usdt from '../../assets/tokens/usdt-trc.png';
import usdteth from '../../assets/tokens/usdt_eth.png';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const ManageWallet = ({ onUpdateSuccess, handleGoBack }) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [currency, setCurrency] = useState('USDT-ERC20');

  const [newAddress, setNewAddress] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const { user, updateBalance, authTokens } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false); // Add this line

  const { t } = useTranslation(); // Initialize the translation hook



  useEffect(() => {
    updateBalance();
  }, [user.deliveryAddress]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      deliveryAddress: newAddress,
    };

    try {
      const response = await axios.patch(`${apiUrl}/update-delivery-address/${user.id}/`, data, {
        headers: {
          'Authorization': `Bearer ${authTokens.access}`
        },
      });
      onUpdateSuccess(response.data.deliveryAddress);
      setNewAddress('');
      setAlertType('success');
      setAlertMessage(t('manageWalletPage.snack1'));
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
      setAlertType('success');

      // Check if error response from server contains a message
       // Check if error response from server contains a message
    if (error.response && error.response.data && error.response.data.message) {
      setAlertMessage(t('manageWalletPage.snack3'));
    } else {
      setAlertType('error');
      setAlertMessage(t('manageWalletPage.snack2'));
    }

      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
<div>
        <Navbutton pageName= {t('AccountComp.ManageWallet')} showBackButton={true} onBackClick={handleGoBack} />
        <div className="manage-wallet-container">
            <Typography variant="h5" className="manage-wallet-heading">
            {t('manageWalletPage.manageWalletHeading')}
            </Typography>
            {user.deliveryAddress && !isEditing ? (
              

                
              
              <div onClick={() => setIsEditing(true)} className="wallet-display-container">
                <div>
  <span style={{ color: '#2196f3' }}>
  {t('manageWalletPage.curadd')}
  </span>
  <br />
  {user.deliveryAddress}
</div>
    <EditIcon />
    <Typography variant="body2" style={{ marginLeft: '5px', color: '#2196f3' }}>
      {t('manageWalletPage.clickToEdit')} {/* Translation hook to provide text in different languages */}

    </Typography>
  </div>
) : (!user.deliveryAddress || isEditing) ? (
    <React.Fragment>
        {!user.deliveryAddress && 
            <Typography variant="body1" className="no-wallet-address">
                {t('manageWalletPage.noWalletAddressText')}
            </Typography>
        }
        <form onSubmit={handleUpdate} className="manage-wallet-form">
            <TextField
                type="text"
                label="Update Wallet Address"
                variant="filled"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="manage-wallet-input"
                helperText={t('manageWalletPage.walletAddressHelperText')} // Add this line for helper text

            />


<Grid item xs={12} sm={6} className="wallet-currency-selector">
<FormControl fullWidth variant="filled" className="wallet-currency-selector">
  <InputLabel id="currency-select-label">{t('RechargeComp.Currency')}</InputLabel>
  <Select
    labelId="currency-select-label"
    id="currency-select"
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
    label={t('RechargeComp.Currency')}
    MenuProps={{ // Add this to adjust the style of the dropdown
      PaperProps: {
        style: {
          maxHeight: '50vh', // Limit the height of the dropdown
          overflow: 'auto', // Scroll inside the dropdown
        },
      },
    }}
  >
            <MenuItem value="USDT-ERC20">
              <div className="currency-select-item">
                <img src={usdteth} alt="USDT (ERC20)" className="currency-icon" />
                USDT (ERC20)
              </div>
            </MenuItem>
            <MenuItem value="USDT-TRC20">
              <div className="currency-select-item">
                <img src={usdt} alt="USDT (TRC20)" className="currency-icon" />
                USDT (TRC20)
              </div>
            </MenuItem>
            {/* Add more currencies as needed */}
          </Select>
          <FormHelperText>{t('manageWalletPage.currencyHelperText')}</FormHelperText> {/* Add this line for currency helper text */}
        </FormControl>
      </Grid>

            <Button variant="contained" type="submit" className="manage-wallet-button">
            {t('manageWalletPage.updateWalletLabel')}
            </Button>
        </form>
    </React.Fragment>
) : null}
        <div className="additional-info">
          <Typography variant="body2" className="info-text">
          {t('manageWalletPage.additionalInfoText1')}
          </Typography>
          <Typography variant="body2" className="info-text">
          {t('manageWalletPage.additionalInfoText2')}
          </Typography>
        </div>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={alertType} elevation={6} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageWallet;
