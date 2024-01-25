import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';
import './LoginPage.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import 'react-phone-number-input/style.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'; // import Link from react-router-dom
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import i18n from 'i18next'; // Import i18n if it's not already imported
import PhoneInput from 'react-phone-number-input';
import InputAdornment from '@mui/material/InputAdornment';
import { getCountryCallingCode } from 'libphonenumber-js';
import ClipLoader from "react-spinners/ClipLoader";  // Import the loader


const LoginPage = () => {
    const { loginUser } = useContext(AuthContext);
    const [captchaKey, setCaptchaKey] = useState('');
    const [captchaImage, setCaptchaImage] = useState('');
    const [captchaResponse, setCaptchaResponse] = useState('');
    const { t } = useTranslation(); // Initialize the translation hook
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isCaptchaLoaded, setIsCaptchaLoaded] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [defaultCountry, setDefaultCountry] = useState(localStorage.getItem('defaultCountry') || 'US');




    const Url = process.env.REACT_APP_API_URL;
    const CAPTCHAurl = process.env.REACT_APP_API_CAPTCHA_URL;


    useEffect(() => {
        // Set the default country from localStorage on component mount
        const storedDefaultCountry = localStorage.getItem('defaultCountry');
        if (storedDefaultCountry) {
            setDefaultCountry(storedDefaultCountry);
            // Only set the username if it's not already set
            if (!username) {
                const callingCode = getCountryCallingCode(storedDefaultCountry);
                setUsername(`+${callingCode}`);
            }
        }
    }, []); // 





    useEffect(() => {
        axios.get(`${CAPTCHAurl}/api/get-captcha/`)
          .then(response => {
            const data = response.data;
            setCaptchaKey(data.captcha_key);
            setCaptchaImage(`${CAPTCHAurl}${data.captcha_image}`);
            setIsCaptchaLoaded(true)

            // Don't set isCaptchaLoaded here
          })
          .catch(error => {
            console.error("Error fetching captcha:", error);
          });
      }, []);



        const mapErrorToTranslationKey = (errorMessage) => {
            console.log('Backend Error Message:', errorMessage); // Log the original error message
        
            const errorMapping = {
                "Invalid CAPTCHA": "invcaptcha",
                "Invalid credentials": "invalidCredentials"
                // ... add other errors as needed
            };
        
            const translationKey = errorMapping[errorMessage] || "genericError";
            console.log('Mapped Translation Key:', translationKey); // Log the mapped translation key
        
            return translationKey;
        };
        

        const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        username: e.target.username.value,
        password: e.target.password.value,
        captcha_key: captchaKey,
        captcha_response: captchaResponse
    };

    try {
        const ipResponse = await axios.get('https://ipinfo.io/ip');
        const clientIP = ipResponse.data.trim();

        payload.login_ip = clientIP;

        await loginUser(payload);
    } catch (error) {
        if (error && error.json) {
            error.json().then((errorData) => {
                const errorKey = mapErrorToTranslationKey(errorData.detail);
                setErrorMessage(t(errorKey));
            });
        } else {
            setErrorMessage(t('genericError'));
        }

        setOpenSnackbar(true);
    }
};


const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
};
function getFullPhoneNumber(phoneNumber, countryCode) {
    if (phoneNumber.startsWith('+')) {
        return phoneNumber;
    }
    const callingCode = getCountryCallingCode(countryCode);
    return `+${callingCode}${phoneNumber}`;
}
const handlePhoneNumberChange = (phoneNumber) => {
    // Format and set the full phone number
    const fullPhoneNumber = getFullPhoneNumber(phoneNumber, defaultCountry);
    setUsername(fullPhoneNumber);
};

    const [language, setLanguage] = useState(() => {
        // Restore the language option from local storage if present, otherwise default to 'en'
        return localStorage.getItem('language') || 'en';
    });
    
    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    useEffect(() => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }, [language]);


    return (
        <div className="login-container">

<div className="language-container">
                <select value={language} onChange={handleLanguageChange}>
                <option value="en">English</option> 
                <option value="ar">العربية</option> 
              <option value="fr">Français</option>
              <option value="gr">Deutsch</option> 
                </select>
            </div>
            <form onSubmit={handleLoginSubmit} className="login-form">
                <h2 className="login-title"> {t('login.Pagetitle')}</h2>
                <TextField
                    label={t('login.phoneNumber')}
                    variant="filled"
                    name="username"
                    value={username}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    className="login-input"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    value={username}
                                    onChange={handlePhoneNumberChange}
                                    defaultCountry={defaultCountry}
                                />
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField 
                    label={t('login.Password')}
                    type="password"
                    variant="filled"
                    name="password"
                    className="login-input"
                />

<div className="captcha-container">
  {isCaptchaLoaded ? (
    <img
      src={captchaImage}
      alt="CAPTCHA"
      className="captcha-image"
      onLoad={() => setIsCaptchaLoaded(true)} // Set to true once the image has loaded
    />
  ) : (
    <ClipLoader color="#000000" size={24} />
  )}
  <TextField
    label="Enter CAPTCHA"
    variant="filled"
    value={captchaResponse}
    onChange={(e) => setCaptchaResponse(e.target.value)}
    className="login-input captcha-input"
  />
</div>

                <Button variant="contained" type="submit" className="login-submit">{t('login.Pagetitle')}</Button>
                <Button variant="outlined" className="register-button" component={Link} to="/register">
                {t('login.Register')}</Button>
            </form>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default LoginPage;
