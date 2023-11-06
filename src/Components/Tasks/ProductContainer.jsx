import React, { useState, useEffect } from 'react';
import { Button, Snackbar } from '@mui/material';
import axios from 'axios';
import './ProductContainer.css';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const Product = ({ task, onComplete }) => {

  const apiUrl = process.env.REACT_APP_API_URL;


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [timeRemainingInSeconds, setTimeRemainingInSeconds] = useState(3600); // 60 minutes * 60 seconds
  const { t } = useTranslation(); // Initialize the translation hook

  useEffect(() => {
    const createdTime = new Date(task.created_at);
    const currentTime = new Date();
    const timeElapsed = Math.floor((currentTime - createdTime) / 1000); // Time elapsed in seconds
    setTimeRemainingInSeconds(3600 - timeElapsed);

    const timer = setInterval(() => {
      setTimeRemainingInSeconds((prevTime) => {
        if (prevTime <= 0) {
          freezeTask(task.id);
       }
        return Math.max(prevTime - 1, 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [task.created_at, task.id]);

  const minutesRemaining = Math.floor(timeRemainingInSeconds / 60);
  const secondsRemaining = timeRemainingInSeconds % 60;
  const formatSeconds = (seconds) => (seconds < 10 ? `0${seconds}` : seconds);

  const freezeTask = async (taskId) => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));

    try {
      await axios.patch(
        `${apiUrl}/us-tasks/${taskId}/`,
        { status: 'frozen' },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      setSnackbarMessage(t('TaskComp.taskFrozen'));
      setAlertSeverity('warning');
      setSnackbarOpen(true);
      onComplete();
    } catch (error) {
      console.error('Error freezing task:', error);
    }
  };

  const completeTask = async (taskId) => {
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
  
    try {
      const response = await axios.patch(
        `${apiUrl}/us-tasks/${taskId}/`,
        {
          status: 'completed',
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );
  
      if (response.status === 200) {
        setSnackbarMessage(t('taskFrozen.taskCompleted'));
        setAlertSeverity('success');
        setSnackbarOpen(true);
        onComplete(); // Call the onComplete function passed from the parent component to update tasks
      }
    } catch (error) {
      if (error?.response?.data?.error && typeof error.response.data.error === 'string' && error.response.data.error.includes('You cannot afford to complete this task.')) {
        const depositAmountMatch = error.response.data.error.match(/Required deposit: \$(\d+(\.\d+)?)/);
        if (depositAmountMatch) {
          const depositAmount = depositAmountMatch[1];
          setSnackbarMessage(t('TaskComp.additionalDepositRequired', { deposit: depositAmount }));
        } else {
          setSnackbarMessage(t('TaskComp.errorCompletingTask', { error: error.response.data.error }));
        }
        setAlertSeverity('error');
        setSnackbarOpen(true);
      } else {
        // This will handle any other errors and ensure we don't run into a TypeError when accessing undefined properties
        const errorMessage = error?.response?.data?.error || t('unknownError');
        setSnackbarMessage(t('TaskComp.errorCompletingTask', { error: errorMessage }));
        setAlertSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  

  return (
    <div className="product">
      <img src={task.image} alt={task.task_type} className="product-image" />
      <div className="product-info">
        <h5 className="product-title">{task.task_type}</h5>
        <p className="product-price">{t('TaskComp.price', {price: task.price})}</p>
        <p className="completed-task-commission">{t('TaskComp.commission', {commission: task.commission, percentage: task.commission_percentage})}</p>
        <div className="product-time-remaining">{minutesRemaining}:{formatSeconds(secondsRemaining)}</div>
        <Button
          variant="contained"
          color="primary"
          className="product-button"
          onClick={() => completeTask(task.id)}
        >
        {t('TaskComp.submitOrder')}

        </Button>
      </div>
      <div className="alert-container">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={alertSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Product;