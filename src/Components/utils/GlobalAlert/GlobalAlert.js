import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAppContext } from '../../Context/AppContext';
const GlobalAlert = () => {
    const { alert, hideAlert } = useAppContext();

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={hideAlert}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={hideAlert} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default GlobalAlert;