import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { green, red } from '@mui/material/colors';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Navbutton from '../../Navbutton/NavButton';
import boxbox from '../../assets/box-box.png';
import ClipLoader from "react-spinners/ClipLoader";  // Import the loader
import LoadLoader from '../../Loader/ClipsLoader';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import './Records.css'

 
const Records = ({ handleGoBack }) => {
  const [records, setRecords] = useState([]);
  const { user, isLoading, authTokens } = useContext(AuthContext);
  const [fetchingData, setFetchingData] = useState(true);  // New state to track if we are fetching data
  const { t } = useTranslation(); // Initialize the translation hook

  const apiUrl = process.env.REACT_APP_API_URL;

  
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`${apiUrl}/activity/`, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`,
          },
        });
        const transactions = response.data.transactions.map(t => ({...t, type: 'Transaction'}));
        const withdrawals = response.data.withdrawals.map(w => ({...w, type: 'Withdrawal'}));
        setRecords([...transactions, ...withdrawals].sort((a, b) => new Date(b.date || b.request_date) - new Date(a.date || a.request_date)));
        setFetchingData(false);  // Update the state after fetching data
      } catch (error) {
        console.error('Failed to fetch activity:', error);
        setFetchingData(false);  // Update the state if there's an error
      }
    };

    if (!isLoading) {
      fetchActivity();
    }
  }, [user, isLoading]);

  // While fetching data, show the loader
  if (fetchingData) {
    return (
      <div className="loader-container">
        <LoadLoader color="#123abc" loading={true} size={50} />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div>
        <Navbutton pageName={t('Records.Pagetitle')} showBackButton={true} onBackClick={handleGoBack}/>
        <div className="no-data-container">
          <img src={boxbox} alt="No data" className="no-data-background" />
          <p className="no-data-message">{t('Records.nodata')}</p>
        </div>
      </div>
    );
  }
  

  return (
    <div>
      <Navbutton pageName={t('Records.Pagetitle')} showBackButton={true} onBackClick={handleGoBack}/> {/* Pass it here */}

    <Box className="records-container">
    <Typography 
  variant="h5" 
  style={{ 
    textAlign: 'center',
    borderBottom: '2px solid #43a8ff', 
    width: '100%',
    paddingBottom: '10px'  // Adjusts the space between the text and the border
  }} 
  className="records2-heading"
>
  {t('Records.RecordText1')}
</Typography>
      <List>
        {records.map(record => (
          <ListItem key={record.id}>
            <ListItemAvatar>
              <Avatar style={record.type === 'Transaction' ? { backgroundColor: green[500] } : { backgroundColor: red[500] }}>
                {record.type === 'Transaction' ? '+' : '-'}
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={`${record.type} - ${record.amount}`}
              secondary={new Date(record.date || record.request_date).toLocaleDateString()}
              />
          </ListItem>
        ))}
      </List>
    </Box>
  </div>
  );
};

export default Records;
