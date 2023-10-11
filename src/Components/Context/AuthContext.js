// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';

import jwt_decode from "jwt-decode";

import { useNavigate } from 'react-router-dom'

import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import SnackbarContent from '@mui/material/SnackbarContent';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {


    const { t } = useTranslation(); // Initialize the translation hook

    const [name, setName] = useState(''); // Set the initial value of name
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)


    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // Update the name value as needed

    const navigate = useNavigate()

    const loginUser = async (payload) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
                // Set the success message for the Snackbar
                setSnackbarMessage(t('login.success'))
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                // Handle errors based on the returned response (e.g. CAPTCHA errors)
                setSnackbarMessage(data.detail || (t('login.err')));
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    let logoutUser = () => {
        setAuthTokens(null)

        setUser(null)
        localStorage.removeItem('authTokens')

        navigate('/login');

    }
    const updateBalance = async () => {
        // Check if authTokens is null or 'access' property is missing
        if (!authTokens || !authTokens.access) {
            console.error('User not logged in or invalid token.');
            logoutUser(); // Log out the user if no access token is found
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/get_user_data/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authTokens.access}`,
                },
            });

            if (response.status === 401) {
                // Handle Unauthorized error
                console.error('Unauthorized: Unable to fetch user data. Access token may be invalid or expired.');
                logoutUser(); // Log out the user if the access token is invalid or expired
                return;
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setUser(data); // Update user data in the context
        } catch (error) {
            console.error('Error updating user balance:', error);
            // Handle error (e.g., show error message to the user)
        }
    };



    let updateToken = async () => {
        // Check if authTokens is not null and refresh token is present
        if (authTokens && authTokens.refresh) {
            let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': authTokens.refresh })
            })
            let data = await response.json()

            if (response.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else {
                logoutUser()
            }

            if (loading) {
                setLoading(false)
            }
        }
        else {
            console.error("Refresh token is not available");
        }
    }





    useEffect(() => {
        // Check if authTokens.access exists
        if (authTokens && authTokens.access) {
            // Perform the logic that should run when authTokens.access changes
            updateBalance();
        }
    }, [authTokens]);




    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 15

        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authTokens, loading])


    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
        updateBalance: updateBalance,
        updateToken: updateToken
    }

    // useEffect(() => {

    //     let interval = setInterval(() => {
    //         if (authTokens) {
    //             updateToken()
    //         }
    //     }, 2000);
    //     return () => clearInterval(interval)

    // }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {children}

            {/* Snackbar to show success or error message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} // Adjust the duration as per your requirement
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Center the Snackbar
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: snackbarSeverity === 'success' ? '#43A047' : '#F44336', // Customize background color based on severity
                        color: '#FFFFFF', // Customize text color
                    }}
                    message={snackbarMessage}
                />
            </Snackbar>
        </AuthContext.Provider>
    );
};


export const useAuth = () => React.useContext(AuthContext);

export { AuthContext, AuthProvider };
