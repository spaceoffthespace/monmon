import React, { useState, useEffect } from 'react';
import './FrozenTasks.css';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import LoadLoader from '../../../Loader/ClipsLoader'; // Import the loader
import boxbox from '../../../assets/box-box.png';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import axios from 'axios';

const FrozenTasksComponent = ({ tasks }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (tasks) {
      setIsLoading(false);
    }
  }, [tasks]);
  const { t } = useTranslation();

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
        setOpenSnackbar(true);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data.error.includes('You cannot afford to complete this task.')
      ) {
        const depositAmountMatch = error.response.data.error.match(/Required deposit: \$(\d+(\.\d+)?)/);
        if (depositAmountMatch) {
          const depositAmount = depositAmountMatch[1];
          setSnackbarMessage(
            t('TaskComp.additionalDepositRequired', { deposit: depositAmount })
          );
        } else {
          setSnackbarMessage(
            t('TaskComp.errorCompletingTask', { error: error.response.data.error })
          );
        }
        setAlertSeverity('error');
        setOpenSnackbar(true);
      } else {
        setSnackbarMessage(
          t('TaskComp.errorCompletingTask', {
            error: error.response ? error.response.data.error : t('unknownError'),
          })
        );
        setAlertSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading) {
    return <LoadLoader color="#000" size={30} width={4} />;
  }

  if (tasks.length === 0) {
    return (
      <div className="no-data-container">
        <img src={boxbox} alt="No data" className="no-data-background" />
        <p className="no-data-message">{t('TaskTab.nodata')}</p>
      </div>
    );
  }

  return (
    <div className="frozen-tasks">
      {tasks.map((task) => (
        <div key={task.id} className="product">
          <div className="product-image-container">
            <img
              src={task.image}
              alt={task.task_type}
              className="product-image product-image-frozen"
            />
          </div>
          <div className="product-info">
            <h5 className="product-title">{task.task_type}</h5>
            <p className="product-price">{t('TaskTab.price')}: ${task.price}</p>
            <p className="product-commission">
            {t('TaskTab.Commission')}: ${task.commission} ({task.commission_percentage}%)
            </p>
            <p className="product-status">{t('TaskTab.locked')}</p>
            <Button
              onClick={() => completeTask(task.id)} // Pass taskId to completeTask function
              variant="contained"
              color="primary"
              size="small"
            >
              {t('TaskTab.unlock')}
            </Button>
          </div>
        </div>
      ))}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FrozenTasksComponent;
