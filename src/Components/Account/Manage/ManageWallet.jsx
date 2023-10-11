import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../../Context/AuthContext';
import './ManageWallet.css';
import Navbutton from '../../Navbutton/NavButton';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const ManageWallet = ({ onUpdateSuccess, handleGoBack }) => {

  const apiUrl = process.env.REACT_APP_API_URL;


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
      setAlertType('error');

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
    <div className="wallet-display-container">
        <Typography variant="body1" className="wallet-address-value">
            {user.deliveryAddress}
        </Typography>
        <EditIcon onClick={() => setIsEditing(true)} /> {/* Pen icon for editing */}
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
                variant="outlined"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="manage-wallet-input"
            />
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
