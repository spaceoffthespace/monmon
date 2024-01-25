import React, { useState , useContext, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Snackbar, Alert,  Card,
  CardContent,
  CardMedia, Box, Modal } from '@mui/material';
import './Grab.css';
import { AuthContext } from '../Context/AuthContext';
import { useAppContext } from '../Context/AppContext'; // import useAppContext
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";  // Import the loader
import Navbutton from '../Navbutton/NavButton';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook


const apiUrl = process.env.REACT_APP_API_URL;

const AnalyticsRectangle = () => {
  const { user, updateBalance, authTokens } = useContext(AuthContext);
  const { tasks } = useAppContext(); // get tasks from AppContext
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [fetchingData, setFetchingData] = useState(false);  // New state to track if we are fetching data

  const [remainingTime, setRemainingTime] = useState(24 * 60 * 60); // 24 hours in seconds

  const [selectedProduct, setSelectedProduct] = useState(null); // Add selectedProduct state

  const [openModal, setOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  useEffect(() => {
    if (user.tasks_left_today === 0) {
      const countdownStart = localStorage.getItem('countdownStart') || new Date().toISOString();
      localStorage.setItem('countdownStart', countdownStart);

      const timeElapsed = (new Date() - new Date(countdownStart)) / 1000;
      setRemainingTime(Math.max(24 * 60 * 60 - timeElapsed, 0));
    } else {
      localStorage.removeItem('countdownStart');
    }
  }, [user.tasks_left_today]);

  useEffect(() => {
    let interval;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime(prevTime => Math.max(prevTime - 1, 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [remainingTime]);


  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60); // If you want to include whole seconds only
    // For milliseconds, you would take the fractional part of seconds and multiply by 1000
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };



  // count tasks
  const completedTasksCount = tasks.filter(task => task.status === 'completed').length;
  const pendingTasksCount = tasks.filter(task => task.status === 'pending').length;
  const frozenTasksCount = tasks.filter(task => task.status === 'frozen').length;
  const lasttask = tasks.filter(task => task.status === 'frozen').length;



  const { t } = useTranslation(); // Initialize the translation hook

  const errorToTranslationKey = {
    'INSUFFICIENT_BALANCE': 'GrabComp.insufficientBalance',
    'PENDING_TASK': 'GrabComp.pendingTask',
    'NO_TASKS_LEFT': 'GrabComp.noTasksLeft'
    // Add more mappings as needed
  };
  const grabOrder = () => {



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
      setFetchingData(false);
      // Handle the response for a new task
      setSelectedProduct(response.data.selected_product);
      user.balance = response.data.balance;
      updateBalance();
      setSnackbarMessage('success');
      setAlertSeverity('success');
      setSnackbarOpen(true);
      setIsModalOpen(true);
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

  const completeTask = async () => {

  
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  
    try {
      const response = await axios.patch(
        `${apiUrl}/us-tasks/${selectedProduct.task_id}/`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${authTokens.access}` } }
      );
  
      console.log('Task completion response:', response);
      console.log(selectedProduct.task_id);
  
      if (response.status === 200) {
        console.log('Task completed successfully:', response.data);
        setSnackbarMessage(t('TaskComp.taskCompleted')); // Make sure this key exists in your translation files
        setAlertSeverity('success');
        setSnackbarOpen(true);
        // This should be a function that updates the task list
        setIsModalOpen(false); // Close the modal
        setSelectedProduct(null); // Clear the selected task
      } else {
        console.log('Task completion returned non-200 status:', response.status);
        // Handle unexpected status codes
      }
    } catch (error) {
      console.error('Error completing task:', error);
      const errorMessage = error?.response?.data?.error || t('TaskComp.unknownError');
      setSnackbarMessage(t('TaskComp.errorCompletingTask', { error: errorMessage }));
      setAlertSeverity('error');
      setSnackbarOpen(true);
    }
  };

  function getMaxTasksForAccountType(accountType) {
    switch (accountType) {
      case 'bronze':
        return 20;
      case 'silver':
        return 30;
      case 'gold':
        return 40;
      case 'platinum':
        return 50;
      case 'diamond':
        return 60;
      default:
        return 0; // Handle unknown account types
    }
  }

  const modalContent = (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="product-title"
      aria-describedby="product-description"
    >
      <Box className="modal-box-style">
        <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
          <div className="modal-image-section">
            {selectedProduct && selectedProduct.image && (
              <img className="modal-product-image" src={selectedProduct.image} alt={selectedProduct.title} />
            )}
          </div>
          <div className="modal-details-section">
            <Typography id="product-title" variant="h6" component="h2" gutterBottom>
              {selectedProduct && selectedProduct.title}
            </Typography>
            <div className="price-section">
              <Typography variant="body2" gutterBottom>
                {selectedProduct && <strong>Price:</strong>} {selectedProduct && `$${selectedProduct.price.toFixed(2)}`}
              </Typography>
            </div>
            <div className="commission-section">
              <Typography variant="body2" gutterBottom>
                {selectedProduct && <strong>Commission:</strong>} {selectedProduct && `$${selectedProduct.commission.toFixed(2)} (${selectedProduct.commission_percentage}%)`}
              </Typography>
            </div>
            <Button onClick={() => completeTask(selectedProduct.task_id)} variant="contained" color="primary" sx={{ mt: 2 }}>
              {t('TaskComp.submitOrder')}
            </Button>
          </div>
        </Paper>
      </Box>
    </Modal>
  );

  return (
    <div className='grap-container'>
    <Navbutton  pageName={t('GrabComp.Pagetitle')} showBackButton={false} o/>
    <Paper elevation={3} className="analytics-rectangle">

    <div className="analytics-section">
  <Typography variant="h6">{t('GrabComp.All')}</Typography>
  <Typography variant="h4">
    {fetchingData 
      ? <ClipLoader color="#FFFFFF" height={24} width={24} />
      : `${user.tasks_left_today - 1}/${getMaxTasksForAccountType(user.account_type)}`
    }
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
        {fetchingData || user.balance === undefined ? <ClipLoader color="#FFFFFF" css={{animation: 'none'}} height={24} width={24} /> : `$${user.balance}`}
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

      <div>{modalContent}</div>


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
