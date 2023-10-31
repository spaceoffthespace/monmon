import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField , IconButton } from '@mui/material';
import qr from '../../assets/qr.png';
import './PaymentPage.css';
import CircularProgress from '@mui/material/CircularProgress'; // Add this import

import CameraAltIcon from '@mui/icons-material/CameraAlt';
import usdt from '../../assets/tokens/usdt-trc.png';
import usdteth from '../../assets/tokens/usdt_eth.png';
import axios from 'axios';
import { Snackbar, Alert } from '@mui/material';
import LoadLoader from '../../Loader/ClipsLoader';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const PaymentPage = ({ rechargeAmount, selectedCurrency }) => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [walletAddress, setWalletAddress] = useState('');


  const [selectedOption, setSelectedOption] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false); // New state variable


  const { t } = useTranslation(); // Initialize the translation hook


  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setUploadedImage(file);
    setSelectedFile(file); // Store the selected file in the state
    setError(null); 


    const fileName = file ? file.name : "No file selected";

  };

  const handleOptionClick = () => {
    setSelectedOption(!selectedOption);
  };

  let {user, authTokens} = useContext(AuthContext)

 const handleFinishUpload = () => {
  setIsUploading(true);
  if (!uploadedImage) {
    setError("Please upload a screenshot before finishing upload");
    setIsUploading(false);
    return;
  }




  const formData = new FormData();
  formData.append('file', uploadedImage);

  // Check if user.id is available
  if (user && user.id) {
    formData.append('user', parseInt(user.id));
  } else {
    return;
  }
  

  formData.append('amount', rechargeAmount); // append the recharge amount


  axios.post(`${apiUrl}/upload/`, formData, {
    headers: {
      'Authorization': `Bearer ${authTokens.access}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
   
    setAlertSeverity('success');
    setAlertMessage(t('PaymentPage.snack1'));
    setSnackbarOpen(true);
    handleCloseModal();
  })
  .catch((error) => {
    setAlertSeverity('error');
    setAlertMessage(t('PaymentPage.snack2error'));
    setSnackbarOpen(true);
  })
  .finally(() => {
    setIsUploading(false); // Reset isUploading after the request is complete
  });
  
 // Set isUploading to true when starting the upload request
};


const handleCopyWallet = () => {
  const walletElement = document.getElementById('payment-page-wallet');
  if (walletElement) {
    const walletValue = walletElement.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(walletValue)
        .then(() => {
          // Instead of native alert, use Snackbar to display the message
          setAlertMessage(t('PaymentPage.copied'));
          setAlertSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error) => {
          
          // Here also, you can set an error message to show in the Snackbar
          setAlertMessage(t('PaymentPage.copiedfail'));
          setAlertSeverity('error');
          setSnackbarOpen(true);
        });
    } else if (document.queryCommandSupported && document.execCommand) {
      const textarea = document.createElement('textarea');
      textarea.value = walletValue;
      textarea.style.position = 'fixed'; // Prevent scrolling to bottom
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        if (successful) {
          // Instead of native alert, use Snackbar to display the message
          setAlertMessage(t('PaymentPage.copied'));
          setAlertSeverity('success');
          setSnackbarOpen(true);
        } else {
        }
      } catch (error) {
      }

      document.body.removeChild(textarea);
    } else {
    }
  }
};


const walletAddresses = {
  'USDT-ERC20': '0xa4f38e39e3b272c411617621778bC02a2119A552',
  'USDT-TRC20': 'TSkhVXrttkf3pJBXohdLgkf8B91VdadU6h'
  // 'USDT-TRC20': '0x76d59F6AD53103a1b49BCB6447905e5445ebC73B',
  // 'USDT-ETH': 'TYMpU1f8Cv8FwR6T3MBvAwzimZSJu67ScU',
};

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };



  return (
    <div className="payment-page-container">
      <Paper elevation={3} className="payment-page-option">
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
          <img 
    src={selectedCurrency === 'USDT-TRC20' ? usdt : usdteth} 
    alt="USDT" 
    className="payment-page-image" 
/>
          </Grid>
          <Grid item>
            <Typography variant="body2" className="payment-page-text2">
               {selectedCurrency}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className="payment-page-text3">
        {t('PaymentPage.PayTo')}: 
        </Typography>
        <Typography variant="body2" className="payment-page-text4">
          {rechargeAmount} USD 
        </Typography>
        <img src={qr} alt="QR Code" className="payment-page-qr" />
        <Typography variant="body2" id="payment-page-wallet" className="payment-page-text4">
        {walletAddresses[selectedCurrency]}
        </Typography>
        <div style={{ margin: '5px' }} />
        <Button variant="outlined" className="pay-btn" onClick={handleCopyWallet}>
        {t('PaymentPage.CopyWallet')}
        </Button>
        <div style={{ margin: '10px' }} />
        <Button variant="contained" className="pay-btn" onClick={handleOpenModal}>
        {t('PaymentPage.Done')}
        </Button>
        
        <Dialog open={openModal} onClose={handleCloseModal}>
  <DialogTitle>{t('PaymentPage.Upload')}</DialogTitle>
  <DialogContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    {/* Custom File Upload Button with Camera Icon */}
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <IconButton
              color="primary"
              component="label"
              style={{
                width: '100px',
                height: '100px',
                border: '2px dashed gray',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: isUploading ? 'not-allowed' : 'pointer', // Disable button during upload
              }}
              disabled={isUploading} // Disable button during upload
            >
              {isUploading ? ( // Show loading spinner when uploading
                <CircularProgress size={24} color="primary" />
              ) : (
                <CameraAltIcon fontSize="large" />
              )}
              <input
                type="file"
                hidden
                onChange={handleImageUpload}
                accept="image/*"
                disabled={isUploading} // Disable input during upload
              />
      </IconButton>
    </div>
    {/* End of Custom File Upload Button with Camera Icon */}
    <div style={{ margin: '10px' }} />
    {selectedFile && <Typography variant="body2" color="textPrimary" style={{ marginBottom: '10px' }}>
    {t('PaymentPage.File')}
          </Typography>}
          {error && <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
            {error}
          </Typography>}
    <div style={{ alignSelf: 'flex-start' }}>
      <Typography variant="body2" color="textSecondary">
      {t('PaymentPage.Notice')}
      </Typography>
    </div>
  </DialogContent>
  <DialogActions>
  <Button 
    onClick={handleFinishUpload} 
    variant="contained" 
    disabled={isUploading} // Disable the button when uploading is in progress
    startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : null} // Show loading spinner when uploading
  >
    {t('PaymentPage.Finished')}
  </Button>
  <Button onClick={handleCloseModal}>{t('PaymentPage.Close')}</Button>
</DialogActions>
</Dialog>
        
      </Paper>

      <div className='disclaimer'>
  <Typography variant='body2' className='disclaimer-text'>
  {t('PaymentPage.text1')}
  </Typography>
  <Typography variant='body2' className='disclaimer-text'>
  {t('PaymentPage.text2')}
  </Typography>
  <Typography variant='body2' className='disclaimer-text'>
  {t('PaymentPage.text3')}
  </Typography>


</div>

<Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity} variant="filled">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PaymentPage;
