import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PendingTasksComponent from './TaskTab/Pending/PendingTasks';
import CompletedTasks from './TaskTab/Completed/SettledTasks';
import FrozenTasksComponent from './TaskTab/Frozen/FrozenTasks';
import './Task.css'
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../Context/AuthContext';
import { useAppContext } from '../Context/AppContext'; // import your context
import LoadLoader from '../Loader/ClipsLoader';

const Task = () => {
  const [value, setValue] = useState(0);
  const { user, updatebalance, authTokens } = useContext(AuthContext);
  const { tasks, setTasks } = useAppContext(); // get tasks and setTasks from context
  const { t } = useTranslation();
  const [loadingTasks, setLoadingTasks] = useState(true);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const response = await axios.get(`${apiUrl}/us-tasks/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [authTokens, setTasks]);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refreshTasks = async () => {
    setLoadingTasks(true); // Set the loading state to true when starting the refresh
    try {
      const response = await axios.get(`${apiUrl}/us-tasks/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error refreshing tasks:', error);
    } finally {
      setLoadingTasks(false); // Set the loading state to false once the refresh completes
    }
  };

  if (loadingTasks) {
    return <LoadLoader color="#000" size={30} width={4} />;
  }
  

  return (
    <div>
      <Box sx={{ width: '100%' }} className="tabs-container">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="off"
          variant="fullWidth"
          aria-label="scrollable prevent tabs example"
        >
          <Tab label={t('TaskTab.pending')} />
          <Tab label={t('TaskTab.completed')} />
          <Tab label={t('TaskTab.locked')} />
        </Tabs>

        {value === 0 && <PendingTasksComponent tasks={tasks.filter(task => task.status === 'pending')} onTasksUpdated={refreshTasks} />}
        {value === 1 && <CompletedTasks tasks={tasks.filter(task => task.status === 'completed')} />}
        {value === 2 && <FrozenTasksComponent tasks={tasks.filter(task => task.status === 'frozen')} />}
      </Box>
    </div>
  );
};

export default Task;
