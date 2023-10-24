import React, { useState , useContext } from 'react';
import { Grid, Paper, Typography, Button, Snackbar, Alert } from '@mui/material';
import './Grab.css';
import { AuthContext } from '../Context/AuthContext';
import { useAppContext } from '../Context/AppContext'; // import useAppContext
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";  // Import the loader
import Navbutton from '../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook



const AnalyticsRectangle = () => {
  const { user, updateBalance, authTokens } = useContext(AuthContext);
  const { tasks } = useAppContext(); // get tasks from AppContext
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [fetchingData, setFetchingData] = useState(false);  // New state to track if we are fetching data

  // count tasks
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;
  const frozenTasksCount = tasks.filter(task => task.status === 'frozen').length;

  const { t } = useTranslation(); // Initialize the translation hook

  const errorToTranslationKey = {
    'INSUFFICIENT_BALANCE': 'GrabComp.insufficientBalance',
    'PENDING_TASK': 'GrabComp.pendingTask',
    'NO_TASKS_LEFT': 'GrabComp.noTasksLeft'
    // Add more mappings as needed
  };
  const grabOrder = () => {

    const apiUrl = process.env.REACT_APP_API_URL;


    setFetchingData(true); 
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));

    if (!authTokens || !authTokens.access) {
      console.error('authTokens is not defined or does not have an access property');
      return;
    }


    axios.get(`${apiUrl}/grab_order/`, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`
      }
    })
    .then(response => {
      user.balance = response.data.balance;
      updateBalance();
      setFetchingData(false); 

      setSnackbarMessage('success');
      setAlertSeverity('success');
      setSnackbarOpen(true);
    
    })
    .catch(error => {
      if (error.response && error.response.data && error.response.data.error_code) {
        const translationKey = errorToTranslationKey[error.response.data.error_code];
        if (translationKey) {
          setSnackbarMessage(t(translationKey)); // Translating the error message
          setAlertSeverity('error');
          setSnackbarOpen(true);
        } else {
          console.error('Unknown error code', error.response.data.error_code);
        }
      } else {
        console.error('Something went wrong!', error);
      }
      setFetchingData(false);
    });
  };



  return (
    <div className='grap-container'>
    <Navbutton  pageName={t('GrabComp.Pagetitle')} showBackButton={false} o/>
    <Paper elevation={3} className="analytics-rectangle">
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.All')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : `${user.tasks_left_today}`}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.PersonalEarnings')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : `$${user.total_earnings}`}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.CompletedOrders')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : user.tasks_done_today}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.LockedOrders')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : frozenTasksCount}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.UnfinishedOrders')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : pendingTasksCount}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.Hold')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : `$${user.hold_balance}`}
        </Typography>
      </div>
      <div className="analytics-section">
        <Typography variant="h6">{t('GrabComp.CurrentBalance')}</Typography>
        <Typography variant="h4">
          {fetchingData ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : `$${user.balance}`}
        </Typography>
      </div>
    </Paper>

      <Button
        variant="contained"
        color="primary"
        className="grab-order-button"
        style={{
          background: 'linear-gradient(90deg, rgb(67, 168, 255), rgb(67, 168, 255))',
          color: '#fff',
          borderRadius: '4px',
          padding: '10px 20px',
          marginTop: '20px',
          fontWeight: 'bold',
          boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
        }}
        onClick={grabOrder}
      >
        {t('GrabComp.Grab')}
      </Button>

      <div className="disclaimer">
        <Typography variant="body2" className="disclaimer-text" >
        {t('GrabComp.text1')}
        </Typography>
        <Typography variant="body2" className="disclaimer-text" >
        {t('GrabComp.text2')}
        </Typography>
        <Typography variant="body2" className="disclaimer-text" >
        {t('GrabComp.text3')}
        </Typography>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center the Snackbar
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AnalyticsRectangle;
