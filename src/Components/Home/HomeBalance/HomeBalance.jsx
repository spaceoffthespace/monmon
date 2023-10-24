import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { AuthContext } from '../../Context/AuthContext';
import './HomeBalance.css';
import { useTranslation } from 'react-i18next';
import 'chart.js/auto';

const apiUrl = process.env.REACT_APP_API_URL;


const HomeBalance = ({ setActiveNavTab }) => {
  let { user, authTokens} = useContext(AuthContext);
  const { t } = useTranslation();
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
 
        const response = await axios.get(`${apiUrl}/anal/`, {
          headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
        });
        
        const dailyEarnings = response.data.daily_earnings.map(e => parseFloat(e.earnings) || 0);
        setEarningsData(dailyEarnings);
        console.log(dailyEarnings);
      } catch (error) {
        console.log('Token:', authTokens.access);
        console.error(error);
    } finally {
        setLoading(false);
    }
};
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const sampleearningsData = [ 0, 0, 0, 0, 2.73000000000000];
  const data = earningsData && earningsData.length > 1 ? {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],  // Example labels; adjust as needed
    datasets: [{
        data: earningsData,
        fill: false,
        borderColor: earningsData[earningsData.length - 1] > earningsData[earningsData.length - 2] ? 'green' : 'red',
        borderWidth: 2,
        pointBackgroundColor: earningsData[earningsData.length - 1] > earningsData[earningsData.length - 2] ? 'green' : 'red',
        pointRadius: 4,
        tension: 0.4
    }]
} : null;

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: true,  // Enable or disable tooltips
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Customize the tooltip's background color
            bodyFont: { size: 12 },  // Adjust the font size in the tooltip
            padding: 8  // Adjust the padding inside the tooltip
        }
    },
    scales: {
        x: {
            display: false  // Hide x-axis labels for a cleaner look
        },
        y: {
            display: false,  // Hide y-axis labels for a cleaner look
            beginAtZero: true,
            grid: {
                drawBorder: false  // Hide the border around the grid for a cleaner look
            },
            ticks: {
                display: false  // Hide the ticks for a cleaner look
            }
        }
    },
    elements: {
        point: {
            pointStyle: 'circle',  // Customize the point style
            borderWidth: 0,  // Adjust the border width of the points
            hoverRadius: 6,  // Adjust the hover radius for the points
            hoverBorderWidth: 3  // Adjust the hover border width for the points
        }
    }
};

  const handleStartButtonClick = () => {
    setActiveNavTab('grab');
  };



    return (
      <div className="home-balance-container">
          <Card sx={{ bgcolor: '#43a8ff', padding: '16px', borderRadius: '12px', position: 'relative' }}> 
              <CardContent>
                  <Typography variant="h5" className="title" color="white">
                  {t('HomeComp.personal')}
                  </Typography>
                  
                  <Grid container spacing={3}>

                      <Grid item xs={4} container direction="column" alignItems="center">
                          <Typography variant="subtitle1" color="white">
                          {t('HomeComp.total')}
                          </Typography>
                          <Typography variant="h6" component="div" color="white" mb={2}>
                              ${user.total_earnings} 
                          </Typography>
                          <div style={{ width: '60px', height: '30px' }}>
                          {data ? <Line data={data} options={options} /> : <p>Loading...</p>}
                      </div>
                      </Grid>

                      <Grid item xs={4} container direction="column" alignItems="center">
                          <Typography variant="subtitle1" color="white">
                          {t('HomeComp.todays')}
                          </Typography>
                          <Typography variant="h6" component="div" color="white" mb={2}>
                              ${user.today_earnings} 
                          </Typography>
                          <div style={{ width: '60px', height: '30px' }}>
                              {/* <Line data={data} options={options} /> */}
                          </div>
                      </Grid>

                      <Grid item xs={4} container direction="column" alignItems="center">
                          <Typography variant="subtitle1" color="white">
                          {t('HomeComp.completed')}
                          </Typography>
                          <Typography variant="h6" component="div" color="white" mb={2}>
                          {user.tasks_done_today} 
                          </Typography>
                          <div style={{ width: '60px', height: '30px' }}>
                              {/* <Line data={data} options={options} /> */}
                          </div>
                      </Grid>
                  </Grid>

                  <Button 
                      variant="contained"
                      sx={{ 
                          position: 'absolute', 
                          bottom: '16px', 
                          right: '16px',
                          backgroundColor: '#ffffff',
                          color: '#43a8ff',
                          borderRadius: '12px', 
                          '&:hover': {
                              backgroundColor: '#ffffff',
                          }
                      }}
                      onClick={handleStartButtonClick}  // Added onClick handler
                  >
                      START
                  </Button>
              </CardContent>
          </Card>
      </div>
  );
};

export default HomeBalance;
